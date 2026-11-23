import { SectionHeading } from '@/components/section-heading';
import { ProjectsList } from '@/components/projects-list';
import { buildMetadata } from '@/lib/seo';
import { getProjects } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Projects',
  description:
    'Research and engineering projects — hardware Trojan detection, WSN lifetime optimisation, PIC dev kits, web apps.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <SectionHeading title="Projects" />

      {/* Live GitHub contribution graph — fetched fresh by the browser on every load */}
      <div className="mb-10 overflow-hidden rounded-xl border border-ink-100 bg-white p-5 dark:border-ink-800 dark:bg-ink-900/40">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-ink-500">
          GitHub activity
        </p>
        {/* Light mode graph */}
        <img
          src="https://ghchart.rshah.org/2532b6/ThisIsMubashir"
          alt="GitHub contribution graph"
          className="w-full dark:hidden"
        />
        {/* Dark mode — invert the SVG colours */}
        <img
          src="https://ghchart.rshah.org/94a4ff/ThisIsMubashir"
          alt="GitHub contribution graph"
          className="hidden w-full dark:block"
        />
      </div>

      {projects.length === 0 ? (
        <p className="rounded-lg border border-dashed border-ink-200 p-6 text-center text-sm text-ink-500 dark:border-ink-700 dark:text-ink-300">
          No projects loaded yet.
        </p>
      ) : (
        <ProjectsList projects={projects} />
      )}
    </>
  );
}
