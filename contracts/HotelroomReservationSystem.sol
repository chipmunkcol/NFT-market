// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Reservation {
    address payable public owner;
    enum RoomStatus {
        empty, // 0
        full   // 1
    }
    RoomStatus public roomStatus;
    constructor () payable {
        owner = payable(msg.sender);
        roomStatus = RoomStatus.empty;
    }


    // receive() external payable { }
    // fallback() external payable { }
    // function getBalance() public view returns (uint256) {
    //     return address(this).balance;
    // }
    function deposit() public payable {}
    
    modifier isRoomEmpty() {
        require(roomStatus == RoomStatus.empty, "This room is not empty");
        _;
    }
    modifier validBookingPrive() {
        require(msg.value >= 2 ether, "Not enough Eth");
        _;
    }
    event LogBook(address _occupant, uint _value);
    // function book() public payable isRoomEmpty validBookingPrive {
    //     roomStatus = RoomStatus.full;
    //     owner.transfer(msg.value);
    //     emit LogBook(msg.sender, msg.value);
    // }
    // 아래 함수로 변경

    receive() external payable isRoomEmpty validBookingPrive {
        roomStatus = RoomStatus.full;
        owner.transfer(msg.value);
        emit LogBook(msg.sender, msg.value);
    }

    function toggleRoomStatus() public {
        if (roomStatus == RoomStatus.empty) {
            roomStatus = RoomStatus.full;
        } else {
            roomStatus = RoomStatus.empty;
        }
    }
}