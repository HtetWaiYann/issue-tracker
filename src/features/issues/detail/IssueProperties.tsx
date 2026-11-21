import type { ReactNode } from "react";
import type { Label, Priority, Status } from "@/api/types";
import { Avatar, UnassignedAvatar } from "@/components/ui/Avatar";
import { focusRing } from "@/components/ui/focusRing";
import { LabelPill } from "@/components/ui/LabelPill";
import { StatusPill } from "@/components/ui/StatusPill";
import type { RowAssignee } from "@/features/issues/IssueRow";

export type PropertyKey = "status" | "priority" | "assignee" | "labels";

type PropertyButtonProps = {
    label: string;
    expanded: boolean;
    onClick: (anchor: HTMLButtonElement) => void;
    children: ReactNode;
};

function PropertyButton({ label, expanded, onClick, children }: PropertyButtonProps) {
    return (
        <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={expanded}
            onClick={(e) => onClick(e.currentTarget)}
            className={`flex min-h-9 items-center gap-2 rounded-lg px-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 ${focusRing}`}
        >
            <span className="w-20 shrink-0 text-[13px] text-zinc-500 dark:text-zinc-400">
                {label}
            </span>
            <span className="flex flex-wrap items-center gap-1.5">{children}</span>
        </button>
    );
}

type IssuePropertiesProps = {
    status: Status;
    priority: Priority;
    assignee: RowAssignee | null;
    labels: Label[];
    dueLabel: string | null;
    openProperty: PropertyKey | null;
    onOpen: (property: PropertyKey, anchor: HTMLButtonElement) => void; // TODO(you): open the popover anchored here (3.6)
};

export function IssueProperties({
    status,
    priority,
    assignee,
    labels,
    dueLabel,
    openProperty,
    onOpen,
}: IssuePropertiesProps) {
    return (
        <>
            <h2 className="mb-1 px-2 text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                Properties
            </h2>
            <PropertyButton
                label="Status"
                expanded={openProperty === "status"}
                onClick={(el) => onOpen("status", el)}
            >
                <StatusPill status={status} />
            </PropertyButton>
            <PropertyButton
                label="Priority"
                expanded={openProperty === "priority"}
                onClick={(el) => onOpen("priority", el)}
            >
                <span
                    className={
                        priority === "Urgent"
                            ? "font-semibold text-orange-700 dark:text-orange-400"
                            : ""
                    }
                >
                    {priority}
                </span>
            </PropertyButton>
            <PropertyButton
                label="Assignee"
                expanded={openProperty === "assignee"}
                onClick={(el) => onOpen("assignee", el)}
            >
                {assignee ? (
                    <>
                        <Avatar {...assignee} /> {assignee.name}
                    </>
                ) : (
                    <>
                        <UnassignedAvatar /> Unassigned
                    </>
                )}
            </PropertyButton>
            <PropertyButton
                label="Labels"
                expanded={openProperty === "labels"}
                onClick={(el) => onOpen("labels", el)}
            >
                {labels.length ? (
                    labels.map((label) => <LabelPill key={label} label={label} />)
                ) : (
                    <span className="text-zinc-500">None</span>
                )}
            </PropertyButton>
            <div className="flex min-h-9 items-center gap-2 px-2">
                <span className="w-20 shrink-0 text-[13px] text-zinc-500 dark:text-zinc-400">
                    Due
                </span>
                <span>{dueLabel ?? "—"}</span>
            </div>
        </>
    );
}
