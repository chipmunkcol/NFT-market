import{p as s,l as f,n as C,r as w,G as y,u as z,j as t,o as N,q as W,s as T,S as x,t as I,v as P,w as L}from"./index-yFNPE8sD.js";import{C as R,N as U}from"./NftCard-XMlBsIGB.js";import{P as E,C as O}from"./Purchase-Ari7y1lb.js";const V=({nft:e,gridCss:r})=>{const{nftId:i,nftName:d,tokenUrl:c,nftPrice:l,previousPrice:g,owner:o,isReveal:B,fileName:F,collectionIpfs:h,ext:m}=e,u=e!=null&&e.isReveal?`${e.tokenUrl}/${e.fileName}`:e.tokenUrl,b=f(u),{image:n}=b;C();const{signer:v,account:a}=w.useContext(y),j=(a==null?void 0:a.toLowerCase())===(o==null?void 0:o.toLowerCase()),p=z(),k=()=>{p(h?`/nft-detail/collection/${c}/${i}`:`/nft-detail/${c}/${i}`)};return t.jsxs(R,{children:[t.jsx(D,{$gridCss:r,onClick:k,children:t.jsx(N,{children:n?t.jsx(M,{src:`${W(n,m)}?w=200&h=200`,onError:$=>$.currentTarget.src=T(n),alt:"NFT image"}):t.jsx(x,{$css:{height:"193px"}})})}),t.jsxs(A,{children:[t.jsx(U,{onClick:()=>I(d),children:d}),t.jsxs(H,{children:[l," ETH ($",P(Number(l)*2928),")"]}),t.jsxs("div",{style:{color:"#cccccc",marginTop:"5px",fontSize:"12px"},children:["Last sale: ",g," ETH"]})]}),j?t.jsxs("div",{style:{color:"#cccccc"},children:["Ownered by: ",L(a)]}):t.jsxs(G,{children:[t.jsx(E,{css:{btnWidth:"41px",borderRadius:"0 0 0 10px"},metadata:e,signer:v,account:a}),t.jsx(O,{css:{btnWidth:"40px",imgWidth:"16px",borderRadius:"0 0 10px 0"},metadata:e,account:a})]})]})},M=s.img`
  width: 100%;
  height: 100%;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  /* object-fit: cover; */


  /* background-image: url(${e=>e.$src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.3s ease-in-out; */

  /* 이거 화면 width 애매할 때 image 보여주는게 애매해져서 일단 보류 */
  /* background-size: 100%; */
  /* &:hover {
    background-size: 110%;
  } */
  /* @media (max-width: ${({theme:e})=>e.size.mobile}) {
    background-size: cover;
    &:hover {
      background-size: cover;
    }
  } */
`,A=s.div`
  /* height: 100px; */
  padding-top: 10px;
  padding-bottom: 20px;
`;s.div`
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
`;const D=s.div`
  /* width: ${e=>{var r;return(r=e.$gridCss)!=null&&r.cardWidth?e.$gridCss.cardWidth:"193px"}}; */
  width: 100%;
  height: ${e=>{var r;return(r=e.$gridCss)!=null&&r.cardWidth?e.$gridCss.cardWidth:"193px"}};
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;

  cursor: pointer;
`,G=s.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  color: white;
`,H=s.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`,S=()=>t.jsx(_,{children:t.jsx("div",{style:{height:"193px"},children:t.jsx(x,{})})}),_=s.div`
  /* position: relative; */
  padding: 5px 5px 0 5px;
  width: 193px;
  height: 289px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 15px;
  padding-bottom: 1rem;
  padding: 5px 5px 0 5px;
`,X=()=>{const e=Array.from({length:10},(r,i)=>i+1);return t.jsx(q,{children:e.map((r,i)=>t.jsx(S,{},`skeleton-Marketplace-${i}`))})},q=s.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  @media (max-width: ${({theme:e})=>e.size.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;export{X as M,V as O};
