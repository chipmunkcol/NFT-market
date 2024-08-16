import{p as o,r,G as B,l as W,n as J,j as e,B as I,C as Q,M as C,P as z,D as T,L as P,O as E,E as R}from"./index-hHL9QwoV.js";const G="data:image/png;base64,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";function Z({collection:t,account:u}){const{startAt:p,tempTokenUrl:d,ids:x}=t,{signer:A}=r.useContext(B),v=W(d),{handleWithLoading:w}=J(),{name:b,description:j,image:y}=v,[i,c]=r.useState(""),[h,s]=r.useState(parseInt(p)-Math.floor(Date.now()/1e3));r.useEffect(()=>{const a=setInterval(()=>{const g=Math.floor(Date.now()/1e3),n=parseInt(p)-g;s(n);const l=Math.floor(n/(3600*24)),M=Math.floor(n%(3600*24)/3600),N=Math.floor(n%3600/60),S=Math.floor(n%60);c(`${l}일 ${M}시간 ${N}분 ${S}초`)},1e3);return()=>clearInterval(a)},[p]);const m=async()=>{await w(()=>k(),"에어드랍 중입니다")&&(I("에어드랍 성공"),window.location.reload())},k=async()=>{try{const a=await Q(A,d);console.log("airdropResult: ",a);const g=await C.methods.getTokenUrl(parseInt(x[0])).call(),n=await z(d,g);console.log("updateMetadataResult: ",n);const l=await T(d,u);if(console.log("removeMetadataResult: ",l),l.ok)return!0}catch(a){return console.error("airdropHandler error: ",a),!1}};return e.jsxs("li",{style:{display:"flex",gap:"10px"},children:[e.jsx("div",{children:e.jsx("img",{src:y,alt:"collection",style:{width:"100px",height:"100px",objectFit:"cover"}})}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"5px"},children:b}),e.jsx("p",{style:{marginBottom:"15px"},children:j}),h>1?e.jsxs(q,{children:["Air drop: ",i]}):e.jsx(L,{onClick:m,children:e.jsx("button",{children:"Air drop"})})]})]},`air-drop-${t.tempTokenUrl}`)}const q=o.div`
  color: #2081e2;
`,L=o.div`
  button {
    background: #2081e2;
    border-radius: 10px;
    color: #ffffff;
    padding: 10px 10px;
    font-weight: 700;
  }
`,ie=()=>{const{account:t,setMyNfts:u}=r.useContext(B),p=i=>R.utils.fromWei(i,"ether"),d=async()=>{if(t)try{const i=await C.methods.getMyNfts(t).call();if(!i)return;const c=[];i.map(h=>{const{nftId:s,nftName:m,tokenUrl:k,nftPrice:a,tempTokenUrl:g,fileName:n}=h,l=parseInt(s.toString()),M=Number(p(a));c.push({nftId:l,nftName:m,tokenUrl:k,nftPrice:M,collectionIpfs:g,fileName:n})}),u(c),console.log("newMyNfts: ",c)}catch(i){console.log(i)}},[x,A]=r.useState([]),v=async()=>{if(t)try{const h=(await C.methods.getMyCollections(t).call()).filter(s=>s.isReveal===!1).map(s=>({...s,ids:s.ids.map(m=>parseInt(m.toString()))}));A(h)}catch(i){console.log(i)}};async function w(){await d(),await v()}r.useEffect(()=>{w()},[t]);const[b,j]=r.useState(null);r.useEffect(()=>{t&&j(`${t==null?void 0:t.substring(0,6)}...${t==null?void 0:t.substring((t==null?void 0:t.length)-4)}`)},[t]);const y=async()=>{t&&(await navigator.clipboard.writeText(t),I("Copied to clipboard"))};return e.jsx(ee,{children:e.jsxs(te,{children:[e.jsxs(V,{children:[e.jsx(F,{}),e.jsx(H,{children:e.jsx("img",{src:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",alt:"profile"})}),e.jsxs(O,{children:[e.jsx("h1",{children:"name"}),e.jsxs($,{children:[e.jsx(_,{children:e.jsx(D,{children:e.jsx("img",{src:G,alt:"ether-icon"})})}),e.jsx("p",{onClick:y,style:{cursor:"pointer"},children:b})]})]})]}),e.jsxs(K,{children:[e.jsx("div",{style:{position:"absolute",top:"0px",width:"calc(100% - 2rem)",height:"1px",borderBottom:"1px solid #cccccc"}}),e.jsxs("div",{style:{display:"flex"},children:[e.jsx(f,{children:"Air drop"}),e.jsx("div",{style:{width:"100%"},children:e.jsx("ul",{style:{padding:"0 7rem"},children:x.length>0&&x.map(i=>e.jsx(Z,{collection:i,account:t}))})})]}),e.jsx("div",{style:{position:"absolute",bottom:"0px",width:"calc(100% - 2rem)",height:"1px",borderBottom:"1px solid #cccccc"}})]}),e.jsxs(X,{children:[e.jsxs(Y,{children:[e.jsx("div",{children:e.jsx(P,{to:"",children:e.jsx(f,{children:"All"})})}),e.jsx("div",{children:e.jsx(P,{to:"non-sale",children:e.jsx(f,{children:"Non sale"})})}),e.jsx("div",{children:e.jsx(P,{to:"on-sale",children:e.jsx(f,{children:"On sale"})})})]}),e.jsx(U,{children:e.jsx(E,{})})]})]})})},D=o.div`
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`,K=o.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  min-height: 100px;
  gap: 30px;
  margin-top: 20px;
  @media (max-width: ${({theme:t})=>t.size.mobile}) {
    padding: 1rem 1rem;
  }
`,X=o.div`
  /* $justifyContent={'space-between'} style={{ padding: '1rem 2rem', maxHeight:'500px' }} */
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-height: 500px;
  @media (max-width: ${({theme:t})=>t.size.mobile}) {
    flex-direction: column;
    padding: 1rem 0rem;
  }
`,f=o.button`
  padding: 12px 24px;
  display: inline-block;
  border-radius: 0.75rem;
  min-width: 180px;

  &:hover {
    background-color: rgba(18, 18, 18, 0.04);
    /* border: 1px solid #f6f6f6; */
  }
`,Y=o.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,U=o.div`
  width: 80%;
  overflow-y: auto;
  @media (max-width: ${({theme:t})=>t.size.mobile}) {
    width: 100%;
  }
`,V=o.div`
  position: relative;
  width: 100%;
`,F=o.div`
  width: 100%;
  height: 320px;
  background-color: #f5f5f5;
  margin-bottom: 50px;
`,H=o.div`
  position: absolute;
  top: 180px;
  left: 2rem;
  /* transform: translateX(-50%); */
  width: 168px;
  height: 168px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,O=o.div`
  padding: 0 50px 0 2rem;
  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    font-weight: 400;
  }
  @media (max-width: ${({theme:t})=>t.size.mobile}) {
    padding: 0 1rem;
  }
`,$=o.div`
  display: flex;
  /* align-items: center; */
  justify-content: ${t=>t.$justifyContent?t.$justifyContent:""};
`,_=o.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  /* background-color: #f5f5f5; */
  margin-right: 10px;
  /* i {
    width: 100%;
    height: 100%;
    background-color: #000;
    border-radius: 50%;
  } */
`,ee=o.div`
  /* height: 100%; */
  padding-top: 72px;
  width: 100%;
  background-color: #ffffff;
  background-size: cover;
`,te=o.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  /* padding: 0 50px 0 30px; */
`;export{ie as default};
