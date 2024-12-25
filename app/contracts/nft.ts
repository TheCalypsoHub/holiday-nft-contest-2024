const isMainnet = process.env.NETWORK === "mainnet";

export default {
    abi: [
        {
            type: "constructor",
            inputs: [
                { name: "name", type: "string", internalType: "string" },
                { name: "symbol", type: "string", internalType: "string" },
            ],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "DEFAULT_ADMIN_ROLE",
            inputs: [],
            outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "MINTER_ROLE",
            inputs: [],
            outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "PAUSER_ROLE",
            inputs: [],
            outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "approve",
            inputs: [
                { name: "to", type: "address", internalType: "address" },
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
            name: "balanceOf",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    internalType: "address",
                },
            ],
            outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "getApproved",
            inputs: [
                {
                    name: "tokenId",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            outputs: [{ name: "", type: "address", internalType: "address" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "getRoleAdmin",
            inputs: [
                { name: "role", type: "bytes32", internalType: "bytes32" },
            ],
            outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "grantRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32",
                },
                {
                    name: "account",
                    type: "address",
                    internalType: "address",
                },
            ],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "hasRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32",
                },
                {
                    name: "account",
                    type: "address",
                    internalType: "address",
                },
            ],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "isApprovedForAll",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    internalType: "address",
                },
                {
                    name: "operator",
                    type: "address",
                    internalType: "address",
                },
            ],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "name",
            inputs: [],
            outputs: [{ name: "", type: "string", internalType: "string" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "nextTokenId",
            inputs: [],
            outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "ownerOf",
            inputs: [
                {
                    name: "tokenId",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            outputs: [{ name: "", type: "address", internalType: "address" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "pause",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "paused",
            inputs: [],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "renounceRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32",
                },
                {
                    name: "callerConfirmation",
                    type: "address",
                    internalType: "address",
                },
            ],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "revokeRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32",
                },
                {
                    name: "account",
                    type: "address",
                    internalType: "address",
                },
            ],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "safeMint",
            inputs: [
                { name: "to", type: "address", internalType: "address" },
                { name: "uri", type: "string", internalType: "string" },
            ],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "safeTransferFrom",
            inputs: [
                {
                    name: "from",
                    type: "address",
                    internalType: "address",
                },
                { name: "to", type: "address", internalType: "address" },
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
            name: "safeTransferFrom",
            inputs: [
                {
                    name: "from",
                    type: "address",
                    internalType: "address",
                },
                { name: "to", type: "address", internalType: "address" },
                {
                    name: "tokenId",
                    type: "uint256",
                    internalType: "uint256",
                },
                { name: "data", type: "bytes", internalType: "bytes" },
            ],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "setApprovalForAll",
            inputs: [
                {
                    name: "operator",
                    type: "address",
                    internalType: "address",
                },
                { name: "approved", type: "bool", internalType: "bool" },
            ],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4",
                },
            ],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "symbol",
            inputs: [],
            outputs: [{ name: "", type: "string", internalType: "string" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "tokenByIndex",
            inputs: [
                {
                    name: "index",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "tokenOfOwnerByIndex",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    internalType: "address",
                },
                {
                    name: "index",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "tokenURI",
            inputs: [
                {
                    name: "tokenId",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            outputs: [{ name: "", type: "string", internalType: "string" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "tokensOfOwner",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    internalType: "address",
                },
            ],
            outputs: [
                { name: "", type: "uint256[]", internalType: "uint256[]" },
            ],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "totalSupply",
            inputs: [],
            outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "transferFrom",
            inputs: [
                {
                    name: "from",
                    type: "address",
                    internalType: "address",
                },
                { name: "to", type: "address", internalType: "address" },
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
            name: "unpause",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "event",
            name: "Approval",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
                {
                    name: "approved",
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
            type: "event",
            name: "ApprovalForAll",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
                {
                    name: "operator",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
                {
                    name: "approved",
                    type: "bool",
                    indexed: false,
                    internalType: "bool",
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "BatchMetadataUpdate",
            inputs: [
                {
                    name: "_fromTokenId",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256",
                },
                {
                    name: "_toTokenId",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256",
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "MetadataUpdate",
            inputs: [
                {
                    name: "_tokenId",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256",
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "Paused",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    indexed: false,
                    internalType: "address",
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "RoleAdminChanged",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    indexed: true,
                    internalType: "bytes32",
                },
                {
                    name: "previousAdminRole",
                    type: "bytes32",
                    indexed: true,
                    internalType: "bytes32",
                },
                {
                    name: "newAdminRole",
                    type: "bytes32",
                    indexed: true,
                    internalType: "bytes32",
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "RoleGranted",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    indexed: true,
                    internalType: "bytes32",
                },
                {
                    name: "account",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
                {
                    name: "sender",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "RoleRevoked",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    indexed: true,
                    internalType: "bytes32",
                },
                {
                    name: "account",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
                {
                    name: "sender",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "Transfer",
            inputs: [
                {
                    name: "from",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
                {
                    name: "to",
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
            type: "event",
            name: "Unpaused",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    indexed: false,
                    internalType: "address",
                },
            ],
            anonymous: false,
        },
        {
            type: "error",
            name: "AccessControlBadConfirmation",
            inputs: [],
        },
        {
            type: "error",
            name: "AccessControlUnauthorizedAccount",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    internalType: "address",
                },
                {
                    name: "neededRole",
                    type: "bytes32",
                    internalType: "bytes32",
                },
            ],
        },
        {
            type: "error",
            name: "ERC721EnumerableForbiddenBatchMint",
            inputs: [],
        },
        {
            type: "error",
            name: "ERC721IncorrectOwner",
            inputs: [
                {
                    name: "sender",
                    type: "address",
                    internalType: "address",
                },
                {
                    name: "tokenId",
                    type: "uint256",
                    internalType: "uint256",
                },
                {
                    name: "owner",
                    type: "address",
                    internalType: "address",
                },
            ],
        },
        {
            type: "error",
            name: "ERC721InsufficientApproval",
            inputs: [
                {
                    name: "operator",
                    type: "address",
                    internalType: "address",
                },
                {
                    name: "tokenId",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
        },
        {
            type: "error",
            name: "ERC721InvalidApprover",
            inputs: [
                {
                    name: "approver",
                    type: "address",
                    internalType: "address",
                },
            ],
        },
        {
            type: "error",
            name: "ERC721InvalidOperator",
            inputs: [
                {
                    name: "operator",
                    type: "address",
                    internalType: "address",
                },
            ],
        },
        {
            type: "error",
            name: "ERC721InvalidOwner",
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
            name: "ERC721InvalidReceiver",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    internalType: "address",
                },
            ],
        },
        {
            type: "error",
            name: "ERC721InvalidSender",
            inputs: [
                {
                    name: "sender",
                    type: "address",
                    internalType: "address",
                },
            ],
        },
        {
            type: "error",
            name: "ERC721NonexistentToken",
            inputs: [
                {
                    name: "tokenId",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
        },
        {
            type: "error",
            name: "ERC721OutOfBoundsIndex",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    internalType: "address",
                },
                {
                    name: "index",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
        },
        { type: "error", name: "EnforcedPause", inputs: [] },
        { type: "error", name: "ExpectedPause", inputs: [] },
    ],
    address: isMainnet ? "" : "0xbd1df8e9ea32b047c7a21c55820223ae69d4a67c",
};
