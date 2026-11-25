import Image from 'next/image';
import { Award, BookOpenCheck, Briefcase, GraduationCap, HeartHandshake, Mic, Users } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo';
import { CPD_CATEGORIES, getCpdEntries, type CpdEntry, type CpdKind } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Professional development & service',
  description:
    'Talks and workshops delivered, peer review for journals and conferences, certifications in AI, cybersecurity and teaching, and continuing professional development.',
  path: '/teaching/cpd',
});

const ICONS: Record<CpdKind, typeof Mic> = {
  talk: Mic,
  outreach: Users,
  review: BookOpenCheck,
  certification: Award,
  workshop: GraduationCap,
  professional: Briefcase,
  compliance: HeartHandshake,
};

function byYear(rows: CpdEntry[]): [number, CpdEntry[]][] {
  const m = new Map<number, CpdEntry[]>();
  for (const r of rows) m.set(r.year, [...(m.get(r.year) ?? []), r]);
  return [...m].sort(([a], [b]) => b - a);
}

/** "Seminar: Title" → ["Seminar", "Title"]; titles without a short prefix → [undefined, title]. */
function splitType(title: string): [string | undefined, string] {
  const i = title.indexOf(': ');
  return i > 0 && i < 12 ? [title.slice(0, i), title.slice(i + 2)] : [undefined, title];
}

function Timeline({ rows }: { rows: CpdEntry[] }) {
  return (
    <ScrollReveal as="ol" className="relative space-y-6 border-l border-ink-200 pl-6 dark:border-ink-700">
      {rows.map((t) => {
        const [type, title] = splitType(t.title);
        return (
          <li key={t.slug} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-600 ring-4 ring-white dark:ring-ink-950" />
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-medium text-ink-500 dark:text-ink-400">{t.year}</span>
              {type && <Badge tone="brand">{type}</Badge>}
            </div>
            <p className="mt-1 font-medium text-ink-900 dark:text-ink-50">{title}</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">{t.provider}</p>
          </li>
        );
      })}
    </ScrollReveal>
  );
}

function Highlights({ rows }: { rows: CpdEntry[] }) {
  return (
    <ScrollReveal as="ul" className="grid gap-4 sm:grid-cols-2">
      {rows.map((o) => (
        <Card as="li" key={o.slug} variant="elevated" className="p-5">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-ink-500 dark:text-ink-400">{o.year}</span>
            <span className="text-ink-400">·</span>
            <span className="text-ink-500 dark:text-ink-400">{o.provider}</span>
          </div>
          <p className="mt-2 font-medium text-ink-900 dark:text-ink-50">{o.title}</p>
          {o.summary && <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{o.summary}</p>}
        </Card>
      ))}
    </ScrollReveal>
  );
}

function Reviews({ rows }: { rows: CpdEntry[] }) {
  return (
    <ScrollReveal as="ul" className="grid gap-3 sm:grid-cols-2">
      {rows.map((r) => (
        <Card as="li" key={r.slug} className="p-4">
          <div className="flex items-center gap-2 text-xs">
            <Badge tone={r.provider === 'Journal' ? 'info' : 'neutral'}>{r.provider}</Badge>
            <span className="text-ink-500 dark:text-ink-400">{r.year}</span>
          </div>
          <p className="mt-2 text-sm font-medium text-ink-900 dark:text-ink-50">{r.title}</p>
        </Card>
      ))}
    </ScrollReveal>
  );
}

const MICRO = 'Microskill · ';

function Certificates({ rows }: { rows: CpdEntry[] }) {
  return (
    <ScrollReveal as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((c) => {
        const micro = c.provider?.startsWith(MICRO);
        return (
          <Card as="li" key={c.slug} variant="elevated" className="flex gap-3 p-4">
            {c.logo && (
              <Image
                src={c.logo}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-md border border-ink-100 object-contain dark:border-ink-800"
              />
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium leading-snug text-ink-900 dark:text-ink-50">{c.title}</p>
              <p className="mt-1 text-xs text-ink-600 dark:text-ink-300">
                {micro ? c.provider!.slice(MICRO.length) : c.provider} · {c.year}
              </p>
              {micro && (
                <Badge tone="success" className="mt-2">
                  Microskill
                </Badge>
              )}
            </div>
          </Card>
        );
      })}
    </ScrollReveal>
  );
}

function YearList({ rows }: { rows: CpdEntry[] }) {
  return (
    <div className="space-y-8">
      {byYear(rows).map(([year, items]) => (
        <div key={year} className="grid gap-2 sm:grid-cols-[5rem_1fr]">
          <h3 className="font-serif text-lg font-bold text-brand-700 dark:text-brand-300">{year}</h3>
          <ul className="divide-y divide-ink-100 dark:divide-ink-800">
            {items.map((t) => {
              const [type, title] = splitType(t.title);
              return (
                <li
                  key={t.slug}
                  className="flex flex-col gap-1 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-sm text-ink-900 dark:text-ink-50">
                    {type && <Badge className="mr-2">{type}</Badge>}
                    {title}
                  </span>
                  <span className="shrink-0 text-xs text-ink-500 dark:text-ink-400 sm:text-right">{t.provider}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

const RENDER: Record<CpdKind, (p: { rows: CpdEntry[] }) => React.ReactNode> = {
  talk: Timeline,
  outreach: Highlights,
  review: Reviews,
  certification: Certificates,
  workshop: YearList,
  professional: YearList,
  compliance: YearList,
};

export default async function CpdPage() {
  const all = await getCpdEntries();
  const sections = CPD_CATEGORIES.map((c) => ({ ...c, rows: all.filter((e) => e.kind === c.kind) })).filter(
    (s) => s.rows.length > 0,
  );

  return (
    <>
      <SectionHeading
        title="Professional development & service"
        description="Sharing practice with colleagues, reviewing for the research community, and keeping my own skills current."
      />

      <nav aria-label="Categories" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sections.map(({ kind, label, rows }) => {
          const Icon = ICONS[kind];
          return (
            <a
              key={kind}
              href={`#${kind}`}
              className="group rounded-lg border border-ink-100 bg-white p-4 transition-colors hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700"
            >
              <Icon className="h-5 w-5 text-brand-700 dark:text-brand-300" aria-hidden />
              <p className="mt-3 font-serif text-3xl font-bold text-ink-900 dark:text-ink-50">{rows.length}</p>
              <p className="mt-1 text-xs text-ink-600 group-hover:text-ink-900 dark:text-ink-300 dark:group-hover:text-ink-50">
                {label}
              </p>
            </a>
          );
        })}
      </nav>

      {sections.map(({ kind, label, intro, rows }) => {
        const Body = RENDER[kind];
        const heading = (
          <>
            <h2 className="font-serif text-xl font-bold text-ink-900 dark:text-ink-50 sm:text-2xl">{label}</h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{intro}</p>
          </>
        );
        // Mandatory training is worth listing but not worth a visitor's scroll — collapse it.
        return kind === 'compliance' ? (
          <section key={kind} id={kind} className="mt-16 scroll-mt-24">
            <details className="group">
              <summary className="cursor-pointer list-none">
                {heading}
                <span className="mt-3 inline-block text-sm font-medium text-brand-700 group-open:hidden dark:text-brand-300">
                  Show {rows.length} courses ↓
                </span>
              </summary>
              <div className="mt-6">
                <Body rows={rows} />
              </div>
            </details>
          </section>
        ) : (
          <section key={kind} id={kind} className="mt-16 scroll-mt-24">
            {heading}
            <div className="mt-6">
              <Body rows={rows} />
            </div>
          </section>
        );
      })}
    </>
  );
}
