// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Test {
    // address owner;
    // constructor() {
    //      owner = msg.sender;
    // }
    mapping(address => uint) public balance;

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function sendEther() public payable {
        balance[msg.sender] += msg.value;
    }
    function withdrawEther(address payable _to, uint _value) public payable {
        uint sendersBalance = balance[msg.sender];
        require(sendersBalance >= _value, "Withdrawal is greater than balance");

        balance[msg.sender] -= _value;
        _to.transfer(_value);
    }
    function withdrawAllEther(address payable _to) public payable {
        // require(owner == msg.sender, "Only owner can call withdraw function");
        uint sendersBalance = balance[msg.sender];
        balance[msg.sender] = 0;
        _to.transfer(sendersBalance);

    }
}