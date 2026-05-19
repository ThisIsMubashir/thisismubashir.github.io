import * as React from 'react';
import { cn } from '@/lib/utils';

const fieldBase =
  'block w-full rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-900 placeholder:text-ink-400 ' +
  'transition-colors focus-visible:outline-none focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500/40 ' +
  'disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400 ' +
  'dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50 dark:placeholder:text-ink-500 dark:disabled:bg-ink-800 ' +
  'aria-[invalid=true]:border-danger-500 aria-[invalid=true]:focus-visible:ring-danger-500/40';

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control -- this primitive is always paired with a control by Field or callers via htmlFor
    <label
      ref={ref}
      className={cn('mb-1.5 block text-sm font-medium text-ink-900 dark:text-ink-50', className)}
      {...props}
    />
  ),
);
Label.displayName = 'Label';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input ref={ref} type={type} className={cn(fieldBase, 'h-10', className)} {...props} />
  ),
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, rows = 5, ...props }, ref) => (
    <textarea ref={ref} rows={rows} className={cn(fieldBase, 'py-2', className)} {...props} />
  ),
);
Textarea.displayName = 'Textarea';

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(fieldBase, 'h-10 pr-8', className)} {...props}>
      {children}
    </select>
  ),
);
Select.displayName = 'Select';

interface FieldProps {
  id: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactElement;
}

/**
 * Convenience wrapper that pairs a Label with one of the field primitives and
 * wires up `aria-describedby` for descriptions and error messages.
 */
export function Field({ id, label, description, error, required, children }: FieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-danger-600" aria-hidden>*</span>}
      </Label>
      {description && (
        <p id={descriptionId} className="mb-1.5 text-xs text-ink-500 dark:text-ink-300">
          {description}
        </p>
      )}
      {React.cloneElement(children, {
        id,
        required,
        'aria-invalid': !!error || undefined,
        'aria-describedby': describedBy,
      } as Record<string, unknown>)}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-danger-600">
          {error}
        </p>
      )}
    </div>
  );
}
