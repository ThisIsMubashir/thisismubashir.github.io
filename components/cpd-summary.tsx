import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CPD_CATEGORIES, getCpdEntries } from '@/lib/content';

/**
 * "Professional development & service" tiles — one per CPD category, linking into /cpd.
 * `compact` renders an eyebrow label instead of a section heading (for use inside a banner).
 */
export async function CpdSummary({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  const cpd = await getCpdEntries();
  const tiles = CPD_CATEGORIES.map((c) => ({
    ...c,
    n: cpd.filter((e) => e.kind === c.kind).length,
  })).filter((t) => t.n > 0);

  const Wrapper = compact ? 'div' : 'section';
  return (
    <Wrapper className={className}>
      <div className="flex items-baseline justify-between gap-4">
        {compact ? (
          <p className="eyebrow">Professional development &amp; service</p>
        ) : (
          <h2 className="section-title">Professional development &amp; service</h2>
        )}
        <Link
          href="/cpd/"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ul
        className={
          compact
            ? 'mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4'
            : 'mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4'
        }
      >
        {tiles.map(({ kind, label, n }) => (
          <li key={kind}>
            <Link
              href={`/cpd/#${kind}`}
              className="surface surface-hover block h-full p-3 no-underline"
            >
              <span className="font-serif text-2xl font-bold text-ink-900 dark:text-ink-50">
                {n}
              </span>
              <span className="mt-1 block text-xs text-ink-600 dark:text-ink-300">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
