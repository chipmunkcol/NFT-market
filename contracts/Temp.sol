// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * [기능]
 * mint a Nft (내가 Mintining 한거 - 5개 중 랜덤)
 * create a Nft (사용자 업로드)
 * create collection (사용자 업로드)
 * 사고 팔기 가능
 * 
 * 기본적으로 collection 구매시엔 unreveal 상태로 구매 -> 일정 시간 후 Airdrop
 * 
 */