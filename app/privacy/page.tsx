import { SectionHeading } from '@/components/section-heading';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy',
  description: 'What is and isn’t tracked on this site.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral max-w-2xl dark:prose-invert">
      <SectionHeading eyebrow="Site" title="Privacy" />
      <p>
        This site doesn&apos;t set tracking cookies. If analytics are enabled, they use Plausible —
        a privacy-friendly, GDPR-compliant service that collects aggregate visit counts only,
        without IP storage or fingerprinting.
      </p>
      <p>
        The contact form sends your message through Formspree to my inbox. Your email is used only
        to reply.
      </p>
    </article>
  );
}
