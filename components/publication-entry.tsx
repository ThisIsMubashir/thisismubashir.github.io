'use client';

import { useState } from 'react';
import { Check, Copy, ExternalLink, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PublicationEntryProps {
  title: string;
  authors?: string[];
  /** Author name to bold when found in `authors`. Defaults to "Mubashir Hussain". */
  highlightAuthor?: string;
  venue?: string;
  year?: number;
  type?: 'journal' | 'conference' | 'chapter' | 'preprint' | string;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  bibtex?: string;
  /** Render as <li> instead of <article> when used inside a <ul>. */
  as?: 'article' | 'li';
}

const typeLabels: Record<string, string> = {
  journal: 'Journal',
  conference: 'Conference',
  chapter: 'Chapter',
  preprint: 'Preprint',
};

export function PublicationEntry({
  title,
  authors,
  highlightAuthor = 'Mubashir Hussain',
  venue,
  year,
  type,
  doi,
  url,
  pdfUrl,
  bibtex,
  as: Tag = 'article',
}: PublicationEntryProps) {
  const [copied, setCopied] = useState(false);

  const copyBibtex = async () => {
    if (!bibtex) return;
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be blocked in iframes; ignore silently
    }
  };

  return (
    <Tag className="py-5">
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 className="text-base font-medium text-ink-900 dark:text-ink-50">{title}</h3>
        {type && typeLabels[type] && <Badge tone="brand">{typeLabels[type]}</Badge>}
      </div>

      {authors && authors.length > 0 && (
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          {authors.map((a, i) => (
            <span key={`${a}-${i}`}>
              <span className={cn(a === highlightAuthor && 'font-medium text-ink-900 dark:text-ink-50')}>
                {a}
              </span>
              {i < authors.length - 1 && ', '}
            </span>
          ))}
        </p>
      )}

      {(venue || year) && (
        <p className="mt-1 text-sm italic text-ink-500 dark:text-ink-300">
          {venue}
          {venue && year && ' · '}
          {year}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {doi && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.open(`https://doi.org/${doi}`, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="h-3.5 w-3.5" /> DOI
          </Button>
        )}
        {url && !doi && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="h-3.5 w-3.5" /> Link
          </Button>
        )}
        {pdfUrl && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.open(pdfUrl, '_blank', 'noopener,noreferrer')}
          >
            <FileText className="h-3.5 w-3.5" /> PDF
          </Button>
        )}
        {bibtex && (
          <Button variant="ghost" size="sm" onClick={copyBibtex} aria-label="Copy BibTeX">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'BibTeX'}
          </Button>
        )}
      </div>
    </Tag>
  );
}
