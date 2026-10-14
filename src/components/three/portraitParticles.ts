import { BufferAttribute, BufferGeometry, Points, ShaderMaterial, Vector3 } from "three";
import { gsap } from "@/lib/gsap";
import { readCssColor } from "@/lib/css-color";
import { createStage } from "./stage";

/*
 * Kelvin's portrait as a cloud of particles, each one carrying the colour of
 * its pixel in the photo. The real photo sits on top while the portrait is
 * whole; to show the work, the photo lifts away and the particles fly into a
 * workflow, a video screen or a dashboard, then come back and the photo
 * settles again. Near the pointer the particles scatter.
 *
 * Units are photo radii: the portrait is a disc of radius 1 at the origin,
 * drawn exactly over the DOM photo.
 */

export type PortraitShape = "operations" | "video" | "product";
export type PortraitScene = {
  assemble: () => void;
  morph: (shape: PortraitShape) => void;
  refreshColors: () => void;
  dispose: () => void;
};

const GRID = 120;
const TONE_TOKENS: Record<PortraitShape, string> = { operations: "--teal-fg", video: "--coral-fg", product: "--violet-fg" };

const vertex = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aShape;
  attribute vec3 aColor;
  attribute vec4 aRand;
  uniform float uAssemble;
  uniform float uMorph;
  uniform float uTime;
  uniform float uRepel;
  uniform float uPointSize;
  uniform vec3 uPointer;
  uniform vec3 uTone;
  varying vec3 vColor;
  varying float vAlpha;

  float ease(float t) { return t * t * (3.0 - 2.0 * t); }

  void main() {
    float delay = aRand.x * 0.35;
    float a = ease(clamp((uAssemble - delay) / 0.65, 0.0, 1.0));
    float m = ease(clamp((uMorph - delay) / 0.65, 0.0, 1.0));
    vec3 p = mix(aStart, position, a);
    vec3 q = mix(p, aShape, m);

    // Fly out and around on the way between shapes.
    float arc = sin(m * 3.14159265) + sin(a * 3.14159265) * 0.6;
    float spin = aRand.z * 6.2831853;
    q.xy += arc * vec2(cos(spin), sin(spin)) * 0.32;
    q.z += arc * (aRand.y - 0.35) * 1.1;

    // A slow breath so the cloud never sits dead still.
    q += 0.01 * vec3(sin(uTime * 1.3 + aRand.w * 6.28), cos(uTime * 1.1 + spin), 0.0);

    // Scatter away from the pointer.
    vec2 away = q.xy - uPointer.xy;
    float d2 = dot(away, away);
    float push = uRepel * exp(-d2 * 5.0);
    q.xy += normalize(away + 1e-5) * push * 0.5;
    q.z += push * 0.5;

    vColor = mix(aColor, uTone * (0.7 + aRand.w * 0.6), m);
    vAlpha = clamp(uAssemble * 1.6, 0.0, 1.0);
    vec4 mv = modelViewMatrix * vec4(q, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPointSize * (1.0 + arc * 0.5 + push * 0.6);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord * 2.0 - 1.0;
    float r = dot(c, c);
    if (r > 1.0) discard;
    gl_FragColor = vec4(vColor, vAlpha * (1.0 - smoothstep(0.55, 1.0, r)));
  }
`;

/* ── Shapes, sampled as point clouds ── */

type Sampler = () => [number, number, number];
const rand = (min: number, max: number) => min + Math.random() * (max - min);

function rect(cx: number, cy: number, w: number, h: number, z = 0): Sampler {
  return () => [cx + rand(-w / 2, w / 2), cy + rand(-h / 2, h / 2), z + rand(-0.04, 0.04)];
}
function outline(cx: number, cy: number, w: number, h: number, t: number): Sampler {
  return () => {
    const side = Math.random() * (2 * w + 2 * h);
    let x: number;
    let y: number;
    if (side < w) [x, y] = [cx - w / 2 + side, cy + h / 2];
    else if (side < 2 * w) [x, y] = [cx - w / 2 + side - w, cy - h / 2];
    else if (side < 2 * w + h) [x, y] = [cx - w / 2, cy - h / 2 + side - 2 * w];
    else [x, y] = [cx + w / 2, cy - h / 2 + side - 2 * w - h];
    return [x + rand(-t, t), y + rand(-t, t), rand(-0.03, 0.03)];
  };
}
function curve(ax: number, ay: number, bx: number, by: number, lift: number): Sampler {
  return () => {
    const t = Math.random();
    const mx = (ax + bx) / 2;
    const my = (ay + by) / 2 + lift;
    const x = (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * mx + t * t * bx;
    const y = (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * my + t * t * by;
    return [x + rand(-0.025, 0.025), y + rand(-0.025, 0.025), rand(-0.03, 0.03)];
  };
}
function triangle(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): Sampler {
  return () => {
    let u = Math.random();
    let v = Math.random();
    if (u + v > 1) [u, v] = [1 - u, 1 - v];
    return [ax + u * (bx - ax) + v * (cx - ax), ay + u * (by - ay) + v * (cy - ay), rand(0.02, 0.08)];
  };
}
function ring(cx: number, cy: number, r: number, t: number): Sampler {
  return () => {
    const a = Math.random() * Math.PI * 2;
    const rr = r + rand(-t, t);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, rand(-0.03, 0.03)];
  };
}

/* Each shape is a weighted mix of samplers, sized to the hero box (about ±2 by ±1.3). */
const SHAPES: Record<PortraitShape, [number, Sampler][]> = {
  operations: [
    [0.14, rect(-1.35, 0.45, 0.5, 0.5, 0.12)],
    [0.14, rect(-0.45, -0.4, 0.5, 0.5, 0.12)],
    [0.14, rect(0.45, 0.45, 0.5, 0.5, 0.12)],
    [0.14, rect(1.35, -0.4, 0.5, 0.5, 0.12)],
    [0.15, curve(-1.1, 0.4, -0.7, -0.35, 0.05)],
    [0.15, curve(-0.2, -0.35, 0.2, 0.4, -0.05)],
    [0.14, curve(0.7, 0.4, 1.1, -0.35, 0.05)],
  ],
  video: [
    [0.3, outline(0, 0.25, 2.6, 1.45, 0.035)],
    [0.28, triangle(-0.3, -0.12, -0.3, 0.62, 0.38, 0.25)],
    [0.1, rect(-0.95, -0.85, 0.62, 0.2)],
    [0.06, rect(-0.43, -0.85, 0.32, 0.2)],
    [0.12, rect(0.15, -0.85, 0.74, 0.2)],
    [0.09, rect(0.86, -0.85, 0.56, 0.2)],
    [0.05, rect(0.32, -0.85, 0.035, 0.42)],
  ],
  product: [
    [0.28, outline(0, 0.05, 2.8, 1.85, 0.035)],
    [0.06, rect(0, 0.78, 2.6, 0.08)],
    [0.08, rect(-1.05, -0.43, 0.24, 0.5)],
    [0.1, rect(-0.7, -0.33, 0.24, 0.7)],
    [0.09, rect(-0.35, -0.38, 0.24, 0.6)],
    [0.12, rect(0, -0.24, 0.24, 0.88)],
    [0.13, rect(0.35, -0.13, 0.24, 1.1)],
    [0.14, ring(0.98, 0.12, 0.3, 0.05)],
  ],
};

function sampleShape(shape: PortraitShape, count: number) {
  const parts = SHAPES[shape];
  const total = parts.reduce((sum, [w]) => sum + w, 0);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let pick = Math.random() * total;
    let sampler = parts[0][1];
    for (const [w, s] of parts) {
      pick -= w;
      if (pick <= 0) {
        sampler = s;
        break;
      }
    }
    out.set(sampler(), i * 3);
  }
  return out;
}

export function createPortrait(
  canvas: HTMLCanvasElement,
  { reducedMotion, image, photo }: { reducedMotion: boolean; image: HTMLImageElement; photo: HTMLElement },
): PortraitScene | null {
  const stage = createStage(canvas, { reducedMotion, fov: 20, distance: 10, lights: false });
  if (!stage) return null;

  /* ── Sample the photo ── */
  const sampler = document.createElement("canvas");
  sampler.width = sampler.height = GRID;
  const ctx = sampler.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(image, 0, 0, GRID, GRID);
  const pixels = ctx.getImageData(0, 0, GRID, GRID).data;

  const portrait: number[] = [];
  const colors: number[] = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const u = ((x + 0.5) / GRID) * 2 - 1;
      const v = 1 - ((y + 0.5) / GRID) * 2;
      if (u * u + v * v > 1) continue;
      const k = (y * GRID + x) * 4;
      const [r, g, b] = [pixels[k] / 255, pixels[k + 1] / 255, pixels[k + 2] / 255];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      portrait.push(u, v, (lum - 0.4) * 0.3);
      colors.push(r, g, b);
    }
  }
  const count = portrait.length / 3;

  const start = new Float32Array(count * 3);
  const random = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    const dir = new Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize().multiplyScalar(rand(1.8, 3.4));
    start.set([dir.x, dir.y, dir.z], i * 3);
    random.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
  }
  const shapes = Object.fromEntries(
    (Object.keys(SHAPES) as PortraitShape[]).map((s) => [s, new BufferAttribute(sampleShape(s, count), 3)]),
  ) as Record<PortraitShape, BufferAttribute>;

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(portrait), 3));
  geometry.setAttribute("aStart", new BufferAttribute(start, 3));
  geometry.setAttribute("aColor", new BufferAttribute(new Float32Array(colors), 3));
  geometry.setAttribute("aRand", new BufferAttribute(random, 4));
  geometry.setAttribute("aShape", shapes.operations);

  const uniforms = {
    uAssemble: { value: reducedMotion ? 1 : 0 },
    uMorph: { value: 0 },
    uTime: { value: 0 },
    uRepel: { value: 0 },
    uPointSize: { value: 3 },
    uPointer: { value: new Vector3(9, 9, 0) },
    uTone: { value: new Vector3(1, 1, 1) },
  };
  const material = new ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, transparent: true, depthWrite: false });
  const points = new Points(geometry, material);
  points.frustumCulled = false;
  stage.root.add(points);

  /* ── Keep 1 unit = the photo's radius in CSS px ── */
  let pxPerUnit = 100;
  stage.onResize((width, height) => {
    pxPerUnit = Math.max(1, photo.clientWidth / 2);
    const visibleHeight = height / pxPerUnit;
    stage.camera.position.z = visibleHeight / 2 / Math.tan((stage.camera.fov * Math.PI) / 360);
    stage.camera.updateProjectionMatrix();
    // Neighbouring particles overlap slightly so the portrait reads as solid.
    uniforms.uPointSize.value = ((2 / GRID) * pxPerUnit * 1.5) * Math.min(window.devicePixelRatio || 1, 2);
    void width;
  });

  /* ── Photo on top while the portrait is whole ── */
  const state = { photo: reducedMotion ? 1 : 0 };
  const setPhoto = () => gsap.set(photo, { autoAlpha: state.photo });
  setPhoto();
  let busy = false;
  let pending: PortraitShape | null = null;
  let hovering = false;
  let hoverCall: gsap.core.Tween | null = null;

  const showPhoto = (on: boolean, duration = 0.35) =>
    gsap.to(state, { photo: on ? 1 : 0, duration, ease: "power1.inOut", onUpdate: setPhoto, overwrite: true });

  stage.onFrame((_dt, time) => {
    uniforms.uTime.value = time;
    // The cloud turns with the pointer only while the photo is lifted away.
    const free = 1 - state.photo;
    stage.root.rotation.y = stage.pointer.x * 0.3 * free;
    stage.root.rotation.x = stage.pointer.y * 0.18 * free;

    const px = stage.pointerPx;
    if (px) {
      const wx = (px.x - stage.width() / 2) / pxPerUnit;
      const wy = -(px.y - stage.height() / 2) / pxPerUnit;
      uniforms.uPointer.value.set(wx, wy, 0);
      const over = wx * wx + wy * wy < 1.25;
      if (over !== hovering) setHover(over);
    } else if (hovering) setHover(false);
  });

  function setHover(on: boolean) {
    hovering = on;
    hoverCall?.kill();
    gsap.to(uniforms.uRepel, { value: on ? 1 : 0, duration: on ? 0.45 : 0.8, ease: "power2.out", overwrite: true });
    if (busy) return;
    if (on) showPhoto(false, 0.25);
    else hoverCall = gsap.delayedCall(0.7, () => !busy && !hovering && showPhoto(true));
  }

  function assemble() {
    if (reducedMotion) return;
    busy = true;
    gsap.timeline({
      onComplete: () => {
        busy = false;
        // A morph asked for while assembling plays straight on from here.
        if (pending) morph(pending);
      },
    })
      .fromTo(uniforms.uAssemble, { value: 0 }, { value: 1, duration: 2, ease: "power2.out" })
      .add(() => void (!hovering && !pending && showPhoto(true, 0.5)), "-=0.25");
  }

  function morph(shape: PortraitShape) {
    if (reducedMotion) return;
    if (busy) {
      pending = shape;
      return;
    }
    pending = null;
    busy = true;
    geometry.setAttribute("aShape", shapes[shape]);
    const [r, g, b] = readCssColor(TONE_TOKENS[shape], [0.5, 0.6, 1]);
    uniforms.uTone.value.set(r, g, b);
    showPhoto(false, 0.25);
    gsap.timeline({ onComplete: () => void (busy = false) })
      .to(uniforms.uMorph, { value: 1, duration: 1.15, ease: "power2.inOut" }, 0.15)
      .to(uniforms.uMorph, { value: 0, duration: 1.05, ease: "power2.inOut" }, "+=1.7")
      .add(() => void (!hovering && showPhoto(true, 0.4)), "-=0.2");
  }

  void stage.start();

  return {
    assemble,
    morph,
    refreshColors: () => stage!.requestRender(),
    dispose() {
      hoverCall?.kill();
      gsap.killTweensOf([state, uniforms.uAssemble, uniforms.uMorph, uniforms.uRepel]);
      stage!.dispose();
    },
  };
}
