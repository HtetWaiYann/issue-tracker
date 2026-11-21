// src/lib/activity.ts
import type { Activity } from "@/api/types";
import { formatDay } from "@/lib/time";

export function describeActivity(activity: Activity): string {
    switch (activity.type) {
        case "created": return "created the issue";
        case "titleChanged": return `renamed it to “${activity.to}”`;
        case "statusChanged": return `changed status to ${activity.to}`;
        case "priorityChanged": return `changed priority to ${activity.to}`;
        case "assigneeChanged": return activity.to ? "changed the assignee" : "removed the assignee";
        case "dueDateChanged": return activity.to ? `set the due date to ${formatDay(activity.to)}` : "removed the due date";
        case "labelAdded": return `added label ${activity.label}`;
        case "labelRemoved": return `removed label ${activity.label}`;
        case "subIssueCompleted": return `completed ${activity.subIssueId}`;
    }
}