// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// ERC20 표준을 따르는 모든 계약은 ERC20 토큰입니다
// ERC20 토큰은 다음과 같은 기능을 제공합니다
// 1. 토큰 전송
// 2. 다른 사람이 토큰 보유자를 대신하여 토큰을 전송할 수 있도록 허용

// 인터페이스
interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns(uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(address sender, address recipent, uint amount) external returns (bool);
}

