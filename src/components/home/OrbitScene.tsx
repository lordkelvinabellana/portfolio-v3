"use client";

import { useEffect, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Group,
  Mesh,
  PerspectiveCamera,
  Points,
  QuadraticBezierCurve3,
  Scene,
  ShaderMaterial,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { readCssColor, type Rgb } from "@/lib/css-color";
import { afterIntro } from "@/lib/intro";

/*
 * The hero's "system orbit": the three services as lanes circling the portrait.
 * Units are photo radii (the portrait is a circle of radius 1 at the origin).
 * Each lane carries a few items in flight; every couple of seconds one item
 * hands work to the next lane (an arc and a small ripple where it lands).
 */

export const ORBIT_LANES = [
  { label: "Product", radius: 1.5, speed: 0.3, nodes: 2, dashes: 0 },
  { label: "Operations", radius: 1.95, speed: -0.21, nodes: 3, dashes: 120 },
  { label: "Video", radius: 2.4, speed: 0.14, nodes: 2, dashes: 0 },
] as const;

/* Share of the box width taken by the portrait (must match the CSS in HeroSection). */
export const PHOTO_SHARE = 0.4;
/* The canvas overhangs the box so halos and arcs never clip. */
const OVERHANG_X = 0.12;
const OVERHANG_Y = 0.26;

const TILT = 0.9; // radians the orbital plane leans back once settled
const FOV = 20;
const LABEL_ANGLES = [-0.42, -0.6, -0.76];
const TAU = Math.PI * 2;

const laneVertex = /* glsl */ `
  varying float vAngle;
  varying float vDepth;
  void main() {
    vAngle = uv.x * 6.28318530718;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const laneFragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform float uOpacity;
  uniform float uProgress;
  uniform float uDashes;
  uniform float uNodes[4];
  uniform int uCount;
  uniform float uDir;
  uniform float uTrail;
  uniform float uOffset;
  uniform vec2 uDepth;
  varying float vAngle;
  varying float vDepth;
  const float TAU = 6.28318530718;
  void main() {
    if (vAngle > uProgress * TAU) discard;
    float glow = 0.0;
    for (int i = 0; i < 4; i++) {
      if (i >= uCount) break;
      float d = mod((uNodes[i] - vAngle - uOffset) * uDir, TAU);
      glow = max(glow, exp(-d / uTrail) * step(d, uTrail * 7.0));
    }
    float dash = uDashes > 0.0 ? step(0.45, fract(vAngle / TAU * uDashes)) : 1.0;
    float depth = 1.0 - smoothstep(uDepth.x, uDepth.y, vDepth) * 0.62;
    float alpha = max(uOpacity * dash, glow * 0.9) * depth;
    vec3 color = mix(uBase, uAccent, clamp(glow * 1.6, 0.0, 1.0));
    gl_FragColor = vec4(color, alpha);
  }
`;

const pointVertex = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  uniform float uDpr;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uDpr;
    vAlpha = aAlpha;
  }
`;

const pointFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;
    float core = 1.0 - smoothstep(0.22, 0.3, r);
    float halo = exp(-r * r * 6.0) * 0.32;
    gl_FragColor = vec4(uColor, max(core, halo) * vAlpha);
  }
`;

const arcFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uHead;
  uniform float uTail;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    if (vUv.x > uHead || vUv.x < uTail) discard;
    float t = smoothstep(uTail, uHead, vUv.x);
    gl_FragColor = vec4(uColor, (0.15 + 0.85 * t) * uOpacity);
  }
`;

const arcVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export function OrbitScene({ onReady }: { onReady?: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const readyRef = useRef(onReady);

  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // No WebGL: the portrait stands on its own.
    }

    const reduced = prefersReducedMotion();
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    wrap.prepend(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
    const pivot = new Group(); // pointer parallax (yaw)
    const plane = new Group(); // the orbital plane (tilt)
    pivot.add(plane);
    scene.add(pivot);

    const colors = { base: [1, 1, 1] as Rgb, accent: [0.4, 0.55, 1] as Rgb };
    const depthRange = { value: [8, 12] };

    /* ── Lanes ── */
    const lanes = ORBIT_LANES.map((lane, index) => {
      const geometry = new TorusGeometry(lane.radius, 0.011, 8, 640);
      const nodeAngles = Array.from(
        { length: 4 },
        (_, i) => (i / lane.nodes) * TAU + index * 1.3,
      );
      const material = new ShaderMaterial({
        vertexShader: laneVertex,
        fragmentShader: laneFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uBase: { value: colors.base },
          uAccent: { value: colors.accent },
          uOpacity: { value: 0.2 },
          uProgress: { value: reduced ? 1 : 0 },
          uDashes: { value: lane.dashes },
          uNodes: { value: nodeAngles },
          uCount: { value: lane.nodes },
          uDir: { value: Math.sign(lane.speed) },
          uTrail: { value: 0.32 },
          uOffset: { value: 0 },
          uDepth: depthRange,
        },
      });
      const mesh = new Mesh(geometry, material);
      plane.add(mesh);
      return { ...lane, mesh, geometry, material, nodeAngles };
    });

    /* ── Items in flight (one Points cloud for every lane) ── */
    const nodeCount = lanes.reduce((sum, lane) => sum + lane.nodes, 0);
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeSizes = new Float32Array(nodeCount).fill(24);
    const nodeAlphas = new Float32Array(nodeCount).fill(reduced ? 1 : 0);
    const nodeGeometry = new BufferGeometry();
    nodeGeometry.setAttribute("position", new BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute("aSize", new BufferAttribute(nodeSizes, 1));
    nodeGeometry.setAttribute("aAlpha", new BufferAttribute(nodeAlphas, 1));
    const pointMaterial = new ShaderMaterial({
      vertexShader: pointVertex,
      fragmentShader: pointFragment,
      transparent: true,
      depthWrite: false,
      uniforms: { uColor: { value: colors.accent }, uDpr: { value: dpr } },
    });
    const nodes = new Points(nodeGeometry, pointMaterial);
    nodes.frustumCulled = false;
    plane.add(nodes);

    const state = { flow: reduced ? 1 : 0, nodeAlpha: reduced ? 1 : 0, tilt: reduced ? TILT : 0, scrollTilt: 0, yaw: 0, pitch: 0, labels: reduced ? 1 : 0 };

    function placeNodes() {
      let k = 0;
      for (const lane of lanes) {
        for (let i = 0; i < lane.nodes; i++, k++) {
          const a = lane.nodeAngles[i];
          nodePositions[k * 3] = Math.cos(a) * lane.radius;
          nodePositions[k * 3 + 1] = Math.sin(a) * lane.radius;
          nodePositions[k * 3 + 2] = 0;
          nodeAlphas[k] = state.nodeAlpha;
        }
      }
      nodeGeometry.attributes.position.needsUpdate = true;
      nodeGeometry.attributes.aAlpha.needsUpdate = true;
    }

    /* ── Handoffs between lanes ── */
    const live = new Set<{ dispose: () => void }>();

    function handoff() {
      if (document.hidden || !visible) return;
      const from = gsap.utils.random(0, lanes.length - 1, 1);
      const to = from === lanes.length - 1 ? from - 1 : from === 0 ? 1 : from + (Math.random() < 0.5 ? -1 : 1);
      const source = lanes[from];
      const angle = source.nodeAngles[gsap.utils.random(0, source.nodes - 1, 1)];
      const landing = angle + Math.sign(source.speed) * 0.35;
      const start = new Vector3(Math.cos(angle) * source.radius, Math.sin(angle) * source.radius, 0);
      const end = new Vector3(Math.cos(landing) * lanes[to].radius, Math.sin(landing) * lanes[to].radius, 0);
      const control = start.clone().add(end).multiplyScalar(0.5).setZ(0.45);
      const curve = new QuadraticBezierCurve3(start, control, end);

      const geometry = new TubeGeometry(curve, 64, 0.007, 6, false);
      const material = new ShaderMaterial({
        vertexShader: arcVertex,
        fragmentShader: arcFragment,
        transparent: true,
        depthWrite: false,
        uniforms: { uColor: { value: colors.accent }, uHead: { value: 0 }, uTail: { value: 0 }, uOpacity: { value: 0.9 } },
      });
      const arc = new Mesh(geometry, material);
      plane.add(arc);

      const packetGeometry = new BufferGeometry();
      const packetPosition = new Float32Array(3);
      packetGeometry.setAttribute("position", new BufferAttribute(packetPosition, 3));
      packetGeometry.setAttribute("aSize", new BufferAttribute(new Float32Array([18]), 1));
      packetGeometry.setAttribute("aAlpha", new BufferAttribute(new Float32Array([1]), 1));
      const packet = new Points(packetGeometry, pointMaterial);
      packet.frustumCulled = false;
      plane.add(packet);

      const ripple = new Mesh(new TorusGeometry(1, 0.06, 6, 96), new ShaderMaterial({
        vertexShader: arcVertex,
        fragmentShader: arcFragment,
        transparent: true,
        depthWrite: false,
        uniforms: { uColor: { value: colors.accent }, uHead: { value: 1 }, uTail: { value: 0 }, uOpacity: { value: 0 } },
      }));
      ripple.position.copy(end);
      ripple.scale.setScalar(0.02);
      plane.add(ripple);

      const item = {
        dispose() {
          tl.kill();
          plane.remove(arc, packet, ripple);
          geometry.dispose();
          material.dispose();
          packetGeometry.dispose();
          ripple.geometry.dispose();
          ripple.material.dispose();
          live.delete(item);
        },
      };
      live.add(item);

      const head = { t: 0 };
      const point = new Vector3();
      const tl = gsap.timeline({ onComplete: () => item.dispose() });
      tl.to(head, {
        t: 1,
        duration: 0.9,
        ease: "power2.inOut",
        onUpdate: () => {
          material.uniforms.uHead.value = head.t;
          curve.getPoint(head.t, point);
          packetPosition[0] = point.x;
          packetPosition[1] = point.y;
          packetPosition[2] = point.z;
          packetGeometry.attributes.position.needsUpdate = true;
        },
      })
        .to(material.uniforms.uTail, { value: 1, duration: 0.7, ease: "power2.in" }, 0.35)
        .set(packet, { visible: false }, 0.9)
        .to(ripple.scale, { x: 0.22, y: 0.22, z: 0.22, duration: 0.9, ease: "expo.out" }, 0.86)
        .fromTo(ripple.material.uniforms.uOpacity, { value: 0.85 }, { value: 0, duration: 0.9, ease: "power1.out" }, 0.86);
    }

    let handoffCall: gsap.core.Tween | null = null;
    function scheduleHandoff(delay: number) {
      handoffCall = gsap.delayedCall(delay, () => {
        handoff();
        scheduleHandoff(gsap.utils.random(1.1, 2.1));
      });
    }

    /* ── Colours follow the theme tokens ── */
    function syncColors() {
      colors.base.splice(0, 3, ...readCssColor("--foreground", [1, 1, 1]));
      colors.accent.splice(0, 3, ...readCssColor("--primary", [0.4, 0.55, 1]));
      lanes.forEach((lane, i) => {
        lane.material.uniforms.uOpacity.value = i === activeLane ? ACTIVE_OPACITY : laneOpacity();
      });
      requestRender();
    }

    /* ── The hero showcase lights the lane of the card that's playing ── */
    let activeLane = -1;
    const ACTIVE_OPACITY = 0.9;
    const laneOpacity = () => (document.documentElement.classList.contains("dark") ? 0.3 : 0.34);
    function highlight(event: Event) {
      const name = (event as CustomEvent<{ lane?: string }>).detail?.lane;
      activeLane = lanes.findIndex((lane) => lane.label === name);
      lanes.forEach((lane, i) => {
        const on = i === activeLane;
        gsap.to(lane.material.uniforms.uOpacity, {
          value: on ? ACTIVE_OPACITY : laneOpacity(),
          duration: 0.6,
          ease: "power2.out",
          onUpdate: () => {
            needsRender = true;
          },
        });
        gsap.to(lane.material.uniforms.uTrail, { value: on ? 0.7 : 0.32, duration: 0.6, ease: "power2.out" });
        labelRefs.current[i]?.classList.toggle("is-active", on);
      });
    }

    /* ── Sizing: keep 1 world unit = 1 portrait radius in CSS px ── */
    let width = 1;
    let height = 1;
    function resize() {
      width = Math.max(1, wrap!.clientWidth);
      height = Math.max(1, wrap!.clientHeight);
      renderer.setSize(width, height, false);
      const boxWidth = width / (1 + OVERHANG_X * 2);
      const radiusPx = (boxWidth * PHOTO_SHARE) / 2;
      const distance = height / radiusPx / (2 * Math.tan((FOV * Math.PI) / 360));
      camera.aspect = width / height;
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      depthRange.value = [distance - 2.4, distance + 2.4];
      requestRender();
    }

    /* ── Frame ── */
    const projected = new Vector3();
    function updateLabels() {
      lanes.forEach((lane, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        const a = LABEL_ANGLES[i];
        projected.set(Math.cos(a) * lane.radius, Math.sin(a) * lane.radius, 0);
        projected.applyMatrix4(plane.matrixWorld).project(camera);
        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        el.style.opacity = String(state.labels);
      });
    }

    function render() {
      plane.rotation.x = -(state.tilt + state.scrollTilt + state.pitch);
      pivot.rotation.y = state.yaw;
      for (const lane of lanes) lane.material.uniforms.uNodes.value = lane.nodeAngles;
      placeNodes();
      scene.updateMatrixWorld();
      updateLabels();
      renderer.render(scene, camera);
    }

    let needsRender = true;
    function requestRender() {
      needsRender = true;
      if (reduced) render();
    }

    let visible = true;
    function tick(_time: number, deltaMs: number) {
      if (!visible || document.hidden) return;
      const dt = Math.min(deltaMs, 50) / 1000;
      if (state.flow > 0) {
        for (const lane of lanes) {
          for (let i = 0; i < lane.nodes; i++) {
            lane.nodeAngles[i] = (lane.nodeAngles[i] + lane.speed * state.flow * dt + TAU) % TAU;
          }
        }
        needsRender = true;
      }
      if (needsRender || live.size > 0) {
        render();
        needsRender = false;
      }
    }

    syncColors();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    window.addEventListener("hero:service", highlight);

    const themeObserver = new MutationObserver(syncColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    const ctx = gsap.context(() => {});
    let cancelDrawIn = () => {};
    let onPointer: ((e: PointerEvent) => void) | null = null;

    if (reduced) {
      render();
      readyRef.current?.();
    } else {
      gsap.ticker.add(tick);
      // The orbit draws itself in once the chat bot's intro (if any) lets go.
      ctx.add("drawIn", () => {
        const intro = gsap.timeline({ defaults: { ease: "power2.inOut" }, onStart: () => readyRef.current?.() });
        lanes.forEach((lane, i) => {
          // Each lane starts drawing from a different point; trails stay on their items.
          lane.mesh.rotation.z = 2.2 + i * 0.9;
          lane.material.uniforms.uOffset.value = lane.mesh.rotation.z;
          intro.to(lane.material.uniforms.uProgress, { value: 1, duration: 1.3, ease: "power3.inOut", onUpdate: () => { needsRender = true; } }, 0.15 + i * 0.14);
        });
        intro
          .to(state, { tilt: TILT, duration: 1.6, ease: "expo.inOut", onUpdate: () => { needsRender = true; } }, 0.95)
          .to(state, { nodeAlpha: 1, duration: 0.6, ease: "power1.out" }, 1.45)
          .to(state, { flow: 1, duration: 1.8, ease: "power2.in" }, 1.45)
          .to(state, { labels: 1, duration: 0.8, ease: "power1.out" }, 2.1)
          .add(() => scheduleHandoff(0.2), 2.5);
      });
      cancelDrawIn = afterIntro(() => (ctx as unknown as { drawIn: () => void }).drawIn());

      ctx.add(() => {
        ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            state.scrollTilt = self.progress * 0.38;
            needsRender = true;
          },
        });

        if (finePointer) {
          const yawTo = gsap.quickTo(state, "yaw", { duration: 1.2, ease: "power3.out", onUpdate: () => { needsRender = true; } });
          const pitchTo = gsap.quickTo(state, "pitch", { duration: 1.2, ease: "power3.out" });
          onPointer = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            yawTo(nx * 0.16);
            pitchTo(ny * 0.07);
          };
          window.addEventListener("pointermove", onPointer, { passive: true });
        }
      });
    }

    return () => {
      cancelDrawIn();
      window.removeEventListener("hero:service", highlight);
      ctx.revert();
      handoffCall?.kill();
      gsap.ticker.remove(tick);
      if (onPointer) window.removeEventListener("pointermove", onPointer);
      [...live].forEach((item) => item.dispose());
      resizeObserver.disconnect();
      themeObserver.disconnect();
      io.disconnect();
      for (const lane of lanes) {
        lane.geometry.dispose();
        lane.material.dispose();
      }
      nodeGeometry.dispose();
      pointMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        inset: `-${OVERHANG_Y * 100}% -${OVERHANG_X * 100}%`,
      }}
    >
      {ORBIT_LANES.map((lane, i) => (
        <span
          key={lane.label}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className="orbit-label"
          style={{ opacity: 0 }}
        >
          {lane.label}
        </span>
      ))}
    </div>
  );
}
