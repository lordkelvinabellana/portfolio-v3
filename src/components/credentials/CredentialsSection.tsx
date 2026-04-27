import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { credentials, type Credential } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

/* ── helpers ── */

const byType = (type: Credential["type"]) =>
  credentials.filter((c) => c.type === type);

const featured = credentials.find((c) => c.slug === "finops-certified-practitioner")!;
const training = byType("Training");
const recognition = byType("Recognition");

/* ── Featured credential (FinOps) ── */

function FeaturedCredential({ credential }: { credential: Credential }) {
  const inner = (
    <div className={`panel rounded-2xl p-6 md:p-8${credential.verificationUrl ? " panel-hover" : ""}`}>
      <p className="eyebrow mb-6">Industry certification</p>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        {credential.image && (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-secondary p-3 md:h-28 md:w-28">
            <Image
              src={credential.image}
              alt={credential.title}
              width={96}
              height={96}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-xl font-bold leading-tight md:text-2xl">{credential.title}</h2>
          <p className="muted-text mt-1 font-semibold">{credential.issuer}</p>
          <p className="quiet-text mt-4 max-w-[60ch] text-base leading-7">{credential.context}</p>
          {credential.verificationUrl && (
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Verify on Credly <ExternalLink className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (!credential.verificationUrl) return inner;

  return (
    <a
      href={credential.verificationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="focusable block rounded-2xl no-underline"
    >
      {inner}
    </a>
  );
}

/* ── Training card ── */

function TrainingCard({ credential }: { credential: Credential }) {
  return (
    <article className="panel flex h-full flex-col overflow-hidden rounded-xl">
      {credential.image && (
        <div className="relative aspect-video w-full overflow-hidden bg-secondary">
          <Image
            src={credential.image}
            alt={credential.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="eyebrow">{credential.type}</p>
        <h3 className="font-bold leading-snug">{credential.title}</h3>
        <p className="muted-text text-sm font-medium">{credential.issuer}</p>
        <p className="quiet-text mt-1 flex-1 text-sm leading-6">{credential.context}</p>
      </div>
    </article>
  );
}

/* ── Recognition card ── */

function RecognitionCard({ credential }: { credential: Credential }) {
  return (
    <article className="panel rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="eyebrow mb-2">{credential.type}</p>
          <h3 className="font-bold leading-snug">{credential.title}</h3>
          <p className="muted-text mt-1 text-sm font-medium">
            {credential.issuer}
            {credential.dateEarned ? ` · ${credential.dateEarned}` : ""}
          </p>
          <p className="quiet-text mt-3 text-sm leading-6">{credential.context}</p>
        </div>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg"
          aria-hidden="true"
        >
          🏆
        </div>
      </div>
    </article>
  );
}

/* ── Page ── */

export function CredentialsSection() {
  return (
    <section className="site-page">
      <div className="site-container space-y-16">

        <Breadcrumb
          items={[
            { label: "Portfolio", href: "/portfolio" },
            { label: "Credentials", href: "/portfolio/credentials" },
          ]}
        />

        {/* Header */}
        <FadeIn>
          <header className="max-w-2xl">
            <p className="eyebrow mb-3">Credentials</p>
            <h1 className="section-heading">
              Certifications, training, and recognition.
            </h1>
            <p className="quiet-text mt-5 text-lg leading-8">
              A compact record of the credentials and milestones that support my
              frontend, SaaS, cloud cost, and startup work.
            </p>
          </header>
        </FadeIn>

        {/* Featured — FinOps */}
        <FadeIn delay={60} spring>
          <FeaturedCredential credential={featured} />
        </FadeIn>

        {/* Training */}
        {training.length > 0 && (
          <section>
            <FadeIn>
              <p className="eyebrow mb-6">Training</p>
            </FadeIn>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {training.map((credential, i) => (
                <FadeIn key={credential.slug} delay={i * 60} spring>
                  <TrainingCard credential={credential} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {/* Recognition */}
        {recognition.length > 0 && (
          <section>
            <FadeIn>
              <p className="eyebrow mb-6">Recognition</p>
            </FadeIn>
            <div className="grid gap-4 md:grid-cols-2">
              {recognition.map((credential, i) => (
                <FadeIn key={credential.slug} delay={i * 60}>
                  <RecognitionCard credential={credential} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

      </div>
    </section>
  );
}
