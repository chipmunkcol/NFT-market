// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoldToken is ERC20 {
    constructor() ERC20("GoldToken", "GOLD") {
        _mint(msg.sender, 21000000 * (10 ** uint256(decimals()))); // 소수점 10^18 밑에까지
    }
}