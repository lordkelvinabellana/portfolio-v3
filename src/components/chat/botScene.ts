import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  CanvasTexture,
  CapsuleGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "@/lib/gsap";
import { readCssColor } from "@/lib/css-color";

/*
 * The chat launcher: a small glossy bot wearing the hero's orbit ring, with
 * the three service colours riding it. The React side moves the canvas around
 * the page; this file only poses the bot (banking into turns, looking at the
 * pointer, blinking, thinking while a reply is on its way).
 */

export type BotMood = "idle" | "flying" | "thinking" | "happy";

export type BotScene = {
  /* Screen velocity while flying, roughly -1..1 on each axis. */
  setVelocity(vx: number, vy: number): void;
  /* Where to look, -1..1 from the bot's centre (x right, y down). */
  lookAt(x: number, y: number): void;
  setMood(mood: BotMood): void;
  wave(): void;
  pop(): void;
  spin(): void;
  hop(): void;
  /* Stage mode only: centre the bot on (x, y) CSS px at k times its docked size. */
  place(x: number, y: number, k: number): void;
  /* Resolves once every shader is compiled (off the main thread where the
     browser allows), so the first animated frame doesn't stall. */
  ready(): Promise<void>;
  refreshColors(): void;
  dispose(): void;
};

/* Stage mode renders the bot on a full-screen canvas for the intro. dockPxPerUnit
   is the docked canvas's scale, so k = 1 matches the docked bot exactly. */
export type StageOptions = { dockPxPerUnit: number };

const CAMERA_DISTANCE = 8.4;
const FOV = 30;
export const pxPerUnit = (canvasHeight: number) =>
  canvasHeight / (2 * CAMERA_DISTANCE * Math.tan(((FOV / 2) * Math.PI) / 180));

const RING_RADIUS = 1.42;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function glowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.45)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function createBotScene(
  canvas: HTMLCanvasElement,
  { reducedMotion, stage }: { reducedMotion: boolean; stage?: StageOptions },
): BotScene | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, stage ? 1.5 : 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;

  const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
  camera.position.set(0, 0.15, CAMERA_DISTANCE);
  camera.lookAt(0, 0, 0);

  scene.add(new HemisphereLight(0xffffff, 0x8090b0, 0.9));
  const key = new DirectionalLight(0xffffff, 1.6);
  key.position.set(2.5, 3.5, 4);
  scene.add(key);
  const rim = new DirectionalLight(0xb8ccff, 1.2);
  rim.position.set(-3, 1, -3);
  scene.add(rim);

  /* ── Rig: placer (stage size) → root (bob) → bank (velocity) → gesture → head (gaze) ── */
  const placer = new Group();
  const root = new Group();
  const bank = new Group();
  const gesture = new Group();
  const head = new Group();
  placer.add(root);
  root.add(bank);
  bank.add(gesture);
  gesture.add(head);
  scene.add(placer);

  const shell = new MeshPhysicalMaterial({
    color: 0xeef1f7,
    roughness: 0.3,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
  });
  const glass = new MeshPhysicalMaterial({
    color: 0x0b1222,
    roughness: 0.1,
    metalness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
  });
  const trim = new MeshPhysicalMaterial({ color: 0x4f7cff, roughness: 0.35, clearcoat: 0.6 });
  const eyeMaterial = new MeshBasicMaterial({ color: 0x9cc2ff, toneMapped: false });
  const beadMaterial = new MeshBasicMaterial({ color: 0x9cc2ff, toneMapped: false });
  const ringMaterial = new MeshBasicMaterial({ color: 0x4f7cff, toneMapped: false, transparent: true, opacity: 0.9 });

  const geometries = [
    new SphereGeometry(1, 64, 48),
    new SphereGeometry(1, 64, 32, Math.PI / 2 - 0.92, 1.84, Math.PI / 2 - 0.45, 0.9),
    new CapsuleGeometry(0.075, 0.13, 6, 16),
    new CylinderGeometry(0.025, 0.035, 0.32, 12),
    new SphereGeometry(0.085, 24, 16),
    new CylinderGeometry(0.2, 0.2, 0.14, 32),
    new TorusGeometry(RING_RADIUS, 0.022, 10, 160),
    new SphereGeometry(0.075, 20, 14),
  ];
  const [bodyGeo, visorGeo, eyeGeo, stalkGeo, beadGeo, podGeo, ringGeo, nodeGeo] = geometries;

  const body = new Mesh(bodyGeo, shell);
  body.scale.set(1, 0.9, 0.94);
  head.add(body);

  const visor = new Mesh(visorGeo, glass);
  visor.scale.set(1.015, 0.915, 0.955);
  head.add(visor);

  const eyes = new Group();
  for (const side of [-1, 1]) {
    const eye = new Mesh(eyeGeo, eyeMaterial);
    const x = 0.3 * side;
    const y = 0.03;
    const z = 0.955 * Math.sqrt(Math.max(0, 1 - (x / 1.015) ** 2 - (y / 0.915) ** 2)) + 0.015;
    eye.position.set(x, y, z);
    eye.rotation.y = Math.atan2(x, z) * 0.9;
    eye.scale.z = 0.5;
    eyes.add(eye);
  }
  head.add(eyes);

  const stalk = new Mesh(stalkGeo, shell);
  stalk.position.set(0, 1.04, 0);
  head.add(stalk);
  const bead = new Mesh(beadGeo, beadMaterial);
  bead.position.set(0, 1.25, 0);
  head.add(bead);

  for (const side of [-1, 1]) {
    const pod = new Mesh(podGeo, trim);
    pod.rotation.z = Math.PI / 2;
    pod.position.set(0.97 * side, 0.02, 0);
    head.add(pod);
  }

  /* The orbit ring tilts with the body but doesn't turn with the gaze. */
  const orbit = new Group();
  orbit.rotation.set(1.22, 0, 0.32);
  gesture.add(orbit);
  orbit.add(new Mesh(ringGeo, ringMaterial));
  const nodeMaterials = [0, 1, 2].map(() => new MeshBasicMaterial({ color: 0xffffff, toneMapped: false }));
  const nodes = nodeMaterials.map((material, i) => {
    const node = new Mesh(nodeGeo, material);
    node.userData.angle = (i / 3) * Math.PI * 2;
    orbit.add(node);
    return node;
  });

  const glowMap = glowTexture();
  const thrusterMaterial = new SpriteMaterial({
    map: glowMap,
    color: 0x7fa8ff,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
    opacity: 0.2,
  });
  const thruster = new Sprite(thrusterMaterial);
  thruster.position.set(0, -1.22, 0.1);
  thruster.scale.set(0.9, 1.1, 1);
  gesture.add(thruster);

  /* ── State ── */
  let mood: BotMood = "idle";
  const velocity = { x: 0, y: 0 };
  const look = { x: 0, y: 0 };
  let thinking = 0;
  let flying = 0;
  let frame = 0;
  let last = performance.now();
  let time = 0;
  let disposed = false;

  function refreshColors() {
    const primary = new Color().setRGB(...readCssColor("--primary", [0.31, 0.49, 1]), SRGBColorSpace);
    trim.color.copy(primary);
    ringMaterial.color.copy(primary);
    const light = primary.clone().lerp(new Color(0xffffff), 0.42);
    eyeMaterial.color.copy(light);
    beadMaterial.color.copy(light);
    thrusterMaterial.color.copy(light);
    ["--teal-fg", "--coral-fg", "--violet-fg"].forEach((token, i) => {
      nodeMaterials[i].color.setRGB(...readCssColor(token, [1, 1, 1]), SRGBColorSpace);
    });
    if (reducedMotion) render();
  }

  const view = { x: 0, y: 0, k: 1 };
  function applyView() {
    if (!stage) return;
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;
    // Shift the projection centre onto the bot instead of moving the bot, so
    // it is drawn exactly as the docked canvas draws it, wherever it is.
    camera.setViewOffset(width * 2, height * 2, width - view.x, height - view.y, width, height);
    placer.scale.setScalar((view.k * stage.dockPxPerUnit) / (pxPerUnit(height) * 2));
  }

  function resize() {
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    applyView();
    camera.updateProjectionMatrix();
  }

  function render() {
    renderer.render(scene, camera);
  }

  function tick(now: number) {
    if (disposed) return;
    frame = requestAnimationFrame(tick);
    if (!warm || document.hidden) {
      last = now;
      return;
    }
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    time += dt;
    const ease = (rate: number) => 1 - Math.exp(-rate * dt);

    flying += ((mood === "flying" ? 1 : 0) - flying) * ease(4);
    thinking += ((mood === "thinking" ? 1 : 0) - thinking) * ease(5);

    root.position.y = Math.sin(time * 2.1) * 0.07 * (1 - flying * 0.6);

    // Lean into the direction of travel, nose down when climbing or diving.
    bank.rotation.z += (clamp(-velocity.x * 0.75, -0.65, 0.65) - bank.rotation.z) * ease(6);
    bank.rotation.x += (clamp(velocity.y * 0.45, -0.4, 0.4) - bank.rotation.x) * ease(6);

    const yaw = flying > 0.5 ? clamp(velocity.x * 1.1, -0.9, 0.9) : look.x * 0.55 + thinking * 0.25;
    const pitch = flying > 0.5 ? clamp(velocity.y * 0.35, -0.3, 0.3) : look.y * 0.32 - thinking * 0.28;
    head.rotation.y += (yaw - head.rotation.y) * ease(5);
    head.rotation.x += (pitch - head.rotation.x) * ease(5);

    const speed = 0.9 + thinking * 2.6 + flying * 1.2;
    for (const node of nodes) {
      node.userData.angle += dt * speed;
      node.position.set(Math.cos(node.userData.angle) * RING_RADIUS, Math.sin(node.userData.angle) * RING_RADIUS, 0);
    }
    orbit.rotation.z = 0.32 + Math.sin(time * 0.5) * 0.08;

    const pulse = thinking * (0.5 + 0.5 * Math.sin(time * 9));
    bead.scale.setScalar(1 + pulse * 0.45);
    thrusterMaterial.opacity = 0.16 + flying * 0.75 + Math.sin(time * 30) * 0.04 * flying;
    thruster.scale.set(0.9 + flying * 0.2, 1.1 + flying * 1.1, 1);

    render();
  }

  /* Blinks on a loose, uneven rhythm. */
  let blinkCall: gsap.core.Tween | null = null;
  function scheduleBlink() {
    blinkCall = gsap.delayedCall(gsap.utils.random(2.2, 5.5), () => {
      if (mood !== "happy") {
        gsap.timeline()
          .to(eyes.scale, { y: 0.12, duration: 0.07, ease: "power2.in" })
          .to(eyes.scale, { y: 1, duration: 0.12, ease: "power2.out" });
      }
      scheduleBlink();
    });
  }

  function setMood(next: BotMood) {
    if (next === mood) return;
    mood = next;
    // Happy eyes: squinted into smiling arcs.
    gsap.to(eyes.scale, { y: next === "happy" ? 0.42 : 1, duration: 0.25, ease: "power2.out" });
    gsap.to(eyes.position, { y: next === "happy" ? 0.05 : 0, duration: 0.25, ease: "power2.out" });
    if (reducedMotion) gsap.delayedCall(0.3, render);
  }

  function wave() {
    if (reducedMotion) return;
    gsap.timeline()
      .to(gesture.rotation, { z: 0.32, duration: 0.18, ease: "power2.out" })
      .to(gesture.rotation, { z: -0.26, duration: 0.24, ease: "sine.inOut" })
      .to(gesture.rotation, { z: 0.18, duration: 0.22, ease: "sine.inOut" })
      .to(gesture.rotation, { z: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
  }

  function spin() {
    if (reducedMotion) return;
    gsap.fromTo(gesture.rotation, { y: 0 }, { y: Math.PI * 2, duration: 1.1, ease: "power3.inOut" });
  }

  function hop() {
    if (reducedMotion) return;
    gsap.timeline()
      .to(bank.position, { y: 0.45, duration: 0.24, ease: "power2.out" })
      .to(bank.position, { y: 0, duration: 0.5, ease: "bounce.out" });
  }

  function pop() {
    if (reducedMotion) return;
    gsap.fromTo(
      root.scale,
      { x: 1.14, y: 0.86, z: 1.14 },
      { x: 1, y: 1, z: 1, duration: 0.8, ease: "elastic.out(1, 0.4)" },
    );
  }

  resize();
  refreshColors();
  const observer = new ResizeObserver(() => {
    resize();
    if (reducedMotion) render();
  });
  observer.observe(canvas);

  // Shaders compile in the background; the loop only draws once they're done.
  let warm = false;
  const compiled = renderer
    .compileAsync(scene, camera)
    .catch(() => renderer.compile(scene, camera))
    .then(() => {
      warm = true;
    });

  if (reducedMotion) {
    compiled.then(() => !disposed && render());
  } else {
    frame = requestAnimationFrame(tick);
    scheduleBlink();
  }

  return {
    setVelocity(vx, vy) {
      velocity.x = clamp(vx, -1.4, 1.4);
      velocity.y = clamp(vy, -1.4, 1.4);
    },
    lookAt(x, y) {
      look.x = clamp(x, -1, 1);
      look.y = clamp(y, -1, 1);
      if (reducedMotion) {
        head.rotation.y = look.x * 0.55;
        head.rotation.x = look.y * 0.32;
        render();
      }
    },
    setMood,
    wave,
    pop,
    spin,
    hop,
    place(x, y, k) {
      view.x = x;
      view.y = y;
      view.k = Math.max(0.0001, k);
      applyView();
      camera.updateProjectionMatrix();
    },
    ready: () => compiled,
    refreshColors,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      blinkCall?.kill();
      gsap.killTweensOf([eyes.scale, eyes.position, gesture.rotation, root.scale, bank.position]);
      observer.disconnect();
      geometries.forEach((g) => g.dispose());
      [shell, glass, trim, eyeMaterial, beadMaterial, ringMaterial, thrusterMaterial, ...nodeMaterials].forEach((m) => m.dispose());
      glowMap.dispose();
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
