import type { ReactNode } from "react";

type SectionProps = { id: string; title: string; children: ReactNode };

export function Section({ id, title, children }: SectionProps) {
    return (
        <section aria-labelledby={id} className="flex flex-col gap-3">
            <h2 id={id} className="text-sm font-semibold">
                {title}
            </h2>
            {children}
        </section>
    );
}
