import type { IssueInput } from "@/api/api";
import type { Issue, IssueId, Status, Timestamp } from "@/api/types";
import { createStore } from "./createStore";
import { useMemo, useSyncExternalStore } from "react";

export type Edit = {
    id: IssueId;
    before: Partial<IssueInput>;
    after: Partial<IssueInput>;
    label: string;
};

export type IssuesState = {
    isLoaded: boolean;
    byId: Record<IssueId, Issue>; // O(1) lookup for detail/row
    ids: IssueId[];
    past: Edit[];
    future: Edit[];
};

// `at` comes IN the action: reducers must be pure, so no new Date() inside them
export type IssuesAction =
    | { type: "loaded"; issues: Issue[] }
    | {
          type: "edited";
          id: IssueId;
          patch: Partial<IssueInput>;
          label: string;
          at: Timestamp;
      }
    | { type: "received"; issue: Issue } // server/socket truth, not undoable
    | { type: "created"; issue: Issue }
    | { type: "undo"; at: Timestamp }
    | { type: "redo"; at: Timestamp }
    | {
          type: "moved";
          id: IssueId;
          status: Status;
          beforeId: IssueId | null;
          at: Timestamp;
      };

const initialState: IssuesState = {
    isLoaded: false,
    byId: {},
    ids: [],
    past: [],
    future: [],
};

function patchIssue(
    state: IssuesState,
    id: IssueId,
    patch: Partial<IssueInput>,
    at: Timestamp,
): IssuesState {
    const issue = state.byId[id];
    if (!issue) return state;
    // copies only the path to the change; every OTHER issue keeps its identity
    return {
        ...state,
        byId: { ...state.byId, [id]: { ...issue, ...patch, updatedAt: at } },
    };
}

export function issuesReducer(
    state: IssuesState,
    action: IssuesAction,
): IssuesState {
    switch (action.type) {
        case "loaded":
            return {
                ...initialState,
                isLoaded: true,
                byId: Object.fromEntries(
                    action.issues.map((issue) => [issue.id, issue]),
                ),
                ids: action.issues.map((issue) => issue.id),
            };
        case "edited":
            return patchIssue(state, action.id, action.patch, action.at); // history added in 2.2
        case "received":
            if (!state.byId[action.issue.id]) return state; // not loaded here → ignore, same state = no render
            return {
                ...state,
                byId: { ...state.byId, [action.issue.id]: action.issue },
            };
        case "created":
            return {
                ...state,
                byId: { ...state.byId, [action.issue.id]: action.issue },
                ids: [action.issue.id, ...state.ids],
            };
        default:
            return state; // undo/redo/moved come later
    }
}

export const issuesStore = createStore(issuesReducer, initialState);

// getSnapshot must return the SAME value when nothing changed, otherwise React loops forever.
// So selectors return things that already exist in state (byId, ids, one issue), never new arrays.
export function useIssuesSelector<T>(selector: (state: IssuesState) => T): T {
    return useSyncExternalStore(issuesStore.subscribe, () =>
        selector(issuesStore.getState()),
    );
}

export const useIssue = (id: IssueId): Issue | undefined =>
    useIssuesSelector((s) => s.byId[id]);

// Build the array in useMemo, NOT inside the selector
export function useIssueList(): Issue[] {
    const byId = useIssuesSelector((s) => s.byId);
    const ids = useIssuesSelector((s) => s.ids);
    return useMemo(() => ids.map((id) => byId[id]), [byId, ids]);
}
