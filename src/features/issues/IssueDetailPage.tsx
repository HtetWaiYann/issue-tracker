import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { IssueDetailLayout } from "./detail/IssueDetailLayout";
import { type Activity, type Issue } from "@/api/types";
import { getActivity, getIssue, updateIssue } from "@/api/api";
import { IssueProperties } from "./detail/IssueProperties";
import { IssueDescription } from "./detail/IssueDescription";
import { IssueBreadcrumb } from "./detail/IssueBreadcrumb";
import { IssueTitle } from "./detail/IssueTitle";
import { formatDay } from "@/lib/time";
import { flushSync } from "react-dom";
import { useUsers } from "@/state/UsersContext";

export function IssueDetailPage({ id }: { id: string }) {
    const [issue, setIssue] = useState<Issue>();
    const [activity, setActivity] = useState<Activity[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { assigneesById } = useUsers();

    useEffect(() => {
        let ignore = false;
        Promise.all([getIssue(id), getActivity(id)])
            .then(([issue, activity]) => {
                if (ignore) return;
                setIssue(issue);
                setActivity(activity);
            })
            .catch((e: Error) => {
                if (!ignore)
                    setError(
                        e.message.includes("404")
                            ? `Issue ${id} doesn't exist.`
                            : "Couldn't load this issue.",
                    );
            });
        return () => {
            ignore = true;
        };
    }, [id]);

    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const titleButtonRef = useRef<HTMLButtonElement>(null);
    // "Enter/Esc already handled this edit, ignore the blur that follows."
    // A ref, not state: changing it must not re-render.
    const skipBlur = useRef(false);

    // Runs after commit, so the <input> exists in the DOM now
    useEffect(() => {
        if (!isEditing) return;
        inputRef.current?.focus();
        inputRef.current?.select();
    }, [isEditing]);

    const startEdit = () => {
        if (!issue) {
            return;
        }
        skipBlur.current = false;
        setDraft(issue.title);
        setIsEditing(true);
    };

    const finishEdit = () => {
        // need to use FlushSync to get DOM updates immediately so title button can be focus
        flushSync(() => setIsEditing(false));
        titleButtonRef.current?.focus();
    };

    const save = async () => {
        if (!issue) return;
        const title = draft.trim();
        finishEdit();
        if (!title || title === issue.title) return;

        const previous = issue;
        setIssue({ ...issue, title }); // show it instantly
        try {
            setIssue(await updateIssue(issue.id, { title }));
        } catch {
            setIssue(previous); // roll back. You'll add a toast in 2.2
        }
    };

    const onTitleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            skipBlur.current = true;
            void save();
        } else if (event.key === "Escape") {
            skipBlur.current = true;
            finishEdit();
        }
    };

    const onTitleBlur = () => {
        if (skipBlur.current) {
            return;
        }
        void save();
    };

    if (error)
        return (
            <p role="alert" className="text-red-700">
                {error}
            </p>
        );
    if (!issue) return <p className="text-zinc-500">Loading…</p>;

    const assignee = issue.assigneeId
        ? (assigneesById.get(issue.assigneeId) ?? null)
        : null;

    return (
        <IssueDetailLayout
            main={
                <>
                    <IssueBreadcrumb
                        issueId={issue.id}
                        backHref="/all"
                        backLabel="All issues"
                    />
                    <IssueTitle
                        title={issue.title}
                        isEditing={isEditing}
                        draft={draft}
                        inputRef={inputRef}
                        buttonRef={titleButtonRef}
                        onStartEdit={startEdit}
                        onDraftChange={setDraft}
                        onKeyDown={onTitleKeyDown}
                        onBlur={onTitleBlur}
                    />
                    <IssueDescription description={issue.description} />
                </>
            }
            aside={
                <>
                    <IssueProperties
                        status={issue.status}
                        priority={issue.priority}
                        assignee={assignee}
                        labels={issue.labels}
                        dueLabel={
                            issue.dueDate ? formatDay(issue.dueDate) : null
                        }
                        openProperty={null}
                        onOpen={() => {}} // 3.6
                    />
                    {/* <ActivityList
                        items={activity.toReversed().map((a) => ({
                            id: a.id,
                            actorName: users.get(a.actorId)?.name ?? "Someone",
                            text: describeActivity(a),
                            timeLabel: formatRelative(a.at),
                        }))}
                    /> */}
                </>
            }
        />
    );
}
