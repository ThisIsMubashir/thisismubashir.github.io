import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <header className="mb-10">
      {eyebrow && (
        <p className="inline-flex items-center rounded-full border border-ink-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-600 backdrop-blur dark:border-ink-700/80 dark:bg-ink-900/80 dark:text-ink-400">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-ink-600 dark:text-ink-300">{description}</p>
      )}
    </header>
  );
}
