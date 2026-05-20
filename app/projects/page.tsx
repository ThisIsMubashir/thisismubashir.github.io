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
      <SectionHeading
       
        title="Projects"
        description=""
      />
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
