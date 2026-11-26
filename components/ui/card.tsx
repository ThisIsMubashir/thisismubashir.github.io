import * as React from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'plain' | 'outlined' | 'elevated';
type CardElement = 'div' | 'article' | 'section' | 'li';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  as?: CardElement;
}

const variants: Record<CardVariant, string> = {
  plain:    'bg-transparent',
  // Both map to the site-wide .surface token (globals.css) so every card matches.
  outlined: 'surface',
  elevated: 'surface surface-hover',
};

export function Card({
  as: Tag = 'div',
  variant = 'outlined',
  className,
  children,
  ...props
}: CardProps) {
  // Cast: HTMLAttributes<HTMLElement> is structurally compatible with each tag's
  // attribute set — the small overlap differences (e.g. <li>'s `value`) aren't
  // exposed via this API.
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 pb-3', className)} {...props} />;
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 pt-3', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-t border-ink-100 p-5 text-sm dark:border-ink-800',
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('card-title', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('mt-1 text-sm text-ink-500 dark:text-ink-300', className)}
      {...props}
    />
  );
}
