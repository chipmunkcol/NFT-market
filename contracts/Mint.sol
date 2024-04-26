
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

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";

contract MyNft is ERC721Enumerable {
    // address payable public owner;
    
    constructor() ERC721("MyNFT", "MNFT") {
        // owner = payable(msg.sender);
    }

    struct Attribute {
        string trait_type;
        string value;
    }

    struct NftData {
        uint id;
        string name;
        string description;
        string image; // nftHash[ipfsHash].nftHash[name] // ipfs://abcde/1.png
        // Attribute[] attributes;
        bool isOnSale;
    }

    mapping (uint => NftData) public nftDatas;

    struct OnsaleNft {
        uint id;
        string name;
        string description;
        string image;
        // Attribute[] attributes;

        uint price;
        bool isOnSale;
        
        address owner;
    }
    // mapping (uint => OnsaleNft) public onsaleNfts;
    // uint onsaleNftsLength;
    OnsaleNft[] public onsaleNfts;
    
    event PayableLog(address indexed sender, uint value);
    receive() external payable {
        emit PayableLog(msg.sender, msg.value);
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // 
    // function mintNft(string memory _name, string memory _ipfsHash, string memory _description, Attribute[] memory _attributes) public {
    function mintNft(string memory _name, string memory _ipfsHash, string memory _description) public {
        uint nftId = totalSupply() + 1;
        uint randomNumber = uint(keccak256(abi.encode(block.timestamp, msg.sender, nftId)))%5 + 1;
        nftDatas[nftId].id = nftId;
        nftDatas[nftId].name = _name;
        nftDatas[nftId].description = _description;
        // string memory strRandomNumber = Strings.toString(randomNumber);
        nftDatas[nftId].image = string(abi.encodePacked(_ipfsHash, '/', randomNumber, '.png'));
        // if (_attributes.length > 0) {
        //     for (uint i = 0; i < _attributes.length; i++) {
        //         nftDatas[nftId].attributes.push(_attributes[i]);
        //     }
        // }
        _mint(msg.sender, nftId);
    }
    // function createNft(string memory _name, string memory _ipfsHash, string memory _fileName, string memory _description, Attribute[] memory _attributes) public {
    function createNft(string memory _name, string memory _ipfsHash, string memory _description) public {
        uint nftId = totalSupply() + 1;
        nftDatas[nftId].id = nftId;
        nftDatas[nftId].name = _name;
        nftDatas[nftId].description = _description;
        nftDatas[nftId].image = _ipfsHash;
        // if (_attributes.length > 0) {
        //     for (uint i = 0; i < _attributes.length; i++) {
        //         nftDatas[nftId].attributes.push(_attributes[i]);
        //     }
        // }
        _mint(msg.sender, nftId);
    }
    function createCollectionNft(string memory _name, string memory _ipfsHash, string memory _fileName, string memory _description) public {
        uint nftId = totalSupply() + 1;
        nftDatas[nftId].id = nftId;
        nftDatas[nftId].name = _name;
        nftDatas[nftId].description = _description;
        nftDatas[nftId].image = string(abi.encodePacked(_ipfsHash, '/', _fileName));
        // if (_attributes.length > 0) {
        //     for (uint i = 0; i < _attributes.length; i++) {
        //         nftDatas[nftId].attributes.push(_attributes[i]);
        //     }
        // }
        _mint(msg.sender, nftId);
    }
    
    function getNftsByOwner(address _nftOwner) public view returns (NftData[] memory) {
        uint balanceLength = balanceOf(_nftOwner);
        require(balanceLength != 0, "You don't have any NFTs");

        NftData[] memory nftList = new NftData[](balanceLength);

        for (uint i = 0; i < balanceLength; i++) {
            uint nftId = tokenOfOwnerByIndex(_nftOwner, i);
            string memory nftName = nftDatas[nftId].name;
            string memory nftDescription = nftDatas[nftId].description;
            string memory nftImage = nftDatas[nftId].image;
            bool nftIsOnsale = nftDatas[nftId].isOnSale;
            // Attribute[] memory nftAttributes = nftDatas[nftId].attributes;
            // nftData[i] = NftData(nftName, nftDescription, nftImage, nftAttributes);
            nftList[i] = NftData(nftId, nftName, nftDescription, nftImage, nftIsOnsale);
        }
        return nftList;
    }

    function getOnsaleNfts() public view returns (OnsaleNft[] memory) {
        uint onsaleNftsLength = onsaleNfts.length;
        require(onsaleNftsLength != 0, "There are no NFTs on sale");
        OnsaleNft[] memory onsaleNftList = new OnsaleNft[](onsaleNftsLength);

        for (uint i = 0; i < onsaleNftsLength; i++) {
            uint nftId = onsaleNfts[i].id;
            string memory nftName = onsaleNfts[i].name;
            string memory nftDescription = onsaleNfts[i].description;
            string memory nftImage = onsaleNfts[i].image;

            uint nftPrice = onsaleNfts[i].price;
            bool nftIsOnSale = onsaleNfts[i].isOnSale;
            address nftOwner = onsaleNfts[i].owner;
            onsaleNftList[i] = OnsaleNft(nftId, nftName, nftDescription, nftImage, nftPrice, nftIsOnSale, nftOwner);
        }
        return onsaleNftList;
    }

    function setApprovalFolAll(bool _approved) public {
        setApprovalForAll(address(this), _approved);
    }

    // 판매 등록
    function setSaleController(uint _nftId, uint _price) public {
        address nftOwner = ownerOf(_nftId);
        require(msg.sender == nftOwner, "Only nft owners can register for sale");
        require(_price > 0, "Nft price must be greater than 0");
        
        // approve(address(this), _nftId);

        OnsaleNft memory onsaleNft;
        onsaleNft.owner = nftOwner;
        onsaleNft.id = _nftId;
        onsaleNft.price = _price;
        onsaleNft.isOnSale = true;

        onsaleNft.name = nftDatas[_nftId].name;
        onsaleNft.description = nftDatas[_nftId].description;
        onsaleNft.image = nftDatas[_nftId].image;
        onsaleNfts.push(onsaleNft);
    }

    // 구매 관련
    function purchaseController(uint _nftId) public payable {
        // uint ethBalance = msg.sender.balance;
        // uint nftPrice = onsaleNfts[_nftId].price;
        // bool nftIsOnSale = onsaleNfts[_nftId].isOnSale;
        address oldOwner = ownerOf(_nftId);
        require(isApprovedForAll(oldOwner, address(this)), "Is not approved!");
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", ethBalance, nftPrice);
        // require(nftIsOnSale, "NFT is not on sale");
        // require(nftPrice <= msg.value, "Pay more than the set price");
        // require(ethBalance >= nftPrice, "Balance is less than price");
        // require(oldOwner != msg.sender, "You are the owner of this NFT");

        (bool sent,) = payable(oldOwner).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        // payable(oldOwner).transfer(msg.value);
        // approve(msg.sender, _nftId);
        for (uint i = 0; i < onsaleNfts.length; i++) {
            if (onsaleNfts[i].id == _nftId) {
                onsaleNfts[i] = onsaleNfts[onsaleNfts.length - 1];
                onsaleNfts.pop();
            }
        }
        safeTransferFrom(oldOwner, msg.sender, _nftId);
        
    }
    
    // function ThankYouForYourDonation() public {}
}
    // function temp(uint _nftId) public view returns (uint, string memory, string memory) {
    //     NftData storage nft = nftDatas[_nftId];
    //     return (nft.id, nft.name, nft.description);
    // }

    // function nftTrading(address _oldOwner, address _newOwner, uint _nftId, uint _nftPrice) public payable {
    //     (bool sent,) = _oldOwner.call{value: _nftPrice}("");
    //     require(sent, "Failed to send Ether");
        
    //     approve(_newOwner, _nftId);
    //     safeTransferFrom(_oldOwner, _newOwner, _nftId);
    // }
    // function removeOnsaleNft(uint _nftId) public {
    //     for (uint i = 0; i < onsaleNfts.length; i++) {
    //         if (onsaleNfts[i] == _nftId) {
    //             onsaleNfts[i] = onsaleNfts[onsaleNfts.length - 1];
    //             onsaleNfts.pop();
    //         }
    //     }
    // }