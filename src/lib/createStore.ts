export type Store<S, A> = {
    getState: () => S;
    dispatch: (action: A) => void;
    subscribe: (listener: () => void) => () => void;
};

export const createStore = <S, A>(
    reducer: (state: S, action: A) => S,
    initialState: S,
): Store<S, A> => {
    let state = initialState;
    const listeners = new Set<() => void>();
    return {
        getState: () => state,
        dispatch(action) {
            const next = reducer(state, action);

            // reducer said "nothing changed" → nobody re-renders
            if (next === state) {
                return;
            }

            state = next;
            listeners.forEach((listener) => listener());
        },
        // Returns its own cleanup, exactly the shape useSyncExternalStore wants
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
};
