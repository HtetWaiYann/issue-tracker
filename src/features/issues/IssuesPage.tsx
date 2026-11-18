// Static preview of screen 1 (design/Main.dc.html). Placeholder data only, nothing is wired.
import type { Issue, Label, Priority, Status } from "@/api/types";
import { FilterChip } from "@/components/ui/FilterChip";
import { IssueList } from "@/features/issues/IssueList";
import { IssueRow, type RowAssignee } from "@/features/issues/IssueRow";
import { IssuesHeader } from "@/features/issues/IssuesHeader";
import { IssuesToolbar } from "@/features/issues/IssuesToolbar";

const noop = () => {};

const AK: RowAssignee = { name: "Alex Kim", initials: "AK", color: "#4F46E5" };
const MR: RowAssignee = { name: "Mia Rossi", initials: "MR", color: "#0F766E" };
const JL: RowAssignee = { name: "Jun Li", initials: "JL", color: "#B45309" };
const SP: RowAssignee = { name: "Sara Park", initials: "SP", color: "#BE185D" };

const issue = (id: string, priority: Priority, title: string, label: Label, status: Status): Issue => ({
    id, title, priority, status, labels: [label],
    description: "", assigneeId: null, parentId: null, dueDate: null,
    createdAt: "2026-11-01T00:00:00.000Z", updatedAt: "2026-11-18T00:00:00.000Z",
});

export function IssuesPage() {
    return (
        <>
            <IssuesHeader title="All issues" countLabel="10,000 issues" view="list" onNewIssue={noop} />
            <IssuesToolbar
                query=""
                onQueryChange={noop}
                chips={
                    <>
                        <FilterChip removeLabel="Remove status filter" onRemove={noop}>Status is In Progress, In Review</FilterChip>
                        <FilterChip removeLabel="Remove assignee filter" onRemove={noop}>Assignee is Alex Kim</FilterChip>
                    </>
                }
                onAddFilter={noop}
                sortLabel="Priority ↓"
                onSortClick={noop}
            />
            {/* ponytail: rows written out by hand on purpose; mapping + keys is your step 1.4 */}
            <IssueList>
                <IssueRow href="#" isSelected={false} assignee={AK} updatedLabel="2m" issue={issue("ISS-1042", "Urgent", "Search input lags when typing with 10k issues loaded", "perf", "In Progress")} />
                <IssueRow href="#" isSelected={false} assignee={MR} updatedLabel="18m" issue={issue("ISS-1039", "High", "Card drops into the wrong column after a filter change", "bug", "In Review")} />
                <IssueRow href="#" isSelected={false} assignee={JL} updatedLabel="1h" issue={issue("ISS-1037", "High", "WebSocket handler shows stale assignee names", "realtime", "Todo")} />
                <IssueRow href="#" isSelected assignee={AK} updatedLabel="3h" issue={issue("ISS-1031", "Medium", "Keyboard navigation for the command palette", "a11y", "In Progress")} />
                <IssueRow href="#" isSelected={false} assignee={null} updatedLabel="5h" issue={issue("ISS-1028", "Medium", "Undo does not restore label order", "bug", "Todo")} />
                <IssueRow href="#" isSelected={false} assignee={SP} updatedLabel="1d" issue={issue("ISS-1024", "Low", "Lazy-load the markdown editor bundle", "perf", "Backlog")} />
                <IssueRow href="#" isSelected={false} assignee={MR} updatedLabel="1d" issue={issue("ISS-1019", "Medium", "Roll back optimistic status change on a 500", "realtime", "Done")} />
                <IssueRow href="#" isSelected={false} assignee={JL} updatedLabel="2d" issue={issue("ISS-1016", "High", "IssueRow re-renders on every socket message", "perf", "In Progress")} />
                <IssueRow href="#" isSelected={false} assignee={AK} updatedLabel="3d" issue={issue("ISS-1011", "Low", "Persist filters to the URL", "feature", "Done")} />
                <IssueRow href="#" isSelected={false} assignee={SP} updatedLabel="4d" issue={issue("ISS-1008", "Medium", "Error boundary around the comments panel", "feature", "In Review")} />
                <IssueRow href="#" isSelected={false} assignee={null} updatedLabel="5d" issue={issue("ISS-1003", "Low", "Dark theme contrast for muted labels", "design", "Backlog")} />
                <IssueRow href="#" isSelected={false} assignee={MR} updatedLabel="6d" issue={issue("ISS-0998", "Medium", "Offline queue loses edits on reload", "bug", "Todo")} />
            </IssueList>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Showing 1–12 of 2,314 matching</p>
        </>
    );
}
