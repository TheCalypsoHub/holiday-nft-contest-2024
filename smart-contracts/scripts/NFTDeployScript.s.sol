// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import { Script, console } from "forge-std/Script.sol";
import { CalypsoHolidayNFT2024 } from "../src/CalypsoHolidayNFT2024.sol";

contract NFTDeployScript is Script {
    CalypsoHolidayNFT2024 public calypsoHolidayNFT2024;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        calypsoHolidayNFT2024 = new CalypsoHolidayNFT2024(
            "Calypso Holiday NFT 2024",
            "HOLIDAY",
            address(this)
        );

        vm.stopBroadcast();
    }
}