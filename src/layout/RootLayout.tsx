import { Outlet, useLocation } from "react-router";
import { AppShell } from "./AppShell";
import type { RowAssignee } from "@/features/issues/IssueRow";
import { getCurrentUser } from "@/api/api";
import { useEffect, useState } from "react";
import type { NavKey } from "./Sidebar";

export function RootLayout() {
    const [currentUser, setCurrentUser] = useState<RowAssignee>();
    const [currentUserError, setCurrentUserError] = useState("");
    const location = useLocation();
    const current = (location.pathname.replace("/", "")) as NavKey;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                const initials = user.name
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase())
                    .join("");

                setCurrentUser({
                    name: user.name,
                    initials: initials,
                    color: user.avatarColor,
                });
            } catch (e) {
                setCurrentUserError("Current user not found");
            }
        };
        fetchUser();
    }, []);

    if (!currentUser) {
        if (currentUserError) {
            return <div>{currentUserError}</div>;
        } else {
            return <div>waiting....</div>;
        }
    }

    return (
        <AppShell
            current={current}
            inboxCount={4}
            myIssuesCount={23}
            user={currentUser}
            isOnline
            onOpenPalette={() => {}}
        >
            <Outlet />
        </AppShell>
    );
}
