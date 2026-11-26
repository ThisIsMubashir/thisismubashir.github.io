import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CPD_CATEGORIES, getCpdEntries } from '@/lib/content';

/** "Professional development & service" tiles — one per CPD category, linking into /teaching/cpd. */
export async function CpdSummary({ className }: { className?: string }) {
  const cpd = await getCpdEntries();
  const tiles = CPD_CATEGORIES.map((c) => ({ ...c, n: cpd.filter((e) => e.kind === c.kind).length })).filter(
    (t) => t.n > 0,
  );

  return (
    <section className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="section-title">Professional development &amp; service</h2>
        <Link
          href="/teaching/cpd/"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map(({ kind, label, n }) => (
          <li key={kind}>
            <Link
              href={`/teaching/cpd/#${kind}`}
              className="block h-full surface surface-hover p-3 no-underline"
            >
              <span className="font-serif text-2xl font-bold text-ink-900 dark:text-ink-50">{n}</span>
              <span className="mt-1 block text-xs text-ink-600 dark:text-ink-300">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
