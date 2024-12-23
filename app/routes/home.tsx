import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Holiday Contest 2024 | Home" },
        {
            name: "description",
            content:
                "Calypso Hub Holiday Contest. Powered by SKALE Network.",
        },
    ];
}

export default function Home() {
    return (
        <>
            <h2>Holiday Contest</h2>
        </>
    );
}
