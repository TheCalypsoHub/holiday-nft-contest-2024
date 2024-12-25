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
            name: "lockVoting",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable",
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
            name: "owner",
            inputs: [],
            outputs: [{ name: "", type: "address", internalType: "address" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "renounceOwnership",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable",
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
            name: "transferOwnership",
            inputs: [
                {
                    name: "newOwner",
                    type: "address",
                    internalType: "address",
                },
            ],
            outputs: [],
            stateMutability: "nonpayable",
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
            type: "function",
            name: "votingLocked",
            inputs: [],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "view",
        },
        {
            type: "event",
            name: "OwnershipTransferred",
            inputs: [
                {
                    name: "previousOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
                {
                    name: "newOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
            ],
            anonymous: false,
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
            name: "OwnableInvalidOwner",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    internalType: "address",
                },
            ],
        },
        {
            type: "error",
            name: "OwnableUnauthorizedAccount",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    internalType: "address",
                },
            ],
        },
        {
            type: "error",
            name: "ReentrancyGuardReentrantCall",
            inputs: [],
        },
    ],
    address: isMainnet
        ? "0xeae817e91731a55796bead806dadb8f00862fa22"
        : "0xf53D3D9c510D76F55D9695F9b823565dC3FA9D07",
};
