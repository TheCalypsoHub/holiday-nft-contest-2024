import {
    getContract,
    createPublicClient,
    createWalletClient,
    http,
    parseEventLogs,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { skaleCalypso, skaleCalypsoTestnet } from "viem/chains";
import testnetDeployment from "../../smart-contracts/broadcast/Deploy.s.sol/974399131/run-latest.json";
import mainnetDeployment from "../../smart-contracts/broadcast/Deploy.s.sol/974399131/run-latest.json"; // Switch to Mainnet

import { abi } from "../../smart-contracts/out/CalypsoHolidayNFT2024.sol/CalypsoHolidayNFT2024.json";

const network = process.env.NETWORK;
const privateKey = process.env.PRIVATE_KEY;

if (privateKey === undefined) {
    throw new Error("Missing Private Key");
}

if (!privateKey.startsWith("0x")) {
    throw new Error("Private Key Must Start with 0x");
}

const isMainnet = network === "mainnet";

const publicClient = createPublicClient({
    chain: isMainnet ? skaleCalypso : skaleCalypsoTestnet,
    transport: http(),
});

const walletClient = createWalletClient({
    chain: isMainnet ? skaleCalypso : skaleCalypsoTestnet,
    transport: http(),
    account: privateKeyToAccount(privateKey as `0x${string}`),
});

const contract = getContract({
    abi,
    address: isMainnet
        ? "0x..."
        : (testnetDeployment.transactions[0].contractAddress as `0x${string}`),
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
        abi,
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
