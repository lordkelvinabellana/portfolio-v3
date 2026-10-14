import {
  BoxGeometry,
  CatmullRomCurve3,
  Color,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  SRGBColorSpace,
  Shape,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { gsap } from "@/lib/gsap";
import { readCssColor } from "@/lib/css-color";
import { createStage } from "./stage";

/*
 * One glossy object per service, in the chat bot's materials:
 *   operations: a workflow, four nodes with a pulse running through them
 *   video:      a screen with a play button and a playhead cutting clips
 *   product:    a dashboard window whose bars keep re-ranking
 * `show` swaps between them with a pop; "all" cycles through the three.
 */

export type GlyphService = "operations" | "video" | "product";
export type ServiceGlyphScene = {
  show: (service: GlyphService | "all") => void;
  refreshColors: () => void;
  dispose: () => void;
};

const TONE_TOKENS: Record<GlyphService, string> = {
  operations: "--teal-fg",
  video: "--coral-fg",
  product: "--violet-fg",
};
const ORDER: GlyphService[] = ["operations", "video", "product"];

export function createServiceGlyph(canvas: HTMLCanvasElement, { reducedMotion }: { reducedMotion: boolean }): ServiceGlyphScene | null {
  const stage = createStage(canvas, { reducedMotion, fov: 30, distance: 8 });
  if (!stage) return null;
  const { root } = stage;

  const shell = new MeshPhysicalMaterial({ color: 0xeef1f7, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.16 });
  const glass = new MeshPhysicalMaterial({ color: 0x0b1222, roughness: 0.12, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.05 });
  const tone = Object.fromEntries(
    ORDER.map((s) => [s, new MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.35, clearcoat: 0.7, emissive: 0x000000 })]),
  ) as Record<GlyphService, MeshPhysicalMaterial>;
  const glow = Object.fromEntries(ORDER.map((s) => [s, new MeshBasicMaterial({ color: 0xffffff, toneMapped: false })])) as Record<
    GlyphService,
    MeshBasicMaterial
  >;
  const wire = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, toneMapped: false });
  const white = new MeshBasicMaterial({ color: 0xffffff, toneMapped: false });

  /* ── Operations: the workflow ── */
  const flow = new Group();
  const nodeAt = [new Vector3(-1.45, 0.42, 0), new Vector3(-0.5, -0.36, 0.3), new Vector3(0.48, 0.42, -0.15), new Vector3(1.45, -0.36, 0.2)];
  const nodeGeo = new RoundedBoxGeometry(0.66, 0.66, 0.32, 4, 0.14);
  const plateGeo = new CylinderGeometry(0.16, 0.16, 0.05, 32);
  const nodes = nodeAt.map((at) => {
    const node = new Group();
    node.position.copy(at);
    node.add(new Mesh(nodeGeo, shell));
    const plate = new Mesh(plateGeo, glow.operations);
    plate.rotation.x = Math.PI / 2;
    plate.position.z = 0.17;
    node.add(plate);
    flow.add(node);
    return node;
  });
  const curves = nodeAt.slice(0, -1).map((from, i) => {
    const to = nodeAt[i + 1];
    const mid = from.clone().lerp(to, 0.5);
    mid.z += 0.35;
    return new CatmullRomCurve3([from.clone(), mid, to.clone()]);
  });
  curves.forEach((curve) => flow.add(new Mesh(new TubeGeometry(curve, 48, 0.028, 8, false), wire)));
  const pulse = new Mesh(new SphereGeometry(0.075, 20, 14), white);
  flow.add(pulse);
  let lastSegment = -1;

  /* ── Video: the screen and the timeline ── */
  const cut = new Group();
  cut.add(new Mesh(new RoundedBoxGeometry(2.5, 1.5, 0.16, 4, 0.1), shell));
  const screen = new Mesh(new RoundedBoxGeometry(2.3, 1.3, 0.06, 4, 0.05), glass);
  screen.position.z = 0.07;
  cut.add(screen);
  const triangle = new Shape();
  triangle.moveTo(-0.22, -0.27);
  triangle.lineTo(0.3, 0);
  triangle.lineTo(-0.22, 0.27);
  triangle.closePath();
  const play = new Mesh(new ExtrudeGeometry(triangle, { depth: 0.08, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3 }), glow.video);
  play.position.set(0, 0.02, 0.1);
  cut.add(play);
  const clipWidths = [0.62, 0.36, 0.74, 0.5];
  const clips: Mesh[] = [];
  let x = -1.25;
  clipWidths.forEach((w) => {
    const clip = new Mesh(new RoundedBoxGeometry(w, 0.22, 0.14, 2, 0.05), tone.video);
    clip.position.set(x + w / 2, -1.02, 0.05);
    x += w + 0.06;
    clips.push(clip);
    cut.add(clip);
  });
  const playhead = new Mesh(new BoxGeometry(0.035, 0.44, 0.16), white);
  playhead.position.set(-1.25, -1.02, 0.12);
  cut.add(playhead);
  let lastClip = -1;
  cut.position.y = 0.2;

  /* ── Product: the dashboard ── */
  const app = new Group();
  app.add(new Mesh(new RoundedBoxGeometry(2.6, 1.75, 0.14, 4, 0.1), shell));
  const topBar = new Mesh(new RoundedBoxGeometry(2.4, 0.2, 0.05, 2, 0.04), glass);
  topBar.position.set(0, 0.66, 0.08);
  app.add(topBar);
  [-1.05, -0.92, -0.79].forEach((dx) => {
    const dot = new Mesh(new SphereGeometry(0.035, 12, 8), white);
    dot.position.set(dx, 0.66, 0.12);
    app.add(dot);
  });
  const barGeo = new RoundedBoxGeometry(0.22, 1, 0.12, 2, 0.04);
  barGeo.translate(0, 0.5, 0);
  const bars = [0, 1, 2, 3, 4].map((i) => {
    const bar = new Mesh(barGeo, tone.product);
    bar.position.set(-1.0 + i * 0.3, -0.68, 0.1);
    bar.scale.y = 0.5;
    app.add(bar);
    return bar;
  });
  const track = new Mesh(new TorusGeometry(0.26, 0.04, 12, 64), glass);
  track.position.set(0.82, -0.08, 0.1);
  app.add(track);
  const gauge = new Mesh(new TorusGeometry(0.26, 0.05, 12, 64, Math.PI * 1.4), glow.product);
  gauge.position.copy(track.position).setZ(0.13);
  app.add(gauge);

  const groups: Record<GlyphService, Group> = { operations: flow, video: cut, product: app };
  ORDER.forEach((s) => {
    groups[s].visible = false;
    groups[s].scale.setScalar(0.001);
    root.add(groups[s]);
  });
  root.scale.setScalar(1.08);

  /* ── Motion ── */
  stage.onFrame((dt, time) => {
    root.rotation.y = Math.sin(time * 0.45) * 0.28 + stage.pointer.x * 0.35;
    root.rotation.x = -0.1 + stage.pointer.y * 0.2;
    root.position.y = Math.sin(time * 1.2) * 0.05;

    if (flow.visible) {
      const t = (time * 0.42) % 1;
      const segment = Math.min(curves.length - 1, Math.floor(t * curves.length));
      pulse.position.copy(curves[segment].getPointAt((t * curves.length) % 1));
      if (segment !== lastSegment) {
        // The pulse has reached the next node: it pops.
        const reached = nodes[segment];
        gsap.fromTo(reached.scale, { x: 1.14, y: 1.14, z: 1.14 }, { x: 1, y: 1, z: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        lastSegment = segment;
      }
    }

    if (cut.visible) {
      const t = (time * 0.32) % 1;
      playhead.position.x = -1.25 + t * 2.62;
      const over = clips.findIndex((clip) => Math.abs(clip.position.x - playhead.position.x) < 0.05);
      if (over >= 0 && over !== lastClip) {
        gsap.fromTo(clips[over].scale, { y: 1.35, x: 1.04 }, { y: 1, x: 1, duration: 0.45, ease: "back.out(3)" });
        lastClip = over;
      }
      play.scale.setScalar(1 + Math.sin(time * 3) * 0.05);
    }

    if (app.visible) {
      bars.forEach((bar, i) => {
        bar.scale.y = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(time * 1.3 + i * 1.1));
      });
      gauge.rotation.z = -time * 0.8;
    }
  });

  /* ── Swapping ── */
  let current: GlyphService | null = null;
  let cycle: gsap.core.Tween | null = null;

  function swap(next: GlyphService) {
    if (next === current) return;
    const outgoing = current ? groups[current] : null;
    const incoming = groups[next];
    current = next;
    if (reducedMotion) {
      if (outgoing) outgoing.visible = false;
      incoming.visible = true;
      incoming.scale.setScalar(1);
      stage!.requestRender();
      return;
    }
    if (outgoing) {
      gsap.to(outgoing.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.35, ease: "back.in(1.7)", onComplete: () => void (outgoing.visible = false) });
      gsap.to(outgoing.rotation, { y: outgoing.rotation.y + 1.2, duration: 0.35, ease: "power2.in" });
    }
    incoming.visible = true;
    const delay = outgoing ? 0.22 : 0;
    gsap.fromTo(incoming.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.75, ease: "back.out(1.8)", delay });
    gsap.fromTo(incoming.rotation, { y: -1.4 }, { y: 0, duration: 0.9, ease: "power3.out", delay });
  }

  function show(service: GlyphService | "all") {
    cycle?.kill();
    cycle = null;
    if (service !== "all") return swap(service);
    let i = current ? ORDER.indexOf(current) : -1;
    const step = () => {
      i = (i + 1) % ORDER.length;
      swap(ORDER[i]);
      if (!reducedMotion) cycle = gsap.delayedCall(3.6, step);
    };
    step();
  }

  function refreshColors() {
    ORDER.forEach((s) => {
      const c = new Color().setRGB(...readCssColor(TONE_TOKENS[s], [0.5, 0.6, 1]), SRGBColorSpace);
      tone[s].color.copy(c);
      tone[s].emissive.copy(c).multiplyScalar(0.25);
      glow[s].color.copy(c).lerp(new Color(0xffffff), 0.25);
    });
    wire.color.copy(tone.operations.color);
    stage!.requestRender();
  }
  refreshColors();
  void stage.start();

  return {
    show,
    refreshColors,
    dispose() {
      cycle?.kill();
      gsap.killTweensOf([...ORDER.map((s) => groups[s].scale), ...ORDER.map((s) => groups[s].rotation), ...nodes.map((n) => n.scale), ...clips.map((c) => c.scale)]);
      stage!.dispose();
    },
  };
}
