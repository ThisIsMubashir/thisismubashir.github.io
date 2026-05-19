'use client';

import { useState } from 'react';
import { Check, ChevronDown, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  bibtex: string;
}

/**
 * Collapsible BibTeX block with one-click copy. Defaults to collapsed so the
 * detail page doesn't dump 12 lines of citation key on top of the reader.
 */
export function BibTexBlock({ bibtex }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be blocked */
    }
  };

  return (
    <div className="rounded-lg border border-ink-100 dark:border-ink-800">
      <div className="flex items-center justify-between border-b border-ink-100 p-3 dark:border-ink-800">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="bibtex-content"
          className="inline-flex items-center gap-2 text-sm font-medium"
        >
          <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
          BibTeX
        </button>
        <Button variant="ghost" size="sm" onClick={copy}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      {open && (
        <pre
          id="bibtex-content"
          className="overflow-x-auto p-3 text-xs font-mono leading-relaxed"
        >
          <code>{bibtex}</code>
        </pre>
      )}
    </div>
  );
}
