
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
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";

contract MyNft is ERC721Enumerable {
    address payable public owner;
    
    constructor() ERC721("MyNFT", "MNFT") {
        owner = payable(msg.sender);
    }

    // struct nftHash {
    //     string name;
    //     string ipfsHash;
    // }

    struct Attribute {
        string trait_type;
        string value;
    }

    struct NftData {
        string name;
        string description;
        string image; // nftHash[ipfsHash].nftHash[name] // ipfs://abcde/1.png
        Attribute[] attributes;
    }

    mapping (uint => NftData) public nftDatas;

    // onSaleNft
    struct OnSaleNft {
        uint id;
        uint price;
    } 
    uint[] public onSaleNfts;
    
    event PayableLog(address indexed sender, uint value);
    receive() external payable {
        emit PayableLog(msg.sender, msg.value);
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // 
    function mintNft(string memory _name, string memory _ipfsHash, string memory _description, Attribute[] memory _attributes) public {
        uint nftId = totalSupply() + 1;
        uint randomNumber = uint(keccak256(abi.encode(block.timestamp, msg.sender, nftId)))%5 + 1;
        nftDatas[nftId].name = _name;
        nftDatas[nftId].description = _description;
        // string memory strRandomNumber = Strings.toString(randomNumber);
        nftDatas[nftId].image = string(abi.encodePacked(_ipfsHash, '/', randomNumber, '.png'));
        if (_attributes.length > 0) {
            for (uint i = 0; i < _attributes.length; i++) {
                nftDatas[nftId].attributes.push(_attributes[i]);
            }
        }
        _mint(msg.sender, nftId);
    }
    function createNft(string memory _name, string memory _ipfsHash, string memory _fileName, string memory _description, Attribute[] memory _attributes) public {
        uint nftId = totalSupply() + 1;
        nftDatas[nftId].name = _name;
        nftDatas[nftId].description = _description;
        nftDatas[nftId].image = string(abi.encodePacked(_ipfsHash, '/', _fileName));
        if (_attributes.length > 0) {
            for (uint i = 0; i < _attributes.length; i++) {
                nftDatas[nftId].attributes.push(_attributes[i]);
            }
        }
        _mint(msg.sender, nftId);
    }
    function setApprovalFolAll(bool _approved) public {
        setApprovalForAll(address(this), _approved);
    }

    // 판매 등록
    function setSaleController(uint _nftId, uint _price) public {
        address nftOwner = ownerOf(_nftId);
        require(msg.sender == nftOwner, "Only nft owners can register for sale");
        require(_price > 0, "Nft price must be greater than 0");
        nftDatas[_nftId].price = _price;

        onSaleNfts.push(_nftId);
    }
    function getTargetNfts(address _nftOwner) public view returns (NftData[] memory) {
        uint balanceLength = balanceOf(_nftOwner);
        require(balanceLength != 0, "You don't have any NFTs");

        NftData[] memory nftData = new NftData[](balanceLength);

        for (uint i = 0; i < balanceLength; i++) {
            uint nftId = tokenOfOwnerByIndex(_nftOwner, i);
            string memory ipfsHash = nftDatas[nftId].ipfsHash;
            string memory nftName = nftDatas[nftId].name;
            string memory nftDescription = nftDatas[nftId].description;
        }
    }

    // 구매 관련
    function purchaseController(uint _nftId) public payable {
        uint ethBalance = msg.sender.balance;
        NftData memory nft = getTargetNft(_nftId);
        uint nftPrice = nft.price;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", ethBalance, nftPrice);
        require(ethBalance >= nftPrice, "Balance is less than price");

        address oldOwner = ownerOf(_nftId);
        // (bool sent,) = oldOwner.call{value: nftPrice}("");
        (bool sent,) = payable(oldOwner).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        
        approve(msg.sender, _nftId);
        safeTransferFrom(oldOwner, msg.sender, _nftId);
    
        for (uint i = 0; i < onSaleNfts.length; i++) {
            if (onSaleNfts[i] == _nftId) {
                onSaleNfts[i] = onSaleNfts[onSaleNfts.length - 1];
                onSaleNfts.pop();
            }
        }
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
    // function removeOnSaleNft(uint _nftId) public {
    //     for (uint i = 0; i < onSaleNfts.length; i++) {
    //         if (onSaleNfts[i] == _nftId) {
    //             onSaleNfts[i] = onSaleNfts[onSaleNfts.length - 1];
    //             onSaleNfts.pop();
    //         }
    //     }
    // }