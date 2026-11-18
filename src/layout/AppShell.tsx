import type { ReactNode } from "react";

type AppShellProps = {
    sidebar: ReactNode;
    children: ReactNode; // the current page (1.2)
};

export function AppShell({ sidebar, children }: AppShellProps) {
    return (
        <div className="flex min-h-dvh flex-col md:flex-row">
            {sidebar}
            <main className="relative flex min-w-0 flex-1 flex-col gap-3.5 px-4 py-5 md:px-7">{children}</main>
        </div>
    );
}
