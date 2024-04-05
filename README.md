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
   => pinata docs 중 정답 찾음 [Pinata에 업로드된 파일에 대한 이 메타데이터는 IPFS가 아니라 Pinata가 있는 개인 데이터베이스에 있으므로 NFT 메타데이터와 혼동하지 마십시오.]
4. 보안을 강조하는 블록체인이 지향하는 방향과는 맞지 않음

## 3. solidity (SC는 기본코드만 적당히 가져와서 개발하려했는데 이왕 하는거 덕질좀 해야겠음😎)

1. 인프런 대니월드 강의[https://www.inflearn.com/course/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%BD%94%EC%9D%B8%EC%A0%9C%EC%9E%91#curriculum]
