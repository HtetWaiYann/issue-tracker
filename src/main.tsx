import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@/state/ThemeProvider";
import { UsersProvider } from "@/state/UsersProvider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <UsersProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UsersProvider>
        </ThemeProvider>
    </StrictMode>,
);
