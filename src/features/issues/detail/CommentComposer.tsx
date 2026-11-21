import type { KeyboardEvent } from "react";
import { focusRing } from "@/components/ui/focusRing";

type CommentComposerProps = {
    action: (formData: FormData) => void | Promise<void>; // TODO(you): optimistic send (4.3)
    onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void; // TODO(you): ⌘Enter submits
};

export function CommentComposer({ action, onKeyDown }: CommentComposerProps) {
    return (
        <form action={action} className="flex flex-col gap-1.5">
            <label htmlFor="new-comment" className="sr-only">
                Write a comment
            </label>
            <textarea
                id="new-comment"
                name="body"
                rows={2}
                required
                onKeyDown={onKeyDown}
                placeholder="Leave a comment… (⌘Enter to send)"
                className={`w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 placeholder:text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 ${focusRing}`}
            />
        </form>
    );
}
