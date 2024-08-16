import{b as U,d as $,a as j,e as O,j as a,S as q,p,f as L,m as S,i as w,k as I}from"./index-V15z69l1.js";import{O as _}from"./OnsaleNftCard-tG1CS4Un.js";import"./NftCard-UAIVIqnu.js";import"./Purchase-dsmIk5N6.js";const A=()=>{var l;const[s,m]=U(),[i]=$(),o=i.get("query"),u=i.get("category"),g=o&&encodeURIComponent(o),f=encodeURIComponent(`%${u}%`),y=e=>{if(!e)return;const r=JSON.parse(e);return r.length<1?0:r[0].price},d=e=>e.map(t=>{const k=t.ipfs_pin_hash,N=t.metadata.name,{priceHistory:v}=t.metadata.keyvalues,P=y(v);return{nftName:N,tokenUrl:k,previousPrice:P,...t.metadata.keyvalues}}),{search:h}=j(),c=async e=>{const{ipfsDatas:r,count:t}=await L(e);return m(t),r},{data:n,isPending:C,isSuccess:x}=O({queryKey:["marketplace_nft",h],queryFn:()=>{const e=S,r=w(g),t=I(f);return c(o?r:u?t:e)}});return a.jsxs(b,{children:[C&&a.jsx(q,{_custom:{color:"#3498db",size:"30px",height:"100px"}}),x&&n&&((l=d(n))==null?void 0:l.length)<1?a.jsx("div",{style:{padding:"30px"},children:"판매중인 NFT가 없습니다."}):a.jsx(R,{$gridCss:s,children:n&&d(n).map(e=>a.jsx(_,{nft:e,gridCss:s},`marketplace-nft-${e.nftId}-${e.tokenUrl}`))})]})},b=p.div``,R=p.div`
  display: grid;
  grid-template-columns: ${s=>s.$gridCss.gridTemplateColumns};
  gap: ${s=>s.$gridCss.gap};
  @media (max-width: ${({theme:s})=>s.size.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;export{A as default};
