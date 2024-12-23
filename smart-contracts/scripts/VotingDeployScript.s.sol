// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import { Script, console } from "forge-std/Script.sol";
import { CalypsoHolidayVoting2024 } from "../src/CalypsoHolidayVoting2024.sol";
import { CalypsoHolidayNFT2024 } from "../src/CalypsoHolidayNFT2024.sol";

contract VotingDeployScript is Script {
    CalypsoHolidayVoting2024 public calypsoHolidayVoting2024;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        nft = new CalypsoHolidayNFT2024(
            "Calypso Holiday NFT 2024",
            "HOLIDAY",
            address(this)
        );

        calypsoHolidayVoting2024 = new CalypsoHolidayVoting2024(
            address(nft)
        );

        vm.stopBroadcast();
    }
}