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
   UX 관점에서 NFT의 name, desc 등의 내용 수정에 적지 않은 편의가 있다고 생각한다. 예)open sea 에서 사용자 프로필 & 프로필 배경 바꾸는 기능 느낌 (메타데이터를 블록체인에 기록하지 않으니 SC에서 gas fee 절약은 덤)

## 3. Solidity dive

- 인프런 대니월드 강의[https://www.inflearn.com/course/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%BD%94%EC%9D%B8%EC%A0%9C%EC%9E%91#curriculum]

<details>
<summary>접기/펼치기</summary>

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

```
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
```

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

5. Enum[https://solidity-by-example.org/enum/]
   - 열거형(enum)
   - 상태추적, 모델선택, 컨트랙트 안, 밖 선언 가능

```
contract Enuum {
   enum Status {
      Pending,  //0 (uint 값은 자동으로 지정되고 Status의 명칭만 정해주면됨)
      Shipped,  //1
      Accepted, //2
      Rejected, //3
      Canceled  //4
   }
   Status public status; // 0
   function set(Status _status) public {
      status = _status; // 사용자로부터 Status 상태를 업데이트
   }
   function get() public view returns(Status) {
      return status;
   }
   function cancel() public {
      status = Status.Canceled;
   }
   function reset() public {
      delete status; // 0으로 초기화
   }
}
```

6. Struct(구조체)

```
contract Struuct {
   struct Todo {
      string text;
      bool completed;
   }
   Todo[] public todos;

   // function getTargetTodo(uint _index) public view returns(string memory, bool) {
   //      Todo storage todo = todos[_index];
   //      return (todo.text, todo.completed);
   // }
   function createTodo(string calldata _text) public {
      // 배열을 업데이트 하는 3가지 방법A
      todos.push(Todo(_text, false));
      // todos.push(Todo({text: _text, completed: false}));

      // Todo memory todo;
      // todo.text = _text;
      // todos.push(todo);
   }
   function updateText(uint _index, string calldata _text) public {
      Todo storage todo = todos[_index];
      todo.text = _text;
   }
   function toggleCompleted(uint _index) public {
      Todo storage todo = todos[_index];
      todo.completed = !todo.completed;
   }
}
```

7. Function
8. View vs Pure

```
// view 상태변수를 변경시키지 않는 함수에 사용  (no Set)
// pure 상태변수를 변경시키지 않는 함수 & 상태변수를 읽지도 않는 함수 (no Set & Get)

uint pulic num = 1; // 상태변수
function getPlusNum(uint _i) public view returns (uint) {
   return num + _i; // 상태변수 [num] get
}
function getPlusAnything(uint _i, uint _j) public pure return (uint) {
   return _i + _j;
}
```

9. Error

```
// 에러가 발생하면 트랜잭션 중에 상태변화를 취소(undo)
// require: 실행 전에 조건, 입력 값 확인(검증)
// revert: 가스비 조금 발생, 엄격한 상황
// assert: 코드가 절대 false가 되어서는 안되는 상황 체크(개발자 디버깅 용이)
// 사용자 임의: 로그를 다양하게 블록체인에 기록, 확인.
function testRequire(uint _i) public pure {
   require(_i > 10, "input must be greater than 10");
   // 코드 실행
}
function testRevert(uint _i) public pure {
   if (_i <= 10) {
      revert("input must be greater than 10");
   }
   // 코드 실행
}
uint public validatedNum;
function testAssert() public view {
   assert(validatedNum == 0);
}

//사용자 정의 에러
error InsufficientBalance(uint256 balance, uint256 withdrawAmount);
function testCustomError(uint _withdrawAmount) public view {
   uint bal = address(this).balance; // 현재 컨트랙트 이더 잔액
   if(bal < _withdrawAmount) {
      revert InsufficientBalance({ balance: bal, withdrawAmount: _withdrawAmount });
   }
}
```

10. Modifier (수정자)

```
contract Modifier {
   // 함수 호출하기 전 후에 실행할 수 있는 코드.
   // 엑세스 제한, 유효한 입력값 확인, 재진입 해킹차단.

   address public owner;
   constructor() {
      owner = msg.sender;
   }
   modifier onlyOwner() {
      require(msg.sender == owner, "Not owner!");
      _; // 수정자가 끝났다는 것 체크
   }
   modifier validAddress(address _addr) {
      require(_addr == address(0), "Not valid address!");
      _;
   }
   function changeOwner(address _newOwner) public onlyOwner validAddress(_newOwner) {
      owner = _newOwner;
   }
}
```

11. Event

```
// 블록체인에 대한 로그를 남길 수 있다.
// 이벤트 수신 및 사용자 인터페이스 업데이트 시 log
// 저렴한 형태의 블록체인에 저장이 가능하다.
contract Eveent {
    event Log(address indexed sender, string message);
    event SomethingLog();

    function eventTest() public {
        emit Log(msg.sender, "hello, EVENT!");
        emit Log(msg.sender, "2nd Log!!");
        emit SomethingLog();
    }
}
```

12. Constructor (생성자)
13. Inferitance (상속)
14. Function 속성의 차이

```
// 함수와 상태 변수의 다른 계약에서의 엑세스 여부 선언
// public- 모든 계약 및 계정에서 호출 가능
// private- 함수를 정의하는 계약 내에서만 가능
// internalinternal- 함수 를 상속받은 계약 내부에서만 가능
// external- 다른 계약 및 계정만 호출할 수 있습니다.
// 상태변수는 public, private, internal 사용 가능 하지만 external은 사용 불가능.

contract Base {
    // 이 계약을 상속받은 계약은 이 함수를 호출할 수 없습니다.
    function privateFunc() private pure returns (string memory) {
        return "private function called";
    }

    function testPrivateFunc() public pure returns (string memory) {
        return privateFunc();
    }

    function internalFunc() internal pure returns (string memory) {
        return "internal function called";
    }

    function testInternalFunc() public pure [virtual] returns (string memory) {
        return internalFunc();
    }

    function publicFunc() public pure returns (string memory) {
        return "public function called";
    }

    function externalFunc() external pure returns (string memory) {
        return "external function called";
    }

    // external 함수는 해당 계약 내부에서 실행되지 않습니다. testExternalFunc() 호출 x
    // function testExternalFunc() public pure returns (string memory) {
    //     return externalFunc();
    // }

    // 상태변수 속성
    string private privateVar = "my private variable";
    string internal internalVar = "my internal variable";
    string public publicVar = "my public variable";
    // 상태변수는 external 사용 x
    // string external externalVar = "my external variable";
}

contract Child is Base {
    // 상속된 함수의 [private] function 과 상태변수는 사용x
    // function testPrivateFunc() public pure returns (string memory) {
    //     return privateFunc();
    // }

    // Internal function은 호출이 가능하다.
    function testInternalFunc() public pure [override] returns (string memory) {
        return internalFunc();
    }
}
```

15. Interface

```
// 다른 컨트랙트와 상호작용
// function 구현할 수 없음
// 다른 인터페이스에서 상속할 수 있음
// 선언된 모든 함수는 external 함수여야 함.
// 생성자를 선언할 수 없습니다.
// 상태 변수를 선언할 수 없습니다.
contract Counter {
    uint public count;
    function increment() external {
        count += 1;
    }
}

interface Icounter {
    function count() external view returns (uint);
    function increment() external;
}

contract MyContract {
    function incrementCounter(address _counterContractAddress) external {
        Icounter(_counterContractAddress).increment();
    }
    function getCount(address _counterContractAddress) external view returns (uint) {
        return Icounter(_counterContractAddress).count();
    }
}
```

16. Payable

```
// 함수, 상태변수 payable -> 이더를 받을 수 있음.
contract Payable {
    address payable public owner;
    constructor() payable {
        owner = payable (msg.sender);
    }

    function deposit() public payable {

    }
    function notPayable() public {

    }
    function withdraw() public {
        uint amount = address(this).balance;
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Failed to send Ether");
    }
    function transfer(address payable _to, uint _amount) public {
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Failed to send Ether");
    }
}
```

17. Send Ether & Receive Ether

```
// transfer(2300 가스, 오류 발생)
// send(2300 가스, bool 반환)
// call(모든 가스 또는 설정된 가스를 전달하고 bool을 반환합니다)

// receive() msg.data가 비어 있으면 호출되고,
// 그렇지 않으면 fallback() 호출됨.
contract ReceiveEther {
    receive() external payable {}
    fallback() external payable {}
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

// docs 에는 ether 전송하는거 call 권장.
// data log 찍어보려고 추가하니가 에러남 왜 나는지 아직 모르겠음;
contract SendEther {
    function sendViaTransfer(address payable _to) public payable {
        _to.transfer(msg.value);
    }
    function sendViaSend(address payable _to) public payable {
        bool sent = _to.send(msg.value);
        require(sent, "Failed to send Ether");
    }
    // event Log(address indexed sender, bytes data);
    function sendViaCall(address payable _to) public payable {
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        // emit Log(msg.sender, data); 이거 웨 안돼냐~
    }
}
```

18. Import
19. Smart Contract (간단한 예약시스템)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Reservation {
    address payable public owner;
    enum RoomStatus {
        empty, // 0
        full   // 1
    }
    RoomStatus public roomStatus;
    constructor () payable {
        owner = payable(msg.sender);
        roomStatus = RoomStatus.empty;
    }


    // receive() external payable { }
    // fallback() external payable { }
    // function getBalance() public view returns (uint256) {
    //     return address(this).balance;
    // }
    function deposit() public payable {}

    modifier isRoomEmpty() {
        require(roomStatus == RoomStatus.empty, "This room is not empty");
        _;
    }
    modifier validBookingPrive() {
        require(msg.value >= 2 ether, "Not enough Eth");
        _;
    }
    event LogBook(address _occupant, uint _value);
    // function book() public payable isRoomEmpty validBookingPrive {
    //     roomStatus = RoomStatus.full;
    //     owner.transfer(msg.value);
    //     emit LogBook(msg.sender, msg.value);
    // }
    // function book() -> receive() external 로 변경

    receive() external payable isRoomEmpty validBookingPrive {
        roomStatus = RoomStatus.full;
        owner.transfer(msg.value);
        emit LogBook(msg.sender, msg.value);
    }

    function toggleRoomStatus() public {
        if (roomStatus == RoomStatus.empty) {
            roomStatus = RoomStatus.full;
        } else {
            roomStatus = RoomStatus.empty;
        }
    }
}
```

</details>

## 4. Solidity DeepDive

- Solidity Docs 중 Applications[https://solidity-by-example.org/app/ether-wallet/]