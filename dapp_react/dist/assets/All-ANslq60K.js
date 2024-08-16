import{p as n,l as C,r as N,G as I,n as G,u as P,j as t,q as R,s as T,t as O,v as W,B as H,a9 as q,aa as L,ab as Q,ac as J,Q as K,w as V}from"./index-V15z69l1.js";import{C as D,B as m,N as M}from"./NftCard-UAIVIqnu.js";const X=({nft:e})=>{const{nftId:a,nftName:d,tokenUrl:s,nftPrice:r,collectionIpfs:p,fileName:u,ext:b}=e,v=p&&s!==p?`${s}/${u}`:s,j=C(v),{description:l,image:o,attributes:h}=j,{setMyNfts:w,account:x,myNfts:$,signer:g}=N.useContext(I),{handleWithLoading:y}=G(),f=N.useRef(null),z=()=>{const i=$.map(c=>c.nftId===a?{...c,nftPrice:Number(f.current.value),owner:x}:c);w(i)},E=async()=>{await y(()=>_(),"판매 등록 중입니다")&&(z(),f.current.value="",H("판매 등록이 완료되었습니다."))},U=()=>{var i;return(i=f.current)!=null&&i.value?!0:(K.fire("가격을 입력해주세요"),!1)},_=async()=>{var i;if(U())try{const c=Number((i=f.current)==null?void 0:i.value);if(!(await q(g,a)).status||!(await L(g,a,c)).status)return;const F=await Q(s);return!!(await J(a,F,c)).ok}catch(c){return console.error("Error setting onsale:",c),!1}},k=P(),A=()=>{k(p?`/nft-detail/collection/${s}/${a}`:`/nft-detail/${s}/${a}`)},B=(l==null?void 0:l.length)>15?(l==null?void 0:l.slice(0,15))+"...":l;return t.jsxs(D,{children:[t.jsx(Z,{onClick:A,children:o?t.jsx(m,{src:`${R(o,b)}?w=200&h=200`,onError:i=>i.currentTarget.src=T(o),alt:"NFT image"}):t.jsx(m,{src:O,alt:"loading..."})}),t.jsxs(Y,{children:[t.jsx(M,{onClick:()=>W(d),children:d}),t.jsx("div",{style:{marginTop:"5px"},children:B})]}),t.jsxs(rt,{children:[t.jsx(tt,{type:"number",ref:f,placeholder:"단위: ETH"}),t.jsx(et,{onClick:E,children:"판매 등록"})]})]})},Y=n.div`

padding-top: 10px;
  padding-bottom: 20px;
`,Z=n.div`
width: 193px;
  height: 193px;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;

  cursor: pointer;
`,tt=n.input`
  width: calc(100% - 80px);
  border-bottom-left-radius: 0.75rem;
  border: none;
  border-top: 1px solid #e9e9e9;
  padding-left: 12px;
`,et=n.button`
  background-color: rgba(32, 129, 226, 1);
  border-bottom-right-radius: 8px;
  width: 90px;
  height: 35px;
  padding: 0px 12px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    background-color: rgba(32, 129, 226, 0.8);
  }
`,rt=n.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;function at({nft:e,account:a}){const{nftId:d,nftName:s,tokenUrl:r,nftPrice:p,collectionIpfs:u,fileName:b,ext:v}=e,j=u&&r!==u?`${r}/${b}`:r,l=C(j),{description:o,image:h,attributes:w}=l,x=P(),$=()=>{x(u?`/nft-detail/collection/${r}/${d}`:`/nft-detail/${r}/${d}`)},g=(o==null?void 0:o.length)>15?(o==null?void 0:o.slice(0,15))+"...":o;return t.jsxs(D,{children:[t.jsx(ot,{onClick:$,children:h?t.jsx(m,{src:`${R(h,v)}?w=200&h=200`,onError:y=>y.currentTarget.src=T(h),alt:"NFT image"}):t.jsx(m,{src:O,alt:"loading..."})}),t.jsxs(nt,{children:[t.jsx(M,{onClick:()=>W(s),children:s}),t.jsxs(it,{children:["Price : ",p," ETH ($",V(Number(p)*2928),")"]})]}),t.jsx("div",{children:g&&g})]})}n.div`
  width: 100%;
  height: 100%;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  /* object-fit: cover; */
  background-image: url(${e=>e.$src});
  background-size: 100%;
  background-position: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-size: 110%;
  }
`;const nt=n.div`
  /* height: 100px; */
  padding-top: 10px;
  padding-bottom: 20px;
`;n.div`
  width: 16px;
  height: 16px;

  img {
    width: 100%;
    height: 100%;
  }
`;const st=n.div`
  width: calc(100% - 41px);
    height: 30px;
    background-color: rgba(32, 129, 226, 1);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 0 0 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: rgba(32, 129, 226, 0.8);
    }
`;n(st)`
  width: 40px;
  border-radius: 0 0 10px 0;
  height: 30px;
`;const ot=n.div`
  width: ${e=>{var a;return(a=e.$gridCss)!=null&&a.cardWidth?e.$gridCss.cardWidth:"193px"}};
  height: ${e=>{var a;return(a=e.$gridCss)!=null&&a.cardWidth?e.$gridCss.cardWidth:"193px"}};
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;

  cursor: pointer;
`;n.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: white;
`;const it=n.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`,lt=()=>{const{myNfts:e,account:a}=N.useContext(I),d=e.filter(r=>r.nftPrice),s=e.filter(r=>!r.nftPrice);return t.jsxs(ct,{children:[e.length>0&&t.jsxs(S,{children:[d.map(r=>t.jsx(at,{nft:r,account:a},`mypage-all-onsale-${r.nftId}-${r.nftName}`)),s.map(r=>t.jsx(X,{nft:r,account:a},`mypage-all-nonsale-${r.nftId}-${r.nftName}`))]}),e.length<1&&t.jsx("h2",{children:"No NFTs"})]})},ct=n.div`
  display: flex;
  justify-content: center;
`,S=n.ul`
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 20px;
  padding: 1rem 1rem;
  @media (max-width: ${({theme:e})=>e.size.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    padding: 1rem 0rem;
  }
  
  @media (max-width: 380px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 1rem 1rem;
  }
`,ht=Object.freeze(Object.defineProperty({__proto__:null,MyNftsWrap:S,default:lt},Symbol.toStringTag,{value:"Module"}));export{ht as A,S as M,X as N,at as O};
