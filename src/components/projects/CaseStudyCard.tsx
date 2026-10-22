"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProjectCaseStudy } from "@/data/portfolio";
import { serviceColor, serviceLabel } from "@/data/services";
import { VideoTile } from "./VideoTile";
import { FlowDiagram } from "./FlowDiagram";
import { cn } from "@/lib/utils";

/* One card for every case study: a screenshot, a video preview, or the
   system's flow, then what changed. */
export function CaseStudyCard({
  project,
  basePath = "/work",
  size = "default",
}: {
  project: ProjectCaseStudy;
  basePath?: string;
  size?: "default" | "large";
}) {
  const [hovered, setHovered] = useState(false);
  const shot = project.screenshots[0];
  const video = project.videos?.[0];

  return (
    <Link
      href={`${basePath}/${project.slug}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="panel panel-hover focusable group flex h-full flex-col overflow-hidden rounded-xl no-underline"
    >
      <div className={cn("relative w-full overflow-hidden border-b border-border bg-secondary", size === "large" ? "aspect-[16/10]" : "aspect-video")}>
        {shot ? (
          <Image
            src={shot}
            alt=""
            fill
            sizes={size === "large" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : video ? (
          <VideoTile video={video} active={hovered} className="h-full w-full" />
        ) : project.flow?.length ? (
          <div className="flex h-full items-center px-6 py-5">
            <FlowDiagram steps={project.flow} layout="vertical" active={hovered} />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="muted-text text-xs font-semibold">Case study</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold" style={{ color: serviceColor(project) }}>
            {serviceLabel(project)}
          </span>
          {project.status && (
            <span className="rounded-full bg-secondary px-2 py-px text-xs font-medium text-muted-foreground">
              {project.status}
            </span>
          )}
        </div>
        <h3 className={cn("font-semibold leading-snug", size === "large" ? "text-xl" : "text-base")}>
          {project.title}
        </h3>
        <p className="quiet-text line-clamp-3 flex-1 text-sm leading-6">{project.outcomes[0]}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Read case study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
