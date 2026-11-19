import { Avatar } from "@/components/ui/Avatar";
import type { RowAssignee } from "@/features/issues/IssueRow";
import { Link } from "react-router";

export const NAVKEYS = ["inbox" , "my" , "all" , "board" , "settings"] as const;
export type NavKey = (typeof NAVKEYS)[number];

export type SidebarProps = {
    current: NavKey;
    inboxCount: number;
    myIssuesCount: number;
    user: RowAssignee;
    isOnline: boolean; // TODO(you): from useSyncExternalStore (3.3)
    onOpenPalette: () => void; // TODO(you): open the command palette (3.5)
};

const ITEMS: { key: NavKey; label: string; href: string }[] = [
    { key: "inbox", label: "Inbox", href: "/inbox" },
    { key: "my", label: "My issues", href: "/my" },
    { key: "all", label: "All issues", href: "/all" },
    { key: "board", label: "Board", href: "/board" },
    { key: "settings", label: "Settings", href: "/settings" },
];

const FOCUS = "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none";

export function Sidebar({ current, inboxCount, myIssuesCount, user, isOnline, onOpenPalette }: SidebarProps) {
    const counts: Partial<Record<NavKey, number>> = { inbox: inboxCount, my: myIssuesCount };

    return (
        <nav
            aria-label="Main"
            className="flex flex-col gap-0.5 border-b border-zinc-200 bg-zinc-50 px-3 py-4 md:w-56 md:shrink-0 md:border-r md:border-b-0 dark:border-zinc-800 dark:bg-zinc-900"
        >
            <div className="flex items-center gap-2.5 px-2 pt-1 pb-3.5">
                <div aria-hidden="true" className="flex size-7 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                    T
                </div>
                <span className="text-[15px] font-semibold">Tracker</span>
                <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">Web Platform</span>
            </div>

            <button
                type="button"
                onClick={onOpenPalette}
                className={`mb-2.5 flex h-9 items-center gap-2 rounded-lg whitespace-nowrap border border-zinc-200 bg-white px-2.5 text-[13px] text-zinc-500 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 ${FOCUS}`}
            >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                </svg>
                Search or run a command
                <kbd className="ml-auto rounded border border-zinc-200 px-1.5 font-sans text-[11px] dark:border-zinc-700">⌘K</kbd>
            </button>

            {ITEMS.map((item) => (
                <Link
                    key={item.key}
                    to={item.href}
                    aria-current={item.key === current ? "page" : undefined}
                    className={`flex h-9 items-center rounded-md px-2.5 ${FOCUS} ${
                        item.key === current
                            ? "bg-indigo-50 font-medium text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100"
                            : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                >
                    {item.label}
                    {counts[item.key] !== undefined && (
                        <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">{counts[item.key]}</span>
                    )}
                </Link>
            ))}

            <div className="mt-auto flex items-center gap-2.5 border-t border-zinc-200 px-2 pt-3 dark:border-zinc-800 max-md:mt-3">
                <Avatar {...user} size="md" />
                <div className="flex flex-col">
                    <span className="text-[13px] font-medium">{user.name}</span>
                    <span className={`text-xs ${isOnline ? "text-green-700 dark:text-green-400" : "text-zinc-500"}`}>
                        <span aria-hidden="true">● </span>
                        {isOnline ? "Online" : "Offline"}
                    </span>
                </div>
            </div>
        </nav>
    );
}
