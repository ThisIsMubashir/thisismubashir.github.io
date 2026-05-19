import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BibTexBlock } from '@/components/bibtex-block';
import { getProjects, getPublication, getPublicationSlugs } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/utils';

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPublicationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = await getPublication(slug);
  if (!pub) return buildMetadata({ title: 'Publication not found', path: `/publications/${slug}` });
  return buildMetadata({
    title: pub.title,
    description: pub.abstract?.slice(0, 160) ?? `${pub.venue ?? ''} · ${pub.year}`,
    path: `/publications/${slug}`,
  });
}

const typeLabels: Record<string, string> = {
  journal: 'Journal',
  conference: 'Conference',
  chapter: 'Chapter',
  preprint: 'Preprint',
};

export default async function PublicationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = await getPublication(slug);
  if (!pub) notFound();

  // Find projects that reference this publication
  const projects = await getProjects();
  const relatedProjects = projects.filter((p) => p.relatedPublications?.includes(slug));

  const scholarlyArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    author: pub.authors.map((name) => ({ '@type': 'Person', name })),
    datePublished: pub.year?.toString(),
    publisher: pub.venue,
    identifier: pub.doi ? `https://doi.org/${pub.doi}` : undefined,
    url: `${siteConfig.url}/publications/${slug}/`,
    abstract: pub.abstract,
    keywords: pub.keywords?.join(', '),
  };

  return (
    <>
      <Link
        href="/publications"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300"
      >
        <ArrowLeft className="h-4 w-4" /> All publications
      </Link>

      <article>
        <header>
          <div className="flex flex-wrap items-center gap-2">
            {pub.type && <Badge tone="brand">{typeLabels[pub.type] ?? pub.type}</Badge>}
            {pub.status === 'submitted' && <Badge tone="warning">Submitted</Badge>}
            {pub.year && <Badge tone="neutral">{pub.year}</Badge>}
          </div>

          <h1 className="mt-4 text-balance text-3xl tracking-tightish sm:text-4xl">
            {pub.title}
          </h1>

          <p className="mt-3 text-ink-500 dark:text-ink-300">
            {pub.authors.map((a, i) => (
              <span key={`${a}-${i}`}>
                <span className={a === 'Mubashir Hussain' ? 'font-medium text-ink-900 dark:text-ink-50' : ''}>
                  {a}
                </span>
                {i < pub.authors.length - 1 && ', '}
              </span>
            ))}
          </p>

          {pub.venue && (
            <p className="mt-1 italic text-ink-500 dark:text-ink-300">{pub.venue}</p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {pub.doi && (
              <a
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button variant="primary" size="sm">
                  <ExternalLink className="h-3.5 w-3.5" />
                  DOI: {pub.doi}
                </Button>
              </a>
            )}
            {pub.url && !pub.doi && (
              <a href={pub.url} target="_blank" rel="noopener noreferrer" className="no-underline">
                <Button variant="secondary" size="sm">
                  <ExternalLink className="h-3.5 w-3.5" /> Read online
                </Button>
              </a>
            )}
            {/* PDF link will surface once Sanity assets are configured */}
          </div>
        </header>

        {pub.abstract && (
          <section className="mt-10">
            <h2 className="text-lg font-medium">Abstract</h2>
            <p className="mt-2 max-w-2xl text-pretty text-ink-700 dark:text-ink-200">
              {pub.abstract}
            </p>
          </section>
        )}

        {pub.keywords && pub.keywords.length > 0 && (
          <section className="mt-8">
            <h2 className="sr-only">Keywords</h2>
            <ul className="flex flex-wrap gap-2" aria-label="Keywords">
              {pub.keywords.map((k) => (
                <li key={k}>
                  <Badge tone="neutral">{k}</Badge>
                </li>
              ))}
            </ul>
          </section>
        )}

        {pub.bibtex && (
          <section className="mt-10">
            <h2 className="mb-3 text-lg font-medium">Cite</h2>
            <BibTexBlock bibtex={pub.bibtex} />
          </section>
        )}

        {relatedProjects.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium">Related projects</h2>
            <ul className="mt-3 space-y-2">
              {relatedProjects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}/`}
                    className="inline-flex items-center gap-2 text-brand-700 dark:text-brand-300"
                  >
                    <FileText className="h-4 w-4" /> {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleJsonLd) }}
      />
    </>
  );
}
