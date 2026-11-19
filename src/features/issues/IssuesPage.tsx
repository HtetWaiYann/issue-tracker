import { getIssues, getUsers } from "@/api/api";
import type { Issue, Label, Priority, Status, User } from "@/api/types";
import { FilterChip } from "@/components/ui/FilterChip";
import { IssueList } from "@/features/issues/IssueList";
import { IssueRow, type RowAssignee } from "@/features/issues/IssueRow";
import { IssuesHeader } from "@/features/issues/IssuesHeader";
import { IssuesToolbar } from "@/features/issues/IssuesToolbar";
import { useEffect, useState } from "react";

const noop = () => {};

interface AIssue extends Issue {
    assignee: RowAssignee | null;
}

export function IssuesPage() {
    const [issues, setIssues] = useState<AIssue[]>([]);
    const [currentError, setCurrentError] = useState("");
    const [selectedId, setSelectedId] = useState("");

    const [countLabel, setCountLabel] = useState("");

    useEffect(() => {
        const fetch = async () => {
            try {
                const [fetchedIssues, fetchedUsers] = await Promise.all([
                    await getIssues(),
                    await getUsers(),
                ]);

                const userIdMap = new Map(
                    fetchedUsers.map((user) => [user.id, user]),
                );
                const mappedIssues = fetchedIssues.map((issue) => {
                    const newIssue: AIssue = {
                        ...issue,
                        assignee: null,
                    };
                    if (issue.assigneeId) {
                        const user = userIdMap.get(issue.assigneeId) || null;
                        if (user) {
                            const initials = user.name
                                .split(" ")
                                .map((word) => word.charAt(0).toUpperCase())
                                .join("");
                            newIssue.assignee = {
                                name: user.name,
                                color: user.avatarColor,
                                initials: initials,
                            };
                        }
                    }
                    return newIssue;
                });

                setIssues(mappedIssues);
                setCountLabel(`${issues.length} issues`);
            } catch {
                setCurrentError("Something went wrong. Please try again");
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            const currentKey = event.key.toLowerCase();

            if (["j", "k"].includes(currentKey)) {
                const currentIndex = issues.findIndex(
                    (issue) => issue.id === selectedId,
                );

                if (currentIndex === -1) {
                    setSelectedId(issues[0].id)
                };

                const direction = event.key.toLowerCase() === "j" ? 1 : -1;
                const nextIndex = Math.max(
                    0,
                    Math.min(issues.length - 1, currentIndex + direction),
                );

                if (nextIndex !== currentIndex) {
                    setSelectedId(issues[nextIndex].id);
                }
            }
            return;
        };
        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [issues, selectedId, setSelectedId]);

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
                chips={
                    <>
                        {/* <FilterChip removeLabel="Remove status filter" onRemove={noop}>Status is In Progress, In Review</FilterChip>
                        <FilterChip removeLabel="Remove assignee filter" onRemove={noop}>Assignee is Alex Kim</FilterChip> */}
                    </>
                }
                onAddFilter={noop}
                sortLabel="Priority ↓"
                onSortClick={noop}
            />

            {issues.length === 0 ? (
                <div>{currentError ? currentError : "Loading .... "}</div>
            ) : (
                <>
                    <IssueList>
                        {issues.map((issue) => (
                            <IssueRow
                                href={issue.id}
                                isSelected={selectedId === issue.id}
                                assignee={issue.assignee}
                                updatedLabel={issue.updatedAt}
                                issue={issue}
                                key={issue.id}
                            />
                        ))}
                    </IssueList>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Showing 1-12 of 2,314 matching
                    </p>
                </>
            )}
        </>
    );
}
