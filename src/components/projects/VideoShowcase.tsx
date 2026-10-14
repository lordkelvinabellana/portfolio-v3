import type { ProjectVideo } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/* Full players for a case study page: wide pieces first, vertical pieces in a row. */
export function VideoShowcase({ videos }: { videos: ProjectVideo[] }) {
  const landscape = videos.filter((v) => v.orientation === "landscape");
  const portrait = videos.filter((v) => v.orientation === "portrait");

  return (
    <div className="space-y-6">
      {landscape.length > 0 && (
        <div className={cn("grid gap-4", landscape.length > 1 && "md:grid-cols-2")}>
          {landscape.map((video, i) => (
            <VideoFigure
              key={video.src}
              video={video}
              className={cn(landscape.length % 2 === 1 && i === 0 && landscape.length > 1 && "md:col-span-2")}
            />
          ))}
        </div>
      )}
      {portrait.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {portrait.map((video) => (
            <VideoFigure key={video.src} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

function VideoFigure({ video, className }: { video: ProjectVideo; className?: string }) {
  return (
    <figure className={cn("space-y-2", className)}>
      <div
        className={cn(
          "panel overflow-hidden rounded-xl",
          video.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video",
        )}
      >
        <video
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="none"
          className="h-full w-full bg-secondary object-cover"
        >
          {video.title}
        </video>
      </div>
      <figcaption className="text-sm">
        <span className="font-semibold">{video.title}</span>
        {video.note && <span className="muted-text block text-xs leading-5">{video.note}</span>}
      </figcaption>
    </figure>
  );
}
