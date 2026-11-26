import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProject, getProjectSlugs, resolvePublications } from '@/lib/content';
import { PublicationCards } from '@/components/publication-stack';
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

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const related = await resolvePublications(project.relatedPublications);

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
            {project.current && <Badge tone="success">Current</Badge>}
          </div>

          <h1 className="mt-4 text-balance text-3xl tracking-tightish sm:text-4xl">
            {project.title}
          </h1>

          {project.summary && (
            <p className="mt-4 max-w-2xl text-pretty text-lg text-ink-700 dark:text-ink-200">
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
            <h2 className="eyebrow mb-3">Tags</h2>
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
            <h2 className="subsection-title">Related publications</h2>
            <div className="mt-3">
              <PublicationCards pubs={related} />
            </div>
          </section>
        )}
      </article>
    </>
  );
}
