import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { buildMetadata } from '@/lib/seo';
import { getCourses } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Teaching',
  description:
    'Courses taught at UG and PG level across Australian and international universities, plus teaching philosophy.',
  path: '/teaching',
});

export default async function TeachingPage() {
  const courses = await getCourses();
  const pg = courses.filter((c) => c.level === 'PG');
  const ug = courses.filter((c) => c.level === 'UG');

  return (
    <>
      <SectionHeading
        eyebrow="Practice"
        title="Teaching"
        description="A decade of UG and PG teaching across UNSW, Victorian Institute of Technology, King's Own Institute, Federation University, USC, and now the University of Strathclyde (Bahrain)."
      />

      <section className="mt-2 max-w-2xl">
        <blockquote className="border-l-4 border-brand-600 pl-5 text-lg italic text-ink-700 dark:border-brand-400 dark:text-ink-200">
          I see teaching as a shared process of thinking, exploring, and making sense of ideas together.
        </blockquote>
      </section>

      <section className="prose prose-neutral mt-10 max-w-2xl dark:prose-invert">
        <h2>Philosophy</h2>
        <p>
          Learning is not something that is simply delivered in a classroom; it is something that
          happens through discussion, questioning, practice, and reflection. Each student comes with
          their own background and way of thinking, so my role is to create an environment where
          those differences are valued and used to deepen understanding rather than limit it. I aim
          to build a classroom culture where students feel comfortable asking questions, challenging
          ideas, and developing their own voice.
        </p>
        <p>
          A key part of my approach is connecting theory with real-world practice. Abstract concepts
          become much more meaningful when students can see how they are used in industry or applied
          in real systems. I try to bring those connections into teaching through examples, case
          studies, and problem-based learning, so that students understand not just what something
          is, but why it matters and where it is used.
        </p>
        <p>
          I also believe that students learn best by doing. For that reason, I design learning
          activities that require active participation — solving problems, building solutions, testing
          ideas, and learning from mistakes. The classroom becomes a space where it is safe to try,
          fail, and improve. This process helps students move from simply understanding ideas to
          actually being able to use them.
        </p>
        <p>
          Ultimately, my goal is to help students become independent thinkers who can approach new
          problems with confidence. Rather than focusing on memorising answers, I focus on helping
          them develop the ability to think through problems, break them down, and find their own
          solutions. I see success in teaching not when students repeat what I have said, but when
          they no longer need me to guide every step of their thinking.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-medium">Courses</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-500 dark:text-ink-300">
          All courses taught at undergraduate and postgraduate level, by institution.
        </p>

        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">
              Postgraduate
            </p>
            <ul className="space-y-1.5">
              {pg.map((c) => (
                <li key={c.code} className="text-sm text-ink-700 dark:text-ink-200">
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">
              Undergraduate
            </p>
            <ul className="space-y-1.5">
              {ug.map((c) => (
                <li key={c.code} className="text-sm text-ink-700 dark:text-ink-200">
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-14">
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
