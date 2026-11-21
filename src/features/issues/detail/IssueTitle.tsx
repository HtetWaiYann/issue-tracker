import type { KeyboardEvent, Ref } from "react";
import { focusRing } from "@/components/ui/focusRing";

type IssueTitleProps = {
    title: string;
    isEditing: boolean;
    draft: string;
    inputRef: Ref<HTMLInputElement>; // TODO(you): focus + select when editing starts (1.7)
    buttonRef: Ref<HTMLButtonElement>; // TODO(you): focus returns here after save/cancel
    onStartEdit: () => void;
    onDraftChange: (value: string) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void; // TODO(you): Enter saves, Esc cancels
    onBlur: () => void;
};

export function IssueTitle({
    title,
    isEditing,
    draft,
    inputRef,
    buttonRef,
    onStartEdit,
    onDraftChange,
    onKeyDown,
    onBlur,
}: IssueTitleProps) {
    if (isEditing) {
        return (
            <div>
                <label htmlFor="issue-title" className="sr-only">
                    Issue title
                </label>
                <input
                    id="issue-title"
                    ref={inputRef}
                    value={draft}
                    onChange={(e) => onDraftChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    className={`w-full rounded-lg border border-zinc-300 bg-white px-2 py-1 text-2xl font-semibold dark:border-zinc-700 dark:bg-zinc-900 ${focusRing}`}
                />
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Enter to save · Esc to cancel
                </p>
            </div>
        );
    }
    return (
        <h1 className="text-2xl font-semibold">
            <button
                ref={buttonRef}
                type="button"
                onClick={onStartEdit}
                className={`-mx-2 rounded-lg px-2 py-1 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 ${focusRing}`}
            >
                {title}
            </button>
        </h1>
    );
}
