import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { buildMetadata } from '@/lib/seo';
import { getCourses, getPublications } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'CV',
  description: 'Curriculum vitae — experience, education, publications, and teaching.',
  path: '/cv',
});

export default async function CvPage() {
  const [publications, courses] = await Promise.all([getPublications(), getCourses()]);

  const ugCourses = courses.filter((c) => c.level === 'UG');
  const pgCourses = courses.filter((c) => c.level === 'PG');

  return (
    <>
      <SectionHeading
       
        title="Curriculum vitae"
        description={
          <>
            I share the full document on request with employers, collaborators, and institutions.
            If you&apos;d like a copy, feel free to{' '}
            <Link href="/contact/" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
              get in touch &rarr;
            </Link>
          </>
        }
      />

      {/* Credential summary */}
      <section className="mb-12 rounded-xl border border-ink-100 bg-ink-50/50 p-6 dark:border-ink-800 dark:bg-ink-900/40">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              Current role
            </p>
            <p className="mt-1 font-medium">Teaching Fellow</p>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              University of Strathclyde, Bahrain
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              Highest degree
            </p>
            <p className="mt-1 font-medium">PhD, Computer Engineering</p>
            <p className="text-sm text-ink-500 dark:text-ink-400">UNSW Sydney</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              Experience
            </p>
            <p className="mt-1 font-medium">10+ years</p>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              Teaching, research, academic leadership
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
            Research areas
          </p>
          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Research areas">
            {[
              'Hardware security',
              'Network-on-Chip',
              'Cyber-physical systems',
              'AI in higher education',
              'Game-based learning',
            ].map((area) => (
              <li key={area}>
                <Badge tone="neutral">{area}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Teaching */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-medium">Teaching</h2>
          <Link
            href="/teaching/"
            className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
          >
            Full list &rarr;
          </Link>
        </div>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-500">
              Postgraduate
            </p>
            <ul className="space-y-1.5">
              {pgCourses.slice(0, 5).map((c) => (
                <li key={c.code} className="text-sm text-ink-700 dark:text-ink-200">
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-500">
              Undergraduate
            </p>
            <ul className="space-y-1.5">
              {ugCourses.slice(0, 5).map((c) => (
                <li key={c.code} className="text-sm text-ink-700 dark:text-ink-200">
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Selected publications */}
      <section className="mb-12">
        <h2 className="text-xl font-medium">Selected publications</h2>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          Full list at <a href="/publications/">/publications</a>.
        </p>
        <ol className="mt-4 space-y-3">
          {publications.slice(0, 5).map((p) => (
            <li key={p.slug} className="text-sm">
              <span className="font-medium">{p.title}.</span>{' '}
              <span className="text-ink-500 dark:text-ink-300">
                {p.authors.join(', ')}. <em>{p.venue}</em>, {p.year}.
              </span>{' '}
              {p.doi && (
                <a
                  href={`https://doi.org/${p.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 dark:text-brand-300"
                >
                  doi:{p.doi}
                </a>
              )}
            </li>
          ))}
        </ol>
      </section>

    </>
  );
}
