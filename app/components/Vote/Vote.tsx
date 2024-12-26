import "./styles.css";
import { Button } from "../ui/button";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import {
    checksumAddress,
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    getAddress,
    http,
    stringToHex,
    toHex,
    type Hex,
} from "viem";
import { skaleCalypso, skaleCalypsoTestnet } from "viem/chains";
import mineGasForTransaction from "./miner";
import VotingContract from "~/contracts/voting";
import { useEffect, useState } from "react";
import { useRevalidator } from "react-router";

export default function Vote({ tokenId }: { tokenId: bigint }) {
    const [isPending, setIsPending] = useState<boolean>(false);
    const revalidator = useRevalidator();
    const canVote = true;

    const vote = async (tokenId: bigint) => {
        setIsPending(true);
        await new Promise<void>((resolve) => setTimeout(resolve, 0));

        let privateKey = localStorage.getItem("vk");

        if (!privateKey) {
            privateKey = generatePrivateKey();
            localStorage.setItem("vk", privateKey);
        }

        const publicClient = createPublicClient({
            chain: skaleCalypso,
            transport: http(),
        });

        const walletClient = createWalletClient({
            chain: skaleCalypso,
            transport: http(),
            account: privateKeyToAccount(privateKey as Hex),
        });

        const numberVotes = await publicClient.readContract({
            abi: VotingContract.abi,
            address: VotingContract.address as Hex,
            functionName: "numberVotes",
            args: [walletClient.account.address],
        });

        if (numberVotes === BigInt(3)) {
            alert("You are out of votes! (3 per person)");
            return;
        }

        const nonce = await publicClient.getTransactionCount({
            address: walletClient.account.address,
        });

        const transactionData = encodeFunctionData({
            abi: VotingContract.abi,
            functionName: "vote",
            args: [tokenId],
        });

        const gasLimit = await publicClient.estimateGas({
            to: VotingContract.address as Hex,
            data: transactionData,
        });

        const gasPrice = await mineGasForTransaction(
            nonce,
            gasLimit.toString(),
            walletClient.account.address
        );

        const transactionHash = await walletClient.sendTransaction({
            to: VotingContract.address as Hex,
            data: transactionData,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            nonce,
        });

        console.info("Vote Tx Hash: ", transactionHash);

        setTimeout(() => {
            revalidator.revalidate();
        }, 5000);

        setTimeout(() => {
            revalidator.revalidate();
        }, 10000);

        setTimeout(() => {
            revalidator.revalidate();
        }, 15000);

        alert("Vote Confirmed. Count will update momentarily!");

        setIsPending(false);
    };

    return (
        <div className="vote-button">
            {canVote ? (
                <Button
                    onClick={async (e) => {
                        e.preventDefault();
                        try {
                            setIsPending(true);
                            await vote(tokenId);
                        } catch (err) {
                            setIsPending(false);
                        }
                    }}
                >
                    {isPending ? "Recording Vote..." : "Vote"}
                </Button>
            ) : (
                <>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            open();
                        }}
                    >
                        Connect Wallet to Vote
                    </button>
                </>
            )}
        </div>
    );
}
