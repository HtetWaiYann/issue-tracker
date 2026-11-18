import { Route, Routes } from "react-router";
import { IssuesPage } from "@/features/issues/IssuesPage";
import { BoardPage } from "./features/board/BoardPage";
import { SettingsPage } from "./features/settings/SettingsPage";
import { RootLayout } from "./layout/RootLayout";

function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path="/" element={<IssuesPage />} />
                <Route path="/inbox" element={<IssuesPage />} />
                <Route path="/my-issues" element={<IssuesPage />} />
                <Route path="/board" element={<BoardPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                <Route path="*" element={<IssuesPage />} />
            </Route>
        </Routes>
    );
}

export default App;
