import { focusRing } from "@/components/ui/focusRing";

type PanelErrorProps = {
    title: string;
    onRetry: () => void; // TODO(you): reset the error boundary (4.5)
};

// Error-boundary fallback for one panel; the rest of the page keeps working.
export function PanelError({ title, onRetry }: PanelErrorProps) {
    return (
        <section
            role="alert"
            className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950/40"
        >
            <div className="flex flex-col">
                <h2 className="text-sm font-semibold text-red-900 dark:text-red-200">
                    {title}
                </h2>
                <span className="text-[13px] text-red-800 dark:text-red-300">
                    The rest of the issue still works.
                </span>
            </div>
            <button
                type="button"
                onClick={onRetry}
                className={`ml-auto rounded-lg border border-red-300 bg-white px-3 py-1.5 text-[13px] font-medium text-red-900 hover:bg-red-50 dark:border-red-800 dark:bg-transparent dark:text-red-200 ${focusRing}`}
            >
                Retry
            </button>
        </section>
    );
}
