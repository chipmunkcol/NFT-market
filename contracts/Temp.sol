
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

    struct NftData {
        uint id;
        string name;
        string description;
        string ipfsHash;
        uint nftType;
        uint price;
    }

    mapping (uint => NftData) public nftDatas;

    // onSaleNft 
    uint[] public onSaleNfts;
    
    event PayableLog(address indexed sender, uint value);
    receive() external payable {
        emit PayableLog(msg.sender, msg.value);
    }
    
    function getBalance() public view returns (uint) {
        // return address(this).balance;
        return msg.sender.balance;
    }

    // 
    function mintNft(string memory _name, string memory _ipfsHash, string memory _description) public {
        uint nftId = totalSupply() + 1;
        uint randomNumber = uint(keccak256(abi.encode(block.timestamp, msg.sender, nftId)))%5 + 1;
        nftDatas[nftId].id = nftId;
        nftDatas[nftId].name = _name;
        nftDatas[nftId].description = _description;
        nftDatas[nftId].ipfsHash = _ipfsHash;
        nftDatas[nftId].nftType = randomNumber;
        _mint(msg.sender, nftId);
    }
    function createNft(string memory _name, string memory _ipfsHash, string memory _description) public {
        uint nftId = totalSupply() + 1;
        nftDatas[nftId].id = nftId;
        nftDatas[nftId].name = _name;
        nftDatas[nftId].description = _description;
        nftDatas[nftId].ipfsHash = _ipfsHash;
        _mint(msg.sender, nftId);
    }
    // pinata 에서 어떤식으로 넘어오는지 확인 (아마 반복문 돌려야할듯?)
    // function createCollection() public {}
    // function setApprovalFolAll(bool _approved) public {
    //     setApprovalForAll(address(this), _approved);
    // }

    // 판매 등록
    function setSaleController(uint _nftId, uint _price) public {
        address nftOwner = ownerOf(_nftId);
        require(msg.sender == nftOwner, "Only nft owners can register for sale");
        require(_price > 0, "Nft price must be greater than 0");
        nftDatas[_nftId].price = _price;

        addOnSaleNft(_nftId);
    }
    function getTargetNft(uint _nftId) public view returns (NftData memory) {
        // NftData memory nftData = nftDatas[_nftId];
        // return nftData;
        return nftDatas[_nftId];
    }
    function temp(uint _nftId) public view returns (uint, string memory, string memory) {
        NftData storage nft = nftDatas[_nftId];
        // return (nft.id, nft.name, nft.description, nft.price);
        return (nft.id, nft.name, nft.description);
        // return nftDatas[_nftId];
    }

    // 구매 관련
    function purchaseController(uint _nftId) public {
        uint ethBalance = msg.sender.balance;
        NftData memory nft = getTargetNft(_nftId);
        uint nftPrice = nft.price;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", ethBalance, nftPrice);
        require(ethBalance >= nftPrice, "Balance is less than price");

        address oldOwner = ownerOf(_nftId);
        nftTrading(oldOwner, msg.sender, _nftId, nftPrice);
        removeOnSaleNft(_nftId);
    }
    function nftTrading(address _oldOwner, address _newOwner, uint _nftId, uint _nftPrice) public payable {
        (bool sent, bytes memory data) = _oldOwner.call{value: _nftPrice}("");
        require(sent, "Failed to send Ether");
        
        approve(_newOwner, _nftId);
        safeTransferFrom(_oldOwner, _newOwner, _nftId);
    }
    function addOnSaleNft(uint _nftId) public {
        onSaleNfts.push(_nftId);
    }
    function removeOnSaleNft(uint _nftId) public {
        for (uint i = 0; i < onSaleNfts.length; i++) {
            if (onSaleNfts[i] == _nftId) {
                onSaleNfts[i] = onSaleNfts[onSaleNfts.length - 1];
                onSaleNfts.pop();
            }
        }
    }
    
    // function ThankYouForYourDonation() public {}
}