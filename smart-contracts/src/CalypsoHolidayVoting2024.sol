// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CalypsoHolidayVoting2024 is ReentrancyGuard {
    
    IERC721 public nftContract;
    
    // Track Total Votes
    uint256 public totalVotes;

    // Mapping to track votes for each token ID
    mapping(uint256 => uint256) public votes;
    
    // Array to store top 250 token IDs by votes
    uint256[250] public topTokens;
    
    // Mapping to track if an address has voted
    mapping(address => bool) public hasVoted;
    
    // Event emitted when a vote is cast
    event VoteCast(address indexed voter, uint256 indexed tokenId);
    
    constructor(address _nftContract) {
        require(_nftContract != address(0), "Invalid NFT contract address");
        nftContract = IERC721(_nftContract);
    }
    
    /**
     * @dev Cast a vote for a specific token ID
     * @param tokenId The ID of the token to vote for
     */
    function vote(uint256 tokenId) external nonReentrant {
        // Ensure token exists by checking owner
        require(nftContract.ownerOf(tokenId) != address(0), "Token does not exist");
        
        // Check if wallet has already voted
        require(!hasVoted[msg.sender], "Address has already voted");
        
        // Mark address as having voted
        hasVoted[msg.sender] = true;
        
        // Increment vote count for token
        votes[tokenId]++;

        // Increment Total Votes
        totalVotes++;
        
        // Update top tokens array
        updateTopTokens(tokenId);
        
        emit VoteCast(msg.sender, tokenId);
    }
    
    /**
     * @dev Update the top tokens array when a new vote is cast
     * @param tokenId The ID of the token that received a vote
     */
    function updateTopTokens(uint256 tokenId) private {
        // Find where the token should be inserted in the sorted array
        uint256 voteCount = votes[tokenId];
        uint256 insertIndex = 250;
        
        for (uint256 i = 0; i < 250; i++) {
            // If we find an empty slot (0) or a token with fewer votes
            if (topTokens[i] == 0 || votes[topTokens[i]] < voteCount) {
                insertIndex = i;
                break;
            }
        }
        
        // Only proceed if the token should be in top 250
        if (insertIndex < 250) {
            // Shift elements to make room for the new token
            for (uint256 i = 249; i > insertIndex; i--) {
                topTokens[i] = topTokens[i-1];
            }
            
            // Insert the new token
            topTokens[insertIndex] = tokenId;
        }
    }
    
    /**
     * @dev Get the current top tokens and their vote counts
     * @return tokens Array of token IDs
     * @return voteCounts Array of vote counts corresponding to the token IDs
     */
    function getTopTokens() external view returns (uint256[] memory tokens, uint256[] memory voteCounts) {
        tokens = new uint256[](250);
        voteCounts = new uint256[](250);
        
        for (uint256 i = 0; i < 250; i++) {
            tokens[i] = topTokens[i];
            voteCounts[i] = votes[topTokens[i]];
        }
        
        return (tokens, voteCounts);
    }
}