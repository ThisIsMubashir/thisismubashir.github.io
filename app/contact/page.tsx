import Link from 'next/link';
import { Calendar, GraduationCap, Linkedin, Mail } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/utils';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch about teaching, supervision, research collaboration, talks, or industry projects.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <SectionHeading
       
        title="Get in touch"
        description="I read everything. Reply times vary — fastest by email."
      />

      <div className="mt-2 max-w-2xl space-y-10">
        <p className="text-pretty text-lg text-ink-700 dark:text-ink-200">
          Best for collaborations, talks, supervision queries, industry partnerships, or saying
          hello. If you&apos;d like a short intro chat, book a slot directly — otherwise email is
          perfect.
        </p>

        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${siteConfig.authorEmail}`} className="no-underline">
            <Button variant="primary" size="lg">
              <Mail className="h-4 w-4" />
              Email me
            </Button>
          </a>
          {siteConfig.calendarUrl ? (
            <a href={siteConfig.calendarUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button variant="secondary" size="lg">
                <Calendar className="h-4 w-4" />
                Book a 15-min chat
              </Button>
            </a>
          ) : (
            <Button variant="secondary" size="lg" disabled title="Calendar link coming soon">
              <Calendar className="h-4 w-4" />
              Book a 15-min chat
            </Button>
          )}
        </div>

        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[auto_1fr]">
          <dt className="text-sm font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">Email</dt>
          <dd>
            <a href={`mailto:${siteConfig.authorEmail}`} className="text-ink-900 dark:text-ink-50">
              {siteConfig.authorEmail}
            </a>
          </dd>

          <dt className="text-sm font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">LinkedIn</dt>
          <dd>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
              <Linkedin className="h-4 w-4" /> /in/thisismubashir
            </a>
          </dd>

          <dt className="text-sm font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">Scholar</dt>
          <dd>
            <a href={siteConfig.social.scholar} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" /> Google Scholar profile
            </a>
          </dd>
        </dl>

        <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-5 text-sm text-ink-700 dark:border-ink-800 dark:bg-ink-900/50 dark:text-ink-200">
          <p className="font-medium">A note on what I&apos;m available for</p>
          <p className="mt-2">
            Research collaboration · supervision queries · talks &amp; workshops · industry projects
            tied to teaching · interviews about academic leadership or curriculum design.
          </p>
          <p className="mt-2 text-ink-500 dark:text-ink-300">
            Currently not taking on freelance development work or paid consulting unsolicited.
          </p>
        </div>
      </div>

      <p className="mt-12 text-sm text-ink-500 dark:text-ink-300">
        Browse the rest of the site:{' '}
        <Link href="/publications/" className="text-brand-700 dark:text-brand-300">
          Publications
        </Link>{' '}·{' '}
        <Link href="/projects/" className="text-brand-700 dark:text-brand-300">
          Projects
        </Link>{' '}·{' '}
        <Link href="/cv/" className="text-brand-700 dark:text-brand-300">
          CV
        </Link>
        .
      </p>
    </>
  );
}
