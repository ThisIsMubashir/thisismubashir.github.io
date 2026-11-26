import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Cpu, GraduationCap, Users } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/project-card';
import { getCpdEntries, getProjects, getPublications } from '@/lib/content';
import { PublicationStack } from '@/components/publication-stack';
import { ScrollReveal } from '@/components/scroll-reveal';

export const metadata = buildMetadata({
  title: 'Home',
  description: siteConfig.description,
  path: '/',
});

const academicLogos = [
  { src: '/logos/journey/strath.jpeg', name: 'University of Strathclyde Bahrain' },
  { src: '/logos/journey/koi.jpeg', name: "King's Own Institute" },
  { src: '/logos/journey/vit.jpeg', name: 'Victorian Institute of Technology' },
  { src: '/logos/journey/feduni.jpeg', name: 'Federation University Australia' },
  { src: '/logos/journey/usc.jpeg', name: 'University of the Sunshine Coast' },
  { src: '/logos/CQU.png', name: 'CQUniversity' },
  { src: '/logos/SISTC.png', name: 'Sydney International School of Technology & Commerce' },
  { src: '/logos/journey/unsw.jpeg', name: 'UNSW Sydney' },
  { src: '/logos/journey/uet.jpeg', name: 'UET Taxila' },
  { src: '/logos/journey/bahria.jpeg', name: 'Bahria University' },
];

export default async function HomePage() {
  const [publications, projects, cpd] = await Promise.all([getPublications(), getProjects(), getCpdEntries()]);
  // Talks, outreach and certifications that have a logo — shown as a scrolling strip.
  const highlights = cpd.filter((e) => e.logo && ['talk', 'outreach', 'certification'].includes(e.kind));

  // Featured first; fall back to most-recent if fewer than 3 are flagged.
  const featuredPubs = [
    ...publications.filter((p) => p.featured),
    ...publications.filter((p) => !p.featured),
  ].slice(0, 4);
  const featuredProjects = [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ].slice(0, 3);

  return (
    <>
      <section className="flex min-h-[80vh] flex-col items-center justify-center pb-4 pt-12 text-center sm:pt-16">
        <p className="inline-flex items-center rounded-full border border-ink-200/80 bg-white/80 px-4 py-1.5 text-xs font-medium tracking-wide text-ink-600 backdrop-blur dark:border-ink-700/80 dark:bg-ink-900/80 dark:text-ink-300">
          {siteConfig.tagline}
        </p>
        <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl lg:text-7xl">
          Hi, I&apos;m Dr.&nbsp;Mubashir Hussain.
        </h1>
        <p className="mt-4 text-base font-medium text-ink-500 dark:text-ink-300 sm:text-lg">
          Computer Engineer · Lecturer · Researcher
        </p>
        <p className="mt-6 max-w-prose text-pretty text-sm text-ink-600 dark:text-ink-300 sm:text-base">
          I teach, supervise, and research at the intersection of computer engineering and education
          — security, artificial intelligence, and teaching &amp; learning. Currently a
          Lecturer at the University of Strathclyde, Bahrain.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/publications/">
            <Button variant="primary" className="rounded-full" size="lg">
              <BookOpen className="h-4 w-4" /> Publications
            </Button>
          </Link>
          <Link href="/projects/">
            <Button variant="secondary" className="rounded-full" size="lg">
              <Cpu className="h-4 w-4" /> Projects
            </Button>
          </Link>
          <Link href="/contact/">
            <Button variant="ghost" className="rounded-full" size="lg">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Academic journey — static logo cards at the bottom of the hero */}
        <div className="mt-12 w-full">
          <p className="eyebrow mb-5">
            Academic journey
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {academicLogos.map((logo) => (
              <li
                key={logo.name}
                className="flex items-center gap-2.5 surface p-2.5"
              >
                <Image
                  src={logo.src}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0 rounded-md bg-white object-contain p-0.5"
                />
                <p className="line-clamp-2 text-left text-xs font-medium leading-snug text-ink-800 dark:text-ink-100">
                  {logo.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {highlights.length > 0 && (
        <section className="border-t border-ink-100/60 pb-8 pt-6 dark:border-ink-800/60">
          <div className="mb-4 flex items-end justify-between gap-4">
            <p className="eyebrow">
              Talks, outreach &amp; certifications
            </p>
            <Link
              href="/teaching/cpd/"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <ul
              className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]"
              style={{ animationDuration: `${highlights.length * 5}s` }}
            >
              {[...highlights, ...highlights].map((h, i) => (
                <li
                  key={i}
                  aria-hidden={i >= highlights.length || undefined}
                  className="flex w-72 shrink-0 items-center gap-3 surface p-3"
                >
                  <Image
                    src={h.logo!}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-md bg-white object-contain p-0.5"
                  />
                  <p className="line-clamp-2 text-left text-sm font-medium leading-snug text-ink-800 dark:text-ink-100">
                    {h.title.replace(/^(Seminar|Workshop|Training|Industry talk): /, '')}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-ink-100/60 py-12 dark:border-ink-800/60">
        <ScrollReveal className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Currently
            icon={<GraduationCap className="h-5 w-5" />}
            label="Now"
            title="Lecturer"
            detail="University of Strathclyde, Bahrain campus"
          />
          <Currently
            icon={<Users className="h-5 w-5" />}
            label="Supervising"
            title="Industry-linked capstones"
            detail="UG and PG projects from proposal to delivery"
          />
          <Currently
            icon={<Cpu className="h-5 w-5" />}
            label="Researching"
            title="Security, AI, teaching & learning"
            detail="Hardware & smart-grid security, AI in HE, game-based learning"
          />
        </ScrollReveal>
      </section>

      {featuredProjects.length > 0 && (
        <section className="border-t border-ink-100 py-12 dark:border-ink-800">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="section-title">Selected projects</h2>
            <Link
              href="/projects/"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ScrollReveal as="ul" className="grid gap-4 sm:grid-cols-3">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <ProjectCard
                  title={p.title}
                  slug={p.slug}
                  summary={p.summary}
                  current={p.current}
                  repoUrl={p.repoUrl}
                  demoUrl={p.demoUrl}
                  aiAssisted={p.aiAssisted}
                />
              </li>
            ))}
          </ScrollReveal>
        </section>
      )}

      {featuredPubs.length > 0 && (
        <section className="border-t border-ink-100 py-12 dark:border-ink-800">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="section-title">Selected publications</h2>
            <Link
              href="/publications/"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300"
            >
              All publications <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <PublicationStack pubs={featuredPubs} />
        </section>
      )}
    </>
  );
}

function Currently({
  icon,
  label,
  title,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="surface p-5">
      <p className="eyebrow flex items-center gap-2">
        {icon} {label}
      </p>
      <p className="mt-2 font-serif text-lg font-medium text-ink-900 dark:text-ink-50">{title}</p>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{detail}</p>
    </div>
  );
}
