// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Mint.sol";

contract SaleNft {
  MyNft public mintContract;

  constructor(address _mintContract) {
    mintContract = MyNft(_mintContract);
  }

  mapping (uint => uint) public nftPrices;

  uint[] public onsaleNftIds;

  struct OnsaleNftData {
    uint nftId;
    string tokenUrl;
    uint nftPrice;
  }

  modifier isCalledByOwner(uint _nftId) {
    address nftOwner = mintContract.ownerOf(_nftId);

    require(nftOwner == msg.sender, "Caller is not nft owner");
    _;
  }

  function getCartNfts(uint[] memory _nftIds) view public returns (OnsaleNftData[] memory) {
    uint onsaleNftIdsLength = getOnsaleNftIdsLength();
    require(onsaleNftIdsLength != 0, "There are no NFTs on sale");

    OnsaleNftData[] memory onsaleNftData = new OnsaleNftData[](onsaleNftIdsLength);
    for (uint i = 0; i < onsaleNftIdsLength; i++) {
      uint nftId = onsaleNftIds[i];
      if (_nftIds.findIndex(id => id == nftId) !== -1) {
        string memory nftTokenUrl = mintContract.getTokenUrl(nftId);
        uint nftPrice = nftPrices[nftId];

        onsaleNftData[i] = OnsaleNftData(nftId, nftTokenUrl, nftPrice);
      }
    }
    return onsaleNftData;
  }

  // function approve(address to, uint256 tokenId) public virtual {
  //     _approve(to, tokenId, _msgSender());
  // }


  function setOnsaleNft(uint _nftId, uint _price) public isCalledByOwner(_nftId) {
    // address nftOwner = mintContract.ownerOf(_nftId);
    // require(nftOwner == msg.sender, "Caller is not nft owner");
    require(_price > 0, "Price must be greater than 0");
    // require(mintContract.isApprovedForAll)
    
    nftPrices[_nftId] = _price;
    onsaleNftIds.push(_nftId);
  }

  function setOnsaleNfts(uint[] memory _nftIds, uint _price) public {
    require(_price > 0, "Price must be greater than 0");

    for (uint i = 0; i < _nftIds.length; i++) {
      uint nftId = _nftIds[i];
      nftPrices[nftId] = _price;
      onsaleNftIds.push(nftId);
    }
  }

  // function getApproved(uint256 tokenId) public view virtual returns (address) {
  //       _requireOwned(tokenId);

  //       return _getApproved(tokenId);
  //   }
  function purchaseNft(uint _nftId) public payable {
    address nftOwner = mintContract.ownerOf(_nftId);
    uint nftPrice = nftPrices[_nftId];
    address approvedNftAddress = mintContract.getApproved(_nftId);

    require(nftOwner != msg.sender, "Caller is nft owner");
    require(nftPrice <= msg.value, "Caller sent lower than price");
    require(approvedNftAddress == address(this), "This is an NFT that is not approved for sale.");
  
    payable(nftOwner).transfer(msg.value);
    mintContract.safeTransferFrom(nftOwner, msg.sender, _nftId);
  
    nftPrices[_nftId] = 0;
    for (uint i = 0; i < onsaleNftIds.length; i++ ) {
      if (nftPrices[onsaleNftIds[i]] == 0) {
        onsaleNftIds[i] = onsaleNftIds[onsaleNftIds.length - 1];
        onsaleNftIds.pop();
      }
    }
  }

  function purchaseNftList(uint[] memory _nftIds) public payable {
    uint totalPrice = 0;
    for (uint i = 0; i < _nftIds.length; i++) {
      uint nftId = _nftIds[i];
      address nftOwner = mintContract.ownerOf(nftId);
      uint nftPrice = nftPrices[nftId];
      address approvedNftAddress = mintContract.getApproved(nftId);

      require(nftOwner != msg.sender, "Caller is nft owner");
      require(nftPrice <= msg.value, "Caller sent lower than price");
      require(approvedNftAddress == address(this), "This is an NFT that is not approved for sale.");

      totalPrice += nftPrice;
    }

    require(totalPrice <= msg.value, "Caller sent lower than total price");

    for (uint i = 0; i < _nftIds.length; i++) {
      uint nftId = _nftIds[i];
      address nftOwner = mintContract.ownerOf(nftId);
      payable(nftOwner).transfer(nftPrices[nftId]); // transfer(msg.value) 가 아닌데 contract 가 실행되는지 확인
      nftPrices[nftId] = 0;
      mintContract.safeTransferFrom(nftOwner, msg.sender, nftId);
    }

    for (uint i = 0; i < onsaleNftIds.length; i++ ) {
      if (nftPrices[onsaleNftIds[i]] == 0) {
        onsaleNftIds[i] = onsaleNftIds[onsaleNftIds.length - 1];
        onsaleNftIds.pop();
      }
    }
  }

  function getOnsaleNftIdsLength() view public returns (uint) {
    return onsaleNftIds.length;
  }

  function getNftPrice(uint _nftId) view public returns (uint) {
    return nftPrices[_nftId];
  }

  function getOnsaleNfts() view public returns (OnsaleNftData[] memory) {
    uint onsaleNftIdsLength = getOnsaleNftIdsLength();
    require(onsaleNftIdsLength != 0, "There are no NFTs on sale");

    OnsaleNftData[] memory onsaleNftData = new OnsaleNftData[](onsaleNftIdsLength);
    for (uint i = 0; i < onsaleNftIdsLength; i++) {
      // mintContract.tokenByIndex(onsaleNftIds[i]);
      uint nftId = onsaleNftIds[i];
      string memory nftTokenUrl = mintContract.getTokenUrl(nftId);
      uint nftPrice = nftPrices[nftId];

      onsaleNftData[i] = OnsaleNftData(nftId, nftTokenUrl, nftPrice);
    }
    return onsaleNftData;
  } 
}