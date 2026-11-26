'use client';

import { useState } from 'react';
import { Check, Copy, Quote } from 'lucide-react';
import type { Publication } from '@/lib/content';
import { cn } from '@/lib/utils';

type Style = 'APA' | 'Harvard' | 'BibTeX';
const STYLES: Style[] = ['APA', 'Harvard', 'BibTeX'];

/** "Mohammad Mamunur Rashid" → "Rashid, M. M." */
function surnameInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const surname = parts.pop() ?? '';
  return parts.length ? `${surname}, ${parts.map((p) => `${p[0]}.`).join(' ')}` : surname;
}

function joinNames(names: string[], last: string) {
  return names.length <= 1
    ? names.join('')
    : `${names.slice(0, -1).join(', ')}${last}${names[names.length - 1]}`;
}

export function formatCitation(p: Publication, style: Style): string {
  const link = p.doi ? `https://doi.org/${p.doi}` : (p.url ?? '');
  const names = p.authors.map(surnameInitials);
  if (style === 'APA') {
    return `${joinNames(names, names.length > 2 ? ', & ' : ' & ')} (${p.year}). ${p.title}. ${p.venue ?? ''}.${link ? ` ${link}` : ''}`;
  }
  if (style === 'Harvard') {
    return `${joinNames(names, ' and ')} (${p.year}) '${p.title}', ${p.venue ?? ''}.${link ? ` Available at: ${link}.` : ''}`;
  }
  return (
    p.bibtex ??
    `@misc{${p.slug},\n  title={${p.title}},\n  author={${p.authors.join(' and ')}},\n  year={${p.year}}${p.doi ? `,\n  doi={${p.doi}}` : ''}\n}`
  );
}

/** "Cite" toggle — reveals APA / Harvard / BibTeX with a copy button. `action` sits on the same row. */
export function CiteButton({ pub, action }: { pub: Publication; action?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<Style>('APA');
  const [copied, setCopied] = useState(false);
  const text = formatCitation(pub, style);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — the text is still selectable */
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:text-ink-200 dark:hover:border-brand-700 dark:hover:text-brand-300"
        >
          <Quote className="h-3.5 w-3.5" /> Cite
        </button>
        {action}
      </div>

      {open && (
        <div className="mt-4 rounded-xl border border-ink-100 bg-ink-50/60 p-4 dark:border-ink-800 dark:bg-ink-950/40">
          <div className="flex items-center justify-between gap-3">
            <div role="tablist" aria-label="Citation style" className="flex gap-1">
              {STYLES.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={style === s}
                  onClick={() => setStyle(s)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                    style === s
                      ? 'bg-brand-600 text-white'
                      : 'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 dark:text-brand-300"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="mt-3 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-ink-800 dark:text-ink-100">
            {text}
          </pre>
        </div>
      )}
    </div>
  );
}
