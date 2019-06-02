pragma solidity ^0.5.2;

import './DSToken.sol';

contract USDXToken is DSToken {
    constructor(bytes32 symbol_) public {
        symbol = symbol_;
    }
}