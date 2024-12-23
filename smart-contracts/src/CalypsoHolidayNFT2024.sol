// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.24;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Pausable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract CalypsoHolidayNFT2024 is ERC721, ERC721URIStorage, ERC721Pausable, Ownable {
    uint256 public nextTokenId;

    event PrepareMint(address indexed minter, string uri);

    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    )
        ERC721(name, symbol)
        Ownable(initialOwner)
    {
        nextTokenId = 1;
    }

    mapping(address => string) public futureURIs;

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function prepareMint(address minter, string memory uri) public onlyOwner {
        futureURIs[minter] = uri;

        emit PrepareMint(minter, uri);
    }

    function safeMint() public {
        
        if (bytes(futureURIs[_msgSender()]).length == 0) {
            revert("Invalid URI -- Not allowed to Mint");
        }

        uint256 tokenId = nextTokenId++;
        
        _safeMint(_msgSender(), tokenId);
        _setTokenURI(tokenId, futureURIs[_msgSender()]);

        delete futureURIs[_msgSender()];
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}