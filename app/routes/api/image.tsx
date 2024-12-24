import type { Route } from "./+types/image";
import { data } from "react-router";
import { getObject } from "~/server/r2.server";

export async function loader({ params }: Route.LoaderArgs) {
    const { id } = params;

    const imageObj = await getObject(id);

    if (!imageObj.Body || !imageObj.ContentType) {
        return data(
            {
                error: "Invalid Image, Body Not Found",
            },
            {
                status: 400,
            }
        );
    }
    return new Response(imageObj.Body.transformToWebStream(), {
        headers: {
            "Content-Type": imageObj.ContentType,
        },
    });
}
