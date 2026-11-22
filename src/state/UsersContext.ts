import { createContext, use } from "react";
import type { User, UserId } from "@/api/types";
import type { RowAssignee } from "@/features/issues/IssueRow";

export type UsersValue = {
    currentUser: User;
    users: User[];
    assigneesById: Map<UserId, RowAssignee>; // built once, so rows get the SAME object every render (matters in 5.4)
};

export const UsersContext = createContext<UsersValue | null>(null);

export function useUsers(): UsersValue {
    const value = use(UsersContext);
    if (!value) throw new Error("useUsers must be used inside <UsersProvider>");
    return value;
}
