// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./Mint.sol";

contract SaleNft {
    Mint public mintAddress;
    constructor (address _mintAddress) {
        mintAddress = Mint(_mintAddress);
    }
    mapping(uint256 => uint256) public nftPrices;
    uint256[] public onsaleNftIds;

    struct OnsaleNftList {
        uint256 nftId;
        string nftUrl;
        uint256 price;
    }

    function setSaleNft(uint256 _nftId, uint256 _price) public {
        address nftOwner = mintAddress.ownerOf(_nftId);

        require(nftOwner == msg.sender, "owner sender error!");
        require(_price > 0, "price error!");
        require(nftPrices[_nftId] == 0, "this nft is already on sale");
        require(mintAddress.isApprovedForAll(nftOwner, address(this)), "mint error!");

        nftPrices[_nftId] = _price;
        onsaleNftIds.push(_nftId);
    }

    function purchaseNft(uint256 _nftId) public payable {
        uint256 price = nftPrices[_nftId];
        address nftOwner = mintAddress.ownerOf(_nftId);

        require(price > 0, "price is lower than 0");
        require(price <= msg.value, "Pay more than the set price");
        require(nftOwner != msg.sender, "nft's owner don't purchase this nft");

        payable(nftOwner).transfer(msg.value);
        mintAddress.safeTransferFrom(nftOwner, msg.sender, _nftId);

        nftPrices[_nftId] = 0;
        for (uint256 i = 0; i < onsaleNftIds.length; i++) {
            if (nftPrices[onsaleNftIds[i]] == 0) {
                onsaleNftIds[i] = onsaleNftIds[onsaleNftIds.length - 1]; // price 0 된거 맨 뒤로 보내서
                onsaleNftIds.pop(); // 지워준다.
                // onsaleNftIds.slice(i, 0);
            }
        }
    }

    function getNftArrayLength() view public returns (uint256) {
        return onsaleNftIds.length;
    }

    function getNftPrices(uint256 _nftId) view public returns (uint256) {
        return nftPrices[_nftId];
    }

    function getOnsaleNftList() view public returns (OnsaleNftList[] memory) {
        uint256 onsaleNftLength = getNftArrayLength();
        require(onsaleNftLength != 0, "There are no NFTs on sale");
        
        OnsaleNftList[] memory onsaleNftList = new OnsaleNftList[](onsaleNftLength);

        for (uint256 i = 0; i < onsaleNftLength; i++) {
            uint256 nftId = onsaleNftIds[i];
            string memory nftUrl = mintAddress.nftUrls(nftId);
            uint256 price = nftPrices[nftId];

            onsaleNftList[i] = OnsaleNftList(nftId, nftUrl, price);
        }
        return onsaleNftList;
        
    }
    // function getOnsaleNftList() view public returns (uint256[] memory) {
    //     return onsaleNftIds;
    // }
}