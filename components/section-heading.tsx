import type { ReactNode } from 'react';

interface Props {
  title: string;
  description?: ReactNode;
}

export function SectionHeading({ title, description }: Props) {
  return (
    <header className="mb-10">
      <h1 className="bg-gradient-to-r from-brand-800 via-brand-600 to-brand-400 bg-clip-text font-serif text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-brand-700 dark:text-brand-300">{description}</p>
      )}
    </header>
  );
}
