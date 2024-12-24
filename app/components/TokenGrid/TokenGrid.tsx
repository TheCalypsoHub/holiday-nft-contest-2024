import TokenTile, { type Token } from "../TokenTile/TokenTile";
import "./TokenGrid.css"; // CSS for styling the grid

export default function TokenGrid({ tokens }: { tokens: Token[] }) {
  return (
    <>
      <div className="tokensGrid">
        {tokens && tokens.length > 0 && tokens.map((token: Token, index: number) => {
          return (
            <div key={index} className="tokensGridItem">
              <TokenTile token={token} />
            </div>
          );
        })}
      </div>
    </>
  );
};