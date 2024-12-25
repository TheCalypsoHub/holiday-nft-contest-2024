// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import { Test, console } from "forge-std/Test.sol";
import { CalypsoHolidayVoting2024 } from "../src/CalypsoHolidayVoting2024.sol";
import { CalypsoHolidayNFT2024 } from "../src/CalypsoHolidayNFT2024.sol";

contract Simulation is Test {
    
    CalypsoHolidayNFT2024 public calypsoHolidayNFT2024;
    CalypsoHolidayVoting2024 public calypsoHolidayVoting2024;

    function setUp() public {

        vm.deal(address(0x1), 100 * 10 ** 18);
        vm.deal(address(0x2), 100 * 10 ** 18);
        vm.deal(address(0x3), 100 * 10 ** 18);

        calypsoHolidayNFT2024 = new CalypsoHolidayNFT2024(
            "Calypso Holiday NFT 2024",
            "HOLIDAY"
        );

        calypsoHolidayVoting2024 = new CalypsoHolidayVoting2024(
            address(calypsoHolidayNFT2024)
        );
    }

    function test_SingleUserMint() public {
        uint256 nextTokenId = calypsoHolidayNFT2024.nextTokenId();

        calypsoHolidayNFT2024.safeMint(address(0x1), "ipfs://");

        assertEq(calypsoHolidayNFT2024.ownerOf(nextTokenId), address(0x1));
        assertEq(calypsoHolidayNFT2024.nextTokenId(), 2);
    }

    function test_MultiUserMint() public {
        calypsoHolidayNFT2024.safeMint(address(0x1), "ipfs://");
        calypsoHolidayNFT2024.safeMint(address(0x2), "ipfs://");
        calypsoHolidayNFT2024.safeMint(address(0x3), "ipfs://");

        assertEq(calypsoHolidayNFT2024.ownerOf(1), address(0x1));
        assertEq(calypsoHolidayNFT2024.ownerOf(2), address(0x2));
        assertEq(calypsoHolidayNFT2024.ownerOf(3), address(0x3));
        assertEq(calypsoHolidayNFT2024.nextTokenId(), 4);
    }

    function test_Vote() public {
        calypsoHolidayNFT2024.safeMint(address(0x1), "ipfs://");
        calypsoHolidayNFT2024.safeMint(address(0x2), "ipfs://");
        calypsoHolidayNFT2024.safeMint(address(0x3), "ipfs://");

        assertEq(calypsoHolidayNFT2024.ownerOf(1), address(0x1));
        assertEq(calypsoHolidayNFT2024.ownerOf(2), address(0x2));
        assertEq(calypsoHolidayNFT2024.ownerOf(3), address(0x3));
        assertEq(calypsoHolidayNFT2024.nextTokenId(), 4);

        vm.prank(address(0x1));
        calypsoHolidayVoting2024.vote(2);

        vm.prank(address(0x2));
        calypsoHolidayVoting2024.vote(2);

        vm.prank(address(0x3));
        calypsoHolidayVoting2024.vote(2);

        assertEq(calypsoHolidayVoting2024.totalVotes(), 3);

        assertEq(calypsoHolidayVoting2024.votes(0), 0);
        assertEq(calypsoHolidayVoting2024.votes(1), 0);
        assertEq(calypsoHolidayVoting2024.votes(2), 3);

        assertEq(calypsoHolidayVoting2024.hasVoted(address(0x1)), true);
        assertEq(calypsoHolidayVoting2024.hasVoted(address(0x2)), true);
        assertEq(calypsoHolidayVoting2024.hasVoted(address(0x3)), true);
        assertEq(calypsoHolidayVoting2024.hasVoted(address(this)), false);

        assertEq(calypsoHolidayVoting2024.topTokens(0), 2);

    }

}