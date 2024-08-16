import{u as Q,n as Y,r as w,G as Z,b as q,j as e,L as V,Y as R,p as i,Z as X,a2 as ee,a0 as te,a3 as se,a4 as ne,a5 as ie,M as ae,a6 as oe,a7 as re,a8 as le,Q as S}from"./index-V15z69l1.js";import{o as ce}from"./opensea-symbol-SJZpPOAz.js";function De(){const l=Q(),{handleWithLoading:T}=Y(),{collection:s,setCollection:r,resetCollection:k,account:o,signer:p}=w.useContext(Z),{files:c,setFiles:J}=q(),N=()=>{k(),J(null)},P=t=>{const a=new Date().toISOString().split("T")[0];return t===a?600:new Date(`${t}T23:59:59+09:00`).getTime()-Date.now()},A=async()=>{await T(()=>B(),"Collection을 생성하는 중입니다")&&(N(),(await X("Collection 발행 성공","MyPage로 확인하러 가기")).isConfirmed&&l(`/mypage/${o}`))},B=async()=>{try{if(!ee(o,s)||!p)return;const n=s.preReleaseJsonData.file;if(!n)return;const a=await te(n);let d=[""],x=s.nfts.map(f=>f.name),j=[{}];c.forEach(async(f,U)=>{const C=f.name;d.push(C);const G={name:s.nfts[U].name,fileName:C,owner:o,isCollection:String(!0),nftPrice:s.perPrice,numberOfSales:0,priceHistory:JSON.stringify([]),tags:s.tags.join("")};j.push(G)});const $=JSON.stringify({name:s.name,keyvalues:{owner:o,nftKeyvaluesList:JSON.stringify(j),isCollection:String(!0),numberOfSales:0,tags:s.tags.join(""),isHide:String(!0)}}),E={name:s.name,description:s.preReleaseJsonData.description,image:a},h=await se(a,$,E);if(!h)return;const _=JSON.stringify({name:s.name,keyvalues:{owner:o}}),v=await ne(c,_);if(!v)return;const z=P(s.startAt);if(!(await ie(p,x,d,v,h,z)).status)return;const u=await ae.methods.getCollectionData(o,h).call();if(console.log("getCollectionResult: ",u),!(await oe(h,u.ids)).ok)return;const b=u.ids;return!(await re(p,b)).status||!(await le(p,b,s.perPrice)).status?null:!0}catch(t){return console.error(t),!1}},F=t=>{r(n=>({...n,perPrice:parseFloat(t.target.value)}))},O=t=>{const n=t.target.value,d=new Date().toISOString().split("T")[0];n===d?S.fire("Air drop","Collection 발행 뒤 10분 후 부터 에어드랍이 가능합니다"):S.fire("Air drop",`${n} AM 00:00 부터 에어드랍이 가능합니다`),r(x=>({...x,startAt:n}))},L=t=>{r(n=>({...n,preReleaseJsonData:{...n.preReleaseJsonData,description:t.target.value}}))},H=t=>{r(n=>({...n,name:t.target.value}))},M=async t=>{if(!t.target.files)return;const n=t.target.files[0];r(a=>({...a,preReleaseJsonData:{...a.preReleaseJsonData,file:n}}))},g=w.useRef(null),W=()=>{g.current&&g.current.click()},K=()=>{r(t=>({...t,preReleaseJsonData:{...t.preReleaseJsonData,file:null}}))};return e.jsxs(ye,{children:[e.jsxs("div",{style:{marginBottom:"20px"},children:["NFT 총 수량 ",c==null?void 0:c.length,"개"]}),e.jsx(m,{children:"Collection Name"}),e.jsx(y,{type:"text",onChange:H,value:s.name}),e.jsx(m,{children:"NFT당 가격 (단위: ETH *일괄 적용됩니다)"}),e.jsx(y,{type:"number",onChange:F,placeholder:"ex) 0.1",value:s.perPrice}),e.jsx(m,{children:"Air drop 시작 날짜 및 시간"}),e.jsx(y,{type:"date",onChange:O,value:s.startAt}),e.jsxs("div",{children:[e.jsx("h2",{style:{marginBottom:"10px"},children:"사전 공개"}),e.jsxs(ue,{children:[e.jsxs(pe,{children:[e.jsxs("div",{style:{marginBottom:"10px"},children:["컬렉션의 각 NFT에는 최종 자산을 업로드하고 ",e.jsx("br",{}),"공개할 때까지 사전 공개 미디어가 표시됩니다"]}),e.jsx("div",{style:{marginBottom:"10px",color:"blue",cursor:"pointer"},children:"더 알아보기"}),e.jsx(m,{children:"사전 공개 설명"}),e.jsx(je,{placeholder:"Bycl monkey is Comming soon!",onChange:L,value:s.preReleaseJsonData.description})]}),e.jsxs(fe,{children:[e.jsx("div",{style:{height:"150px"},children:e.jsx("div",{style:{height:"100%",backgroundColor:"#f3f4f6",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:W,children:s.preReleaseJsonData.file?e.jsxs(xe,{children:[e.jsx("img",{src:URL.createObjectURL(s.preReleaseJsonData.file),alt:"preview"}),e.jsx(he,{children:e.jsx(me,{onClick:K,children:"x"})})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"20px",height:"20px",fontSize:"20px"},children:"+"}),e.jsx("input",{ref:g,type:"file",style:{display:"none"},onChange:M})]})})}),e.jsx("div",{style:{height:"52px",padding:"1rem"},children:"myCollection"})]})]})]}),e.jsx("h2",{style:{marginBottom:"10px"},children:"수익에 대해"}),e.jsx("p",{style:{marginBottom:"10px"},children:"OpenSea는 기본 판매에 대해 5%의 수수료를 받습니다."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",marginBottom:"10px"},children:[e.jsxs("div",{style:{display:"flex",gap:"5px"},children:[e.jsx(ge,{style:{width:"80%",marginBottom:"5px"},children:o}),e.jsxs(D,{children:[e.jsx("div",{children:"95"}),e.jsx("div",{children:"%"})]})]}),e.jsxs("div",{style:{display:"flex",gap:"5px"},children:[e.jsxs(I,{children:[e.jsx(de,{children:e.jsx("img",{src:ce,alt:"openseaSymbol"})}),e.jsx("div",{children:"오픈씨"})]}),e.jsxs(D,{children:[e.jsx("div",{children:"5"}),e.jsx("div",{children:"%"})]})]})]}),e.jsx("div",{children:e.jsxs("div",{style:{display:"flex",gap:"10px"},children:[e.jsx("div",{children:e.jsx(V,{to:"/create-collection/step-1",children:e.jsx(R,{children:"이전"})})}),e.jsx("div",{style:{padding:"4px 0px"},children:e.jsx("div",{style:{height:"100%",borderRight:"1px solid gray"}})}),e.jsx("div",{children:e.jsx(R,{onClick:A,children:"저장"})})]})})]})}const de=i.div`
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`,pe=i.div`
  width: 67%;
  @media (max-width: ${({theme:l})=>l.size.mobile}) {
    width: 100%;
  }
`,xe=i.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 425px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.75rem;
  }
`,he=i.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`,me=i.button`
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  &:hover {
    color: #cccccc;
  }
`,I=i.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 80%;
  padding: 12px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(18, 18, 18, 0.12);
  background-color: rgb(242, 244, 245);
`,ge=i(I)``,D=i.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  height: 48px;
  background-color: rgb(242, 244, 245);
  border-radius: 12px;
  border: 1px solid rgba(18, 18, 18, 0.12);
`,ue=i.div`
  display: flex;
  gap: 2rem;
  @media (max-width: ${({theme:l})=>l.size.mobile}) {
    flex-direction: column;
    margin-bottom: 2rem;
    gap: 0;
  }
`,fe=i.div`
  width: 30%;
  min-width: 160px;
  height: 202px;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out 0s;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
`,y=i.input`
  width: 100%;
  padding: 12px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(18, 18, 18, 0.12);
  margin-bottom: 1rem;
  /* background-color: rgb(242, 244, 245); */
`,ye=i.div``,m=i.div`
  margin-bottom: 0.75rem;
`,je=i.textarea`
  width: 100%;
  height: 100px;
  padding: 0.75rem;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 5px;
  margin-bottom: 1rem;
`;export{De as default};
