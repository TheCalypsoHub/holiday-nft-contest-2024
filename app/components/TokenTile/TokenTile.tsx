import { useAccount, useReadContract } from "wagmi";
import Vote from "../Vote/Vote";
import "./TokenTile.css";
import VotingContract from "~/contracts/voting";

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
        abi: VotingContract.abi,
        address: VotingContract.address as `0x${string}`,
        functionName: "hasVoted",
        args: [address],
    });

    return (
        <div className="nftTile">
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
                <p>
                    <strong># of Votes:</strong> {token.votes}
                </p>
                <p>
                    <strong>Token #:</strong> {token.tokenId}
                </p>
                <p>
                    <strong>Current Owner:</strong>{" "}
                    {token.owner.substring(0, 10)}...{token.owner.substring(30)}
                </p>
            </div>
        </div>
    );
}
