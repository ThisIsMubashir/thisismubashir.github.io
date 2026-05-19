import Link from 'next/link';
import { ArrowRight, BookOpen, FlaskConical, GraduationCap, Users } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/project-card';
import { PublicationEntry } from '@/components/publication-entry';
import { getProjects, getPublications } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Home',
  description: siteConfig.description,
  path: '/',
});

export default async function HomePage() {
  const [publications, projects] = await Promise.all([getPublications(), getProjects()]);

  // Featured first; fall back to most-recent if fewer than 3 are flagged.
  const featuredPubs = [...publications.filter((p) => p.featured), ...publications.filter((p) => !p.featured)].slice(0, 3);
  const featuredProjects = [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ].slice(0, 3);

  return (
    <>
      <section className="py-10 sm:py-section">
        <p className="font-mono text-xs uppercase tracking-wider text-brand-700 dark:text-brand-300">
          {siteConfig.tagline}
        </p>
        <h1 className="mt-4 text-balance text-4xl tracking-tightish sm:text-5xl">
          Hi, I&apos;m Dr.&nbsp;Mubashir Hussain.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-pretty text-ink-700 dark:text-ink-200">
          I teach, supervise, and research at the intersection of computer engineering and
          education. My PhD work focused on detecting hardware Trojans in network-on-chip systems;
          today I explore cyber-physical systems for healthcare, game-based learning, and AI in
          higher education.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/publications/">
            <Button variant="primary">
              <BookOpen className="h-4 w-4" /> Publications
            </Button>
          </Link>
          <Link href="/projects/">
            <Button variant="secondary">
              <FlaskConical className="h-4 w-4" /> Projects
            </Button>
          </Link>
          <Link href="/contact/">
            <Button variant="ghost">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-6 border-t border-ink-100 py-12 sm:grid-cols-3 dark:border-ink-800">
        <Currently
          icon={<GraduationCap className="h-5 w-5" />}
          label="Now"
          title="Teaching Fellow"
          detail="University of Strathclyde, Bahrain campus"
        />
        <Currently
          icon={<Users className="h-5 w-5" />}
          label="Supervising"
          title="Industry-linked capstones"
          detail="UG and PG projects from proposal to delivery"
        />
        <Currently
          icon={<FlaskConical className="h-5 w-5" />}
          label="Researching"
          title="Cyber-physical systems"
          detail="Healthcare, game-based learning, AI in HE"
        />
      </section>

      {featuredProjects.length > 0 && (
        <section className="border-t border-ink-100 py-12 dark:border-ink-800">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl">Selected projects</h2>
            <Link
              href="/projects/"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <ProjectCard
                  title={p.title}
                  slug={p.slug}
                  summary={p.summary}
                  tags={p.tags}
                  endDate={p.endDate ?? undefined}
                  repoUrl={p.repoUrl}
                  demoUrl={p.demoUrl}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {featuredPubs.length > 0 && (
        <section className="border-t border-ink-100 py-12 dark:border-ink-800">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl">Selected publications</h2>
            <Link
              href="/publications/"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300"
            >
              All publications <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="divide-y divide-ink-100 dark:divide-ink-800">
            {featuredPubs.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/publications/${p.slug}/`}
                  className="block no-underline hover:bg-ink-50/60 dark:hover:bg-ink-900/40"
                >
                  <PublicationEntry
                    title={p.title}
                    authors={p.authors}
                    venue={p.venue}
                    year={p.year}
                    type={p.type}
                    doi={p.doi}
                    url={p.url}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function Currently({
  icon,
  label,
  title,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  detail: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">
        {icon} {label}
      </p>
      <p className="mt-2 text-lg">{title}</p>
      <p className="text-sm text-ink-500 dark:text-ink-300">{detail}</p>
    </div>
  );
}
