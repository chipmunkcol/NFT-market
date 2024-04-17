// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// Anyone can send ETH.
// Similar to fundraising.
contract EtherWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function sendViaCall() public payable {
        require(msg.sender != owner, "caller is not owner");
        require(msg.value > 0, "Must be greater than 0");

        (bool sent, bytes memory data) = owner.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance() external view returns (uint256) {
        return owner.balance;
    }
}
