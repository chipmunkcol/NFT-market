import{r as u,G as j,j as t,L as b,Y as f,p as o}from"./index-V15z69l1.js";function I(){var x,c;const{collection:s,setCollection:a,collectionIndex:i}=u.useContext(j),p=e=>{a(n=>({...n,nfts:n.nfts.map((r,d)=>d===i?{...r,name:e.target.value}:r)}))},g=e=>{a(n=>({...n,nfts:n.nfts.map((r,d)=>d===i?{...r,description:e.target.value}:r)}))},h=e=>{const n=e.target.value;s.tags.includes(n)||a(r=>({...r,tags:[...r.tags,n]}))},m=e=>{a(n=>({...n,tags:n.tags.filter(r=>r!==e)}))};return t.jsxs(C,{children:[t.jsxs("div",{style:{marginBottom:"20px"},children:[t.jsxs("h2",{children:["No. #",i+1," "]}),t.jsxs("h3",{children:["총 수량 ",s.nfts.length," 개"]})]}),t.jsx(l,{children:"이름 *"}),t.jsx(v,{type:"text",value:(x=s.nfts[i])==null?void 0:x.name,onChange:p}),t.jsx(l,{children:"설명"}),t.jsx(B,{value:(c=s.nfts[i])==null?void 0:c.description,onChange:g}),t.jsx(l,{children:"태그"}),t.jsx("p",{style:{fontSize:"14px",marginBottom:"0.75rem"},children:"태그는 아이템의 속성을 설명합니다. 컬렉션 페이지 내에 필터로 표시되며 아이템 페이지에도 나열됩니다."}),t.jsxs("select",{style:{marginBottom:"5px"},onChange:h,children:[t.jsx("option",{style:{display:"none"},children:"ex"}),t.jsx("option",{children:"예술"}),t.jsx("option",{children:"유명인"}),t.jsx("option",{children:"게임"}),t.jsx("option",{children:"음악"}),t.jsx("option",{children:"가상자산"}),t.jsx("option",{children:"프로필 사진"})]}),t.jsx(T,{children:s.tags.map(e=>t.jsxs(y,{children:[e,t.jsx("span",{onClick:()=>m(e),children:"X"})]}))}),t.jsx(b,{to:"/create-collection/step-2",children:t.jsx(f,{children:"다음"})})]})}const C=o.div``,v=o.input`
  width: 100%;
  height: 48px;
  padding: 0.75rem;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 5px;
  margin-bottom: 1rem;
`,y=o.div`
  background-color: darkgray;
  color: white;
  border-radius: 40px;
  padding: 4px 9px;
  font-size: 11px;
  margin-right: 5px;

  span {
    margin-left: 5px;
    cursor: pointer;
  }
`,T=o.div`
  height: 30px;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 20px;
`,l=o.div`
  margin-bottom: 0.75rem;
`,B=o.textarea`
  width: 100%;
  height: 80px;
  padding: 0.75rem;
  border: 1px solid rgba(18, 18, 18, 0.32);
  border-radius: 5px;
  margin-bottom: 1rem;
`;export{I as default};
