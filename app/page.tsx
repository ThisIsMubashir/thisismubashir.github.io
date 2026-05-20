import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Cpu, GraduationCap, Users } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/project-card';
import { PublicationEntry } from '@/components/publication-entry';
import { getProjects, getPublications } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Home',
  description: siteConfig.description,
  path: '/',
});

const academicLogos = [
  { src: '/logos/UoSB.png',                      alt: 'University of Strathclyde Bahrain' },
  { src: '/logos/KOI.png',                       alt: "King's Own Institute" },
  { src: '/logos/VIT.png',                       alt: 'Victorian Institute of Technology' },
  { src: '/logos/FedUni.png',                    alt: 'Federation University' },
  { src: '/logos/UniversityOfSunshineCoast.png', alt: 'University of the Sunshine Coast' },
  { src: '/logos/CQU.png',                       alt: 'CQUniversity' },
  { src: '/logos/SISTC.png',                     alt: 'Sydney International School of Technology & Commerce' },
  { src: '/logos/BahrainUni.jpeg',               alt: 'Bahria University' },
  { src: '/logos/UniversityofEngTech.jpeg',       alt: 'University of Engineering & Technology Taxila' },
  { src: '/logos/UNSW.jpg',                      alt: 'UNSW Sydney' },
  { src: '/logos/IEEE.png',                      alt: 'IEEE' },
  { src: '/logos/ACS.png',                       alt: 'Australian Computer Society' },
];

export default async function HomePage() {
  const [publications, projects] = await Promise.all([getPublications(), getProjects()]);

  // Featured first; fall back to most-recent if fewer than 3 are flagged.
  const featuredPubs = [...publications.filter((p) => p.featured), ...publications.filter((p) => !p.featured)].slice(0, 3);
  const featuredProjects = [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ].slice(0, 3);

  return (
    <>
      <section className="flex min-h-[88vh] flex-col items-center justify-center py-12 text-center sm:py-16">
        <p className="inline-flex items-center rounded-full border border-ink-200/80 bg-white/80 px-4 py-1.5 text-xs font-medium tracking-wide text-ink-600 backdrop-blur dark:border-ink-700/80 dark:bg-ink-900/80 dark:text-ink-300">
          {siteConfig.tagline}
        </p>
        <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl lg:text-7xl">
          Hi, I&apos;m Dr.&nbsp;Mubashir Hussain.
        </h1>
        <p className="mt-4 text-base font-medium text-ink-500 dark:text-ink-300 sm:text-lg">
          Computer Engineer · Teaching Fellow · Researcher
        </p>
        <p className="mt-6 max-w-prose text-pretty text-sm text-ink-600 dark:text-ink-300 sm:text-base">
          I teach, supervise, and research at the intersection of computer engineering and
          education — hardware security, network-on-chip design, and AI in higher education.
          Currently a Teaching Fellow at the University of Strathclyde, Bahrain.
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

        {/* Academic journey marquee — sits at bottom of hero, visible on first load */}
        <div className="mt-16 w-full">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-ink-500">
            Academic journey
          </p>
          <div className="overflow-hidden">
            <div className="flex animate-marquee items-center gap-4">
              {[...academicLogos, ...academicLogos].map((logo, i) => (
                <div key={i} className="flex h-12 w-28 shrink-0 items-center justify-center sm:h-16 sm:w-40">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={150}
                    height={56}
                    className="max-h-10 w-auto max-w-[110px] object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:max-h-14 sm:max-w-[150px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 border-t border-ink-100/60 py-12 sm:grid-cols-3 dark:border-ink-800/60">
        <Currently
          icon={<GraduationCap className="h-5 w-5" />}
          label="Now"
          title="Teaching Fellow"
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
          title="Cyber-physical systems"
          detail="Healthcare, game-based learning, AI in HE"
        />
      </section>

      {featuredProjects.length > 0 && (
        <section className="border-t border-ink-100 py-12 dark:border-ink-800">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl">Selected projects</h2>
            <Link
              href="/projects/"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <ProjectCard
                  title={p.title}
                  slug={p.slug}
                  summary={p.summary}
                  endDate={p.endDate ?? undefined}
                  repoUrl={p.repoUrl}
                  demoUrl={p.demoUrl}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {featuredPubs.length > 0 && (
        <section className="border-t border-ink-100 py-12 dark:border-ink-800">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl">Selected publications</h2>
            <Link
              href="/publications/"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300"
            >
              All publications <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="divide-y divide-ink-100 dark:divide-ink-800">
            {featuredPubs.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/publications/${p.slug}/`}
                  className="block no-underline hover:bg-ink-50/60 dark:hover:bg-ink-900/40"
                >
                  <PublicationEntry
                    title={p.title}
                    authors={p.authors}
                    venue={p.venue}
                    year={p.year}
                    type={p.type}
                    doi={p.doi}
                    url={p.url}
                  />
                </Link>
              </li>
            ))}
          </ul>
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
    <div className="rounded-2xl border border-ink-100/70 bg-white/70 p-5 backdrop-blur dark:border-ink-800/70 dark:bg-ink-900/50">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        {icon} {label}
      </p>
      <p className="mt-2 font-serif text-lg font-medium text-ink-900 dark:text-ink-50">{title}</p>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{detail}</p>
    </div>
  );
}
