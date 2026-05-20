import type { ReactNode } from 'react';

interface Props {
  title: string;
  description?: ReactNode;
}

export function SectionHeading({ title, description }: Props) {
  return (
    <header className="mb-10">
      <h1 className="font-serif text-4xl font-bold tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-ink-600 dark:text-ink-300">{description}</p>
      )}
      <div className="mt-6 h-px w-full max-w-2xl bg-ink-200 dark:bg-ink-700" />
    </header>
  );
}
