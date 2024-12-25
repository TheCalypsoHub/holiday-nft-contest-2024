import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import "./styles.css";
import { Button } from "../ui/button";
import { useAppKit } from "@reown/appkit/react";
import { useSendTransaction } from "wagmi";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import {
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    getAddress,
    http,
} from "viem";
import { skaleCalypso, skaleCalypsoTestnet } from "viem/chains";
import mineGasForTransaction from "./miner";
import VotingContract from "~/contracts/voting";
import { useEffect, useState } from "react";
import { useRevalidator } from "react-router";

const isMainnet = process.env.NETWORK === "mainnet";

export default function Vote({ tokenId }: { tokenId: bigint }) {
    const { isConnected, address } = useAccount();
    const { sendTransactionAsync, isSuccess, status } = useSendTransaction();
    const [isPending, setIsPending] = useState<boolean>(false);
    const revalidator = useRevalidator();
    const modal = useAppKit();

    const open = () => {
        modal.open();
    };

    const vote = async (tokenId: bigint) => {
        const yes = confirm(
            "Warning, you will only be able to vote once. Are you sure?"
        );
        if (!yes) {
            setIsPending(false);
            return;
        }

        const mainnetFaucet = "0x02891b34B7911A9C68e82C193cd7A6fBf0c3b30A";
        const testnetFaucet = "0x62Fe932FF26e0087Ae383f6080bd2Ed481bA5A8A";

        const privateKey = generatePrivateKey();
        const publicClient = createPublicClient({
            chain: isMainnet ? skaleCalypso : skaleCalypsoTestnet,
            transport: http(),
        });
        const walletClient = createWalletClient({
            chain: isMainnet ? skaleCalypso : skaleCalypsoTestnet,
            transport: http(),
            account: privateKeyToAccount(privateKey),
        });

        const balance = await publicClient.getBalance({
            address: walletClient.account.address,
        });
        if (balance === BigInt(0)) {
            const nonce = await publicClient.getTransactionCount({
                address: walletClient.account.address,
            });
            const gasPrice = await mineGasForTransaction(
                nonce,
                80_000,
                walletClient.account.address
            );

            await walletClient.sendTransaction({
                to: isMainnet
                    ? (mainnetFaucet as `0x${string}`)
                    : (testnetFaucet as `0x${string}`),
                data: `0x0c11dedd000000000000000000000000${address?.substring(2)}`,
                gasPrice: gasPrice,
                gasLimit: 80_000,
                nonce,
            });
        }

        const res = await sendTransactionAsync({
            to: VotingContract.address as `0x${string}`,
            data: encodeFunctionData({
                abi: VotingContract.abi,
                functionName: "vote",
                args: [tokenId],
            }),
        });
        console.log("Res: ", res);
    };

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                revalidator.revalidate();
                setIsPending(false);
            }, 3000);
        }
    }, [isSuccess]);

    return (
        <div className="vote-button">
            {isConnected ? (
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
