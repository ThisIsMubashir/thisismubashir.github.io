import { ChevronDown } from 'lucide-react';
import { TEACHING_AREAS, type Course } from '@/lib/content';

/**
 * Subjects grouped into teaching areas — one card per area, each subject tagged PG / UG.
 * A subject taught at several institutions appears once (postgraduate listed first).
 * `collapsible` shows only the area names; each opens to its subjects (native <details>).
 */
export function TeachingAreas({
  courses,
  collapsible = false,
}: {
  courses: Course[];
  collapsible?: boolean;
}) {
  const unique = [...new Map(courses.map((c) => [`${c.name}|${c.level}`, c])).values()];
  const areas = TEACHING_AREAS.map((area) => ({
    area,
    rows: unique
      .filter((c) => c.area === area)
      .sort((a, b) => (a.level === b.level ? 0 : a.level === 'PG' ? -1 : 1)),
  })).filter((a) => a.rows.length > 0);

  const heading = 'font-sans text-sm font-semibold text-ink-900 dark:text-ink-50';
  const subjects = (rows: Course[]) => (
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
  );

  return (
    <ul className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map(({ area, rows }) => (
        <li key={area} className="surface">
          {collapsible ? (
            <details className="group/area">
              <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className={heading}>{area}</h3>
                <ChevronDown
                  aria-hidden
                  className="ml-auto h-4 w-4 text-ink-400 transition-transform group-open/area:rotate-180"
                />
              </summary>
              <div className="border-t border-ink-100 px-5 pb-5 dark:border-ink-800">
                {subjects(rows)}
              </div>
            </details>
          ) : (
            <div className="p-5">
              <h3 className={`border-b border-ink-100 pb-3 dark:border-ink-800 ${heading}`}>
                {area}
              </h3>
              {subjects(rows)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
