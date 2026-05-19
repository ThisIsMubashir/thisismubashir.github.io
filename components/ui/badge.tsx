import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200',
  brand:   'bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200',
  success: 'bg-success-50 text-success-900 dark:bg-success-900/40 dark:text-success-50',
  warning: 'bg-warning-50 text-warning-900 dark:bg-warning-900/40 dark:text-warning-50',
  danger:  'bg-danger-50 text-danger-900 dark:bg-danger-900/40 dark:text-danger-50',
  info:    'bg-info-50 text-info-900 dark:bg-info-900/40 dark:text-info-50',
};

export function Badge({ tone = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
