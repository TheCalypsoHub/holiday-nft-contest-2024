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
