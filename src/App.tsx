import { Navigate, Route, Routes } from "react-router";
import { IssuesPage } from "@/features/issues/IssuesPage";
import { BoardPage } from "@/features/board/BoardPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { RootLayout } from "@/layout/RootLayout";
import { IssueDetailRoute } from "@/features/issues/IssueDetailRoute";

function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path="/all" element={<IssuesPage />} />
                <Route path="/issues/:id" element={<IssueDetailRoute />} />
                <Route path="/inbox" element={<IssuesPage />} />
                <Route path="/my" element={<IssuesPage />} />
                <Route path="/board" element={<BoardPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                <Route path="*" element={<Navigate to="/all" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
