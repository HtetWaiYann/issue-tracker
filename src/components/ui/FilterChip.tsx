import type { ReactNode } from "react";

type FilterChipProps = {
    children: ReactNode; // e.g. "Status is In Progress, In Review"
    removeLabel: string; // e.g. "Remove status filter"
    onRemove: () => void; // TODO(you): remove this filter from the filter state
};

export function FilterChip({ children, removeLabel, onRemove }: FilterChipProps) {
    return (
        <span className="flex h-8 items-center gap-1.5 rounded-full bg-indigo-50 pr-1 pl-2.5 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100">
            {children}
            <button
                type="button"
                aria-label={removeLabel}
                onClick={onRemove}
                className="flex size-6 items-center justify-center rounded-full text-base hover:bg-indigo-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:hover:bg-indigo-900"
            >
                <span aria-hidden="true">×</span>
            </button>
        </span>
    );
}
