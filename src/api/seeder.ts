import { faker } from "@faker-js/faker";
import {
    LABELS,
    type CalendarDate,
    type Issue,
    type IssueId,
    type Priority,
    type Status,
    type User,
} from "./types";

// Determinism: a fixed seed AND a fixed "now".
// Without the ref date, faker.date.past() is relative to the real clock,
// so the data changes every run even with a seed.
const SEED = 1042;
const REF_DATE = "2026-11-17T09:00:00.000Z";

// Hand-picked so white initials pass 4.5:1 contrast.
// faker.color.rgb() can return light colors and fail that.
const AVATAR_COLORS = [
    "#4F46E5",
    "#0F766E",
    "#B45309",
    "#BE185D",
    "#7C3AED",
    "#0369A1",
    "#B91C1C",
    "#4D7C0F",
];

// Weighted picks make the data look real: most work is done or in the backlog, few urgent.
const STATUS_WEIGHTS: { weight: number; value: Status }[] = [
    { weight: 25, value: "Backlog" },
    { weight: 20, value: "Todo" },
    { weight: 12, value: "In Progress" },
    { weight: 8, value: "In Review" },
    { weight: 35, value: "Done" },
];

const PRIORITY_WEIGHTS: { weight: number; value: Priority }[] = [
    { weight: 5, value: "Urgent" },
    { weight: 20, value: "High" },
    { weight: 45, value: "Medium" },
    { weight: 30, value: "Low" },
];

function reset(seedOffset: number) {
    // Re-seed on every call, so calling twice gives identical output,
    // not "the next 10k values in the sequence".
    faker.seed(SEED + seedOffset);
    faker.setDefaultRefDate(REF_DATE);
}

export function generateUsers(count = 8): User[] {
    reset(0);
    return Array.from({ length: count }, (_, i) => ({
        id: `u-${i + 1}`, // readable and stable; uuids make debugging painful
        name: faker.person.fullName(), // "Mia Rossi", so initials can be derived
        avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
    }));
}

function title(): string {
    const phrase = `${faker.hacker.verb()} the ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

function toCalendarDate(date: Date): CalendarDate {
    return date.toISOString().slice(0, 10); // "2026-11-28"
}

export function generateIssues(count: number, users: User[]): Issue[] {
    reset(1);
    const issues: Issue[] = [];
    const topLevelIds: IssueId[] = []; // candidates for parentId: only top-level, so no deep nesting or cycles

    for (let i = 0; i < count; i++) {
        const id = `ISS-${String(i + 1).padStart(4, "0")}`;
        const createdAt = faker.date.past({ years: 1 });
        const updatedAt = faker.date.between({ from: createdAt, to: REF_DATE }); // createdAt ≤ updatedAt

        // ~5% are sub-issues of an EARLIER issue, so the parent always exists
        const parentId =
            topLevelIds.length > 0
                ? (faker.helpers.maybe(
                      () => faker.helpers.arrayElement(topLevelIds),
                      { probability: 0.05 },
                  ) ?? null)
                : null;

        issues.push({
            id,
            title: title(),
            description:
                faker.helpers.maybe(
                    () =>
                        Array.from(
                            { length: faker.number.int({ min: 1, max: 3 }) },
                            () => faker.hacker.phrase(),
                        ).join("\n\n"),
                    { probability: 0.7 },
                ) ?? "",
            status: faker.helpers.weightedArrayElement(STATUS_WEIGHTS),
            priority: faker.helpers.weightedArrayElement(PRIORITY_WEIGHTS),
            labels: faker.helpers.arrayElements(LABELS, { min: 0, max: 2 }),
            // maybe() returns undefined on a miss; normalize to null, the "absent" convention in types.ts
            assigneeId:
                faker.helpers.maybe(
                    () => faker.helpers.arrayElement(users).id,
                    { probability: 0.85 },
                ) ?? null,
            parentId,
            dueDate:
                faker.helpers.maybe(
                    () => toCalendarDate(faker.date.soon({ days: 45 })),
                    { probability: 0.25 },
                ) ?? null,
            createdAt: createdAt.toISOString(),
            updatedAt: updatedAt.toISOString(),
        });

        if (parentId === null) topLevelIds.push(id);
    }

    return issues;
}
