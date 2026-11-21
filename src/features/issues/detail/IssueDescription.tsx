export function IssueDescription({ description }: { description: string }) {
    if (!description) {
        return (
            <p className="text-zinc-500 dark:text-zinc-400">No description.</p>
        );
    }
    return (
        <div className="flex max-w-prose flex-col gap-3 leading-relaxed text-zinc-800 dark:text-zinc-200">
            {description.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p> // static text that never reorders: index key is fine
            ))}
        </div>
    );
}
