import{j as e,H as E,u as L,r as s,a as I,L as g,c as l,O as R,p as t}from"./index-yFNPE8sD.js";const M="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaUlEQVR4nO2Wz0pCQRjFf2i6ydop9ArZO1T7FhrlK0TSH+spxNcw61GCaJMFJZn71rqolfHBufBtwjtzLxLkgYELM+ecud98cxhY4Q+hDLSAW+ANmGnY90BztiZXHAIfwHzBGAPNPAwLQM8JPwEXwDawrlEHLoGhW9cVNxo9CX0BJwvEbO5UaxPz6PLOJbQbwNtz5o1Q07I7U/vTULTFfQdKIcSWO9OYsyoCz9I4CiHeiXROPDrSuAkhjUSy7o1FXRp2z1NjKlIlg/GGNKbLNt6MMR7lUOod19mpMRDJEikW19Lox1ynYYbr9CKN49AAGYtoMRiKM3EnwFooueki02IwLfaBb3EPiETXmbdVwt9Q1J8mpp9ANda44MznisGOwqGiYd175c40MU3W18iAhq7FoofAROWtuqzObF5S4Fv2vioYZtpQX93rG6mWp3koqu5lYpvd4r+Y11zZH5ZpnJg/AvfLNl4Bww/dcoIlpDH7/gAAAABJRU5ErkJggg==",N="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAT0lEQVR4nO2WMQoAIAzE7pH5/1fq4uSgi6hgAt06HLQ1JtIB6mRlBAPw2AiyYHs/BsAR4BLWU2fI7YcIA6AL5igj1DF+SNAFpYzYqeP8SgPIChXtIomEfAAAAABJRU5ErkJggg==",T="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApElEQVR4nO2XQQ4CIQxFu/JQegv+40oy3nP0GmPQmZ1gYiA4mf6EVQn/0dKkmLlWxRhPkm7AA1haLkl3YMoeVhIwtTb+AJKKAHpT5k3nAuDrkMoFivEQwmXLRC0Dy68GLeLmAHgJ6NuC+wGwQXFzALwE/MkjZHQbMhrABsXNATh8CbQOpXmA7DiUzsVHKCn1bkFJ128fk7RlorHxnM2rHxPXYfUE4Am1d086Qd8AAAAASUVORK5CYII=",Y="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAUklEQVR4nGNgGAWDAtTX1zMFBwfHgDADAwMj1S0IDg6OCQkJ+Q/F0TBxJDGSMX0tYGBgYAQZHBoaGkWTIBr6oH40FYWMpiJKwWgqChlNRSMbAAD80+6fOrgS8gAAAABJRU5ErkJggg==";function S(){return e.jsxs(E,{children:[e.jsx("title",{children:"NFT Marketplace"}),e.jsx("meta",{name:"description",content:"다양한 NFT 및 컬렉션을 탐색하고 검색하세요."}),e.jsx("meta",{name:"keywords",content:"NFT, 컬렉션, 암호화폐, 예술, 게임"}),e.jsx("meta",{property:"og:title",content:"MarketPlace"}),e.jsx("meta",{property:"og:description",content:"다양한 NFT 및 컬렉션을 탐색하고 검색하세요."}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:image",content:"https://opensea.io/static/images/logos/opensea-logo.svg?react"}),e.jsx("meta",{property:"og:url",content:"https://dztwi6z9vov5x.cloudfront.net/"})]})}const te=()=>{const i=L(),r=s.useRef(""),c=I().pathname.includes("nft"),u=o=>{r.current=o.target.value},x=Number(localStorage.getItem("grid")),[n,w]=s.useState(x||5),[b,j]=s.useState({grid:n,gridTemplateColumns:"repeat(5, 1fr)",gap:"10px",cardWidth:"193px",fontSize:"14px"}),k=()=>{localStorage.setItem("grid","5"),w(5)};s.useEffect(()=>{j({grid:n,gridTemplateColumns:`repeat(${n}, 1fr)`,gap:n===5?"10px":"5px",cardWidth:n===5?"193px":"123px",fontSize:n===5?"14px":"12px"})},[n]);const h=async()=>{r.current===""&&c?i("/market-place/nft"):r.current===""&&!c?i("/market-place/collection"):i(c?`/market-place/nft?query=${r.current}`:`/market-place/collection?query=${r.current}`)},y=o=>{o.key==="Enter"&&h()},v=o=>{var d;const a=(d=o.currentTarget)==null?void 0:d.innerHTML;i(`?category=${a}`)},C=o=>{var d;const a=(d=o.currentTarget)==null?void 0:d.innerHTML;i(`/market-place/collection?query=${a}`)},[B,z]=s.useState(0);return e.jsxs(e.Fragment,{children:[e.jsx(S,{}),e.jsx(V,{children:e.jsxs(_,{children:[e.jsxs(O,{children:[e.jsxs(Q,{children:[e.jsx("h1",{children:"MarketPlace"}),e.jsx("div",{children:e.jsx(g,{to:"nft",children:e.jsx(f,{style:{color:c?"#007bff":"black"},children:"NFT"})})}),e.jsx("div",{children:e.jsx(g,{to:"collection",children:e.jsx(f,{style:{color:c?"black":"#007bff"},children:"COLLECTION"})})})]}),e.jsx("div",{style:{padding:"10px 0"},children:e.jsxs(K,{children:[e.jsxs(J,{children:["결과 ",B,"개"]}),e.jsxs(W,{children:[e.jsx($,{type:"text",placeholder:"이름 또는 태그로 검색",onChange:u,onKeyDown:y}),e.jsx(X,{onClick:h,children:e.jsx(F,{children:e.jsx("img",{src:M,alt:"find-icon"})})})]}),e.jsx(H,{children:e.jsxs(U,{onClick:l,children:[e.jsx("option",{value:"updated",children:"최신순"}),e.jsx("option",{value:"row",children:"낮은 가격순"}),e.jsx("option",{value:"high",children:"높은 가격순"})]})}),e.jsxs(P,{children:[e.jsx(p,{style:{borderTopLeftRadius:"0.75rem",borderBottomLeftRadius:"0.75rem"},children:e.jsx(A,{onClick:l,$iconPath:Y})}),e.jsx(p,{onClick:k,children:e.jsx(A,{$iconPath:N})}),e.jsx(p,{onClick:l,style:{borderTopRightRadius:"0.75rem",borderBottomRightRadius:"0.75rem"},children:e.jsx(A,{$iconPath:T})})]})]})})]}),e.jsx("div",{style:{paddingTop:"130px"},children:e.jsxs(D,{children:[e.jsx(q,{children:e.jsxs(G,{children:[e.jsx("div",{children:e.jsxs("ul",{children:[e.jsx("h3",{children:"카테고리"}),["예술","유명인","게임","음악","가상자산","프로필 사진"].map(o=>e.jsx("li",{children:e.jsx(m,{onClick:v,children:o})},`category-${o}`))]})}),e.jsx("div",{children:e.jsxs("ul",{children:[e.jsx("h3",{children:"컬렉션"}),["pudge penguin","fake funks"].map(o=>e.jsx("li",{children:e.jsx(m,{onClick:C,children:o})},`category-collection-${o}`))]})})]})}),e.jsx(Z,{children:e.jsx(R,{context:[b,z]})})]})})]})})]})},F=t.div`
  width: 24px;
  height: 24px;
  img {
    width: 100%;
    height: 100%;
  }
`,H=t.div`
  width: 240px;
  height: 48px;
  display: block;
  @media (max-width: ${({theme:i})=>i.size.mobile}) {
    display: none;
  }
`,m=t.button`
  padding: 12px 24px;
  display: inline-block;
  border-radius: 0.75rem;
  min-width: 180px;
  font-weight: 700;

  &:hover {
    background-color: rgba(18, 18, 18, 0.04);
    /* border: 1px solid #f6f6f6; */
  }
  @media (max-width: ${({theme:i})=>i.size.mobile}) {
    min-width: 100px;
  }
`,f=t.span`
  /* margin-left: 50px; */
  /* padding: 12px 24px; */
  display: inline-block;
  /* min-width: 180px; */
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #2081e2cc;
  }
`,Q=t.div`
  /* div style={{ display: 'flex', alignItems: 'end', gap: '50px', padding: '10px 0 20px 0', borderBottom: '1px solid #cccccc' }} */
  display: flex;
  align-items: end;
  gap: 50px;
  padding: 10px 0 20px 0;
  border-bottom: 1px solid #cccccc;
  @media (max-width: ${({theme:i})=>i.size.mobile}) {
    gap: 20px;
  }
`,G=t.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  li {
    font-size: 16px;
    cursor: pointer;
    &:hover {
      color: #007bff;
    }
  }
`,O=t.div`
  width: 95%;
  position: fixed;
  background-color: white;
  z-index: 1;
  @media (max-width: ${({theme:i})=>i.size.mobile}) {
    width: 92%;
    h1 {
      font-size: 24px;
    }
  }
`,P=t.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.125rem;
  height: 48px;
  padding: 0.125rem;
  background-color: #f8f8f8;
  border-radius: 0.75rem;
  @media (max-width: ${({theme:i})=>i.size.mobile}) {
    display: none;
  }
`,W=t.div`
  /* style={{ position: 'relative', width: '400px', height: '48px' }} */
  position: relative;
  height: 48px;
  width: 400px;
  @media (max-width: ${({theme:i})=>i.size.mobile}) {
    width: 68%;
  }
`,X=t.div`
  position: absolute;
  top: 25%;
  left: 0.75rem;
  cursor: pointer;
`,p=t.div`
  width: 44px;
  height: 44px;
  padding: 0 0.625rem;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  &:hover {
    background-color: #f8f8f8;
  }
  cursor: pointer;
`,A=t.div`
  background-image: url(${i=>i.$iconPath&&i.$iconPath});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
`,$=t.input`
  width: 100%;
  height: 100%;
  padding: 0.75rem 0.75rem 0.75rem 3rem;
  border-radius: 0.75rem;
  border: none;
  border: 1px solid #cccccc;
`,U=t.select`
  width: 100%;
  height: 100%;
  border: 1px solid #cccccc;
  border-radius: 0.75rem;
  padding: 0 0.75rem !important;
`,J=t.div`
  width: 77px;
  @media (max-width: ${({theme:i})=>i.size.mobile}) {
    font-size: 14px;
  }
`,K=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* @media (max-width: ${({theme:i})=>i.size.mobile}) {
    justify-content: normal;
  } */
`,D=t.div`
  display: flex;
  gap: 20px;
`,V=t.div`
  /* height: 100%; */
  padding-top: 72px;
  width: 100%;
  background-color: #ffffff;
`,q=t.div`
  /* width: 16%; */
  width: 175px;
  @media (max-width: ${({theme:i})=>i.size.mobile}) {
    width: auto;
  }
`,Z=t.div`
  /* width: 84%; */
  /* padding-left: 1rem; */
  text-align: center;
  width: calc(100% - 175px);
  padding-bottom: 1rem;
  @media (max-width: ${({theme:i})=>i.size.mobile}) {
    width: 100%;
  }
`,_=t.div`
  min-height: 100vh;
  overflow: hidden;
  color: black;

  padding: 0rem 2rem;
  @media (max-width: ${({theme:i})=>i.size.mobile}) {
    padding: 0rem 1rem;
  }
`;export{te as default};
