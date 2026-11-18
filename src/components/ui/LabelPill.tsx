import type { Label } from "@/api/types";

export function LabelPill({ label }: { label: Label }) {
    return (
        <span className="inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {label}
        </span>
    );
}
