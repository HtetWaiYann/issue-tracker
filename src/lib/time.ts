const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// "2026-11-18T09:00:00Z" → "3h". `now` is a parameter so tests can pass a fixed clock.
export function formatRelative(iso: string, now = Date.now()): string {
    const diff = now - Date.parse(iso);
    if (Number.isNaN(diff)) return "—";
    if (diff < MINUTE) return "now"; // also covers small clock skew (negative diff)
    if (diff < HOUR) return `${Math.floor(diff / MINUTE)}m`;
    if (diff < DAY) return `${Math.floor(diff / HOUR)}h`;
    if (diff < 30 * DAY) return `${Math.floor(diff / DAY)}d`;
    if (diff < 365 * DAY) return `${Math.floor(diff / (30 * DAY))}mo`;
    return `${Math.floor(diff / (365 * DAY))}y`;
}

// "2026-11-28" → "Nov 28". The T00:00 suffix keeps it in local time, not UTC (no off-by-one day).
export const formatDay = (date: string): string =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
