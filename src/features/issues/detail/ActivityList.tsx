export type ActivityView = {
    id: string;
    actorName: string;
    text: string;
    timeLabel: string;
};

export function ActivityList({ items }: { items: ActivityView[] }) {
    return (
        <>
            <h2 className="mt-5 mb-1 px-2 text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                Activity
            </h2>
            <ol className="flex flex-col gap-2 px-2 text-[13px] text-zinc-700 dark:text-zinc-300">
                {items.map((item) => (
                    <li key={item.id}>
                        <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                            {item.actorName}
                        </strong>{" "}
                        {item.text}{" "}
                        <span className="text-zinc-500 dark:text-zinc-400">
                            · {item.timeLabel}
                        </span>
                    </li>
                ))}
            </ol>
        </>
    );
}
