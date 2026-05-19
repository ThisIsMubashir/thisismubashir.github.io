import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { buildMetadata } from '@/lib/seo';
import { getCourses, type Course } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Teaching',
  description:
    'Courses taught at UG and PG level across Australian and international universities, plus teaching philosophy.',
  path: '/teaching',
});

const INSTITUTION_ORDER = [
  'University of Strathclyde, Bahrain',
  "King's Own Institute",
  'Victorian Institute of Technology',
  'University of New South Wales',
];

function groupByInstitution(courses: Course[]): [string, { ug: Course[]; pg: Course[] }][] {
  const map = new Map<string, { ug: Course[]; pg: Course[] }>();
  for (const c of courses) {
    if (!map.has(c.institution)) map.set(c.institution, { ug: [], pg: [] });
    const bucket = map.get(c.institution)!;
    if (c.level === 'UG') bucket.ug.push(c);
    else bucket.pg.push(c);
  }
  return INSTITUTION_ORDER.filter((i) => map.has(i)).map((i) => [i, map.get(i)!]);
}

export default async function TeachingPage() {
  const courses = await getCourses();
  const grouped = groupByInstitution(courses);

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

        <div className="mt-8 space-y-10">
          {grouped.map(([institution, { ug, pg }]) => (
            <div key={institution}>
              <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">
                {institution}
              </h3>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {pg.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">
                      Postgraduate
                    </p>
                    <ul className="space-y-1">
                      {pg.map((c) => (
                        <li key={c.code} className="text-sm text-ink-700 dark:text-ink-200">
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {ug.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">
                      Undergraduate
                    </p>
                    <ul className="space-y-1">
                      {ug.map((c) => (
                        <li key={c.code} className="text-sm text-ink-700 dark:text-ink-200">
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
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
