import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { buildMetadata } from '@/lib/seo';
import {
  CPD_CATEGORIES,
  getCourses,
  getCpdEntries,
  getProjects,
  getPublications,
} from '@/lib/content';

export const metadata = buildMetadata({
  title: 'CV',
  description:
    'Curriculum vitae — experience, education, teaching, research contributions, projects and professional development.',
  path: '/cv',
});

const typeLabels: Record<string, string> = {
  journal: 'Journal',
  conference: 'Conference',
  chapter: 'Book chapter',
  preprint: 'Preprint',
};

const item = 'text-sm text-ink-700 dark:text-ink-200';
const muted = 'text-ink-500 dark:text-ink-400';
const hideMarker = 'list-none [&::-webkit-details-marker]:hidden';

/**
 * One section of the mini-CV. Open by default so the CV can be scanned without clicking;
 * the header still collapses it. Native <details>: keyboard-accessible, no JS.
 */
function Row({
  title,
  href,
  linkLabel,
  children,
}: {
  title: string;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
}) {
  return (
    <details open className="group border-t border-ink-100 dark:border-ink-800">
      <summary className={`flex cursor-pointer items-center gap-3 py-4 ${hideMarker}`}>
        <h2 className="subsection-title">{title}</h2>
        <ChevronDown
          aria-hidden
          className="ml-auto h-5 w-5 text-ink-400 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pb-6">
        {children}
        <Link
          href={href}
          className="mt-5 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          {`${linkLabel} →`}
        </Link>
      </div>
    </details>
  );
}

/** Progressive disclosure: the first `show` items, then "Show full list" reveals the rest. */
function Preview({
  items,
  show = 4,
  className = 'space-y-1.5',
}: {
  items: React.ReactNode[];
  show?: number;
  className?: string;
}) {
  const rest = items.slice(show);
  return (
    <div>
      <ul className={className}>{items.slice(0, show)}</ul>
      {rest.length > 0 && (
        <details className="group/more">
          <summary
            className={`mt-2 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300 ${hideMarker}`}
          >
            <span className="group-open/more:hidden">Show full list</span>
            <span className="hidden group-open/more:inline">Show less</span>
            <ChevronDown
              aria-hidden
              className="h-4 w-4 transition-transform group-open/more:rotate-180"
            />
          </summary>
          <ul className={`mt-2 ${className}`}>{rest}</ul>
        </details>
      )}
    </div>
  );
}

export default async function CvPage() {
  const [publications, courses, cpd, projects] = await Promise.all([
    getPublications(),
    getCourses(),
    getCpdEntries(),
    getProjects(),
  ]);

  // Same subject taught at several institutions → list it once.
  const byLevel = (level: 'UG' | 'PG') => [
    ...new Map(courses.filter((c) => c.level === level).map((c) => [c.name, c])).values(),
  ];
  const teaching = [
    { label: 'Undergraduate', rows: byLevel('UG') },
    { label: 'Postgraduate', rows: byLevel('PG') },
  ];
  const featuredFirst = [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ];

  return (
    <>
      <SectionHeading
        title="Curriculum vitae"
        description={
          <>
            A one-page overview. I share the full document on request with employers, collaborators,
            and institutions; feel free to{' '}
            <Link
              href="/contact/"
              className="font-medium text-brand-700 hover:underline dark:text-brand-300"
            >
              get in touch &rarr;
            </Link>
          </>
        }
      />

      <article className="surface p-6 sm:p-8">
        {/* Headline facts — always visible */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="eyebrow">Current role</p>
            <p className="mt-1 font-medium">Lecturer</p>
            <p className={`text-sm ${muted}`}>University of Strathclyde, Bahrain</p>
          </div>
          <div>
            <p className="eyebrow">Highest degree</p>
            <p className="mt-1 font-medium">PhD, Computer Engineering</p>
            <p className={`text-sm ${muted}`}>UNSW Sydney</p>
          </div>
          <div>
            <p className="eyebrow">Experience</p>
            <p className="mt-1 font-medium">10+ years</p>
            <p className={`text-sm ${muted}`}>Teaching, research, academic leadership</p>
          </div>
        </div>
        <div className="mb-6 mt-6">
          <p className="eyebrow">Research areas</p>
          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Research areas">
            {['Security', 'Artificial intelligence', 'Teaching & learning'].map((area) => (
              <li key={area}>
                <Badge tone="neutral">{area}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <Row title="Teaching" href="/teaching/" linkLabel="Teaching philosophy">
          <div className="grid gap-6 sm:grid-cols-2">
            {teaching.map(({ label, rows }) => (
              <div key={label}>
                <h3 className="eyebrow mb-3">{label}</h3>
                <Preview
                  show={5}
                  items={rows.map((c) => (
                    <li key={c.code} className={item}>
                      {c.name}
                    </li>
                  ))}
                />
              </div>
            ))}
          </div>
        </Row>

        <Row
          title="Research contributions"
          href="/publications/"
          linkLabel="Publications with abstracts & citations"
        >
          <Preview
            className="space-y-3"
            items={publications.map((p) => {
              const href = p.doi ? `https://doi.org/${p.doi}` : p.url;
              return (
                <li key={p.slug} className="flex gap-3">
                  <span className={`w-10 shrink-0 pt-0.5 text-sm tabular-nums ${muted}`}>
                    {p.year}
                  </span>
                  <div>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-ink-900 no-underline hover:text-brand-700 dark:text-ink-50 dark:hover:text-brand-300"
                      >
                        {p.title}
                      </a>
                    ) : (
                      <span className="text-sm font-medium">{p.title}</span>
                    )}
                    <p className={`text-sm ${muted}`}>
                      {p.type && <>{typeLabels[p.type] ?? p.type} · </>}
                      <span className="italic">{p.venue}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          />
        </Row>

        <Row title="Projects" href="/projects/" linkLabel="All projects">
          <Preview
            className="grid gap-x-6 gap-y-3 sm:grid-cols-2"
            items={featuredFirst.map((p) => (
              <li key={p.slug}>
                <p className="text-sm font-medium text-ink-900 dark:text-ink-50">{p.title}</p>
                {p.summary && <p className={`text-sm ${muted}`}>{p.summary}</p>}
              </li>
            ))}
          />
        </Row>

        <Row
          title="Professional development & service"
          href="/cpd/"
          linkLabel="Full professional development record"
        >
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {CPD_CATEGORIES.map(({ kind, label }) => {
              const rows = cpd.filter((e) => e.kind === kind);
              if (rows.length === 0) return null;
              return (
                <div key={kind}>
                  <h3 className="eyebrow mb-3">{label}</h3>
                  <Preview
                    show={3}
                    items={rows.map((r) => (
                      <li key={r.slug} className={item}>
                        {r.title.replace(/^(Seminar|Workshop|Training|Industry talk): /, '')}{' '}
                        <span className={muted}>· {r.year}</span>
                      </li>
                    ))}
                  />
                </div>
              );
            })}
          </div>
        </Row>
      </article>
    </>
  );
}
