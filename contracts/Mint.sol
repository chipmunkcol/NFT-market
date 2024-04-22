// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./SaleNft.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract Mint is ERC721Enumerable {
  constructor() ERC721("Mint_Project", "MINT") {}
  
  SaleNft public saleNft;

  struct nftHash {
    string name;
    string ipfsHash;
  }
  mapping(uint256 => nftHash) public nftHashs;

  struct NftData {
    uint256 nftId;
    string nftHash;
    uint256 nftPrice;
  }

  // function mintAnimalToken() public {
  //   uint256 nftId = totalSupply() + 1;
  //   uint256 nftHash = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nftId)))%5 + 1;
  //   nftHashs[nftId] = nftHash;
  //   _mint(msg.sender, nftId);
  // }
  
  function mintAnimalToken(string memory ipfsHash) public {
    uint256 nftId = totalSupply() + 1;
    uint256 random5 = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nftId)))%5 + 1;
    string memory strRandom5 = Strings.toString(random5);
    string memory nftName = string(abi.encodePacked(strRandom5, '.png'));
    nftHashs[nftId].name = strRandom5;
    nftHashs[nftId].ipfsHash = ipfsHash;
    _mint(msg.sender, nftId);
  }

  function mintByUser(string memory ipfsHash, string memory nftName) public {
    uint256 nftId = totalSupply() + 1;
    nftHashs[nftId].name = nftName;
    nftHashs[nftId].ipfsHash = ipfsHash;
    _mint(msg.sender, nftId);
  }

  function getNfts(address _nftOwner) view public returns (NftData[] memory) {
    uint256 balanceLength = balanceOf(_nftOwner);
    require(balanceLength != 0, "You don't have any NFTs");

    NftData[] memory nftData = new NftData[](balanceLength);
    
    for (uint256 i = 0; i < balanceLength; i++) {
      uint256 nftId = tokenOfOwnerByIndex(_nftOwner, i);
      string memory nftHash = nftHashs[nftId];
      uint256 nftPrice = saleNft.getNftPrices(nftId);

      nftData[i] = NftData(nftId, nftHash, nftPrice);
    }
    return nftData;
  }

  function setSaleNft(address _saleNft) public {
    saleNft = SaleNft(_saleNft);
  }
  
} 