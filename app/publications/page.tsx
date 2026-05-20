import { SectionHeading } from '@/components/section-heading';
import { PublicationsList } from '@/components/publications-list';
import { buildMetadata } from '@/lib/seo';
import { getPublications } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Publications',
  description: 'Peer-reviewed publications by Dr. Mubashir Hussain — journals, conferences, chapters.',
  path: '/publications',
});

export default async function PublicationsPage() {
  const pubs = await getPublications();

  return (
    <>
      <SectionHeading
        eyebrow="Research"
        title="Publications"
        description=""
      />
      {pubs.length === 0 ? (
        <p className="rounded-lg border border-dashed border-ink-200 p-6 text-center text-sm text-ink-500 dark:border-ink-700 dark:text-ink-300">
          No publications loaded yet.
        </p>
      ) : (
        <PublicationsList publications={pubs} />
      )}
    </>
  );
}
