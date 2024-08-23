import{ad as T,r as c,G as H,j as s,ae as C,s as N,v as E,w as B,af as R,ag as u,ah as W}from"./index-NKWmM4Ap.js";import{B as z,C as L,F as $,L as M,I as A,S as O,E as U,a as _,b as F,A as K,P as a,R as Y,c as G,N as J,d as X,e as V,f as q,g as Q,h as Z,X as D,Y as k,T as ss,D as es}from"./NftDetail-xJPuzr7U.js";import{P as is,C as rs}from"./Purchase-TCWyOUc3.js";import"./index-PYMElNa_.js";function os(){var p;const y=T(),{ipfsHash:t,nftId:d}=y,m=Number(d),[e,g]=c.useState({name:"",description:"",image:"",attributes:[]}),{account:x,signer:b}=c.useContext(H),[i,v]=c.useState({name:"",fileName:"",owner:"",isCollection:"",nftPrice:0,numberOfSales:0,tags:"",nftId:0,tokenUrl:"",isReveal:!1,priceHistory:[{owner:"",price:0,soldTime:""}]}),P=r=>r.reverse().map(l=>({...l,soldTime:W(l.soldTime)}));c.useEffect(()=>{async function r(){var j;if(!t)return;const n=await R(t),f=JSON.parse((j=n.metadata)==null?void 0:j.keyvalues.nftKeyvaluesList).filter(o=>(o==null?void 0:o.nftId)===m),S=JSON.parse(f[0].priceHistory),w=P(S);v({...f[0],tokenUrl:t,priceHistory:w})}r()},[]),c.useEffect(()=>{async function r(){try{if(!t||!(i!=null&&i.name))return;let n;if(i!=null&&i.isReveal){const l=`${t}/${i==null?void 0:i.fileName}`;n=await u(l)}else n=await u(t);g(n)}catch(n){console.error("Error fetching IPFS data:",n)}}r()},[i]);const[I,h]=c.useState(!1);return c.useEffect(()=>{window.innerWidth<=480?h(!0):h(!1)},[]),s.jsx(z,{children:s.jsx(L,{children:s.jsxs($,{children:[s.jsxs(M,{children:[s.jsxs(A,{children:[s.jsxs("header",{children:[s.jsx("div",{children:s.jsx(O,{children:s.jsx("img",{src:C,alt:"sepolia-symbol"})})}),s.jsxs("div",{children:[s.jsx("div",{children:s.jsx("a",{href:`https://ipfs.io/ipfs/${e==null?void 0:e.image}`,target:"_blank",children:s.jsx(U,{children:s.jsx("img",{src:_,alt:"expand-icon"})})})}),s.jsx("div",{})]})]}),s.jsx(F,{children:s.jsx("img",{src:N(e==null?void 0:e.image)})})]}),s.jsxs(K,{style:{marginTop:"20px"},children:[s.jsx("h3",{children:"Traits"}),s.jsx(a,{children:s.jsx("ul",{children:typeof(e==null?void 0:e.attributes)=="object"&&((p=e==null?void 0:e.attributes)==null?void 0:p.length)>0?e==null?void 0:e.attributes.map(r=>s.jsxs("li",{children:[s.jsx("div",{style:{fontSize:"12px",color:"#545454"},children:r.trait_type}),s.jsx("div",{style:{fontSize:"14px",color:"#121212"},children:r.value})]},`nft-detail-${t}-${d}`)):s.jsx("li",{children:"None"})})})]})]}),s.jsx(Y,{children:s.jsxs(G,{children:[s.jsx("div",{style:{marginBottom:"10px"},children:s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[s.jsx(J,{onClick:()=>E(e==null?void 0:e.name),children:e==null?void 0:e.name}),s.jsxs("div",{children:["Owned by"," ",s.jsx("span",{style:{color:"#2081e2cc"},children:i==null?void 0:i.owner})]})]})}),s.jsxs(X,{children:[s.jsx("h3",{children:"Price Info"}),s.jsxs(a,{children:[s.jsx("div",{style:{color:"#8a939b"},children:"Current price"}),s.jsxs("div",{children:[s.jsxs("span",{style:{fontSize:"30px",fontWeight:"700",color:"#121212",marginRight:"5px"},children:[i==null?void 0:i.nftPrice," ETH"]}),s.jsxs("span",{style:{fontSize:"15px",color:"#545454"},children:["($",B(Number(i==null?void 0:i.nftPrice)*2928),")"]})]}),s.jsx("div",{children:s.jsxs(V,{children:[s.jsx(is,{css:{btnWidth:"56px",borderRadius:"10px 0 0 10px"},metadata:i,signer:b,account:x}),s.jsx(rs,{css:{btnWidth:"55px",imgWidth:"20px",borderRadius:"0 10px 10px 0"},metadata:i,account:x})]})})]})]}),s.jsxs(q,{children:[s.jsx("h3",{children:"Price Info"}),s.jsxs("div",{style:{fontSize:"11px",padding:"1rem"},children:[s.jsx("span",{children:"Volume (ETH)"}),s.jsxs(Q,{width:I?300:600,height:200,data:i==null?void 0:i.priceHistory,children:[s.jsx(Z,{type:"monotone",dataKey:"price",stroke:"#8884d8"}),s.jsx(D,{dataKey:"soldTime"}),s.jsx(k,{}),s.jsx(ss,{})]})]})]}),s.jsxs(es,{children:[s.jsx("h3",{children:"Description"}),s.jsxs(a,{style:{height:"100px",overflow:"auto"},children:[s.jsxs("div",{style:{color:"#8a939b"},children:["By ",s.jsxs("span",{children:[e==null?void 0:e.name,"Deployer"]})]}),s.jsx("div",{children:e==null?void 0:e.description})]})]})]})})]})})})}export{os as default};