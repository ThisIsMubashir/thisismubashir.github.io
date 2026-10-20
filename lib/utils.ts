import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine class names with Tailwind-aware merging.
 * `cn('p-2', condition && 'p-4')` collapses to `p-4` when condition is true.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Sanity Portable Text → plain paragraphs (text blocks only; images etc. are skipped). */
export function blocksToParagraphs(blocks?: unknown[]): string[] {
  return (blocks ?? []).flatMap((b) => {
    if (typeof b === 'string') return [b];
    const block = b as { _type?: string; children?: { text?: string }[] };
    if (block?._type !== 'block') return [];
    const text = (block.children ?? []).map((c) => c.text ?? '').join('');
    return text ? [text] : [];
  });
}

export const siteConfig = {
  name: 'Dr. Mubashir Hussain',
  shortName: 'Mubashir Hussain',
  tagline: 'Computer Engineer · Academic · Educator',
  title: 'Dr. Mubashir Hussain — Computer Engineering & Academic Portfolio',
  description:
    'A decade of teaching, supervision, and research in computer engineering — hardware security, ' +
    'network-on-chip design, academic leadership. Currently Teaching Fellow at the University of ' +
    'Strathclyde (Bahrain).',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thisismubashir.github.io',
  authorEmail: 'mubashir.hussain@live.com',
  // TODO(mubashir): create a Cal.com or Calendly link for 15-min intro chats, paste it here.
  calendarUrl: '',
  social: {
    github: 'https://github.com/ThisIsMubashir',
    linkedin: 'https://www.linkedin.com/in/thisismubashir',
    scholar: 'https://scholar.google.com/citations?user=Rmv3kMkAAAAJ&hl=en',
    orcid: '', // TODO(mubashir): add ORCID
  },
} as const;

export type SiteConfig = typeof siteConfig;
