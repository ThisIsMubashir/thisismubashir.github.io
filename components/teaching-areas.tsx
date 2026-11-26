import { TEACHING_AREAS, type Course } from '@/lib/content';

/**
 * Subjects grouped into teaching areas — one card per area, each subject tagged PG / UG.
 * A subject taught at several institutions appears once (postgraduate listed first).
 */
export function TeachingAreas({ courses }: { courses: Course[] }) {
  const unique = [...new Map(courses.map((c) => [`${c.name}|${c.level}`, c])).values()];
  const areas = TEACHING_AREAS.map((area) => ({
    area,
    rows: unique
      .filter((c) => c.area === area)
      .sort((a, b) => (a.level === b.level ? 0 : a.level === 'PG' ? -1 : 1)),
  })).filter((a) => a.rows.length > 0);

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map(({ area, rows }) => (
        <li key={area} className="surface p-5">
          <h3 className="border-b border-ink-100 pb-3 font-sans text-sm font-semibold text-ink-900 dark:border-ink-800 dark:text-ink-50">
            {area}
          </h3>
          <ul className="mt-3 space-y-2">
            {rows.map((c) => (
              <li key={c.code} className="flex items-start justify-between gap-3">
                <span className="text-sm text-ink-700 dark:text-ink-200">{c.name}</span>
                <span
                  className="shrink-0 pt-0.5 font-mono text-[10px] font-medium tracking-wider text-ink-400 dark:text-ink-500"
                  title={c.level === 'PG' ? 'Postgraduate' : 'Undergraduate'}
                >
                  {c.level}
                </span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
