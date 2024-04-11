// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// transfer(2300 가스, 오류 발생)
// send(2300 가스, bool 반환)
// call(모든 가스 또는 설정된 가스를 전달하고 bool을 반환합니다)

// receive() msg.data가 비어 있으면 호출되고, 
// 그렇지 않으면 fallback() 호출됨.
contract ReceiveEther {
    receive() external payable {}
    fallback() external payable {}
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

// docs 에는 ether 전송하는거 call 권장. 
// data log 찍어보려고 추가하니가 에러남 왜 나는지 아직 모르겠음;
contract SendEther {
    function sendViaTransfer(address payable _to) public payable {
        _to.transfer(msg.value);
    }
    function sendViaSend(address payable _to) public payable {
        bool sent = _to.send(msg.value);
        require(sent, "Failed to send Ether");
    }
    // event Log(address indexed sender, bytes data);
    function sendViaCall(address payable _to) public payable {
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        // emit Log(msg.sender, data); 이거 웨 안돼냐~
    }
}