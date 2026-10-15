"use client";

import { PortraitPop } from "@/components/home/PortraitPop";

/* The About photo: the hero's cut-out portrait, without the tool tiles (no room beside the text). */
export function AboutPortrait() {
  return (
    <div className="mx-auto w-48 md:w-full">
      <PortraitPop entrance="view" tools={false} />
    </div>
  );
}
