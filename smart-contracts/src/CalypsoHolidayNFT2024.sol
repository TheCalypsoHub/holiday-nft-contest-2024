// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.24;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { ERC721Pausable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CalypsoHolidayNFT2024 is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Pausable, AccessControl {
    
    using Strings for uint256;

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    uint256 public nextTokenId;

    constructor(
        string memory name,
        string memory symbol
    )
        ERC721(name, symbol)
    {
        nextTokenId = 1;
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(MINTER_ROLE, _msgSender());
        _grantRole(PAUSER_ROLE, _msgSender());
        _grantRole(MANAGER_ROLE, _msgSender());
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function setURI(uint256 tokenId, string memory newTokenURI) external onlyRole(MANAGER_ROLE) {
        _setTokenURI(tokenId, newTokenURI);
    }

    function safeMint(address to, string memory uri) onlyRole(MINTER_ROLE) whenNotPaused public {
        
        if (bytes(uri).length == 0) {
            revert("Invalid URI -- Not allowed to Mint");
        }

        if (to == address(0)) {
            revert("Must not be null address");
        }

        uint256 tokenId = nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);

        uint256[] memory result = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            result[i] = tokenOfOwnerByIndex(owner, i);
        }
        return result;
    }

    // The following functions are overrides required by Solidity.
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        string memory imageURI = super.tokenURI(tokenId); // Get the stored URI for the token

        // Construct the JSON metadata
        string memory json = string(
            abi.encodePacked(
                '{"name":"Token #',
                Strings.toString(tokenId),
                '", "description":"This is a dynamic NFT", "image":"',
                imageURI,
                '"}'
            )
        );

        // Encode the JSON metadata as Base64
        string memory base64Encoded = Base64.encode(bytes(json));

        // Return the Base64 encoded JSON as a data URI
        return string(abi.encodePacked("data:application/json;base64,", base64Encoded));
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}