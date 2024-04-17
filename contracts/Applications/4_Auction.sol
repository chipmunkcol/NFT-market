//  NFT 경매

// 가이드
// 1. NFT 판매자는 이 계약을 배포합니다.
// 2. 경매는 7일 동안 진행됩니다.
// 3. 참가자는 현재 최고 입찰자보다 더 많은 ETH를 예치하여 입찰할 수 있습니다.
// 4. 모든 입찰자는 현재 최고 입찰자가 아닌 경우 입찰을 철회할 수 있습니다.
// 5. 경매 후(7일 후) 최고 입찰자는 NFT의 새로운 소유자가 됩니다.
// 6. 판매자는 가장 높은 입찰가인 ETH를 받습니다.

interface IERC721 {
    function safeTransferFrom(address from, address to, uint tokenId) external;
    function transferFrom(address, address, uint) external;
}

contract Auction {
    event Start(string message);
    event Bid(address indexed bidder, uint value, string message);
    event Withdraw(address indexed bidder, uint value, string message);
    event End(address indexed highestBidder, uint highestBid, string message);

    IERC721 public nft;
    uint public nftId;

    address payable public seller;
    uint public endAt;
    bool public started;
    bool public ended;

    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bids;

    constructor(address _nft, uint _nftId, uint _startingBid) {
        nft = IERC721(_nft);
        nftId = _nftId;

        seller = payable(msg.sender);
        highestBid = _startingBid;
    }

    function start() external {
        require(!started, "Already started!");
        require(msg.sender == seller, "Only seller can start to Auction");

        nft.transferFrom(msg.sender, address(this), nftId);
        started = true;
        endAt = block.timestamp + 7 days;

        emit Start("Auction start!");
    }

    function bid() external payable {
        require(started, "Auction is not started");
        require(block.timestamp < endAt, "Auction is already ended");
        require(msg.value > highestBid, "Your bid must be higher than current price");

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;

        emit Bid(msg.sender, msg.value, "You have participated in the bidding");
    }

    function withdraw() external {
        uint balance = bids[msg.sender];
        // payable(msg.sender).transfer(balance);
        (bool success,) = payable(msg.sender).call{value: balance}("");
        require(success, "Failed to send Ether");

        bids[msg.sender] = 0;
        emit Withdraw(msg.sender, balance, "You have canceled your bid");
    }

    function end() external {

        
        ended = true;
        if (highestBidder != address(0)) {
            nft.safeTransferFrom(address(this), highestBidder, nftId);
            seller.transfer(highestBid);
        } else {
            nft.safeTransferFrom(address(this), seller, nftId);
        }

        emit End(highestBidder, highestBid, "Auction has ended! Thank you");
    }
}