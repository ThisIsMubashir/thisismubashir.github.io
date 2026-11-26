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
    'Curriculum vitae — experience, education, teaching, talks, projects and publications.',
  path: '/cv',
});

const typeLabels: Record<string, string> = {
  journal: 'Journal',
  conference: 'Conference',
  chapter: 'Chapter',
  preprint: 'Preprint',
};

/** One collapsible row of the mini-CV. Native <details>: keyboard-accessible, no JS. */
function Row({
  title,
  count,
  href,
  linkLabel,
  children,
}: {
  title: string;
  count?: number;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-t border-ink-100 dark:border-ink-800">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-4 [&::-webkit-details-marker]:hidden">
        <h2 className="subsection-title">{title}</h2>
        {count !== undefined && <Badge>{count}</Badge>}
        <ChevronDown
          aria-hidden
          className="ml-auto h-5 w-5 text-ink-400 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pb-6">
        {children}
        <Link
          href={href}
          className="mt-4 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          {`${linkLabel} →`}
        </Link>
      </div>
    </details>
  );
}

const item = 'text-sm text-ink-700 dark:text-ink-200';
const muted = 'text-ink-500 dark:text-ink-400';

export default async function CvPage() {
  const [publications, courses, cpd, projects] = await Promise.all([
    getPublications(),
    getCourses(),
    getCpdEntries(),
    getProjects(),
  ]);
  const of = (k: string) => cpd.filter((e) => e.kind === k);

  const pg = [...new Map(courses.filter((c) => c.level === 'PG').map((c) => [c.name, c])).values()];
  // Same subject taught at several institutions → list it once.
  const ug = [...new Map(courses.filter((c) => c.level === 'UG').map((c) => [c.name, c])).values()];

  return (
    <>
      <SectionHeading
        title="Curriculum vitae"
        description={
          <>
            A one-page overview — open any section for detail. I share the full document on request
            with employers, collaborators, and institutions; feel free to{' '}
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

        {/* Expandable sections */}
        <Row
          title="Teaching"
          count={pg.length + ug.length}
          href="/teaching/"
          linkLabel="Teaching philosophy & full list"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Postgraduate</p>
              <ul className="space-y-1.5">
                {pg.map((c) => (
                  <li key={c.code} className={item}>
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">Undergraduate</p>
              <ul className="space-y-1.5">
                {ug.map((c) => (
                  <li key={c.code} className={item}>
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Row>

        <Row title="Projects" count={projects.length} href="/projects/" linkLabel="All projects">
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <p className="text-sm font-medium text-ink-900 dark:text-ink-50">{p.title}</p>
                {p.summary && <p className={`text-sm ${muted}`}>{p.summary}</p>}
              </li>
            ))}
          </ul>
        </Row>

        <Row
          title="Publications"
          count={publications.length}
          href="/publications/"
          linkLabel="All publications with abstracts & citations"
        >
          <ul className="space-y-3">
            {publications.map((p) => {
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
                    <p className={`text-sm italic ${muted}`}>
                      {p.type && (
                        <span className="not-italic">{typeLabels[p.type] ?? p.type} · </span>
                      )}
                      {p.venue}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Row>

        <Row
          title="Professional development & service"
          count={cpd.length}
          href="/cpd/"
          linkLabel="Full CPD record"
        >
          <div className="divide-y divide-ink-100 rounded-xl border border-ink-100 dark:divide-ink-800 dark:border-ink-800">
            {CPD_CATEGORIES.map(({ kind, label }) => {
              const rows = of(kind);
              if (rows.length === 0) return null;
              return (
                <details key={kind} className="group/sub px-4">
                  <summary className="flex cursor-pointer list-none items-center gap-3 py-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-50">{label}</h3>
                    <Badge>{rows.length}</Badge>
                    <ChevronDown
                      aria-hidden
                      className="ml-auto h-4 w-4 text-ink-400 transition-transform group-open/sub:rotate-180"
                    />
                  </summary>
                  <ul className="space-y-1.5 pb-4">
                    {rows.map((r) => (
                      <li key={r.slug} className={item}>
                        {r.title.replace(/^(Seminar|Workshop|Training|Industry talk): /, '')}{' '}
                        <span className={muted}>
                          · {r.provider} · {r.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
        </Row>
      </article>
    </>
  );
}
