import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type LinkVariant = 'inline' | 'muted' | 'button-primary' | 'button-secondary';

interface AppLinkProps extends ComponentProps<typeof NextLink> {
  variant?: LinkVariant;
  external?: boolean;
}

const variants: Record<LinkVariant, string> = {
  inline:
    'text-brand-700 underline underline-offset-4 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200',
  muted:
    'text-ink-500 underline-offset-4 hover:text-ink-900 hover:underline dark:text-ink-400 dark:hover:text-ink-50',
  'button-primary':
    'inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:text-ink-950 dark:hover:bg-brand-400',
  'button-secondary':
    'inline-flex items-center gap-2 rounded-md border border-ink-200 px-4 py-2 text-sm font-medium no-underline transition-colors hover:bg-ink-50 dark:border-ink-700 dark:hover:bg-ink-800',
};

export function Link({ variant = 'inline', external, className, children, ...props }: AppLinkProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {};

  return (
    <NextLink className={cn(variants[variant], className)} {...externalProps} {...props}>
      {children}
    </NextLink>
  );
}
