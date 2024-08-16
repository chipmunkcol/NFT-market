import{r as a,G as r,j as s,p as i}from"./index-hHL9QwoV.js";import{M as l,N as c}from"./All-AUBSugEW.js";import"./NftCard-BcRZucoR.js";function N(){const{myNfts:e,account:n}=a.useContext(r),o=e.filter(t=>!t.nftPrice);return s.jsxs(p,{children:[e.length>0&&s.jsx(l,{children:o.map(t=>s.jsx(c,{nft:t,account:n},`mypage-nonsale-${t.id}-${t.name}`))}),e.length<1&&s.jsx("h2",{children:"No NFTs"})]})}const p=i.div`
  display: flex;
  justify-content: center;
`;export{N as default};
