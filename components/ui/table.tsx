import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Lightweight, accessible table primitives. Caller composes them — keeps
 * markup explicit and easy to make sortable/filterable later.
 *
 * Usage:
 *   <Table caption="CPD trainings, newest first">
 *     <TableHead>
 *       <TableRow><TableHeader>Title</TableHeader>…</TableRow>
 *     </TableHead>
 *     <TableBody>
 *       <TableRow><TableCell>…</TableCell></TableRow>
 *     </TableBody>
 *   </Table>
 */
interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  caption?: string;
  captionHidden?: boolean;
}

export function Table({ caption, captionHidden = true, className, children, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-ink-100 dark:border-ink-800">
      <table
        className={cn('w-full text-left text-sm', className)}
        {...props}
      >
        {caption && (
          <caption className={cn(captionHidden && 'sr-only', !captionHidden && 'p-3 text-left text-ink-500')}>
            {caption}
          </caption>
        )}
        {children}
      </table>
    </div>
  );
}

export function TableHead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        'bg-ink-50 text-xs font-medium uppercase tracking-wider text-ink-500 dark:bg-ink-900 dark:text-ink-300',
        className,
      )}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn('divide-y divide-ink-100 dark:divide-ink-800', className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn(className)} {...props} />;
}

export function TableHeader({
  className,
  scope = 'col',
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th scope={scope} className={cn('px-4 py-3', className)} {...props} />
  );
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-4 py-3 align-top', className)} {...props} />;
}
