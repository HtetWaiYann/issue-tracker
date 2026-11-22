import { getCurrentUser, getUsers } from "@/api/api";
import { toRowAssignee } from "@/lib/user";
import { useEffect, useState, type ReactNode } from "react";
import { UsersContext, type UsersValue } from "./UsersContext";

export function UsersProvider({ children }: { children: ReactNode }) {
    const [value, setValue] = useState<UsersValue | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;
        Promise.all([getCurrentUser(), getUsers()])
            .then(([currentUser, users]) => {
                if (ignore) return;
                // set once and never changes → stable identity without useMemo
                setValue({
                    currentUser,
                    users,
                    assigneesById: new Map(
                        users.map((u) => [u.id, toRowAssignee(u)]),
                    ),
                });
            })
            .catch(() => {
                if (!ignore) setError("Couldn't load your account.");
            });
        return () => {
            ignore = true;
        };
    }, []);

    if (error)
        return (
            <p role="alert" className="p-6 text-red-700">
                {error}
            </p>
        );
    if (!value) return <p className="p-6 text-zinc-500">Loading…</p>;
    return <UsersContext value={value}>{children}</UsersContext>;
}
