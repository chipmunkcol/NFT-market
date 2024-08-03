## 1. vite 사용 시 유의사항

- import { ReactComponent as iconEther } from '[path]';
  이렇게 svg 파일 불러오는거 추가 설정해줘야됨 (cra랑 다름)

1. npm install @svgr/rollup
2. vite.config.ts) import svgr from "@svgr/rollup"; 추가
3. vite.config.ts) export default defineConfig({
   plugins: [react(), svgr()],
   }); 추가
4. typescript 사용시 아래 추가

```
1. type.d.ts type 정의한 파일 만들고
declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

2. ts 컴파일러가 ts|tsx 확장을 처리하도록 tsconfig.json에
type.d.ts를 호출하도록 해준다
 "include": ["src", "type.d.ts"],

3. 그리고 사용하는데서 요렇게 사용!
import Tictoc from "../assets/images/tictok.svg";
**import 하고 첫 문자 대문자!
```

## 2-1. nft를 민팅 or 생성 후 생성 된 nft data를 smart-contract(이하 SC) 에서 불러오는게 맞는지 ipfs (생성 시 메타데이터 PUT) 에서 불러오는게 맞는지에 대한 고찰

=> (5/29) SC가 맞을듯 IPFS에서 불러오더라도 SC와 체킹하는 과정이 필요함
정교하게 코딩해도 sc 와 ipfs api 둘중 하나의 call이 실패하는 경우를 막을 수가 없음
물론 쿼리할 때 추가 state를 컨트롤 해야돼서 가스비가 증가하겠지만 별수 없는듯하다

=> (6/24) SC가 맞다는데는 변함은 없지만 내 DApp이 얼만큼 decentralize 하게 만들거냐에 따라 pinata가 아닌 개인 db
를 사용하는 것은 필요할듯하다.
state를 잔뜩 만들어서 SC를 커스텀하는것도 좋지만 (그치만 가스비는 누가내죠..?) SC에 모든걸 맡기기엔 UX가
급격히 안좋아진다 모든 state 변경에는 가스비가 들 뿐 아니라 스마트 컨트렉트 통신자체가 일반적인(중앙집권화된)DB와의 api call과 비교해 속도가 매우 느림
그래도 위 고민을 가장많이 했던 건 marketplace 페이지였는데 여긴 sc로 하는게 맞는것 같다 pinata 로 커스텀해서
이것저것 보여준건 좋았는데 sc와 pinata 를 둘다 api post 하는게 100% 가 아닌이상 app 완성도가 너무 떨어지게됨
거래마다 2개의 post api call하느라 에러처리나 코드의 분기점이 너무 많아져 중간부터 리팩토링이고 뭐고 코드 치기 바빴음..

- sc로 해도 useQuery로 캐싱해서 최대한 대응할만 한듯

* IPFS 장단점

1. 메타데이터 수정 가능 (name, desc 등 변경 가능)
   => (5/29)기본적으로 nft data는 opensea의 json 형태이고(name, description, image, attributes)
   메타데이터의 사용은 marketplace 라는 dapp 상에서 사용하므로 합의해서 사용
   (ex. ipfs 메타데이터에 판매된 기록을 남겨 이전 price를 사용자에게 나타내줌 )
2. 보안 문제? (잘 모르겠음 확인 필)
   => pinata docs 중 발췌 [Pinata에 업로드된 파일에 대한 이 메타데이터는 IPFS가 아니라 Pinata가 있는 개인 데이터베이스에 있으므로 NFT 메타데이터와 혼동하지 마십시오.]
3. 보안을 강조하는 블록체인이 지향하는 방향과는 맞지는 않지만 핵심은 tokenURI 이고 부가 내용들은 pinata 의 데이터베이스를 사용해도 괜찮을 듯
   UX 관점에서 NFT의 내용 수정에 적지 않은 편의가 있다고 생각한다. 예)open sea 에서 사용자 프로필 & 프로필 배경 바꾸는 기능 느낌 (메타데이터를 블록체인에 기록하지 않으니 SC에서 gas fee 절약은 덤)

## 2-2. 페이지네이션 or 검색 기능을 구현하려는데 해당 기능을 pinata api query를 이용할지 sc를 구현해서 해결할지 여부

=> (5/29) SC가 맞다..! 근데 쿼리 & 페이지네이션은 pinata api가 (pageOffset) 꽤 편리해서 sc와 체킹하면 ipfs 가져와도 좋을듯, 다만 체킹과 페이지네이션 조합이 안좋아서 (실력이슈..) 실제 구현시에 체킹은 포기했음ㅠ
정렬 같은 경우엔 pinata 에 적당한 api가 없어서 이건 sc가 맞을듯함.

- IPFS 장단점

(6/3) 그냥 커스텀하기가 너무 좋아서 이쪽이 맞는거 같음 nft 민팅 시에 해당 내용을 metadata에 저장 후에 query로 구현하는게 용이해보임 배포시 속도와 가스비는 덤이고, 무엇보다 내가 sc쪽 전문으로 구현하는게 아니니까 내쪽에서 해결해보는걸로 하자
Pinata 관련 내용[https://docs.pinata.cloud/pinning/listing-files]

(6/25) 당시엔 pinata로 판단해서 구현했는데 get은 tokenUrl 에 대한 json 값만 가져오고 나머지는 sc에서 get 해오는게
좋아보임 내용은 2-1 (6/24 작성과 유사)

## 2-3. cloudflare 로 이미지 리사이징 -> 캐싱해서 가져오기
누가 ipfs 이미지 아니랄까봐 로딩속도도 느리고 애초에 썸네일을 원본으로 가져와서
신경쓰여서 안되겠다. 이미지 혼내주자
cloudfront랑 s3 lamda@edge 조합이랑 고민했는데 aws 설정 너~~무 번거롭고 프로젝트 규모 상 빨리 개발하는게 중요하니까 요새 또 많이 쓰는 신기술 cloudflare 적용    

- cloudflare에 최상위 도메인(.com, .net) 필요해서 어차피 cloudfront랑 s3 사용해서 배포하긴 했음.. (vercel out!)
근데 배포한 사이트에 새로고침 누르면 아래 에러뜸
```
This XML file does not appear to have any style information associated with it. The document tree is shown below.
<Error>
<Code>AccessDenied</Code>
<Message>Access Denied</Message>
<RequestId>920T3N8FM5B4JATE</RequestId>
<HostId>mr6umMUWaHZtet6xICaXMOQjsQ/SKj5nqzlBmqN0xxJYWWtUQnX2iaDsdFnJumjQ3D9e6cikDm8=</HostId>
</Error>
```
보니까 메인 url 에서는 새로고침해도 괜찮은데 route 가 붙은 곳에서는 위 에러가 떠서
찾아보니까
s3 접근 권한을 cloudfront 로 한정해놔서 cloundfront 메인 url에서 route로 넘어가는건
괜찮은데 url/route 에서 바로 새로고침으로 요청하니까 s3가 접근권한 없는거잖아
하고 403 에러를 뱉어주는거였다. 
=> 권한에 모든 url/* 추가해주고 cloundfront 에 오류페이지 403 일때 /index.html 설정으로 해결

## 0. 그냥 이것저것

0. alert

   - 비동기 함수 실행될 동안 로딩스피너가 돌아가는 커스텀훅 만들었는데 비동기 함수가 끝나면 실행되는 alert 시점이 예상과 다르다
   - 디버깅 찍어도 분명 비동기 함수가 실행이 되고 result 받아서 그 후에 alert 가 떠야되는데 alert가 먼저 뜨는 버그 발생
     => 비동기 함수는 자바스크립트의 이벤트 루프와 프로미스를 사용해 비동기적으로 실행된다.
     alert call은 자바스크립트 실행을 일시 중지하고 사용자의 alert 를 닫을때까지 기다린다. 둘을 혼용하면 실행되는 시점을 예측하기 어려울 수 있다. 등의 구글링 정보를 얻어서 이것저것 해보다가 sweatalert 사용하니까 해결은됐는데
     어떻게 실행되는지는 잘 모르겠음;
     ux적으론 alert 보다 toast 가 좋아서 우선 toast로 변경.

1. addEventListener
   - useEffect에서 addEventListener 사용시 콜백 함수 내에서 변수가 초기값만 참조하게 되어서 업데이트 시킬 변수를 의존성 배열에 넣어야된다
     react에서 addEventListener 사용할 일이 많이 없어서(나만없나..?) 할때마다 헷갈리네

```
  const handleScroll = e => {
    const scrollPosition = e.currentTarget.scrollY;

    if (scrollPosition === 0) {
      changeheaderCss('#f0f0f1', '#161618');
      changePathOfProfileAndCart(iconProfileWh, iconCartWh);
    } else if (scrollPosition !== 0 && $header?.style.backgroundColor === 'rgb(22, 22, 24)') {
      changeheaderCss('black', 'white');
      changePathOfProfileAndCart(iconProfile, iconCart);
    }
    setLastScrollTop(scrollPosition);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop, location.pathname]);
```

2. ScrollRestoration
   - page에 따라 유저가 맨 위의 영역을 보게하고 싶어서 평소처럼 router 공식문서에서 쓰라는 컴포넌트 만들어서 Root 컴포넌트 위에 살포시 갔다놨다.
     전에는 잘 됐었는데 뭔가 컴포넌트가 꼬여서 그런지 특정 이벤트가 발생할때마다 실행돼서 시도떄도 없이 스크롤이
     꼭대기로 가버리는 현상이 발생..

```
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') return;
    window.scrollTo(0, 0);
  }), [pathname];


  return null;
}

export default ScrollToTop;
```

router 버전 바뀌면서 이거 사용하란다 <ScrollRestoration />

특정 path에만 작동하게 할 수 있고 아주 편리함
(언제 나왔지.....? 세상이 너무 빨리 변한다!)
📙공식문서 읽기[https://reactrouter.com/en/main/components/scroll-restoration]

3. recharts.js warning
   width 를 option 으로 넣어주니까 warning 발생!이런 식으로 mobile 버전일 때 width 조절
   <LineChart
   width={mobileSize ? 300 : 600}
   height={200}
   data={metadata.priceHistory}

   한줄 짜리가 아니라 좀 길어서 좀 신경쓰인당 아직 해결 안됐음 git에서 아조씨들 열심히 잡담중임

   > [gitIssue](https://github.com/recharts/recharts/issues/3615#issuecomment-2135955727)

4. URI 사용시 주의할점

- Pinata 에서 제공하는 api query 사용하다보니까 생각보다 관련 지식이 필요함
  우선 전날하는 URL 는 string 형태여야 되는데 변수형태로 전달하려면 encodeURIComponent 함수로 변경해서 전달
  특히 pinata 에서 제공하는 쿼리 중 "tags":{"value":"${encodedCategory}","op":"like"} 부분에서 좀 막혔었는데
    docs 에서 아래처럼 사용하라길래 "value":"%${encodedCategory}%", "value":${encodedCategory} (encodedCategory 에 %% 같이 인코딩)
  등등 이것저것 넣어봤는데 fetching 이 계속 안돼서 이것저것 찾아보면서 넣어봤는데 docs 에서 말한 % 도 인코딩을 해서 넣어야되고, "" 을 감싸줘야 되는.. 별거 아닌데 url 특징을 잘 모르면 헤매기 좋은 것 같다. 아래는 알고 넘어가자
  - encodeURIComponent는 url 일부 분만 인코딩 하는 것 권장 프로토콜, 호스트, 포트 등은 잘못 인코딩 될 수 있음
  - 인코딩 된 url을 서버에서 사용할 때는 decodeURIComponent로 디코딩
  - 공백 -> %20, / -> %2F, ' -> %27 등등 특수문자 같은거 인코딩해야 됨
  - 액티브 파라미터: 지정한 파라미터 값에 따라 화면 내용이 바뀌는 경우
  - 패시브 파라미터: 서버 프로그램이 내부적으로 사용하는 url 파라미터, 파라미터 값에 따라 콘텐츠가 바뀌지 않음. 웹로그 분석 툴에서 추적 유저ID별로 데이터를 분류하고 처리하는 과정에서 활용

```
    ?metadata[keyvalues]={"exampleKey":{"value":"testValue%","op":"like"}}
    (값 앞의 %는 그 앞에 무엇이든 올 수 있음을 의미하고, 뒤의 % 기호는 그 뒤에 모든 문자가 올 수 있음을 의미합니다.)
```

```
 const encodedOffset = encodeURIComponent(
    offsetRef.current * 10
  );

 const encodedUpdateDate = encodeURIComponent(
    '20240523'
  );

  const encodedCategory = encodeURIComponent(
    `%${category}%`
  );

const categoryUrl = `https://api.pinata.cloud/data/pinList?pinStart=${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;

```

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

<details>
<summary>접기/펼치기</summary>

1. NFT 경매

```
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
```

</details>

## 5. ERC20 & ERC721

1. ERC20 토큰 핵심
   - 토큰 전송
   - 다른 사람이 토큰 보유자를 대신해 토큰을 전송할 수 있도록 허용
   - 암호화폐, 거버넌스 토큰, 유틸리니 토큰 등의 형태로 사용

<details>
<summary>Interface</summary>

```
interface IERC20 {
   function totalSupply() external view returns (uint256);
   function balanceOf(address account) external view returns (uint256);
   function transfer(address recipient, uint256 amount)
      external
      returns (bool);
   function allowance(address owner, address spender)
      external
      view
      returns (uint256);
   function approve(address spender, uint256 amount) external returns (bool);
   function transferFrom(address sender, address recipient, uint256 amount)
      external
      returns (bool);
}
```

</details>

2. ERC721 토큰 핵심
   - 대체 불가능성(토큰 각각 고유한 속성을 가짐)
   - 소유권과 이전 (소유권을 명확히 하여 토큰 소유자만이 토큰을 전송하거나 판매 가능)
   - 온라인 예술품, 게임 아이템, 부동산 등 고유한 자산을 디지털화 하는데 사용

<details>
<summary>Interface</summary>

```
interface IERC721 is IERC165 {
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId)
        external;
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId)
        external
        view
        returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);
}

```

</details>

## react-swiper 사용시 주의사항

- thumbs type error
  docs 그대로 가져왔는데 아래 에러 발생
  Uncaught TypeError: Cannot convert undefined or null to object

1. Swiper 태그 안에서 ts 가 제대로 안먹히는 버그인데
   (에러 이슈)[https://github.com/nolimits4web/swiper/issues/5548]
   (해결 이슈)[https://github.com/nolimits4web/swiper/issues/6233]
   해결로 올렸는데 같은 버그 계속 있는듯?

아래 구문 추가하니까 정상 작동 하는데 뭔가 찝찝쓰
=> thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}

## 참고 자료

()[]
