import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Teaching',
  description:
    'Courses taught at UG and PG level across Australian and international universities, plus teaching philosophy.',
  path: '/teaching',
});

export default function TeachingPage() {
  return (
    <>
      <SectionHeading
        eyebrow="Practice"
        title="Teaching"
        description="A decade of UG and PG teaching across UNSW, Victorian Institute of Technology, King's Own Institute, Federation University, USC, and now the University of Strathclyde (Bahrain)."
      />

      <section className="prose prose-neutral max-w-2xl dark:prose-invert">
        <h2>Philosophy</h2>
        <p>
          I design assessments that reward thinking, not retrieval — and I treat AI as a collaborator,
          not a threat. Game-based exercises, real industry-linked capstone projects, and
          early-warning support for at-risk students are the three things I lean on most.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Courses</h2>
        <p className="mt-2 max-w-2xl text-ink-900/70 dark:text-ink-50/70">
          The full course list (UG/PG, by institution, with year) renders here from Sanity. Phase 2.
        </p>
      </section>

      <section className="mt-12">
        <Link
          href="/teaching/cpd"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 dark:text-brand-300"
        >
          See CPD &amp; professional development record <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
