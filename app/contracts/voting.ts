const isMainnet = process.env.NETWORK === "mainnet";

export default {
    abi: [
        {
            type: "constructor",
            inputs: [
                {
                    name: "_nftContract",
                    type: "address",
                    internalType: "address",
                },
            ],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "getTopTokens",
            inputs: [],
            outputs: [
                {
                    name: "tokens",
                    type: "uint256[]",
                    internalType: "uint256[]",
                },
                {
                    name: "voteCounts",
                    type: "uint256[]",
                    internalType: "uint256[]",
                },
            ],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "hasVoted",
            inputs: [{ name: "", type: "address", internalType: "address" }],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "nftContract",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IERC721",
                },
            ],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "topTokens",
            inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "totalVotes",
            inputs: [],
            outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "vote",
            inputs: [
                {
                    name: "tokenId",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "votes",
            inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            stateMutability: "view",
        },
        {
            type: "event",
            name: "VoteCast",
            inputs: [
                {
                    name: "voter",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
                {
                    name: "tokenId",
                    type: "uint256",
                    indexed: true,
                    internalType: "uint256",
                },
            ],
            anonymous: false,
        },
        {
            type: "error",
            name: "ReentrancyGuardReentrantCall",
            inputs: [],
        },
    ],
    address: isMainnet ? "" : "0x654aacdb63a8066527ed6e39c9a2c3f6a037fad2",
};
