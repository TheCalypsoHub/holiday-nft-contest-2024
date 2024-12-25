import { data, useLoaderData, useLocation } from "react-router";
import type { Route } from "./+types/vote";
import { gql, request as graphQLRequest } from "graphql-request";
import TokenGrid from "~/components/TokenGrid/TokenGrid";
import { getNextTokenId, getTokenURI } from "~/server/web3.server";
import type { Token } from "~/components/TokenTile/TokenTile";
import ReusablePagination from "~/components/ReusablePagination/ReusablePagination";
import "~/styles/vote.css";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Holiday Contest 2024 | Vote" },
        {
            name: "description",
            content: "Calypso Hub Holiday Contest. Powered by SKALE Network.",
        },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const GRAPH_ENDPOINT = process.env.GRAPH_ENDPOINT;

    if (!GRAPH_ENDPOINT) {
        throw new Error("Missing Graph Endpoint");
    }

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    let page = searchParams.get("page");

    const document = gql`
        {
            tokens(skip: ${(page ? parseInt(page) - 1 : 1) * 10}, orderBy:tokenId, first: 10) {
                owner {
                    id
                }
                votes
                tokenId
            }
        }
    `;

    const graphResponse = (await graphQLRequest(GRAPH_ENDPOINT!, document)) as {
        tokens: [{ tokenId: string; owner: { id: string }; votes: string }];
    };
    let tokens: Token[] = [];

    for (const token of graphResponse.tokens) {
        const uri = await getTokenURI(BigInt(token.tokenId));
        tokens.push({
            tokenId: token.tokenId,
            owner: token.owner.id,
            tokenURI: uri,
            votes: token.votes,
        });
    }

    const nextTokenId = await getNextTokenId();
    page = page ?? "1";
    let totalPages = 1;

    if (nextTokenId > 10) {
        totalPages = Number(nextTokenId / BigInt(10)) + 1;
    }

    return data({
        tokens,
        totalPages,
        previousPage: parseInt(page) - 1,
        currentPage: parseInt(page),
        nextPage: parseInt(page) + 1,
    });
}

export default function Vote() {
    const { tokens, totalPages, currentPage, previousPage, nextPage } =
        useLoaderData<typeof loader>();
    const location = useLocation();

    return (
        <>
            <div className="row page-header">
                <h2>Explore &amp; Vote</h2>
                <ReusablePagination
                    currentPage={currentPage}
                    nextPage={nextPage}
                    pathname={location.pathname}
                    previousPage={previousPage}
                    totalPages={totalPages}
                />
            </div>
            <TokenGrid tokens={tokens} />
            <ReusablePagination
                currentPage={currentPage}
                nextPage={nextPage}
                pathname={location.pathname}
                previousPage={previousPage}
                totalPages={totalPages}
            />
        </>
    );
}
