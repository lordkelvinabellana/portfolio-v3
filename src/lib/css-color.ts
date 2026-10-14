"use client";

export type Rgb = [number, number, number];

/* Resolves any CSS colour (the tokens are oklch) to sRGB bytes via a 1px canvas. */
export function readCssColor(variable: string, fallback: Rgb): Rgb {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  if (!value) return fallback;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return fallback;
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}
