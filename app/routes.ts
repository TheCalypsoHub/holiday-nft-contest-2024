import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    // route("/mint", "routes/mint.tsx"),
    // route("/vote", "routes/vote.tsx"),
    // route("/api/image/:id", "routes/api/image.tsx")
] satisfies RouteConfig;
