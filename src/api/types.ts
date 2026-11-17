export type IssueId = string;
export type UserId = string;

// use string instead of Date because it can survives JSON (fake API, URL, localStorage, IndexedDB),
export type Timestamp = string;
export type CalendarDate = string;

export const STATUSES = [
    "Backlog",
    "Todo",
    "In Progress",
    "In Review",
    "Done",
] as const;
export type Status = (typeof STATUSES)[number];

export const PRIORITIES = ["Urgent", "High", "Medium", "Low"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const LABELS = [
    "bug",
    "feature",
    "perf",
    "realtime",
    "a11y",
    "design",
    "palette",
] as const;
export type Label = (typeof LABELS)[number];

export interface Issue {
    readonly id: IssueId;
    title: string;
    description: string; // markdown; '' when empty
    status: Status;
    priority: Priority;
    labels: Label[];
    assigneeId: UserId | null; // null = unassigned. Explicit, so it can't be "forgotten" like `?`
    parentId: IssueId | null; // sub-issues are issues; only the child stores the link
    dueDate: CalendarDate | null;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface User {
    readonly id: UserId;
    name: string; // "Alex Kim"; initials are derived for display
    avatarColor: string;
}

// typescript has built in type called 'Comment', we have to avoid using it
export interface IssueComment {
    readonly id: string;
    issueId: IssueId;
    authorId: UserId;
    body: string; // markdown
    createdAt: Timestamp;
}

interface ActivityBase {
    readonly id: string;
    issueId: IssueId;
    actorId: UserId;
    at: Timestamp;
}

export type Activity = ActivityBase &
    (
        | { type: "created" }
        | { type: "titleChanged"; from: string; to: string }
        | { type: "statusChanged"; from: Status; to: Status }
        | { type: "priorityChanged"; from: Priority; to: Priority }
        | { type: "assigneeChanged"; from: UserId | null; to: UserId | null }
        | {
              type: "dueDateChanged";
              from: CalendarDate | null;
              to: CalendarDate | null;
          }
        | { type: "labelAdded"; label: Label }
        | { type: "labelRemoved"; label: Label }
        | { type: "subIssueCompleted"; subIssueId: IssueId } // "completed 2 sub-issues" = UI grouping
    );
