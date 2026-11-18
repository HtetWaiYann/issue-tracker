import {
    generateActivity,
    generateComments,
    generateIssues,
    generateUsers,
} from "./seeder";
import type { Issue, IssueComment, IssueId, User } from "./types";

const SCENARIOS = ["normal", "slow", "error", "empty"] as const;
export type MockScenario = (typeof SCENARIOS)[number];

const LATENCY_MS: Record<MockScenario, number> = {
    normal: 800,
    slow: 3000,
    error: 800,
    empty: 800,
};

const parseScenario = (value: string | null): MockScenario =>
    SCENARIOS.find((scenario) => scenario === value) ?? "normal";

// Pick a scenario with ?mock=slow in the URL. failureRate 0.1 = ~10% of calls reject.
export const mockConfig = {
    scenario: parseScenario(new URLSearchParams(location.search).get("mock")),
    failureRate: 0,
};

const users = generateUsers();
const issues = generateIssues(10_000, users);
const comments = generateComments(issues, users);
const activity = generateActivity(issues, users);

export interface RequestOptions {
    signal?: AbortSignal;
}

export type IssueInput = Omit<Issue, "id" | "createdAt" | "updatedAt">;

const waitFor = (ms: number, signal?: AbortSignal): Promise<void> =>
    new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(signal.reason);
            return;
        }

        const timer = setTimeout(resolve, ms);
        signal?.addEventListener(
            "abort",
            () => {
                clearTimeout(timer);
                reject(signal.reason);
            },
            { once: true },
        );
    });

// build runs after the delay, so a failed or aborted mutation never touches the data.
// structuredClone stops callers from mutating the "server" copy.
const respond = async <TResponse>(
    build: () => TResponse,
    { signal }: RequestOptions = {},
    empty?: TResponse,
): Promise<TResponse> => {
    const { scenario, failureRate } = mockConfig;
    await waitFor(LATENCY_MS[scenario], signal);
    if (scenario === "error" || Math.random() < failureRate) {
        throw new Error("Mock API: 500 Internal Server Error");
    }
    return structuredClone(
        scenario === "empty" && empty !== undefined ? empty : build(),
    );
};

const findIssue = (id: IssueId): Issue => {
    const issue = issues.find((i) => i.id === id);
    if (!issue) throw new Error(`Mock API: 404 Issue ${id} not found`);
    return issue;
};

const now = () => new Date().toISOString();

export const getUsers = (options?: RequestOptions) =>
    respond(() => users, options, []);

export const getIssues = (options?: RequestOptions) =>
    respond(() => issues, options, []);

export const getIssue = (id: IssueId, options?: RequestOptions) =>
    respond(() => findIssue(id), options);

export const getComments = (issueId: IssueId, options?: RequestOptions) =>
    respond(() => comments.filter((c) => c.issueId === issueId), options, []);

export const getActivity = (issueId: IssueId, options?: RequestOptions) =>
    respond(() => activity.filter((a) => a.issueId === issueId), options, []);

export const createIssue = (
    input: Pick<IssueInput, "title"> & Partial<IssueInput>,
    options?: RequestOptions,
) =>
    respond((): Issue => {
        const title = input.title.trim();
        if (!title) throw new Error("Mock API: 422 Title is required");
        const at = now();
        const issue: Issue = {
            description: "",
            status: "Backlog",
            priority: "Medium",
            labels: [],
            assigneeId: null,
            parentId: null,
            dueDate: null,
            ...input,
            title,
            id: `ISS-${String(issues.length + 1).padStart(4, "0")}`,
            createdAt: at,
            updatedAt: at,
        };
        issues.push(issue);
        activity.push({
            id: `a-${activity.length + 1}`,
            issueId: issue.id,
            actorId: users[0].id, // ponytail: no auth yet, pass a real actor once current-user exists
            at,
            type: "created",
        });
        return issue;
    }, options);

export const updateIssue = (
    id: IssueId,
    patch: Partial<IssueInput>,
    options?: RequestOptions,
) =>
    respond((): Issue => {
        const issue = findIssue(id);
        if (patch.title !== undefined && !patch.title.trim()) {
            throw new Error("Mock API: 422 Title is required");
        }
        Object.assign(issue, patch, { updatedAt: now() });
        return issue;
    }, options);

export const addComment = (
    issueId: IssueId,
    body: string,
    authorId: User["id"],
    options?: RequestOptions,
) =>
    respond((): IssueComment => {
        findIssue(issueId);
        if (!body.trim()) throw new Error("Mock API: 422 Comment is empty");
        const comment: IssueComment = {
            id: `c-${comments.length + 1}`,
            issueId,
            authorId,
            body,
            createdAt: now(),
        };
        comments.push(comment);
        return comment;
    }, options);
