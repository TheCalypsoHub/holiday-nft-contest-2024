import { useAccount, useReadContract } from "wagmi";
import Vote from "../Vote/Vote";
import "./TokenTile.css";
import { abi } from "../../../smart-contracts/out/CalypsoHolidayVoting2024.sol/CalypsoHolidayVoting2024.json";
import testnetDeployments from "../../../smart-contracts/broadcast/Deploy.s.sol/974399131/run-latest.json";
import mainnetDeployments from "../../../smart-contracts/broadcast/Deploy.s.sol/974399131/run-latest.json"; // Update

const isMainnet = process.env.NETWORK === "mainnet";

export type Token = {
    tokenURI: {
        image: string;
        description: string;
        name: string;
    };
    owner: string;
    tokenId: string;
    votes: string;
};

export default function TokenTile({ token }: { token: Token }) {
    const { address } = useAccount();

    const { data: hasVoted } = useReadContract({
        abi: abi,
        address: (isMainnet
            ? mainnetDeployments.transactions[1].contractAddress
            : testnetDeployments.transactions[1]
                  .contractAddress) as `0x${string}`,
        functionName: "hasVoted",
        args: [address],
    });

    return (
        <div className="nftTile">
            <div className="vote-count">
                <p># of Votes: {token.votes}</p>
            </div>
            {!hasVoted && (
                <Vote
                    key={"vote" + token.tokenId.toString()}
                    tokenId={BigInt(token.tokenId)}
                />
            )}
            <div className="nftImage">
                <img
                    src={token.tokenURI.image}
                    alt={`Holiday NFT #${token.tokenId}`}
                />
            </div>
            <div className="nftDetails">
                <h2 className="nftName">{token.owner}</h2>
                <small>Current Owner</small>
            </div>
        </div>
    );
}
