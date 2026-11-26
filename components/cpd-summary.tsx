import Link from 'next/link';
import { CPD_CATEGORIES, getCpdEntries } from '@/lib/content';

/** Count tiles — one per CPD category, each linking to its section on /cpd. */
export async function CpdSummary({ className }: { className?: string }) {
  const cpd = await getCpdEntries();
  const tiles = CPD_CATEGORIES.map((c) => ({
    ...c,
    n: cpd.filter((e) => e.kind === c.kind).length,
  })).filter((t) => t.n > 0);

  return (
    <ul className={`grid grid-cols-2 gap-2 sm:grid-cols-4 ${className ?? ''}`}>
      {tiles.map(({ kind, label, n }) => (
        <li key={kind}>
          <Link
            href={`/cpd/#${kind}`}
            className="surface surface-hover block h-full p-3 no-underline"
          >
            <span className="font-serif text-2xl font-bold text-ink-900 dark:text-ink-50">{n}</span>
            <span className="mt-1 block text-xs text-ink-600 dark:text-ink-300">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
