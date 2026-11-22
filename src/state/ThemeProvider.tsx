import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

const readTheme = (): Theme => {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : "system";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(readTheme);
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const media = matchMedia("(prefers-color-scheme: dark)");
        const apply = () => {
            document.documentElement.classList.toggle(
                "dark",
                theme === "dark" || (theme == "system" && media.matches),
            );
        };

        apply();

        if (theme != "system") {
            return;
        }

        media.addEventListener("change", apply);

        return () => media.removeEventListener("change", apply);
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return <ThemeContext value={value}>{children}</ThemeContext>;
};
