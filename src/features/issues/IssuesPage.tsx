import { getIssues, getUsers } from "@/api/api";
import type {
    Issue,
    IssueId,
    Label,
    Priority,
    Status,
    User,
    UserId,
} from "@/api/types";
import { FilterChip } from "@/components/ui/FilterChip";
import { IssueList } from "@/features/issues/IssueList";
import { IssueRow, type RowAssignee } from "@/features/issues/IssueRow";
import { IssuesHeader } from "@/features/issues/IssuesHeader";
import { IssuesToolbar } from "@/features/issues/IssuesToolbar";
import { formatRelative } from "@/lib/time";
import { toRowAssignee } from "@/lib/user";
import { useEffect, useState } from "react";

const noop = () => {};

interface AIssue extends Issue {
    assignee: RowAssignee | null;
}

export function IssuesPage() {
    const [issues, setIssues] = useState<Issue[] | null>(null); // null = not loaded yet
    const [usersById, setUsersById] = useState<Map<UserId, RowAssignee>>(
        new Map(),
    );
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<IssueId | null>(null);

    const list = issues ?? [];
    const countLabel = `${list.length.toLocaleString()} issues`;

    useEffect(() => {
        let ignore = false;
        Promise.all([getIssues(), getUsers()])
            .then(([issues, users]) => {
                if (ignore) return;
                setIssues(issues);
                setUsersById(
                    new Map(
                        users.map((user) => [user.id, toRowAssignee(user)]),
                    ),
                );
            })
            .catch(() => {
                if (!ignore)
                    setError("Couldn't load issues. Refresh to try again.");
            });
        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            if (
                target.closest(
                    "input, textarea, select, [contenteditable='true']",
                )
            ) {
                return;
            }

            const key = event.key.toLowerCase();
            if ((key !== "j" && key !== "k") || list.length === 0) return;

            setSelectedId((current) => {
                const index = list.findIndex((issue) => issue.id === current);
                if (index === -1) return list[0].id;
                const next = Math.min(
                    list.length - 1,
                    Math.max(0, index + (key === "j" ? 1 : -1)),
                );
                return list[next].id;
            });
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [list]);

    return (
        <>
            <IssuesHeader
                title="All issues"
                countLabel={countLabel}
                view="list"
                onNewIssue={noop}
            />
            <IssuesToolbar
                query=""
                onQueryChange={noop}
                chips={null}
                onAddFilter={noop}
                sortLabel="Priority ↓"
                onSortClick={noop}
            />
            {error ? (
                <p role="alert" className="text-red-700">
                    {error}
                </p>
            ) : issues === null ? (
                <p className="text-zinc-500">Loading issues…</p>
            ) : (
                <IssueList>
                    {issues.map((issue) => (
                        <IssueRow
                            key={issue.id}
                            issue={issue}
                            assignee={
                                issue.assigneeId
                                    ? (usersById.get(issue.assigneeId) ?? null)
                                    : null
                            }
                            updatedLabel={formatRelative(issue.updatedAt)}
                            href={`/issues/${issue.id}`}
                            isSelected={issue.id === selectedId}
                        />
                    ))}
                </IssueList>
            )}
        </>
    );
}
