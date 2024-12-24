import "./TokenTile.css";

export type Token = {
    tokenURI: {
        image: string;
        description: string;
        name: string;
    };
    owner: string;
    tokenId: string;
};

export default function TokenTile({ token }: { token: Token }) {
    return (
        <div className="nftTile">
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
