import{r as o,G as r,j as s,p as i}from"./index-NKWmM4Ap.js";import{M as l,O as c}from"./All-meGhLzsK.js";import"./NftCard-D56hXj4T.js";function d(){const{myNfts:e,account:n}=o.useContext(r),a=e.filter(t=>t.nftPrice);return s.jsxs(p,{children:[e.length>0&&s.jsx(l,{children:a.map(t=>s.jsx(c,{nft:t,account:n},`mypage-onsale-${t.id}-${t.name}`))}),e.length<1&&s.jsx("h2",{children:"No NFTs"})]})}const p=i.div`
  display: flex;
  justify-content: center;
`;export{d as default};
