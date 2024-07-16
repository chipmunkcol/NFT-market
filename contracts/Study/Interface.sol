// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// 다른 컨트랙트와 상호작용
// function 구현할 수 없음
// 다른 인터페이스에서 상속할 수 있음
// 선언된 모든 함수는 external 함수여야 함.
// 생성자를 선언할 수 없습니다.
// 상태 변수를 선언할 수 없습니다.
contract Counter {
    uint public count;
    function increment() external {
        count += 1;
    }
}

interface Icounter {
    function count() external view returns (uint);
    function increment() external;
}

contract MyContract {
    function incrementCounter(address _counterContractAddress) external {
        Icounter(_counterContractAddress).increment();
    }
    function getCount(address _counterContractAddress) external view returns (uint) {
        return Icounter(_counterContractAddress).count();
    }
}