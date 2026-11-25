import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Publication } from '@/lib/content';

const typeLabels: Record<string, string> = {
  journal: 'Journal',
  conference: 'Conference',
  chapter: 'Book chapter',
  preprint: 'Preprint',
};

/** One publication as a card linking to its detail page. `counter` shows "01 / 04" (stack only). */
export function PublicationCard({ pub: p, counter }: { pub: Publication; counter?: string }) {
  const text = p.abstract ?? p.summary;
  return (
    <Link
      href={`/publications/${p.slug}/`}
      className="group block rounded-2xl border border-ink-100 bg-white p-6 no-underline shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.25)] transition-colors hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {p.type && <Badge tone="brand">{typeLabels[p.type] ?? p.type}</Badge>}
          {p.status === 'in-press' && <Badge tone="warning">Early access</Badge>}
          {p.status === 'submitted' && <Badge tone="warning">Submitted</Badge>}
          <Badge>{p.year}</Badge>
        </div>
        {counter && <span className="font-serif text-sm tabular-nums text-ink-400 dark:text-ink-500">{counter}</span>}
      </div>

      <h3 className="mt-4 text-balance font-serif text-xl font-bold leading-snug text-ink-900 dark:text-ink-50 sm:text-2xl">
        {p.title}
      </h3>
      {p.venue && <p className="mt-2 text-sm italic text-ink-500 dark:text-ink-400">{p.venue}</p>}
      {text && <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{text}</p>}

      <div className="mt-5 flex items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5">
          {p.keywords?.slice(0, 4).map((k) => (
            <li key={k}>
              <Badge>{k}</Badge>
            </li>
          ))}
        </ul>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300">
          Read
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
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

/**
 * Card-stacking list (home page): each card is `sticky`, offset a little lower than the previous
 * one, so scrolling slides the next card over the last. The bottom padding gives the final card
 * room to travel up and close onto the stack before the list scrolls away. Pure CSS.
 */
export function PublicationStack({ pubs }: { pubs: Publication[] }) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <ol className="relative">
      {pubs.map((p, i) => (
        <li key={p.slug} className="sticky pb-6" style={{ top: `${88 + i * 18}px` }}>
          <PublicationCard pub={p} counter={`${pad(i + 1)} / ${pad(pubs.length)}`} />
        </li>
      ))}
      {/* Spacer inside the list (sticky items can't travel into padding) so the last card closes the stack. */}
      <li aria-hidden className="h-[max(2rem,calc(100vh-36rem))]" />
    </ol>
  );
}
