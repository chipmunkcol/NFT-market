// SPDX-License-Identifier: MIT
//캠페인을 만들어서 기부를 받는 컨트랙트
// 기부
// 캠페인 종료 후 캠페인 작성자는 목표액보다 많은 경우 인출
// 캠페인 종료 후 캠페인 작성자는 목표액보다 적은 경우 기부자들에게 환불

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// interface IERC20 {
//     function transfer(address, uint) external returns (bool);
//     function transferFrom(address, address, uint) external returns (bool);
// }

contract Fundrasing {
  address payable public owner;

  mapping(address => uint) public donations;
  struct Campaign {
    string title;
    string descriptin;
    uint goalAmount;
    uint currentAmount;
    uint deadline;
    bool ended;
  }
  Campaign public campaign;

  constructor () {
    owner = payable(msg.sender);
  }
  
  receive() external payable {}

  function getBalance() external view returns (uint) {
    return address(this).balance;
  }

  function start(string memory _title, string memory _description, uint _goalAmount, uint _deadline) public {
    require(msg.sender == owner, "Only owner can start");

    campaign.title = _title;
    campaign.descriptin = _description;
    campaign.goalAmount = _goalAmount;
    campaign.deadline = block.timestamp + _deadline * 1 days;
  }

  function fund() public payable {
    require(block.timestamp < campaign.deadline, "fundrasing is already ended");
    require(msg.value > 0, "Must be higher than 0");

    (bool sent,) = address(this).call{value: msg.value}("");
    require(sent, "Failed to send Ether");
    
    donations[msg.sender] = msg.value;
    campaign.currentAmount += msg.value;
  }

  function end() public {
    require(msg.sender == owner, "Only owner can end");
    require(block.timestamp > campaign.deadline, "It is not over yet");

    campaign.ended = true;
  }

  function withdraw() public payable {
    require(msg.sender == owner, "Only owner can end");
    require(campaign.ended, "It is not over yet");

    if (campaign.currentAmount < campaign.goalAmount) {
        revert("The amount raised is less than the target amount");
    }
    // transferfrom(address(this), owner, campaign.currentAmount);
    payable (msg.sender).transfer(campaign.currentAmount);
  }

  function refund() public payable {
    require(campaign.ended, "It is not over yet");
    require(campaign.currentAmount < campaign.goalAmount, "The amount raised is more than the target amount");
    
    uint balance = donations[msg.sender];
    payable (msg.sender).transfer(balance);
  }
}