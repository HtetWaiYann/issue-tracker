import { Avatar } from "@/components/ui/Avatar";
import type { RowAssignee } from "@/features/issues/IssueRow";

export type CommentView = {
    id: string;
    author: RowAssignee;
    body: string;
    timeLabel: string;
    isSending: boolean;
};

export function CommentItem({ comment }: { comment: CommentView }) {
    return (
        <div className={`flex gap-3 ${comment.isSending ? "opacity-60" : ""}`}>
            <Avatar {...comment.author} size="md" />
            <div className="flex flex-col gap-0.5">
                <span className="text-[13px]">
                    <strong className="font-medium">{comment.author.name}</strong>{" "}
                    <span className="text-zinc-500 dark:text-zinc-400">
                        · {comment.isSending ? "Sending…" : comment.timeLabel}
                    </span>
                </span>
                <span className="text-zinc-800 dark:text-zinc-200">
                    {comment.body}
                </span>
            </div>
        </div>
    );
}
