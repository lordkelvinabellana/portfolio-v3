import {
  AdditiveBlending,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  SRGBColorSpace,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import { gsap } from "@/lib/gsap";
import { readCssColor } from "@/lib/css-color";
import { createStage } from "./stage";

/*
 * The career as a path through space: it draws itself from the oldest role
 * on the left to today on the right, and each role pops in as a node coloured
 * by its kind of work. Current roles glow; a light keeps travelling the path.
 * On a role's own page that node is singled out.
 */

export type CareerKind = "operations" | "video" | "product";
export type CareerPathScene = { refreshColors: () => void; dispose: () => void };

const TONE_TOKENS: Record<CareerKind, string> = { operations: "--teal-fg", video: "--coral-fg", product: "--violet-fg" };

function glowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function createCareerPath(
  canvas: HTMLCanvasElement,
  {
    reducedMotion,
    roles,
    highlight = null,
  }: { reducedMotion: boolean; roles: { kind: CareerKind; current: boolean }[]; highlight?: number | null },
): CareerPathScene | null {
  const stage = createStage(canvas, { reducedMotion, fov: 30, distance: 9.5 });
  if (!stage) return null;
  const { root } = stage;

  // Fit the path (about 6.8 by 1.8 units) to the canvas, whatever its shape.
  stage.onResize((width, height) => {
    const visibleHeight = 2 * 9.5 * Math.tan((15 * Math.PI) / 180);
    const visibleWidth = (visibleHeight * width) / height;
    root.scale.setScalar(Math.min((visibleWidth * 0.86) / 6.8, (visibleHeight * 0.8) / 1.8));
  });

  const curve = new CatmullRomCurve3([
    new Vector3(-3.4, -0.75, 0),
    new Vector3(-2.1, 0.15, -0.6),
    new Vector3(-0.8, -0.35, 0.35),
    new Vector3(0.5, 0.45, -0.4),
    new Vector3(1.8, -0.05, 0.3),
    new Vector3(3.4, 0.8, 0),
  ]);
  const SEGMENTS = 360;
  const RADIAL = 8;
  const tubeGeo = new TubeGeometry(curve, SEGMENTS, 0.026, RADIAL, false);
  const tubeMaterial = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, toneMapped: false });
  const tube = new Mesh(tubeGeo, tubeMaterial);
  root.add(tube);
  const fullCount = tubeGeo.index!.count;
  tubeGeo.setDrawRange(0, 0);

  const shell = new MeshPhysicalMaterial({ color: 0xeef1f7, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.16 });
  const ringMaterials = Object.fromEntries(
    (["operations", "video", "product"] as CareerKind[]).map((k) => [k, new MeshBasicMaterial({ color: 0xffffff, toneMapped: false })]),
  ) as Record<CareerKind, MeshBasicMaterial>;
  const glowMap = glowTexture();
  const nodeGeo = new SphereGeometry(0.12, 24, 16);
  const ringGeo = new TorusGeometry(0.2, 0.02, 10, 48);

  // Oldest role on the left, today on the right.
  const count = roles.length;
  const nodes = roles.map((role, i) => {
    const t = count === 1 ? 1 : (count - 1 - i) / (count - 1);
    const node = new Group();
    node.position.copy(curve.getPointAt(0.04 + t * 0.92));
    node.add(new Mesh(nodeGeo, shell));
    const ring = new Mesh(ringGeo, ringMaterials[role.kind]);
    node.add(ring);
    let halo: Sprite | null = null;
    if (role.current || highlight === i) {
      halo = new Sprite(new SpriteMaterial({ map: glowMap, color: 0xffffff, blending: AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.55 }));
      halo.scale.setScalar(highlight === i ? 1.3 : 0.8);
      node.add(halo);
    }
    const size = highlight === null ? 1 : highlight === i ? 1.7 : 0.75;
    node.userData = { t: 0.04 + t * 0.92, size, ring, halo, kind: role.kind };
    node.scale.setScalar(reducedMotion ? size : 0.001);
    root.add(node);
    return node;
  });

  const traveller = new Sprite(new SpriteMaterial({ map: glowMap, color: 0xffffff, blending: AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.9 }));
  traveller.scale.setScalar(0.55);
  traveller.visible = false;
  root.add(traveller);

  /* ── Drawing in ── */
  const progress = { value: reducedMotion ? 1 : 0 };
  const popped = new Set<number>();
  const drawTo = () => {
    tubeGeo.setDrawRange(0, Math.floor((fullCount * progress.value) / (RADIAL * 6)) * RADIAL * 6);
    nodes.forEach((node, i) => {
      if (popped.has(i) || progress.value < node.userData.t) return;
      popped.add(i);
      gsap.to(node.scale, { x: node.userData.size, y: node.userData.size, z: node.userData.size, duration: 0.6, ease: "back.out(2.4)" });
    });
  };
  if (reducedMotion) drawTo();
  else gsap.to(progress, { value: 1, duration: 2.4, ease: "power2.inOut", delay: 0.2, onUpdate: drawTo, onComplete: () => void (traveller.visible = true) });

  stage.onFrame((_dt, time) => {
    root.rotation.y = Math.sin(time * 0.3) * 0.12 + stage.pointer.x * 0.22;
    root.rotation.x = -0.18 + stage.pointer.y * 0.12;
    if (traveller.visible) traveller.position.copy(curve.getPointAt((time * 0.12) % 1));
    nodes.forEach((node, i) => {
      node.userData.ring.rotation.y = time * (highlight === i ? 1.6 : 0.6) + i;
      if (node.userData.halo) node.userData.halo.material.opacity = 0.4 + 0.25 * Math.sin(time * 2.2 + i);
    });
  });

  function refreshColors() {
    (Object.keys(ringMaterials) as CareerKind[]).forEach((k) => {
      ringMaterials[k].color.setRGB(...readCssColor(TONE_TOKENS[k], [0.5, 0.6, 1]), SRGBColorSpace);
    });
    const primary = new Color().setRGB(...readCssColor("--primary", [0.31, 0.49, 1]), SRGBColorSpace);
    tubeMaterial.color.copy(primary);
    traveller.material.color.copy(primary).lerp(new Color(0xffffff), 0.3);
    nodes.forEach((node) => {
      const halo = node.userData.halo as Sprite | null;
      halo?.material.color.copy(ringMaterials[node.userData.kind as CareerKind].color);
    });
    stage!.requestRender();
  }
  refreshColors();
  void stage.start();

  return {
    refreshColors,
    dispose() {
      gsap.killTweensOf([progress, ...nodes.map((n) => n.scale)]);
      glowMap.dispose();
      stage!.dispose();
    },
  };
}
