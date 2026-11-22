import type { Theme } from "@/state/ThemeContext";

const OPTIONS: { value: Theme; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
];

type ThemeSwitchProps = {
    value: Theme;
    onChange: (theme: Theme) => void;
};

export function ThemeSwitch({ value, onChange }: ThemeSwitchProps) {
    return (
        <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-[13px] text-zinc-500 dark:text-zinc-400">Theme</legend>
            <div className="flex w-fit overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                {OPTIONS.map((option) => (
                    <label
                        key={option.value}
                        className="cursor-pointer px-3.5 py-2 text-[13px] has-checked:bg-zinc-100 has-checked:font-medium has-focus-visible:ring-2 has-focus-visible:ring-indigo-500 has-focus-visible:ring-inset dark:has-checked:bg-zinc-800"
                    >
                        <input type="radio" name="theme" value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} className="sr-only" />
                        {option.label}
                    </label>
                ))}
            </div>
        </fieldset>
    );
}