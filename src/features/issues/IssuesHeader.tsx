type IssuesHeaderProps = {
    title: string; // "All issues", "My issues"…
    countLabel: string; // TODO(you): e.g. "10,000 issues", formatted from the real count
    view: "list" | "board"; // TODO(you): derive from the current route (1.2)
    onNewIssue: () => void; // TODO(you): open the create modal (4.1); also bind the C shortcut
};

const TAB = "px-3.5 py-2 text-[13px] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:ring-inset";
const TAB_CURRENT = "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100";
const TAB_IDLE = "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900";

export function IssuesHeader({ title, countLabel, view, onNewIssue }: IssuesHeaderProps) {
    return (
        <header className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold">{title}</h1>
            <span className="text-[13px] text-zinc-500 dark:text-zinc-400">{countLabel}</span>
            <div className="ml-auto flex items-center gap-2">
                {/* TODO(you): swap <a> for your router's link once routing exists (1.2) */}
                <nav aria-label="View" className="flex overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <a href="/issues" aria-current={view === "list" ? "page" : undefined} className={`${TAB} ${view === "list" ? TAB_CURRENT : TAB_IDLE}`}>
                        List
                    </a>
                    <a href="/board" aria-current={view === "board" ? "page" : undefined} className={`${TAB} ${view === "board" ? TAB_CURRENT : TAB_IDLE}`}>
                        Board
                    </a>
                </nav>
                <button
                    type="button"
                    onClick={onNewIssue}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    New issue
                    <kbd aria-hidden="true" className="font-sans text-xs opacity-80">C</kbd>
                </button>
            </div>
        </header>
    );
}
