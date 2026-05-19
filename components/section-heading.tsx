import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl text-ink-900/70 dark:text-ink-50/70">{description}</p>
      )}
    </header>
  );
}
