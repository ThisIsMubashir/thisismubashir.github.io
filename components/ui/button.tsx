import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ' +
  'dark:focus-visible:ring-offset-ink-950 ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 ' +
    'dark:bg-brand-500 dark:hover:bg-brand-400 dark:active:bg-brand-300 dark:text-ink-950',
  secondary:
    'border border-ink-200 bg-white text-ink-900 hover:bg-ink-50 active:bg-ink-100 ' +
    'dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50 dark:hover:bg-ink-800 dark:active:bg-ink-700',
  ghost:
    'text-ink-900 hover:bg-ink-100 active:bg-ink-200 ' +
    'dark:text-ink-50 dark:hover:bg-ink-800 dark:active:bg-ink-700',
  link:
    'text-brand-700 underline-offset-4 hover:underline px-0 py-0 dark:text-brand-300',
  danger:
    'bg-danger-600 text-white hover:bg-danger-500 active:bg-danger-900',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        base,
        variants[variant],
        variant !== 'link' && sizes[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      )}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
