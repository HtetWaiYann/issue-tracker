import { Link } from "react-router";
import { focusRing } from "@/components/ui/focusRing";

type IssueBreadcrumbProps = {
    issueId: string;
    backHref: string;
    backLabel: string;
};

export function IssueBreadcrumb({
    issueId,
    backHref,
    backLabel,
}: IssueBreadcrumbProps) {
    return (
        <div className="flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400">
            <Link
                to={backHref}
                className={`rounded hover:text-indigo-700 dark:hover:text-indigo-300 ${focusRing}`}
            >
                {backLabel}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-zinc-700 dark:text-zinc-300">{issueId}</span>
            <span className="ml-auto hidden text-xs sm:inline">
                Press ↑ ↓ for previous / next issue
            </span>
        </div>
    );
}
