"use client";

import { useRef } from "react";
import Image from "next/image";
import { PortraitCloud } from "@/components/three/Scenes";

/* The About photo, assembled from particles when it scrolls into view; they scatter under the pointer. */
export function AboutPortrait() {
  const photoRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative mx-auto w-48 md:w-full">
      <PortraitCloud photoRef={photoRef} mode="about" className="-inset-[30%]" />
      <div ref={photoRef} className="panel relative overflow-hidden rounded-full p-1.5">
        <Image
          src="/assets/profile.jpg"
          alt="Lord Kelvin Abellana"
          width={224}
          height={224}
          className="block aspect-square w-full rounded-full object-cover object-top"
        />
      </div>
    </div>
  );
}
