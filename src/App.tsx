import type { RowAssignee } from "@/features/issues/IssueRow";
import { AppShell } from "@/layout/AppShell";
import { Sidebar } from "@/layout/Sidebar";
import { IssuesHeader } from "@/features/issues/IssuesHeader";
import { IssuesToolbar } from "@/features/issues/IssuesToolbar";

const AK: RowAssignee = { name: "Alex Kim", initials: "AK", color: "#4F46E5" };

function App() {
    return (
        <AppShell
            sidebar={
                <Sidebar
                    current="all"
                    inboxCount={4}
                    myIssuesCount={23}
                    user={AK}
                    isOnline
                    onOpenPalette={() => {}}
                />
            }
        >
            <IssuesHeader
                title="All issues"
                countLabel="10,000 issues"
                view="list"
                onNewIssue={() => {}}
            />
            <IssuesToolbar
                query=""
                onQueryChange={() => {}}
                chips={[]}
                onAddFilter={() => {}}
                sortLabel="Priority ↓"
                onSortClick={() => {}}
            />
        </AppShell>
    );
}

export default App;
