import { data, useLoaderData } from "react-router";
import type { Route } from "./+types/vote";
import { gql, request as graphQLRequest } from "graphql-request";
import TokenGrid from "~/components/TokenGrid/TokenGrid";
import { getTokenURI } from "~/server/web3.server";
import type { Token } from "~/components/TokenTile/TokenTile";

const GRAPH_ENDPOINT = process.env.GRAPH_ENDPOINT;

if (!GRAPH_ENDPOINT) {
    throw new Error("Missing Graph Endpoint");
}

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

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const page = searchParams.get("page");

    const document = gql`
        {
            tokens(skip: ${(page ? parseInt(page) : 0) * 10}, orderBy:tokenId, first: 10) {
                owner {
                    id
                }
                tokenId
            }
        }
    `;

    const graphResponse = await graphQLRequest(GRAPH_ENDPOINT!, document) as { tokens: [{ tokenId: string, owner: { id: string }}]};
    let tokens: Token[] = []

    for (const token of graphResponse.tokens) {
        const uri = await getTokenURI(BigInt(token.tokenId));
        tokens.push({
            tokenId: token.tokenId,
            owner: token.owner.id,
            tokenURI: uri
        });
    }
    return data({
        tokens
    })
}

export default function Vote() {
        
    const { tokens } = useLoaderData<typeof loader>();

    return (
        <>
            <h2>Explore</h2>
            <TokenGrid tokens={tokens} /> 
        </>
    );
}