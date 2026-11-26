import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Publication } from '@/lib/content';
import { CiteButton } from '@/components/cite-button';

const typeLabels: Record<string, string> = {
  journal: 'Journal',
  conference: 'Conference',
  chapter: 'Book chapter',
  preprint: 'Preprint',
};

/**
 * One publication card. The title and "Read paper" go straight to the DOI (or publisher URL);
 * "Cite" opens APA / Harvard / BibTeX.
 */
export function PublicationCard({ pub: p }: { pub: Publication }) {
  const text = p.abstract ?? p.summary;
  const href = p.doi ? `https://doi.org/${p.doi}` : p.url;
  return (
    <article className="surface surface-hover p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {p.type && <Badge tone="brand">{typeLabels[p.type] ?? p.type}</Badge>}
          {p.status === 'in-press' && <Badge tone="warning">Early access</Badge>}
          {p.status === 'submitted' && <Badge tone="warning">Submitted</Badge>}
          <Badge>{p.year}</Badge>
        </div>
      </div>

      <h3 className="card-title mt-4">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline hover:text-brand-700 dark:hover:text-brand-300"
          >
            {p.title}
          </a>
        ) : (
          p.title
        )}
      </h3>
      {p.venue && <p className="mt-2 text-sm italic text-ink-500 dark:text-ink-400">{p.venue}</p>}
      {text && (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {text}
        </p>
      )}

      {p.keywords && p.keywords.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Keywords">
          {p.keywords.slice(0, 4).map((k) => (
            <li key={k}>
              <Badge>{k}</Badge>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 border-t border-ink-100 pt-4 dark:border-ink-800">
        <CiteButton
          pub={p}
          action={
            href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-700 no-underline dark:text-brand-300"
              >
                {p.doi ? 'Read paper (DOI)' : 'Read paper'}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )
          }
        />
      </div>
    </article>
  );
}

/** Plain card list — used everywhere except the home page. */
export function PublicationCards({ pubs }: { pubs: Publication[] }) {
  return (
    <ul className="space-y-4">
      {pubs.map((p) => (
        <li key={p.slug}>
          <PublicationCard pub={p} />
        </li>
      ))}
    </ul>
  );
}
