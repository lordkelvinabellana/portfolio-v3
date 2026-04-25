import { Project } from "@/data/portfolio";
import { ImageCarousel } from "./ImageCarousel";

export function ProjectCard({ project }: { project: Project }) {
  const visibleStack = project.stack.slice(0, 5);
  const hiddenCount = Math.max(project.stack.length - visibleStack.length, 0);

  return (
    <article className="panel panel-hover flex h-full flex-col overflow-hidden rounded-xl">
      {project.images.length > 0 ? (
        <ImageCarousel images={project.images} title={project.title} />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-secondary">
          <span className="muted-text text-[11px] font-semibold uppercase tracking-[0.08em]">
            No preview
          </span>
        </div>
      )}

      <div className="flex-1 p-5 space-y-3">
        <div>
          <h2 className="text-base font-bold leading-6">
            {project.title}
          </h2>
          <p className="muted-text mt-1 text-[13px] font-medium">
            {project.role}
          </p>
        </div>

        <p className="quiet-text text-sm leading-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {visibleStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground"
            >
              {tech}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className="muted-text rounded-full bg-secondary px-2 py-1 text-xs font-semibold">
              +{hiddenCount}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
