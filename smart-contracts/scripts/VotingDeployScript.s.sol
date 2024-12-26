// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import { Script, console } from "forge-std/Script.sol";
import { CalypsoHolidayVoting2024 } from "../src/CalypsoHolidayVoting2024.sol";
import { CalypsoHolidayNFT2024 } from "../src/CalypsoHolidayNFT2024.sol";

contract VotingDeployScript is Script {
    CalypsoHolidayVoting2024 public calypsoHolidayVoting2024;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        calypsoHolidayVoting2024 = new CalypsoHolidayVoting2024(0xE703B2AB81Cb9733d55f489958Bc68397172829C);

        vm.stopBroadcast();
    }
}