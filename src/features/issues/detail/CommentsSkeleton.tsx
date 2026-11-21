export function CommentsSkeleton() {
    return (
        <div
            aria-busy="true"
            aria-label="Loading comments"
            className="flex flex-col gap-4"
        >
            {[0, 1].map((i) => (
                <div key={i} className="flex animate-pulse gap-3">
                    <span className="size-7 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="flex flex-1 flex-col gap-2">
                        <span className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                        <span className="h-3 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                </div>
            ))}
        </div>
    );
}
