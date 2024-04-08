## 1. vite 사용 시 유의사항

- import { ReactComponent as iconEther } from '[path]';
  이렇게 svg 파일 불러오는거 추가 설정해줘야됨 (cra랑 다름)

1. npm install @svgr/rollup
2. vite.config.ts) import svgr from "@svgr/rollup"; 추가
3. vite.config.ts) export default defineConfig({
   plugins: [react(), svgr()],
   }); 추가

## 2. nft를 민팅 or 생성 후 생성 된 nft data를 smart-contract(이하 SC) 에서 불러오는게 맞는지 ipfs (생성 시 메타데이터 PUT) 에서 불러오는게 맞는지에 대한 고찰

- IPFS 장단점

1. 메타데이터 수정 가능 (name, desc 등 변경 가능)
2. SC보다 속도가 빠름
3. 보안 문제? (잘 모르겠음 확인 필)
   => pinata docs 중 발췌 [Pinata에 업로드된 파일에 대한 이 메타데이터는 IPFS가 아니라 Pinata가 있는 개인 데이터베이스에 있으므로 NFT 메타데이터와 혼동하지 마십시오.]
4. 보안을 강조하는 블록체인이 지향하는 방향과는 맞지는 않지만 핵심은 ipfs URI 이고 부가 내용들은 (name, desc 정도 price는 아닌듯) pinata 의 데이터베이스를 사용해도 괜찮을 듯
   UX 관점에서 NFT의 name, desc 등의 내용 수정에 적지 않은 편의가 있다고 생각한다. 예)open sea 에서 사용자 프로필 & 프로필 배경 바꾸는 기능 느낌 (SC에서 gas fee 절약은 덤)

## 3. Solidity Deep Dive(SC는 기본코드만 적당히 가져와서 개발하려했는데 이왕 하는거 덕질좀 해야겠다😎)

- 인프런 대니월드 강의[https://www.inflearn.com/course/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%BD%94%EC%9D%B8%EC%A0%9C%EC%9E%91#curriculum]

1. dataType

   - state(상태변수): 함수 밖에 선언됨 -> 블록체인에 기록이 됨(저장됨)
   - local(지역변수): 함수 안에 선언됨 -> 블록체인에 기록 안됨
   - global(전역변수): 블록체인에 정보들을 제공함(window 처럼 이미 기록된 변수를 사용하는 것).

```
contract Temp {
   string public text = "hello world"; // 상태변수
   uint public num = 123; // 상태변수

- 상태변수 중 상수
   address public constant MY_ADDRESS = 0X5B38DA....f56 // 상태변수 (상수)
   // 수정될 수 없는 변수
   // 하드코딩 된 값(value) -> 가스 비용(수수료)를 절약해줌
   // 대문자로 코딩 권장.

- 상태변수 중 불변(immutable)
   // 생성자(constructor) 안에 선언될 수 있음. 값이 수정되진 않음.
   address public immutable MY_IM_ADDRESS;
   constructor() {
   MY_ADDRESS = msg.sender; // 현재 컨트랙트를 배포한 계정.
   }

   function dataType() public {
   uint i = 456; // 지역변수
   uint timestamp = block.timestamp; // 전역변수 (현재 블록의 타임스탬프)
   address sender = msg.sender; // 지역변수 (현재 컨트랙트의 호출자(caller))
   }
}
```

2. Gas

   - 트랜잭션 -> 가스비
   - 사용한 가스(gas spent) \* 가스 가격(gas price) = 트랜잭션 비용
   - Gas Price(가스가격) : gas 당 지불할 이더의 양.
   - 가스 가격이 더 높은 트랜잭션 먼저 처리됨.
   - 사용되지 않은 가스는 환불 됨.
   - gas limit(가스제한) 사용자가 설정한 최대 가스 비용
   - block gas limit : 블록에 허용된 최대 가스 비용.(네트워크 설정)
   - 1 이더는 10^18 웨이(wei)
     uint public oneWei = 1 wei;
     bool public isOneWei = 1 wei == 1;
     uint public onEther = 1 ether;
     bool public isOneEther = 1 ether = 1e18; // 10^18 wei

3. Mapping

```
contract Mapping {
   // keyType => valueType
   // keyType : 모든 기본값(int, bytes, string, contract..)
   // valueType : 다른 맵핑, 배열 포함한 유형.
   // mapping 반복 안됨.

   mapping(address => uint) public myAddressMap;
   function setMyAddressMap(address _addr, uint _i) public {
      myAddressMap[_addr] = _i;
   }
   function getMyAddressMap(address _addr) public view returns(uint) {
      return myAddressMap[_addr];
   }
   function removeMyAddressMap(address _addr) public {
      delete  myAddressMap[_addr];
   }
}

constract Mapping2 {
    // mapping(uint => Book) public books;
    mapping(address => mapping(uint => Book)) public myBooks;

    // Book 정보 구조체
    struct Book {
        string title;
        string Author;
    }

    // function addBook(uint _id, string memory _title, string memory _author) //public {
    //     books[_id] = Book(_title, _author);
    // }
    function addMyBook(uint _id, string memory _title, string memory _author) public {
        myBooks[msg.sender][_id] = Book(_title, _author);
    }
}
```

4. Array

```
contract Array {
   uint[] public arr;        // 동적배열
   uint[] public arr2 = [1,2,3];
   uint[10] public fixedArr; // 정적배열

   function getTargetArr(uint _i) public view returns(uint) {
      return arr[_i];
   }
   function getArr() public view returns(uint[] memory) {
      return arr;
   }
   function getArrLength() public view returns(uint) {
      return arr.length;
   }
   function pushArr(uint _num) public {
      arr.push(_num); // 배열의 크기가 1씩 증가하면서 데이터 삽입
   }
   function popArr() public {
      arr.pop(); // 배열의 마지막부터 하나씩 제거
   }
   function removeArr(uint _index) public {
      delete arr[_index]; // 배열의 특정 주소를 제거
   }
   function example() external {
      uint[] memory a = new uint[](5);
      // coding...
   }
}
```
