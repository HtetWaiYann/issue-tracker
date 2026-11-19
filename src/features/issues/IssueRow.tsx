import type { Issue } from "@/api/types";
import { Avatar, UnassignedAvatar } from "@/components/ui/Avatar";
import { LabelPill } from "@/components/ui/LabelPill";
import { StatusPill } from "@/components/ui/StatusPill";
import { Link } from "react-router";

export type RowAssignee = {
    name: string;
    initials: string;
    color: string;
};

type IssueRowProps = {
    issue: Issue;
    assignee: RowAssignee | null;
    updatedLabel: string; // TODO(you): format issue.updatedAt as "2m", "1h", "3d"
    href: string; // TODO(you): build the detail URL once routing exists (1.2)
    isSelected: boolean; // TODO(you): the keyboard-selected row
};

export function IssueRow({
    issue,
    assignee,
    updatedLabel,
    href,
    isSelected,
}: IssueRowProps) {
    const isUrgent = issue.priority === "Urgent";

    const formatUpdatedAt = (updatedLabel: string) => {
        try {
            const dateObj = new Date(updatedLabel);
            const diff = Date.now() - dateObj.getTime();

            if (isNaN(dateObj.getTime()) || diff < 0) return "Unknown";

            const minutes = Math.floor(diff / 60_000);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (minutes < 1) return "Just now";
            if (minutes < 60) return `${minutes}m`;
            if (hours < 24) return `${hours}h`;
            if (days < 30) return `${days}d`;

            const months = Math.floor(days / 30);
            if (months < 12) return `${months}mo`;

            const years = Math.floor(days / 365);
            return `${years}y`;
        } catch {
            return "Unknown";
        }
    };

    const formattedDate = formatUpdatedAt(updatedLabel);

    return (
        <tr
            className={`border-t border-zinc-100 dark:border-zinc-800 ${
                isSelected
                    ? "bg-indigo-50 dark:bg-indigo-950/50"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
            }`}
        >
            <td className="px-3.5 py-2 whitespace-nowrap text-zinc-500 tabular-nums dark:text-zinc-400">
                {issue.id}
            </td>
            <td
                className={`px-2 py-2 ${
                    isUrgent
                        ? "font-semibold text-orange-700 dark:text-orange-400"
                        : "text-zinc-700 dark:text-zinc-300"
                }`}
            >
                {issue.priority}
            </td>
            <td className="px-2 py-2">
                <Link
                    to={`/issues/${href}`}
                    className="rounded font-medium text-zinc-900 hover:text-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:text-zinc-100 dark:hover:text-indigo-300"
                >
                    {issue.title}
                </Link>
            </td>
            <td className="px-2 py-2">
                <span className="flex flex-wrap gap-1">
                    {issue.labels.map((label) => (
                        <LabelPill key={label} label={label} />
                    ))}
                </span>
            </td>
            <td className="px-2 py-2">
                <StatusPill status={issue.status} />
            </td>
            <td className="px-2 py-2">
                {assignee ? <Avatar {...assignee} /> : <UnassignedAvatar />}
            </td>
            <td className="px-3.5 py-2 text-zinc-500 dark:text-zinc-400">
                <time dateTime={formattedDate}>{formattedDate}</time>
            </td>
        </tr>
    );
}
