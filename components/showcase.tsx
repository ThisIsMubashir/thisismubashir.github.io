import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SwatchProps {
  name: string;
  value: string;
  textOn?: 'light' | 'dark';
}

export function Swatch({ name, value, textOn = 'light' }: SwatchProps) {
  return (
    <div className="overflow-hidden rounded-md border border-ink-100 dark:border-ink-800">
      <div
        className={cn('flex h-16 items-end justify-between px-2.5 pb-1.5 text-xs font-mono',
          textOn === 'light' ? 'text-ink-900' : 'text-white')}
        style={{ backgroundColor: value }}
      >
        <span>{name}</span>
        <span className="opacity-80">{value}</span>
      </div>
    </div>
  );
}

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function DsSection({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-ink-100 py-12 dark:border-ink-800 first:border-t-0 first:pt-0">
      <h2 className="font-medium text-2xl">
        <a href={`#${id}`} className="no-underline hover:underline">
          {title}
        </a>
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-ink-500 dark:text-ink-300">{description}</p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}

interface ExampleProps {
  label?: string;
  /** Single line of source so consumers can see how to use the component. */
  source?: string;
  children: ReactNode;
}

export function Example({ label, source, children }: ExampleProps) {
  return (
    <div className="mb-8 last:mb-0">
      {label && (
        <p className="mb-2 text-xs font-mono uppercase tracking-wider text-ink-500 dark:text-ink-300">
          {label}
        </p>
      )}
      <div className="rounded-lg border border-ink-100 bg-ink-50/40 p-6 dark:border-ink-800 dark:bg-ink-900/40">
        {children}
      </div>
      {source && (
        <pre className="mt-2 overflow-x-auto rounded-md border border-ink-100 bg-white p-3 text-xs font-mono text-ink-700 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-200">
          <code>{source}</code>
        </pre>
      )}
    </div>
  );
}
