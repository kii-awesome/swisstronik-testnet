// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StoreValue {
    uint StoreData;

    function setValue(uint x) public {
        StoreData = x;
    }

    function getValue() public view returns (uint) {
        return StoreData;
    }
}
