import { createContext, use } from "react";

export type Theme = "light" | "dark" | "system";
export type ThemeValue = { theme: Theme; setTheme: (theme: Theme) => void };

export const ThemeContext = createContext<ThemeValue | null>(null);

export const useTheme = (): ThemeValue => {
    const value = use(ThemeContext);
    if (!value) {
        throw new Error("useTheme must be used inside <ThemeProvider>");
    }

    return value;
};
