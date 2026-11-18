import type { ReactNode } from "react";

type IssueListProps = {
    children: ReactNode; // TODO(you): render one <IssueRow> per issue (step 1.4, mind the keys)
};

const TH = "px-2 py-2.5 font-medium";

export function IssueList({ children }: IssueListProps) {
    return (
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full min-w-[860px] border-collapse text-[13px]">
                <thead>
                    <tr className="bg-zinc-50 text-left text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                        <th scope="col" className={`${TH} w-21 pl-3.5`}>ID</th>
                        <th scope="col" className={`${TH} w-19`}>Priority</th>
                        <th scope="col" className={TH}>Title</th>
                        <th scope="col" className={`${TH} w-35`}>Labels</th>
                        <th scope="col" className={`${TH} w-30`}>Status</th>
                        <th scope="col" className={`${TH} w-16`}>Assignee</th>
                        <th scope="col" className={`${TH} w-18 pr-3.5`}>Updated</th>
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}
