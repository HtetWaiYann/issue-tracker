import type { ReactNode } from "react";

type IssueDetailLayoutProps = { main: ReactNode; aside: ReactNode };

export function IssueDetailLayout({ main, aside }: IssueDetailLayoutProps) {
    return (
        <div className="-mx-4 -my-5 flex flex-1 flex-col md:-mx-7 lg:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-6 px-4 py-5 md:px-7">
                {main}
            </div>
            <aside
                aria-label="Properties"
                className="flex flex-col gap-1 border-t border-zinc-200 px-4 py-5 lg:w-72 lg:shrink-0 lg:border-t-0 lg:border-l dark:border-zinc-800"
            >
                {aside}
            </aside>
        </div>
    );
}
