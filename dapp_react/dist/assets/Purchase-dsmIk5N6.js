import{p as u,n as f,j as i,ak as w,al as g,am as p,B as d,u as x,r as v,G as $,Z as h,Q as y,an as k}from"./index-V15z69l1.js";const I=({css:t,metadata:r,account:e})=>{const{handleWithLoading:a}=f(),{nftPrice:o,owner:c}=r,l=async()=>{if(!g(o,c,e)||!e)return;const s=await a(()=>p(r,e),"장바구니에 추가중입니다");s==="already exist"?d("이미 장바구니에 담긴 상품입니다."):s?d("장바구니에 추가되었습니다."):d("장바구니 추가에 실패했습니다.")};return i.jsx(R,{$css:t,onClick:l,children:i.jsx(j,{$css:t,children:i.jsx("img",{src:w,alt:"cart"})})})},R=u.div`
  width: ${({$css:t})=>t.btnWidth};
  height: 100%;
  border-radius: ${({$css:t})=>t.borderRadius};
  background-color: rgba(32, 129, 226, 1);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(32, 129, 226, 0.8);
  }
`,j=u.div`
  width: ${({$css:t})=>t.imgWidth};
  height: ${({$css:t})=>t.imgWidth};

  img {
    width: 100%;
    height: 100%;
  }
`,z=({css:t,metadata:r,signer:e,account:a})=>{const o=x(),{balance:c}=v.useContext($),{handleWithLoading:l}=f(),{nftPrice:n,owner:s,tokenUrl:C,nftId:b}=r,m=async()=>{if(!g(n,s,a)||!e||!(await h("NFT를 구매하시겠습니까?","구매 후에는 취소할 수 없습니다.")).isConfirmed)return;if(c<n){y.fire("잔액이 부족합니다.","Faucet에서 충전 후 다시 시도해주세요.","error");return}if(!await l(()=>k(b,C,n,e),"NFT 구매중입니다"))return;(await h("NFT 구매 성공","MyPage로 확인하러 가기")).isConfirmed?o(`/mypage/${a}`):window.location.reload()};return i.jsx(W,{$css:t,onClick:m,children:"지금 구매하기"})},W=u.div`
  width: calc(100% - ${({$css:t})=>t.btnWidth});
  height: 100%;
  background-color: rgba(32, 129, 226, 1);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: ${({$css:t})=>t.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(32, 129, 226, 0.8);
  }
`;export{I as C,z as P};
