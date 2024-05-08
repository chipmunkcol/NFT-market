// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "./SaleNft.sol";

contract MyNft is ERC721Enumerable {
  constructor() ERC721("MyNft", "MNFT") {}

  SaleNft public saleNftContract;

  struct TokenUrl {
    string tokenUrl;
    bool isHide;
    string tempTokenUrl;
    uint startAt;
    
  }
  mapping(uint => TokenUrl) public tokenUrls;

  struct NftData {
    uint nftId;
    string tokenUrl;
    uint nftPrice;
  }

  function ownerMintNft(string memory _ipfsHash, uint _totalNum) public {
    uint id = totalSupply() + 1;
    uint randomNumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, id))) & _totalNum + 1;
    tokenUrls[id].tokenUrl = string(abi.encodePacked(_ipfsHash, '/', randomNumber));

    _mint(msg.sender, id);
  }

  function userMintNft(string memory _ipfsHash) public {
    uint id = totalSupply() + 1;
    tokenUrls[id].tokenUrl = _ipfsHash;

    _mint(msg.sender, id);
  }

  function userMintCollection(string memory _ipfsHash, bool _isHide, string memory _tempTokenUrl, uint _startAt) public {
    uint id = totalSupply() + 1;
    tokenUrls[id].tokenUrl = _ipfsHash;
    tokenUrls[id].isHide = _isHide;
    tokenUrls[id].tempTokenUrl = _tempTokenUrl;
    tokenUrls[id].startAt = block.timestamp + _startAt * 1 minutes;

    _mint(msg.sender, id);
  }

  function getMyNfts(address _nftOwner) view public returns (NftData[] memory) {
    uint balanceLength = balanceOf(_nftOwner);
    require (balanceLength != 0, "Owner did not have token");

    NftData[] memory nftData = new NftData[](balanceLength);
    for (uint i = 0; i < balanceLength; i++) {
      uint nftId = tokenOfOwnerByIndex(_nftOwner, i);
      string memory nftTokenUrl = tokenUrls[nftId].tokenUrl;
      uint nftPrice = saleNftContract.getNftPrice(nftId);

      nftData[i] = NftData(nftId, nftTokenUrl, nftPrice);
    }
    return nftData;
  }

  function getTokenUrl(uint _nftId) view public returns (string memory) {
    if (tokenUrls[_nftId].isHide == false) {
      return tokenUrls[_nftId].tokenUrl;
    } else {
      return tokenUrls[_nftId].tempTokenUrl;
    }
  }

  
  // airDrop 을 어떤식으로 해야될지 고려해봐야됨 isHide = true 로 바꾸는 권한을 어느쪽에 줄 것인지
  // function airDrop(address _owner, uint _nftId) public {
  //   require(_owner == msg.sender, "Caller is not owner");

  //   owne
  // }

  function setSaleNftContract(address _saleNftContractAddress) public {
    saleNftContract = SaleNft(_saleNftContractAddress);
  }
}