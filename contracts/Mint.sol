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
  }
  mapping(uint => TokenUrl) public tokenUrls;

  struct NftData {
    uint nftId;
    string nftName;
    string tokenUrl;
    uint nftPrice;
    string tempTokenUrl;
  }

  struct Collection {
    uint[] ids;
    uint startAt;
  }
  mapping(string => Collection) public collectionDatas;

  function getCollectionData(string memory _ipfsHash) view public returns(Collection memory) {
    // uint[] memory collectionDatas = collectionDatas[_ipfsHash];
    // uint collectionStartAt = collectionDatas.startAt; 
    // return (collectionIds, collectionStartAt);
    return collectionDatas[_ipfsHash]; 
  }

  function userMintCollection(string[] memory _fileNameList, string memory _ipfsHash, bool _isHide, string memory _tempTokenUrl, uint _startAt) public {
    uint timeStamp = block.timestamp;
    for (uint i = 0; i < _fileNameList.length; i ++) {
      uint id = totalSupply() + 1;
      tokenUrls[id].tokenName = _fileNameList[i];
      tokenUrls[id].tokenUrl = string(abi.encodePacked(_ipfsHash, '/', _fileNameList[i]));
      tokenUrls[id].isHide = _isHide;
      tokenUrls[id].tempTokenUrl = _tempTokenUrl;

      _mint(msg.sender, id);
      collectionDatas[_ipfsHash].ids.push(id);
    }
    collectionDatas[_ipfsHash].startAt = timeStamp + _startAt * 1 seconds;
  }

  function airdrop(string memory _collectionIpfsHash) public {
    Collection memory collectionData = getCollectionData(_collectionIpfsHash);
    require(collectionData.startAt < block.timestamp, "No!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!, Airdrop not started yet");

    for (uint i = 0; i < collectionData.ids.length; i ++) {
      uint tokenId = collectionData.ids[i];
      tokenUrls[tokenId].isHide = false;
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
      string memory nftTokenUrl = getTokenUrl(nftId);
      uint nftPrice = saleNftContract.getNftPrice(nftId);
      string memory collectionIpfs = tokenUrls[nftId].tempTokenUrl;

      nftData[i] = NftData(nftId, nftName, nftTokenUrl, nftPrice, collectionIpfs);
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