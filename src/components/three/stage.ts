import {
  ACESFilmicToneMapping,
  DirectionalLight,
  Group,
  HemisphereLight,
  PerspectiveCamera,
  PMREMGenerator,
  SRGBColorSpace,
  Scene,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/*
 * The shared shell for the site's small three.js pieces: a transparent
 * renderer with the same lighting as the chat bot, sized to its canvas,
 * paused while off screen or in a background tab, drawing only once its
 * shaders have compiled. Scenes add objects to `root` and per-frame work
 * through `onFrame`; with reduced motion they render once, on demand.
 */

export type Stage = {
  scene: Scene;
  camera: PerspectiveCamera;
  root: Group;
  renderer: WebGLRenderer;
  /* Smoothed pointer position relative to the canvas centre, about -1..1. */
  pointer: { x: number; y: number };
  /* Raw pointer in canvas pixels, or null when it's away. */
  pointerPx: { x: number; y: number } | null;
  width: () => number;
  height: () => number;
  onFrame: (fn: (dt: number, time: number) => void) => void;
  onResize: (fn: (width: number, height: number) => void) => void;
  requestRender: () => void;
  /* Call once the scene is built: compiles its shaders in the background,
     then starts drawing. */
  start: () => Promise<void>;
  dispose: () => void;
};

export function createStage(
  canvas: HTMLCanvasElement,
  { reducedMotion, fov = 30, distance = 8, lights = true }: { reducedMotion: boolean; fov?: number; distance?: number; lights?: boolean },
): Stage | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(fov, 1, 0.1, 100);
  camera.position.set(0, 0, distance);
  const root = new Group();
  scene.add(root);

  let pmrem: PMREMGenerator | null = null;
  if (lights) {
    pmrem = new PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.add(new HemisphereLight(0xffffff, 0x8090b0, 0.9));
    const key = new DirectionalLight(0xffffff, 1.5);
    key.position.set(2.5, 3.5, 4);
    scene.add(key);
    const rim = new DirectionalLight(0xb8ccff, 1.1);
    rim.position.set(-3, 1, -3);
    scene.add(rim);
  }

  const frameFns: ((dt: number, time: number) => void)[] = [];
  const resizeFns: ((width: number, height: number) => void)[] = [];
  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let pointerPx: { x: number; y: number } | null = null;
  let width = 1;
  let height = 1;
  let visible = true;
  let warm = false;
  let disposed = false;
  let frame = 0;
  let last = performance.now();
  let time = 0;

  function render() {
    if (!warm || disposed) return;
    renderer.render(scene, camera);
  }

  function resize() {
    width = canvas.clientWidth || 1;
    height = canvas.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    resizeFns.forEach((fn) => fn(width, height));
    if (reducedMotion) render();
  }

  function tick(now: number) {
    if (disposed) return;
    frame = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!warm || !visible || document.hidden) return;
    time += dt;
    const ease = 1 - Math.exp(-dt * 4);
    pointer.x += (target.x - pointer.x) * ease;
    pointer.y += (target.y - pointer.y) * ease;
    frameFns.forEach((fn) => fn(dt, time));
    render();
  }

  function onPointer(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    target.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
    target.y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    pointerPx = inside ? { x: e.clientX - rect.left, y: e.clientY - rect.top } : null;
    stage.pointerPx = pointerPx;
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  io.observe(canvas);
  window.addEventListener("pointermove", onPointer, { passive: true });


  const stage: Stage = {
    scene,
    camera,
    root,
    renderer,
    pointer,
    pointerPx,
    width: () => width,
    height: () => height,
    onFrame: (fn) => frameFns.push(fn),
    onResize: (fn) => {
      resizeFns.push(fn);
      fn(width, height);
    },
    requestRender: render,
    start: () =>
      renderer
        .compileAsync(scene, camera)
        .catch(() => renderer.compile(scene, camera))
        .then(() => {
          warm = true;
          render();
        }),
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      scene.traverse((object) => {
        const mesh = object as { geometry?: { dispose: () => void }; material?: { dispose: () => void } | { dispose: () => void }[] };
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        materials.forEach((material) => material.dispose());
      });
      scene.environment?.dispose();
      pmrem?.dispose();
      renderer.dispose();
    },
  };

  resize();
  if (!reducedMotion) frame = requestAnimationFrame(tick);
  return stage;
}
