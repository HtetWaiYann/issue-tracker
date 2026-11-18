import { Outlet } from "react-router";
import { AppShell } from "./AppShell";
import type { RowAssignee } from "@/features/issues/IssueRow";
const AK: RowAssignee = { name: "Alex Kim", initials: "AK", color: "#4F46E5" };

export function RootLayout() {
    return (
        <AppShell
            current="all"
            inboxCount={4}
            myIssuesCount={23}
            user={AK}
            isOnline
            onOpenPalette={() => {}}
        >
            <Outlet />
        </AppShell>
    );
}
