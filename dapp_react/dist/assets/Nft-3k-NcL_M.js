import{b as U,d as $,a as j,e as O,j as a,p,f as q,m as L,i as w,k as I}from"./index-yFNPE8sD.js";import{M as S,O as M}from"./Marketplace-T2Gv4Cpr.js";import"./NftCard-XMlBsIGB.js";import"./Purchase-Ari7y1lb.js";const z=()=>{var d;const[s,m]=U(),[i]=$(),o=i.get("query"),u=i.get("category"),g=o&&encodeURIComponent(o),f=encodeURIComponent(`%${u}%`),y=e=>{if(!e)return;const r=JSON.parse(e);return r.length<1?0:r[0].price},l=e=>e.map(t=>{const x=t.ipfs_pin_hash,N=t.metadata.name,{priceHistory:v}=t.metadata.keyvalues,P=y(v);return{nftName:N,tokenUrl:x,previousPrice:P,...t.metadata.keyvalues}}),{search:C}=j(),c=async e=>{const{ipfsDatas:r,count:t}=await q(e);return m(t),r},{data:n,isPending:h,isSuccess:k}=O({queryKey:["marketplace_nft",C],queryFn:()=>{const e=L,r=w(g),t=I(f);return c(o?r:u?t:e)}});return a.jsxs(R,{children:[h&&a.jsx(S,{}),k&&n&&((d=l(n))==null?void 0:d.length)<1?a.jsx("div",{style:{padding:"30px"},children:"판매중인 NFT가 없습니다."}):a.jsx(T,{$gridCss:s,children:n&&l(n).map(e=>a.jsx(M,{nft:e,gridCss:s},`marketplace-nft-${e.nftId}-${e.tokenUrl}`))})]})},R=p.div``,T=p.div`
  display: grid;
  grid-template-columns: ${s=>s.$gridCss.gridTemplateColumns};
  gap: ${s=>s.$gridCss.gap};
  @media (max-width: ${({theme:s})=>s.size.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;export{z as default};
