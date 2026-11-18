import type { ChangeEventHandler, ReactNode } from "react";

type IssuesToolbarProps = {
    query: string; // TODO(you): controlled search value (step 1.5)
    onQueryChange: ChangeEventHandler<HTMLInputElement>; // TODO(you): update the search state
    chips: ReactNode; // TODO(you): one <FilterChip> per active filter (step 2.4)
    onAddFilter: () => void; // TODO(you): open the filter picker
    sortLabel: string; // e.g. "Priority ↓"
    onSortClick: () => void; // TODO(you): open the sort menu / toggle direction
};

const BUTTON =
    "h-8 rounded-lg px-3 text-[13px] text-zinc-700 hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:text-zinc-300 dark:hover:bg-zinc-900";

export function IssuesToolbar({ query, onQueryChange, chips, onAddFilter, sortLabel, onSortClick }: IssuesToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="issue-search" className="sr-only">
                Filter issues
            </label>
            <input
                id="issue-search"
                type="search"
                placeholder="Filter by title or ID…"
                value={query}
                onChange={onQueryChange}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-[13px] placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none sm:w-70 dark:border-zinc-700 dark:bg-zinc-900"
            />
            {chips}
            <button type="button" onClick={onAddFilter} className={`${BUTTON} rounded-full border border-dashed border-zinc-400 bg-white dark:bg-zinc-950`}>
                + Filter
            </button>
            <button type="button" onClick={onSortClick} className={`${BUTTON} ml-auto border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950`}>
                Sort: {sortLabel}
            </button>
        </div>
    );
}
