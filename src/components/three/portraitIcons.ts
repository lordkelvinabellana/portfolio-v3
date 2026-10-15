import { Color, ExtrudeGeometry, Group, Mesh, MeshPhysicalMaterial, Vector3 } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { gsap } from "@/lib/gsap";
import { createStage } from "./stage";
import { TOOL_MARKS } from "./logos";

/*
 * The tools Kelvin works with, as glossy app-icon tiles that wait hidden
 * behind his back and fly out around his head and shoulders when the
 * portrait is hovered. The canvas sits between the backdrop and the cut-out
 * photo, so they really do come from behind him.
 *
 * Units: the portrait box is 2 wide and 2.5 tall, centred on the origin.
 */

export type PortraitIconsScene = {
  show: () => void;
  hide: () => void;
  peek: () => void;
  refreshColors: () => void;
  dispose: () => void;
};

const TILE = 0.4;
const SYMBOL_SIZE = 0.23;

/* Where each tile rests once it has popped out: an arc around the head and shoulders. */
const SPOTS = [
  new Vector3(-0.62, 1.12, 0.12),
  new Vector3(0.64, 1.1, 0.16),
  new Vector3(-1.13, 0.56, 0.3),
  new Vector3(1.15, 0.6, 0.26),
  new Vector3(-1.27, -0.18, 0.36),
  new Vector3(1.28, -0.12, 0.32),
  new Vector3(-1.13, -0.93, 0.24),
  new Vector3(1.15, -0.88, 0.28),
];
/* Behind his upper back, where every tile starts and returns. */
const BACK = new Vector3(0, -0.45, -0.8);

function markGeometry(path: string) {
  const data = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}"/></svg>`);
  const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
  const geometry = new ExtrudeGeometry(shapes, { depth: 2.2, bevelEnabled: true, bevelSize: 0.2, bevelThickness: 0.35, bevelSegments: 2, curveSegments: 10 });
  // SVG y runs down; centre on the grid and scale to the tile face.
  geometry.translate(-12, -12, 0);
  geometry.scale(SYMBOL_SIZE / 24, -SYMBOL_SIZE / 24, SYMBOL_SIZE / 24);
  return geometry;
}

export function createPortraitIcons(canvas: HTMLCanvasElement, { reducedMotion }: { reducedMotion: boolean }): PortraitIconsScene | null {
  // Neutral tone mapping keeps the brand colours true.
  const stage = createStage(canvas, { reducedMotion, fov: 28, distance: 10, neutral: true, light: 0.5 });
  if (!stage) return null;

  const tileGeometry = new RoundedBoxGeometry(TILE, TILE, 0.12, 5, 0.09);

  type Icon = { group: Group; spot: Vector3; phase: number };
  const icons: Icon[] = TOOL_MARKS.slice(0, SPOTS.length).map((mark, i) => {
    const group = new Group();
    // Saturated tiles: soft reflections, a little self-light so the brand colour holds in shade.
    const tile = new MeshPhysicalMaterial({
      color: mark.tile,
      roughness: 0.42,
      clearcoat: 0.35,
      clearcoatRoughness: 0.3,
      envMapIntensity: 0.6,
      emissive: new Color(mark.tile),
      emissiveIntensity: 0.22,
    });
    group.add(new Mesh(tileGeometry, tile));
    // Light marks glow a touch so they read crisply on the tile; dark marks stay matte.
    const light = new Color(mark.symbol).getHSL({ h: 0, s: 0, l: 0 }).l > 0.5;
    const symbol = new MeshPhysicalMaterial({
      color: mark.symbol,
      roughness: 0.28,
      envMapIntensity: 0.3,
      emissive: new Color(mark.symbol),
      emissiveIntensity: light ? 0.45 : 0,
    });
    const logo = new Mesh(markGeometry(mark.path), symbol);
    logo.position.z = 0.065;
    group.add(logo);
    group.position.copy(BACK);
    group.scale.setScalar(0.001);
    group.visible = false;
    stage.root.add(group);
    return { group, spot: SPOTS[i], phase: i * 1.3 };
  });

  /* ── Units: 1 = half the portrait box's width ── */
  stage.onResize((width, height) => {
    // The canvas overhangs the box by 35% on every side (see PortraitPop).
    const pxPerUnit = width / 1.7 / 2;
    const visibleHeight = height / pxPerUnit;
    stage.camera.position.z = visibleHeight / 2 / Math.tan((stage.camera.fov * Math.PI) / 360);
  });

  let out = false;
  stage.onFrame((_dt, time) => {
    icons.forEach((icon) => {
      if (!icon.group.visible) return;
      const lean = out ? 1 : 0;
      // Tiles turn towards the pointer and bob gently while they're out.
      icon.group.rotation.x += (stage.pointer.y * 0.45 * lean - icon.group.rotation.x) * 0.08;
      icon.group.rotation.y += (stage.pointer.x * 0.6 * lean - icon.group.rotation.y) * 0.08;
      if (out && !gsap.isTweening(icon.group.position)) {
        icon.group.position.y = icon.spot.y + Math.sin(time * 1.6 + icon.phase) * 0.035;
      }
    });
  });

  function show() {
    if (out) return;
    out = true;
    icons.forEach((icon, i) => {
      gsap.killTweensOf([icon.group.position, icon.group.scale]);
      icon.group.visible = true;
      if (reducedMotion) {
        icon.group.position.copy(icon.spot);
        icon.group.scale.setScalar(1);
        return;
      }
      const delay = i * 0.05;
      // Out from behind the back on a little arc, then a pop.
      gsap.to(icon.group.position, {
        keyframes: [
          { x: icon.spot.x * 0.55, y: icon.spot.y * 0.4 + 0.25, z: -0.3, duration: 0.28, ease: "power2.out" },
          { x: icon.spot.x, y: icon.spot.y, z: icon.spot.z, duration: 0.5, ease: "back.out(1.8)" },
        ],
        delay,
      });
      gsap.fromTo(icon.group.scale, { x: 0.15, y: 0.15, z: 0.15 }, { x: 1, y: 1, z: 1, duration: 0.7, ease: "back.out(2.2)", delay });
      gsap.fromTo(icon.group.rotation, { z: (i % 2 ? 1 : -1) * 0.8 }, { z: 0, duration: 0.9, ease: "elastic.out(1, 0.55)", delay });
    });
    if (reducedMotion) stage!.requestRender();
  }

  function hide() {
    if (!out) return;
    out = false;
    icons.forEach((icon, i) => {
      gsap.killTweensOf([icon.group.position, icon.group.scale]);
      if (reducedMotion) {
        icon.group.visible = false;
        return;
      }
      const delay = (icons.length - 1 - i) * 0.03;
      gsap.to(icon.group.position, { x: BACK.x, y: BACK.y, z: BACK.z, duration: 0.45, ease: "back.in(1.4)", delay });
      gsap.to(icon.group.scale, {
        x: 0.001,
        y: 0.001,
        z: 0.001,
        duration: 0.45,
        ease: "power2.in",
        delay,
        onComplete: () => void (icon.group.visible = false),
      });
    });
    if (reducedMotion) stage!.requestRender();
  }

  let peekCall: gsap.core.Tween | null = null;
  function peek() {
    if (reducedMotion) return;
    show();
    peekCall?.kill();
    peekCall = gsap.delayedCall(1.8, hide);
  }

  void stage.start();

  return {
    show: () => {
      peekCall?.kill();
      show();
    },
    hide,
    peek,
    // Brand colours don't change with the theme.
    refreshColors: () => stage!.requestRender(),
    dispose() {
      peekCall?.kill();
      icons.forEach((icon) => gsap.killTweensOf([icon.group.position, icon.group.scale, icon.group.rotation]));
      stage!.dispose();
    },
  };
}
