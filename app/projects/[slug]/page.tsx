import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProject, getProjectSlugs, resolvePublications } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return buildMetadata({ title: 'Project not found', path: `/projects/${slug}` });
  return buildMetadata({
    title: project.title,
    description: project.summary?.slice(0, 160),
    path: `/projects/${slug}`,
  });
}

function formatPeriod(start?: string, end?: string | null): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  if (!start && !end) return '';
  if (start && !end) return `${fmt(start)} → Current`;
  if (start && end) return `${fmt(start)} → ${fmt(end)}`;
  return '';
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const related = await resolvePublications(project.relatedPublications);
  const period = formatPeriod(project.startDate, project.endDate);
  const ongoing = !project.endDate;

  return (
    <>
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <article>
        <header>
          <div className="flex flex-wrap items-center gap-2">
            {project.role && <Badge tone="brand">{project.role}</Badge>}
            {ongoing && <Badge tone="success">Current</Badge>}
            {period && (
              <span className="text-sm text-ink-500 dark:text-ink-300">{period}</span>
            )}
          </div>

          <h1 className="mt-4 text-balance text-3xl tracking-tightish sm:text-4xl">
            {project.title}
          </h1>

          {project.summary && (
            <p className="mt-4 max-w-2xl text-lg text-pretty text-ink-700 dark:text-ink-200">
              {project.summary}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button variant="primary" size="sm">
                  <Github className="h-3.5 w-3.5" /> Repository
                </Button>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button variant="secondary" size="sm">
                  <ExternalLink className="h-3.5 w-3.5" /> Live demo
                </Button>
              </a>
            )}
          </div>
        </header>

        {project.body && project.body.length > 0 && (
          <section className="mt-10 max-w-2xl space-y-4 text-pretty text-ink-700 dark:text-ink-200">
            {project.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </section>
        )}

        {project.tags && project.tags.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-ink-500">
              Tags
            </h2>
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {project.tags.map((t) => (
                <li key={t}>
                  <Badge tone="neutral">{t}</Badge>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium">Related publications</h2>
            <ul className="mt-3 divide-y divide-ink-100 dark:divide-ink-800">
              {related.map((p) => (
                <li key={p.slug} className="py-3">
                  <Link
                    href={`/publications/${p.slug}/`}
                    className="text-ink-900 no-underline hover:underline dark:text-ink-50"
                  >
                    {p.title}
                  </Link>
                  <p className="mt-1 text-sm italic text-ink-500 dark:text-ink-300">
                    {p.venue} · {p.year}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
