'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChipsProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: T | null;
  onChange: (value: T | null) => void;
  /** When true, "All" pill is hidden — multi-axis filters typically suppress it on secondary axes. */
  hideAll?: boolean;
}

/**
 * Single-select filter row used for year/type/venue/tag axes.
 * Returns `null` when "All" is selected.
 */
export function FilterChips<T extends string>({
  label,
  options,
  selected,
  onChange,
  hideAll,
}: ChipsProps<T>) {
  if (options.length === 0) return null;

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-300">
        {label}
      </p>
      <ul className="flex flex-wrap gap-1.5" role="listbox" aria-label={label}>
        {!hideAll && (
          <li>
            <button
              type="button"
              role="option"
              aria-selected={selected === null}
              onClick={() => onChange(null)}
              className={cn(chipBase, selected === null ? chipActive : chipIdle)}
            >
              All
            </button>
          </li>
        )}
        {options.map((opt) => (
          <li key={opt}>
            <button
              type="button"
              role="option"
              aria-selected={selected === opt}
              onClick={() => onChange(selected === opt ? null : opt)}
              className={cn(chipBase, selected === opt ? chipActive : chipIdle)}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ClearProps {
  visible: boolean;
  onClear: () => void;
}

export function ClearFilters({ visible, onClear }: ClearProps) {
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={onClear}
      className="inline-flex items-center gap-1 text-xs font-medium text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
    >
      <X className="h-3 w-3" /> Clear all filters
    </button>
  );
}

const chipBase =
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors';
const chipIdle =
  'border-ink-200 bg-white text-ink-700 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:bg-ink-800';
const chipActive =
  'border-brand-600 bg-brand-600 text-white hover:bg-brand-700 dark:border-brand-400 dark:bg-brand-500 dark:text-ink-950';
