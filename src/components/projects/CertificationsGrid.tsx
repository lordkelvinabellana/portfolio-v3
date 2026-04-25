import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { badges, certs } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";

export function CertificationsGrid() {
  return (
    <section className="mt-20">
      <FadeIn>
        <div className="mb-8 border-b border-border pb-5">
          <h2 className="text-2xl font-bold leading-tight">
            Certifications &amp; Badges
          </h2>
        </div>
      </FadeIn>

      {badges.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-4">
          {badges.map((badge, i) => (
            <FadeIn key={badge.title} delay={i * 80}>
              <a
                href={badge.link}
                target="_blank"
                rel="noopener noreferrer"
                className="panel panel-hover focusable group flex w-44 flex-col items-center gap-3 rounded-xl p-5 text-center no-underline"
              >
                <Image
                  src={badge.image}
                  alt={badge.title}
                  width={88}
                  height={88}
                  className="object-contain"
                />
                <p className="quiet-text text-center text-xs font-medium leading-tight">
                  {badge.title}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  View credential <ExternalLink className="h-3 w-3" strokeWidth={2} />
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {certs.map((cert, i) => (
          <FadeIn key={cert.title} delay={i * 80}>
            <article className="panel overflow-hidden rounded-xl">
              <div className="relative aspect-video">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="border-t border-border px-4 py-3">
                <p className="quiet-text text-[13px] font-medium">{cert.title}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
