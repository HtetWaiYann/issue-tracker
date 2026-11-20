import type { Issue } from "@/api/types";

// text is lowercased once by the caller, not 10,000 times in here
export const matchesQuery = (issue: Issue, text: string): boolean =>
    text === "" || issue.title.toLowerCase().includes(text) || issue.id.toLowerCase().includes(text);