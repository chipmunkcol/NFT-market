// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "./SaleNft.sol";

contract MyNft is ERC721Enumerable {
  constructor() ERC721("MyNft", "MNFT") {}

  SaleNft public saleNftContract;

  struct TokenUrl {
    string tokenName;
    string tokenUrl;
    bool isHide;
    string tempTokenUrl;
    uint startAt;
  }
  mapping(uint => TokenUrl) public tokenUrls;

  struct NftData {
    uint nftId;
    string nftName;
    string tokenUrl;
    uint nftPrice;
  }

  mapping(string => uint[]) public collectionNftIds;

  function getCollectionNftIds(string memory _ipfsHash) view public returns(uint[] memory) {
    return collectionNftIds[_ipfsHash];
  }
  function userMintCollection(string[] memory _fileNameList, string memory _ipfsHash, bool _isHide, string memory _tempTokenUrl, uint _startAt) public {
    uint timeStamp = block.timestamp;
    for (uint i = 0; i < _fileNameList.length; i ++) {
      uint id = totalSupply() + 1;
      tokenUrls[id].tokenName = _fileNameList[i];
      tokenUrls[id].tokenUrl = string(abi.encodePacked(_ipfsHash, '/', _fileNameList[i]));
      tokenUrls[id].isHide = _isHide;
      tokenUrls[id].tempTokenUrl = _tempTokenUrl;
      tokenUrls[id].startAt = timeStamp + _startAt * 1 seconds;

      _mint(msg.sender, id);
      collectionNftIds[_ipfsHash].push(id); // check checkcheckcheckcheck
    }
  }
  

  function ownerMintNft(string memory _tokenName, string memory _ipfsHash, uint _totalNum) public {
    uint id = totalSupply() + 1;
    uint randomNumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, id))) & _totalNum + 1;
    tokenUrls[id].tokenUrl = string(abi.encodePacked(_ipfsHash, '/', randomNumber));
    tokenUrls[id].tokenName = _tokenName;

    _mint(msg.sender, id);
  }

  function userMintNft(string memory _tokenName, string memory _ipfsHash) public {
    uint id = totalSupply() + 1;
    tokenUrls[id].tokenUrl = _ipfsHash;
    tokenUrls[id].tokenName = _tokenName;

    _mint(msg.sender, id);
  }

  // function userMintCollection(string memory _tokenName, string memory _ipfsHash, bool _isHide, string memory _tempTokenUrl, uint _startAt) public {
  //   uint id = totalSupply() + 1;
  //   tokenUrls[id].tokenName = _tokenName;
  //   tokenUrls[id].tokenUrl = _ipfsHash;
  //   tokenUrls[id].isHide = _isHide;
  //   tokenUrls[id].tempTokenUrl = _tempTokenUrl;
  //   tokenUrls[id].startAt = block.timestamp + _startAt * 1 minutes;

  //   _mint(msg.sender, id);
  // }

  function getMyNfts(address _nftOwner) view public returns (NftData[] memory) {
    uint balanceLength = balanceOf(_nftOwner);
    require (balanceLength != 0, "Owner did not have token");

    NftData[] memory nftData = new NftData[](balanceLength);
    for (uint i = 0; i < balanceLength; i++) {
      uint nftId = tokenOfOwnerByIndex(_nftOwner, i);
      string memory nftName = tokenUrls[nftId].tokenName;
      string memory nftTokenUrl = getTokenUrl(nftId); // check!check!check!check!check!
      uint nftPrice = saleNftContract.getNftPrice(nftId);

      nftData[i] = NftData(nftId, nftName, nftTokenUrl, nftPrice);
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

  // airdrop 가능한 collection [Get]
  // function getMyNfts(address _nftOwner) view public returns (NftData[] memory) {
  //   uint balanceLength = balanceOf(_nftOwner);
  //   require (balanceLength != 0, "Owner did not have token");

  //   NftData[] memory nftData = new NftData[](balanceLength);
  //   for (uint i = 0; i < balanceLength; i++) {
  //     uint nftId = tokenOfOwnerByIndex(_nftOwner, i);
  //     string memory nftName = tokenUrls[nftId].tokenName;
  //     string memory nftTokenUrl = getTokenUrl(nftId); // check!check!check!check!check!
  //     uint nftPrice = saleNftContract.getNftPrice(nftId);

  //     nftData[i] = NftData(nftId, nftName, nftTokenUrl, nftPrice);
  //   }
  //   return nftData;
  // }
  

  function setSaleNftContract(address _saleNftContractAddress) public {
    saleNftContract = SaleNft(_saleNftContractAddress);
  }
}