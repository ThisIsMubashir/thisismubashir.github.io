'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/form';
import { ClearFilters, FilterChips } from '@/components/filter-chips';
import { PublicationEntry } from '@/components/publication-entry';
import { ScrollReveal } from '@/components/scroll-reveal';
import type { Publication, PublicationType } from '@/lib/content';

interface Props {
  publications: Publication[];
}

const typeOrder: readonly PublicationType[] = ['journal', 'conference', 'chapter', 'preprint'];

export function PublicationsList({ publications }: Props) {
  const [year, setYear] = useState<string | null>(null);
  const [type, setType] = useState<PublicationType | null>(null);
  const [q, setQ] = useState('');

  const years = useMemo(
    () => Array.from(new Set(publications.map((p) => String(p.year)))).sort((a, b) => b.localeCompare(a)),
    [publications],
  );
  const types = useMemo(
    () =>
      typeOrder.filter((t) => publications.some((p) => p.type === t)),
    [publications],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return publications.filter((p) => {
      if (year && String(p.year) !== year) return false;
      if (type && p.type !== type) return false;
      if (needle) {
        const hay = [
          p.title,
          p.venue ?? '',
          p.authors.join(' '),
          (p.keywords ?? []).join(' '),
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [publications, year, type, q]);

  const anyActive = year !== null || type !== null || q.length > 0;
  const clear = () => {
    setYear(null);
    setType(null);
    setQ('');
  };

  return (
    <>
      <div className="mb-6 space-y-4 rounded-lg border border-ink-100 bg-white p-4 dark:border-ink-800 dark:bg-ink-900">
        <Input
          aria-label="Search publications"
          placeholder="Search title, author, venue, keyword…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FilterChips label="Year" options={years} selected={year} onChange={setYear} />
          <FilterChips label="Type" options={types} selected={type} onChange={setType} />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink-500 dark:text-ink-300">
            Showing {filtered.length} of {publications.length}
          </p>
          <ClearFilters visible={anyActive} onClear={clear} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-ink-200 p-6 text-center text-sm text-ink-500 dark:border-ink-700 dark:text-ink-300">
          No publications match those filters.
        </p>
      ) : (
        <ScrollReveal as="ul" className="divide-y divide-ink-100 dark:divide-ink-800">
          {filtered.map((p) => (
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
                  bibtex={p.bibtex}
                />
              </Link>
            </li>
          ))}
        </ScrollReveal>
      )}
    </>
  );
}
