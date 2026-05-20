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
      <SectionHeading eyebrow="Research" title="Publications" />

      {/* Publisher logos */}
      <div className="mb-8 flex flex-wrap items-center gap-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-ink-500">
          Published in
        </span>
        {[
          { src: '/logos/IEEE.png',     alt: 'IEEE' },
          { src: '/logos/Springer.png', alt: 'Springer' },
        ].map((logo) => (
          <img
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            className="h-7 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>

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
