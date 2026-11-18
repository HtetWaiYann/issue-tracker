import type { ReactNode } from "react";
import { Sidebar, type SidebarProps } from "@/layout/Sidebar";

type AppShellProps = SidebarProps & {
    children: ReactNode; // TODO(you): the router's outlet, so each page renders here
};

export function AppShell({ children, ...sidebarProps }: AppShellProps) {
    return (
        <div className="flex min-h-dvh flex-col md:flex-row">
            <Sidebar {...sidebarProps} />
            <main className="relative flex min-w-0 flex-1 flex-col gap-3.5 px-4 py-5 md:px-7">{children}</main>
        </div>
    );
}
