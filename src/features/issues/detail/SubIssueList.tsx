export type SubIssueItem = { id: string; title: string; done: boolean };

type SubIssueListProps = {
    items: SubIssueItem[];
    doneCount: number;
    onToggle: (id: string, done: boolean) => void; // TODO(you): set status Done / Todo (2.1)
};

export function SubIssueList({ items, doneCount, onToggle }: SubIssueListProps) {
    if (items.length === 0) return null;
    return (
        <section aria-labelledby="sub-issues" className="flex flex-col gap-1">
            <h2 id="sub-issues" className="mb-1 text-sm font-semibold">
                Sub-issues{" "}
                <span className="font-normal text-zinc-500 dark:text-zinc-400">
                    {doneCount} / {items.length}
                </span>
            </h2>
            {items.map((item) => (
                <label
                    key={item.id}
                    className="flex h-9 cursor-pointer items-center gap-2.5 rounded-lg px-2 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                    <input
                        type="checkbox"
                        checked={item.done}
                        onChange={(e) => onToggle(item.id, e.target.checked)}
                        className="size-4 accent-indigo-600"
                    />
                    <span className={item.done ? "text-zinc-500 line-through" : ""}>
                        {item.title}
                    </span>
                    <span className="ml-auto text-xs text-zinc-500 tabular-nums">
                        {item.id}
                    </span>
                </label>
            ))}
        </section>
    );
}
