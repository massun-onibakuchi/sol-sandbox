// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import {console2} from "forge-std/console2.sol";
import {Strings} from "./Strings.sol";
import "./PointerLibraries.sol";

library MemoryDumpLib {
    using Strings for uint256;

    function dump() internal view {
        dump(0x00);
    }

    /// @dev This function itself changes the memory.
    function dump(uint256 offset) internal view {
        MemoryPointer freeMemPtr = getFreeMemoryPointer();
        string memory message;
        for (uint256 i = offset; i < MemoryPointer.unwrap(freeMemPtr); i += 0x20) {
            message = string.concat(
                message,
                "\n",
                string.concat(
                    "[",
                    i.toHexString(),
                    ":",
                    (i + 0x20).toHexString(),
                    "]: ",
                    MemoryReaders.readUint256(MemoryPointer.wrap(i)).toHexString(32)
                )
            );
        }
        console2.log(message);
    }
}

library CalldataDumpLib {
    using Strings for uint256;

    function dump() internal view {
        string memory message = string.concat(
            string(
                abi.encodePacked(
                    "Selector: ",
                    uint256(uint32(CalldataReaders.readBytes4(CalldataPointer.wrap(0x00)))).toHexString(4)
                )
            ),
            constructDumpData(0x04)
        );
        console2.log(message);
    }

    function dump(uint256 offset) internal view {
        string memory message = constructDumpData(offset);
        console2.log(message);
    }

    function constructDumpData(uint offset) internal pure returns (string memory message) {
        for (uint256 i = offset; i < msg.data.length; i += 0x20) {
            message = string.concat(
                message,
                "\n",
                string.concat(
                    "[",
                    i.toHexString(),
                    ":",
                    (i + 0x20).toHexString(),
                    "]: ",
                    CalldataReaders.readUint256(CalldataPointer.wrap(i)).toHexString(32)
                )
            );
        }
    }
}
