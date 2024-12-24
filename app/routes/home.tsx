import type { Route } from "./+types/home";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import "~/styles/home.css";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Holiday Contest 2024 | Home" },
        {
            name: "description",
            content:
                "Calypso Hub Holiday Contest. Powered by SKALE Network.",
        },
    ];
}

export default function Home() {
    return (
        <div className="home">
            <h2>Calypso Holiday Contest</h2>
            <br />
            <hr />
            <br />
            <p>To the Calypso Community + Broader SKALE Network Community,</p>
            <p>Welcome to the the Calypso Holiday NFT Contest! This is the first of many exciting activities to come!</p>
            <p>With some fun holiday rewards to the winner of the community vote, we wish you the best of luck!</p>
            <br />
            <h3>How it Works</h3>
            <ol>
                <li>Minting opens Dec 25 at 9 AM PST</li>
                <li>Head over to the <a href="#">Mint</a> page and mint your NFT</li>
                <li>Minting closes and voting opens Jan 2 at 12 PM PST</li>
                <li>Head over to the <a href="#">Vote</a> page to vote on your favorite</li>
                <li>Voting closes January 6 at 12 PM PST</li>
                <li>Winners will be announced on January 7 at 9 AM PST. Reward will be AUTOMATICALLY DISTRIBUTED to the linked wallet</li>
            </ol>
            <br />
            <h3>Winners</h3>
            <h4>1st Place</h4>
            <p>600 SKL Tokens, 3 Future Whitelist Spots to the Freaky Frogs and Aliens NFT Collections</p>
            <h4>2nd Place</h4>
            <p>300 SKL Tokens, 2 Future Whitelist Spots to the Freaky Frogs and Aliens NFT Collections</p>
            <h4>3rd Place</h4>
            <p>100 SKL Tokens, 1 Future Whitelist Spot to the Freaky Frogs and Aliens NFT Collections each</p>
            <br />
            <small>
                Note, all SKL rewards and future NFTs will be distributed on the SKALE Europa Hub or SKALE Calypso Hub.
            </small>
            <br />
            <h5>Minting Ends + Voting Begins in:</h5>
            <FlipClockCountdown
                to={new Date(1735848000 * 1000)}
                className='flip-clock'
            />
        </div>
    );
}
