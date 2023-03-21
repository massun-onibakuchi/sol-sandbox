// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {HuffDeployer} from "foundry-huff/HuffDeployer.sol";
import "../src/contracts/interfaces/ICurta.sol";

// https://github.com/pcaversaccio/create2deployer
address constant CREATE2_DEPLOYER = 0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2;

interface Create2Deployer {
    function deploy(uint256 value, bytes32 salt, bytes memory code) external;
    function computeAddress(bytes32 salt, bytes32 codeHash) external view returns (address);
}

// forge script script/Deploy.s.sol --rpc-url=$MAINNET_RPC_URL --ledger --base-fee=20510000000 --sender=0x004870D27dFd8C851c596c4dD4BbB0DabccaAc0a --mnemonic-indexes=6 --broadcast
contract Deploy is Script {
    function run() public {
        vm.startBroadcast();
        vm.stopBroadcast();
    }
}
