import { SectionHeading } from '@/components/section-heading';
import { buildMetadata } from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import cv from '@/data/cv.json';
import { getCourses, getPublications } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'CV',
  description: 'Curriculum vitae — experience, education, publications, and teaching.',
  path: '/cv',
});

interface ExperienceEntry {
  role: string;
  org: string;
  location?: string;
  start?: string;
  end?: string | null;
  notes?: string[];
}

interface EducationEntry {
  degree: string;
  school: string;
  location?: string;
  end?: string;
  thesis?: string;
}

interface AwardEntry {
  year: number;
  title: string;
  detail?: string;
}

interface CvData {
  experience: ExperienceEntry[];
  education: EducationEntry[];
  awards: AwardEntry[];
  service: string[];
}

const cvData = cv as CvData;

function ym(s?: string | null): string {
  if (!s) return 'Present';
  const [y, m] = s.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return m ? `${monthNames[parseInt(m, 10) - 1]} ${y}` : y;
}

export default async function CvPage() {
  const [publications, courses] = await Promise.all([getPublications(), getCourses()]);

  const ugCourses = courses.filter((c) => c.level === 'UG');
  const pgCourses = courses.filter((c) => c.level === 'PG');

  return (
    <>
      <div className="print:hidden">
        <SectionHeading
          eyebrow="Career"
          title="Curriculum vitae"
          description=""
        />
      </div>

      <article className="cv-printable space-y-12">
        <section>
          <h2 className="text-xl font-medium">Profile</h2>
          <p className="mt-3 max-w-3xl text-pretty text-ink-700 dark:text-ink-200">
            Computer engineer and student-centred educator with over a decade of teaching and
            academic leadership across Australian and international institutions. PhD (UNSW) in
            hardware-Trojan detection for Network-on-Chip MPSoCs. Currently a Teaching Fellow at the
            University of Strathclyde, Bahrain campus. Research interests: AI in higher education,
            game-based learning, cyber-physical systems for healthcare.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">Experience</h2>
          <ol className="mt-4 space-y-6">
            {cvData.experience.map((e, i) => (
              <li key={i} className="grid gap-1 sm:grid-cols-[160px_1fr]">
                <p className="text-sm text-ink-500 dark:text-ink-300">
                  {ym(e.start)} → {ym(e.end)}
                </p>
                <div>
                  <p className="font-medium">{e.role}</p>
                  <p className="text-sm text-ink-500 dark:text-ink-300">
                    {e.org}
                    {e.location && ` · ${e.location}`}
                  </p>
                  {e.notes && (
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-ink-700 dark:text-ink-200">
                      {e.notes.map((n, j) => (
                        <li key={j}>{n}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-medium">Education</h2>
          <ol className="mt-4 space-y-4">
            {cvData.education.map((e, i) => (
              <li key={i} className="grid gap-1 sm:grid-cols-[160px_1fr]">
                <p className="text-sm text-ink-500 dark:text-ink-300">{ym(e.end)}</p>
                <div>
                  <p className="font-medium">{e.degree}</p>
                  <p className="text-sm text-ink-500 dark:text-ink-300">
                    {e.school}
                    {e.location && ` · ${e.location}`}
                  </p>
                  {e.thesis && (
                    <p className="mt-1 text-sm italic text-ink-700 dark:text-ink-200">
                      Thesis: {e.thesis}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-medium">Selected publications</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
            Full list at <a href="/publications/">/publications</a>.
          </p>
          <ol className="mt-4 space-y-3">
            {publications.slice(0, 6).map((p) => (
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

        <section>
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

        <section>
          <h2 className="text-xl font-medium">Awards &amp; recognition</h2>
          <ul className="mt-4 space-y-2">
            {cvData.awards.map((a, i) => (
              <li key={i} className="grid gap-1 sm:grid-cols-[80px_1fr]">
                <p className="text-sm text-ink-500 dark:text-ink-300">{a.year}</p>
                <p>
                  <span className="font-medium">{a.title}.</span>{' '}
                  {a.detail && (
                    <span className="text-sm text-ink-500 dark:text-ink-300">{a.detail}</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium">Service</h2>
          <ul className="mt-4 list-disc space-y-1 pl-4 text-sm text-ink-700 dark:text-ink-200">
            {cvData.service.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
