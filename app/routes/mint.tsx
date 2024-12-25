import {
    unstable_composeUploadHandlers as composeUploadHandlers,
    unstable_createMemoryUploadHandler as createMemoryUploadHandler,
    unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/server-runtime";
import type { Route } from "./+types/mint";
import { getNextTokenId, getTokenURI, mintNFT } from "~/server/web3.server";
import { data, isRouteErrorResponse, useFetcher } from "react-router";
import { isAddress } from "viem";
import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import "~/styles/mint.css";
import { uploadObject } from "~/server/r2.server";
import getDomainUrl from "~/lib/getDomainUrl";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Holiday Contest 2024 | Mint" },
        {
            name: "description",
            content: "Calypso Hub Holiday Contest. Powered by SKALE Network.",
        },
    ];
}

export async function action({ request }: Route.ActionArgs) {
    const uploadHandler = composeUploadHandlers(
        createMemoryUploadHandler({ maxPartSize: 10000000 })
    );

    const formData = await parseMultipartFormData(request, uploadHandler);

    const files = formData.getAll("upload");
    const walletAddress = formData.get("walletAddress")?.toString();

    if (!walletAddress) {
        throw data("Wallet Address Not Found", {
            status: 400,
        });
    }

    const [upload] = files as [File];

    if (!upload) {
        throw data("File Not FOund", {
            status: 400,
        });
    }

    const nextTokenId = await getNextTokenId();

    const fileName = `${nextTokenId}.${upload.name.split(".")[1]}`;
    await uploadObject(upload, fileName);
    const { txHash, tokenId } = await mintNFT(
        walletAddress,
        `${getDomainUrl(request)}/api/image/${fileName}`
    );

    return {
        messsage: "Success",
        txHash,
        tokenId,
        tokenURI: await getTokenURI(tokenId),
    };
}

export default function Mint() {
    const [error, setError] = useState<string>("");
    const fetcher = useFetcher();

    const isSubmitted = fetcher.state === "submitting";

    return (
        <div>
            <h2>Mint Holiday NFT</h2>
            <br />
            <Card>
                <CardContent className="row contentCard">
                    <div className="left">
                        <br />
                        <h3>How to Mint: </h3>
                        <ol>
                            <li>
                                Input Wallet Address (must be compatible with
                                SKALE Calypso.{" "}
                                <small>Gnosis SAFE not supported</small>
                            </li>
                            <li>Upload Image</li>
                            <li>Click Mint</li>
                        </ol>
                        <br />
                        <br />
                        <fetcher.Form
                            className="mint-form"
                            method="post"
                            encType="multipart/form-data" // The form's enctype must be set to "multipart/form-data" for file uploads
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const formValues: Record<string, any> = {};
                                formData.forEach((value, key) => {
                                    formValues[key] = value;
                                });

                                if (!isAddress(formValues["walletAddress"])) {
                                    setError("Please Connect a Valid Wallet");
                                }
                                // Comment Below Line to Submit
                                fetcher.submit(e.currentTarget);
                            }}
                        >
                            <div className="column">
                                <Label htmlFor="upload">
                                    Select Image to Upload
                                </Label>
                                <small>
                                    Image will upload automatically during NFT
                                    Mint
                                </small>
                                <br />
                                <input
                                    type="file"
                                    id="upload"
                                    name="upload"
                                    accept="image/*"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <br />
                            <div className="column">
                                <Label htmlFor="walletAddress">
                                    Wallet Address
                                </Label>
                                <Input
                                    type="text"
                                    id="walletAddress"
                                    name="walletAddress"
                                    pattern="^0x[a-fA-F0-9]{40}$"
                                    required
                                />
                            </div>
                            <br />
                            {error && error.length > 0 && (
                                <>
                                    <p style={{ color: "red" }}>{error}</p>
                                    <br />
                                </>
                            )}
                            <button
                                type="submit"
                                disabled={fetcher.state === "submitting"}
                            >
                                Mint NFT
                            </button>
                        </fetcher.Form>
                    </div>
                    <div className="right">
                        {fetcher.data && fetcher.data.tokenId ? (
                            <div className="mint-successful">
                                <h4>Success!</h4>
                                <p>
                                    You minted NFT #
                                    {fetcher.data.tokenId.toString()}
                                </p>
                                <img
                                    src={fetcher.data.tokenURI.image}
                                    alt="Holiday NFT"
                                />
                            </div>
                        ) : (
                            <div className="waiting-for-mint">
                                <p>
                                    {isSubmitted
                                        ? "Minting NFT..."
                                        : "Mint your NFT on the Left"}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error)) {
        return (
            <div className="error">
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </div>
        );
    } else if (error instanceof Error) {
        return (
            <div className="error">
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </div>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}
