import type { Status } from "@/api/types";

const DOT: Record<Status, string> = {
    Backlog: "bg-zinc-400",
    Todo: "bg-zinc-500",
    "In Progress": "bg-amber-600",
    "In Review": "bg-indigo-600",
    Done: "bg-green-600",
};

export function StatusPill({ status }: { status: Status }) {
    return (
        <span className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
            <span aria-hidden="true" className={`size-2 rounded-full ${DOT[status]}`} />
            {status}
        </span>
    );
}
