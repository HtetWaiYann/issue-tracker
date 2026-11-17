# Tracker

A Linear-style issue tracker running on 10,000 seeded issues, built to practise advanced React: hooks, rendering, state management, performance and debugging.

Every piece of logic is written by hand. The app uses no UI component library, no state library and no data-fetching library, so each pattern is built from scratch and can be measured.

> **Status:** early setup. See [`PROGRESS.md`](PROGRESS.md) for the current step.

## Screens

The reference designs are in [`design/`](design/) (`*.dc.html` plus feature notes in `canvas.json`).

| Screen | Features | React concepts |
|---|---|---|
| **Issues list** | 10k-row table, search as you type, filter chips saved in the URL, sorting, J/K navigation, live update toasts | `useDeferredValue`, `useTransition`, virtualization, `React.memo`, custom `useUrlState` hook |
| **Issue detail** | Inline-editable title and description, properties, sub-issues, optimistic comments, activity log, undo/redo | `useReducer` + history stack, `useOptimistic`, `use()` + Suspense, error boundaries, `useLayoutEffect` |
| **Board** | Kanban columns by status, drag and drop, drop placeholder, WIP limits, live card moves | `useSyncExternalStore`, stable keys, pointer events + refs, `lazy()` |
| **New issue** | Modal form with server-style validation, pending state, "Create more", saved drafts | `useActionState`, `useFormStatus`, `useId`, `createPortal`, focus trap |
| **Command palette** | ⌘K from anywhere, fuzzy search over actions and issues, keyboard-only use | `useImperativeHandle`, global shortcut hook, accessible listbox (`aria-activedescendant`) |
| **Settings & performance lab** | Theme, offline queue, controls for dataset size, latency, failure rate and socket speed, virtualization and memo toggles, bug drills | Split contexts, `navigator.onLine` via `useSyncExternalStore`, effect cleanup, React Compiler on/off, Profiler |

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) for styling (planned, not installed yet)
- [`@faker-js/faker`](https://fakerjs.dev) for deterministic seed data (planned, not installed yet)
- ESLint with `eslint-plugin-react-hooks`
- React Compiler: off until the performance phase (step 5.6), then compared before and after

The backend is simulated: a fake API with configurable latency and failure rate, plus a mock WebSocket that pushes live updates.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run lint      # run ESLint
npm run preview   # preview the production build
```

## Project structure

```
design/            Reference screens and feature notes (read-only)
src/
  components/ui/   Generic presentational components (Button, Pill, Avatar, Modal shell…)
  features/
    issues/        Issue list, row, detail, create form
    board/         Board, column, card
    palette/       Command palette
    settings/      Settings, performance lab, bug drills
  layout/          App shell, sidebar, toast area
  state/           Stores, reducers, contexts
  hooks/           Custom hooks
  api/             Fake API, mock WebSocket, seed data
  lib/             Helpers
```

## Roadmap

| Phase | Focus |
|---|---|
| 0 · Setup | Tooling, types, seed generator, fake API |
| 1 · Core app | App shell, routing, issue list, issue detail, theme and user contexts |
| 2 · Complex state | Reducer store, undo/redo, URL filters, board drag and drop, context splitting |
| 3 · Outside world | Fetching with abort and retry, mock WebSocket, offline sync, command palette, popovers |
| 4 · React 19 | Form actions, `useOptimistic`, `use()` + Suspense, error boundaries |
| 5 · Performance | Profiler baseline, deferred search, virtualization, memoization, code splitting, React Compiler |
| 6 · Debugging drills | Hunt planted bugs: stale closures, missing cleanup, index keys, render loops, leaks |
| 7 · Stretch | Vitest + RTL, Playwright, IndexedDB, Next.js App Router port |

Measurements and lessons from each step go into `LEARNINGS.md`.
