import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { useTheme } from "@/state/ThemeContext";

export function SettingsPage() {
    const { theme, setTheme } = useTheme();
    return <ThemeSwitch value={theme} onChange={setTheme} />;
}