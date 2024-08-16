import{p as i,l as $,n as f,r as w,G as y,u as z,j as t,o as N,q as W,s as T,t as I,v as P,w as R,x as U}from"./index-hHL9QwoV.js";import{C as E,N as L}from"./NftCard-BcRZucoR.js";import{P as O,C as D}from"./Purchase-1cM8Lp9t.js";const J=({nft:e,gridCss:r})=>{const{nftId:c,nftName:n,tokenUrl:d,nftPrice:l,previousPrice:x,owner:o,isReveal:B,fileName:F,collectionIpfs:h,ext:m}=e,u=e!=null&&e.isReveal?`${e.tokenUrl}/${e.fileName}`:e.tokenUrl,b=$(u),{image:a}=b;f();const{signer:v,account:s}=w.useContext(y),j=(s==null?void 0:s.toLowerCase())===(o==null?void 0:o.toLowerCase()),g=z(),k=()=>{g(h?`/nft-detail/collection/${d}/${c}`:`/nft-detail/${d}/${c}`)};return t.jsxs(E,{children:[t.jsx(H,{$gridCss:r,onClick:k,children:t.jsx(N,{children:a?t.jsx(p,{src:`${W(a,m)}?w=200&h=200`,onError:C=>C.currentTarget.src=T(a),alt:"NFT image"}):t.jsx(p,{src:I,alt:"loading..."})})}),t.jsxs(G,{children:[t.jsx(L,{onClick:()=>P(n),children:n}),t.jsxs(q,{children:[l," ETH ($",R(Number(l)*2928),")"]}),t.jsxs("div",{style:{color:"#cccccc",marginTop:"5px",fontSize:"12px"},children:["Last sale: ",x," ETH"]})]}),j?t.jsxs("div",{style:{color:"#cccccc"},children:["Ownered by: ",U(s)]}):t.jsxs(A,{children:[t.jsx(O,{css:{btnWidth:"41px",borderRadius:"0 0 0 10px"},metadata:e,signer:v,account:s}),t.jsx(D,{css:{btnWidth:"40px",imgWidth:"16px",borderRadius:"0 0 10px 0"},metadata:e,account:s})]})]})},p=i.img`
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
`,G=i.div`
  /* height: 100px; */
  padding-top: 10px;
  padding-bottom: 20px;
`;i.div`
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
`;const H=i.div`
  /* width: ${e=>{var r;return(r=e.$gridCss)!=null&&r.cardWidth?e.$gridCss.cardWidth:"193px"}}; */
  width: 100%;
  height: ${e=>{var r;return(r=e.$gridCss)!=null&&r.cardWidth?e.$gridCss.cardWidth:"193px"}};
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;

  cursor: pointer;
`,A=i.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  color: white;
`,q=i.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;export{J as O};
