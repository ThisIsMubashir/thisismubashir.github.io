import Link from 'next/link';
import { Mail } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
      <SectionHeading eyebrow="Career" title="Curriculum vitae" />

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
        <h2 className="text-xl font-medium">Teaching</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-ink-500">
              Postgraduate
            </h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {pgCourses.map((c) => (
                <li key={c.code}>
                  <Badge tone="neutral">{c.name}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-ink-500">
              Undergraduate
            </h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {ugCourses.map((c) => (
                <li key={c.code}>
                  <Badge tone="neutral">{c.name}</Badge>
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

      {/* Request CTA */}
      <section className="rounded-xl border border-ink-200 bg-white p-8 text-center dark:border-ink-700 dark:bg-ink-900">
        <h2 className="text-xl font-medium">Want the full CV?</h2>
        <p className="mx-auto mt-2 max-w-md text-ink-600 dark:text-ink-300">
          The complete version — employment history, education, awards, and service record — is
          available on request. Send me a message and I&apos;ll share it directly.
        </p>
        <div className="mt-6">
          <Link href="/contact/">
            <Button variant="primary" size="lg">
              <Mail className="h-4 w-4" /> Request CV
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
