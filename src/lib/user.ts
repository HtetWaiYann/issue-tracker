import type { User } from "@/api/types";
import type { RowAssignee } from "@/features/issues/IssueRow";

export const initials = (name: string): string =>
    name
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0].toUpperCase())
        .slice(0, 2)
        .join("");

export const toRowAssignee = (user: User): RowAssignee => ({
    name: user.name,
    initials: initials(user.name),
    color: user.avatarColor,
});