import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/scroll-reveal';
import { PublicationCards } from '@/components/publication-stack';
import { CpdSummary } from '@/components/cpd-summary';
import { buildMetadata } from '@/lib/seo';
import { getCourses, getCpdEntries, getPublications } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'CV',
  description: 'Curriculum vitae — experience, education, publications, and teaching.',
  path: '/cv',
});

export default async function CvPage() {
  const [publications, courses, cpd] = await Promise.all([getPublications(), getCourses(), getCpdEntries()]);
  const talks = cpd.filter((e) => e.kind === 'talk');
  const reviews = cpd.filter((e) => e.kind === 'review');
  const certs = cpd.filter((e) => e.kind === 'certification');

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
      <section className="mb-12 surface p-6">
        <ScrollReveal className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="eyebrow">
              Current role
            </p>
            <p className="mt-1 font-medium">Lecturer</p>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              University of Strathclyde, Bahrain
            </p>
          </div>
          <div>
            <p className="eyebrow">
              Highest degree
            </p>
            <p className="mt-1 font-medium">PhD, Computer Engineering</p>
            <p className="text-sm text-ink-500 dark:text-ink-400">UNSW Sydney</p>
          </div>
          <div>
            <p className="eyebrow">
              Experience
            </p>
            <p className="mt-1 font-medium">10+ years</p>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              Teaching, research, academic leadership
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-6">
          <p className="eyebrow">
            Research areas
          </p>
          <ScrollReveal as="ul" className="mt-2 flex flex-wrap gap-2" aria-label="Research areas">
            {[
              'Security',
              'Artificial intelligence',
              'Teaching & learning',
            ].map((area) => (
              <li key={area}>
                <Badge tone="neutral">{area}</Badge>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Teaching */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="section-title">Teaching</h2>
          <Link
            href="/teaching/"
            className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
          >
            Full list &rarr;
          </Link>
        </div>
        <ScrollReveal className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">
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
            <p className="eyebrow mb-3">
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
        </ScrollReveal>
      </section>

      {/* Talks, peer review, certifications */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="section-title">Talks &amp; peer review</h2>
          <Link
            href="/teaching/cpd/"
            className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
          >
            Full record &rarr;
          </Link>
        </div>
        <ScrollReveal className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">
              Talks &amp; workshops delivered
            </p>
            <ul className="space-y-1.5">
              {talks.slice(0, 5).map((t) => (
                <li key={t.slug} className="text-sm text-ink-700 dark:text-ink-200">
                  {t.title.replace(/^\w+: /, '')} <span className="text-ink-500 dark:text-ink-400">· {t.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">
              Reviewer for
            </p>
            <ul className="space-y-1.5">
              {reviews.map((r) => (
                <li key={r.slug} className="text-sm text-ink-700 dark:text-ink-200">
                  {r.title}
                </li>
              ))}
            </ul>
            <Link
              href="/teaching/cpd/#certification"
              className="mt-4 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
            >
              {`${certs.length} certifications & microskills →`}
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Selected publications */}
      <section className="mb-12">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="section-title">Selected publications</h2>
          <Link
            href="/publications/"
            className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
          >
            Full list &rarr;
          </Link>
        </div>
        <PublicationCards pubs={publications.slice(0, 5)} />
      </section>

      <CpdSummary className="mb-12" />
    </>
  );
}
