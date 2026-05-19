'use client';

import { useMemo, useState } from 'react';
import { ClearFilters, FilterChips } from '@/components/filter-chips';
import { ProjectCard } from '@/components/project-card';
import type { Project } from '@/lib/content';

interface Props {
  projects: Project[];
}

export function ProjectsList({ projects }: Props) {
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const t of p.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [projects]);

  const filtered = useMemo(
    () => (tag ? projects.filter((p) => p.tags?.includes(tag)) : projects),
    [projects, tag],
  );

  return (
    <>
      <div className="mb-6 space-y-3 rounded-lg border border-ink-100 bg-white p-4 dark:border-ink-800 dark:bg-ink-900">
        <FilterChips label="Tag" options={tags} selected={tag} onChange={setTag} />
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink-500 dark:text-ink-300">
            Showing {filtered.length} of {projects.length}
          </p>
          <ClearFilters visible={tag !== null} onClear={() => setTag(null)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-ink-200 p-6 text-center text-sm text-ink-500 dark:border-ink-700 dark:text-ink-300">
          No projects match that tag.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
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
      )}
    </>
  );
}
