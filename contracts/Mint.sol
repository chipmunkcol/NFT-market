// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./SaleNft.sol";

contract Mint is ERC721Enumerable {
  constructor() ERC721("Mint_Project", "MINT") {}
  
  SaleNft public saleNft;

  mapping(uint256 => uint256) public nftTypes;

  struct NftData {
    uint256 nftId;
    uint256 nftType;
    uint256 nftPrice;
  }

  function mintAnimalToken() public {
    uint256 nftId = totalSupply() + 1;
    uint256 nftType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nftId)))%5 + 1;
    nftTypes[nftId] = nftType;
    _mint(msg.sender, nftId);
  }

  function getNfts(address _nftOwner) view public returns (NftData[] memory) {
    uint256 balanceLength = balanceOf(_nftOwner);
    require(balanceLength != 0, "You don't have any NFTs");

    NftData[] memory nftData = new NftData[](balanceLength);
    
    for (uint256 i = 0; i < balanceLength; i++) {
      uint256 nftId = tokenOfOwnerByIndex(_nftOwner, i);
      uint256 nftType = nftTypes[nftId];
      uint256 nftPrice = saleNft.getNftPrices(nftId);

      nftData[i] = NftData(nftId, nftType, nftPrice);
    }
    return nftData;
  }

  function setSaleNft(address _saleNft) public {
    saleNft = SaleNft(_saleNft);
  }
  
} 