import{r as v,G as L,b as k,d as j,a as q,e as S,j as a,g as m,p as g,f as N,h as c}from"./index-yFNPE8sD.js";import{M as b,O as w}from"./Marketplace-T2Gv4Cpr.js";import"./NftCard-XMlBsIGB.js";import"./Purchase-Ari7y1lb.js";const T=()=>{var u;v.useContext(L);const[t,C]=k(),n=100,[p]=j(),{search:y}=q(),l=p.get("query"),d=p.get("category"),h=encodeURIComponent(l),f=encodeURIComponent(`%${d}%`),o=async e=>{const{ipfsDatas:i,count:r}=await N(e);return C(r*10),i},{data:s,isPending:x,isSuccess:$}=S({queryKey:["marketplace_collection",y],queryFn:()=>{const e=`https://api.pinata.cloud/data/pinList?pageLimit=${n}&pinStart=${c}&metadata[keyvalues]={"isCollection":{"value":"true","op":"eq"}}`,i=`https://api.pinata.cloud/data/pinList?pageLimit=${n}&pinStart=${c}&metadata[name]=${h}&metadata[keyvalues]={"isCollection":{"value":"true","op":"eq"}}`,r=`https://api.pinata.cloud/data/pinList?pageLimit=${n}&pinStart=${c}&metadata[keyvalues]={"tags":{"value":"${f}","op":"like"},"isCollection":{"value":"true","op":"eq"}}`;return o(l?i:d?r:e)}});return a.jsxs(I,{children:[x&&a.jsx(b,{}),$&&s&&((u=m(s))==null?void 0:u.length)<1?a.jsx("div",{style:{padding:"30px"},children:"판매중인 NFT가 없습니다."}):a.jsx(O,{$gridCss:t,children:s&&m(s).map(e=>a.jsx(w,{nft:e,gridCss:t},`marketplace-collection-${e.nftId}`))}),a.jsx("div",{id:"observer-target",style:{width:"100%",height:"1px",backgroundColor:"transparent"}})]})},I=g.div``,O=g.div`
  display: grid;
  grid-template-columns: ${t=>t.$gridCss.gridTemplateColumns};
  gap: ${t=>t.$gridCss.gap};
  @media (max-width: ${({theme:t})=>t.size.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;export{T as default};
