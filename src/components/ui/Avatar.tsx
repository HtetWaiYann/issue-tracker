type AvatarProps = {
    name: string;
    initials: string; // TODO(you): derive from the user's name in lib/
    color: string; // hex from User.avatarColor
    size?: "sm" | "md";
};

const SIZES = {
    sm: "size-6 text-[10px]",
    md: "size-7 text-[11px]",
};

export function Avatar({ name, initials, color, size = "sm" }: AvatarProps) {
    return (
        <span
            role="img"
            aria-label={name}
            title={name}
            className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${SIZES[size]}`}
            style={{ backgroundColor: color }}
        >
            {initials}
        </span>
    );
}

export function UnassignedAvatar({ size = "sm" }: Pick<AvatarProps, "size">) {
    return (
        <span
            role="img"
            aria-label="Unassigned"
            title="Unassigned"
            className={`inline-block shrink-0 rounded-full border-[1.5px] border-dashed border-zinc-400 ${SIZES[size]}`}
        />
    );
}
