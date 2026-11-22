import { Outlet, useLocation } from "react-router";
import { AppShell } from "./AppShell";
import { NAVKEYS, type NavKey } from "./Sidebar";
import { useUsers } from "@/state/UsersContext";

export function RootLayout() {
    const { currentUser, assigneesById } = useUsers();

    const location = useLocation();

    const current = location.pathname.slice(1);
    const isNavKey = (value: string): value is NavKey => NAVKEYS.includes(value as NavKey);

    return (
        <AppShell
            current={isNavKey(current) ?  current : 'all'}
            inboxCount={4}
            myIssuesCount={23}
            user={assigneesById.get(currentUser.id)!}
            isOnline
            onOpenPalette={() => {}}
        >
            <Outlet />
        </AppShell>
    );
}
