import type { Route } from "./+types/vote";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Holiday Contest 2024 | Vote" },
        {
            name: "description",
            content:
                "Calypso Hub Holiday Contest. Powered by SKALE Network.",
        },
    ];
}

export default function Vote() {
    return (
        <>
            <h2>Vote</h2>
        </>
    );
}