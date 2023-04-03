// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "../../src/contracts/utils/Strings.sol";

contract StringsHarness {
    function toBinaryString(uint256 num) public pure returns (string memory) {
        return Strings.toBinaryString(num);
    }
}

contract TestStrings is Test {
    StringsHarness public sc;

    function setUp() public payable {
        sc = new StringsHarness();
    }

    function testBinaryString() public {
        assertEq(sc.toBinaryString(1), "0b1");
        assertEq(sc.toBinaryString(7), "0b111");
        assertEq(sc.toBinaryString(100), "0b1100100");
        assertEq(sc.toBinaryString(9042483983), "0b1000011010111110010101101100001111");
        assertEq(
            sc.toBinaryString(1128938918392193129),
            "0b111110101010110010111111011100000011111000010110000001101001"
        );
        assertEq(
            sc.toBinaryString(10000000000000000000000000000),
            "0b1000000100111111001110010111100011111000100101000000100110000100010000000000000000000000000000"
        );
        assertEq(
            sc.toBinaryString(type(uint256).max),
            "0b1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
        );
    }
}
