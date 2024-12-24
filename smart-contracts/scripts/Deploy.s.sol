// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import { Script, console } from "forge-std/Script.sol";
import { CalypsoHolidayVoting2024 } from "../src/CalypsoHolidayVoting2024.sol";
import { CalypsoHolidayNFT2024 } from "../src/CalypsoHolidayNFT2024.sol";

contract DeployScript is Script {
    CalypsoHolidayNFT2024 public nft;
    CalypsoHolidayVoting2024 public voting;

    function run() public {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        // address deployerAddress = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        nft = new CalypsoHolidayNFT2024(
            "Calypso Holiday NFT 2024",
            "HOLIDAY"
        );

        voting = new CalypsoHolidayVoting2024(
            address(nft)
        );

        vm.stopBroadcast();

        console.log("Deployment Complete...");
    }
}