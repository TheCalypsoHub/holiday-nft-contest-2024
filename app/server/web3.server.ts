import {
    getContract,
    createPublicClient,
    createWalletClient,
    http,
    parseEventLogs,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { skaleCalypso } from "viem/chains";
import NFTContract from "~/contracts/nft";

const privateKey = process.env.PRIVATE_KEY;

if (privateKey === undefined) {
    throw new Error("Missing Private Key");
}

if (!privateKey.startsWith("0x")) {
    throw new Error("Private Key Must Start with 0x");
}

const publicClient = createPublicClient({
    chain: skaleCalypso,
    transport: http(),
});

const walletClient = createWalletClient({
    chain: skaleCalypso,
    transport: http(),
    account: privateKeyToAccount(privateKey as `0x${string}`),
});

const contract = getContract({
    abi: NFTContract.abi,
    address: NFTContract.address as `0x${string}`,
    client: { public: publicClient, wallet: walletClient },
});

export async function getNextTokenId(): Promise<bigint> {
    return (await contract.read.nextTokenId()) as bigint;
}

export async function mintNFT(userAddress: string, uri: string) {
    const txHash = await contract.write.safeMint([userAddress, uri]);
    const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
    });

    const [transferLog] = parseEventLogs({
        abi: NFTContract.abi,
        logs: receipt.logs,
    });

    const tokenId = (transferLog as any)["args"].tokenId as bigint;

    return {
        txHash,
        receipt,
        tokenId,
    };
}

export async function getTokenURI(tokenId: bigint) {
    let tokenURI = (await contract.read.tokenURI([tokenId])) as string;

    const decoded = Buffer.from(tokenURI.split(",")[1], "base64").toString(
        "utf-8"
    );
    const obj = JSON.parse(decoded);

    return obj as {
        image: string;
        description: string;
        name: string;
    };
}
