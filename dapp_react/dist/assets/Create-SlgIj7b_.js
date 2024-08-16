import{y as I,p as a,j as t,z as Z,A as L,r as X,L as z}from"./index-V15z69l1.js";import{o as H}from"./opensea-symbol-SJZpPOAz.js";function $(n){let{swiper:e,extendParams:G,on:d,emit:l,params:c}=n;e.autoplay={running:!1,paused:!1,timeLeft:0},G({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let f,b,j=c&&c.autoplay?c.autoplay.delay:3e3,A=c&&c.autoplay?c.autoplay.delay:3e3,r,g=new Date().getTime(),S,v,m,U,E,p,T;function O(i){!e||e.destroyed||!e.wrapperEl||i.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",O),!T&&u())}const M=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?S=!0:S&&(A=r,S=!1);const i=e.autoplay.paused?r:g+A-new Date().getTime();e.autoplay.timeLeft=i,l("autoplayTimeLeft",i,i/j),b=requestAnimationFrame(()=>{M()})},J=()=>{let i;return e.virtual&&e.params.virtual.enabled?i=e.slides.filter(s=>s.classList.contains("swiper-slide-active"))[0]:i=e.slides[e.activeIndex],i?parseInt(i.getAttribute("data-swiper-autoplay"),10):void 0},w=i=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(b),M();let o=typeof i>"u"?e.params.autoplay.delay:i;j=e.params.autoplay.delay,A=e.params.autoplay.delay;const s=J();!Number.isNaN(s)&&s>0&&typeof i>"u"&&(o=s,j=s,A=s),r=o;const x=e.params.speed,W=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(x,!0,!0),l("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,x,!0,!0),l("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(x,!0,!0),l("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,x,!0,!0),l("autoplay")),e.params.cssMode&&(g=new Date().getTime(),requestAnimationFrame(()=>{w()})))};return o>0?(clearTimeout(f),f=setTimeout(()=>{W()},o)):requestAnimationFrame(()=>{W()}),o},N=()=>{g=new Date().getTime(),e.autoplay.running=!0,w(),l("autoplayStart")},h=()=>{e.autoplay.running=!1,clearTimeout(f),cancelAnimationFrame(b),l("autoplayStop")},y=(i,o)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(f),i||(p=!0);const s=()=>{l("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",O):u()};if(e.autoplay.paused=!0,o){E&&(r=e.params.autoplay.delay),E=!1,s();return}r=(r||e.params.autoplay.delay)-(new Date().getTime()-g),!(e.isEnd&&r<0&&!e.params.loop)&&(r<0&&(r=0),s())},u=()=>{e.isEnd&&r<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(g=new Date().getTime(),p?(p=!1,w(r)):w(),e.autoplay.paused=!1,l("autoplayResume"))},F=()=>{if(e.destroyed||!e.autoplay.running)return;const i=I();i.visibilityState==="hidden"&&(p=!0,y(!0)),i.visibilityState==="visible"&&u()},R=i=>{i.pointerType==="mouse"&&(p=!0,T=!0,!(e.animating||e.autoplay.paused)&&y(!0))},q=i=>{i.pointerType==="mouse"&&(T=!1,e.autoplay.paused&&u())},K=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",R),e.el.addEventListener("pointerleave",q))},Y=()=>{e.el.removeEventListener("pointerenter",R),e.el.removeEventListener("pointerleave",q)},Q=()=>{I().addEventListener("visibilitychange",F)},k=()=>{I().removeEventListener("visibilitychange",F)};d("init",()=>{e.params.autoplay.enabled&&(K(),Q(),N())}),d("destroy",()=>{Y(),k(),e.autoplay.running&&h()}),d("_freeModeStaticRelease",()=>{(m||p)&&u()}),d("_freeModeNoMomentumRelease",()=>{e.params.autoplay.disableOnInteraction?h():y(!0,!0)}),d("beforeTransitionStart",(i,o,s)=>{e.destroyed||!e.autoplay.running||(s||!e.params.autoplay.disableOnInteraction?y(!0,!0):h())}),d("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){h();return}v=!0,m=!1,p=!1,U=setTimeout(()=>{p=!0,m=!0,y(!0)},200)}}),d("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!v)){if(clearTimeout(U),clearTimeout(f),e.params.autoplay.disableOnInteraction){m=!1,v=!1;return}m&&e.params.cssMode&&u(),m=!1,v=!1}}),d("slideChange",()=>{e.destroyed||!e.autoplay.running||(E=!0)}),Object.assign(e.autoplay,{start:N,stop:h,pause:y,resume:u})}const _="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaUlEQVR4nO3YPUscURSA4Sex1TIgpAxaBgRrnTJbBFIHVpBUWsSfYWUj2Fu4bMiWKVLaJU1IF1DwBySVBoIGojuysIFhnf2Y/Z7kvHDKufe8nHvP3HsJgiAIgn+ULZyjiXRG0cQZqkWTr8ww6bRLvCgiUJ+DhNOOqBUROM18uGN27GbyaOU0lEBidiQhoHcF/naqSzSwXKYKVHI22ic8UhKBepdusaokArUuAivGRxJLSO9NXG3/6lub+H3ZNvE0SEJAVOABT3CEb/iKfSwqyRJax4+c1nuBZ/MusImfPY7L37E2LYHnOMZnvMNGn/Fe4WaAM/9Vx1gTEdjDn5zJD/A4Z6xt3Ba4uFzj5SQEFnDYZ/KPWMqM8xZ3Q9y+bvFmnAKtLvFhwMm/4Gm7u6QjXugb4xB43W53RSb/NWLyaU4MLfB7AslMVSCdkzgNASWqQG0OlkzaESf/1dNi9rZVysfdIAiCIFAG7gHlioJDCAbUjQAAAABJRU5ErkJggg==",ee="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVR4nO3YQQ6CMBCF4bcqd1I8nxDPWa5RQ1IWNqmjU2iC/l/CTt+k8BJxJADfGiQ9JC2SkvNavztLCh1yq+aGQeU1dcit2u7YRX5jzogdcqu2U7cqc47KreIgBZ6IgWp5US0D1fKiWgaq5UW1DP9XrSV/8Now7PbmNX7v3Kppxz9A9w65VSEPjQ2DYh4WOuTiNAa2KGKL8qmRLcqZf9nTr7yiJA7yiidioFpeVMtAtbyoloFqnbZaC1sUsUVJbFEAHeoJqYIgBzyCxe8AAAAASUVORK5CYII=",te="/assets/create-main-image-82GoU2yE.png",ie="/assets/create-main-image2-A3CIUZsK.png",ae="/assets/create-main-image3-CR_qoMgO.png",ne=()=>t.jsx(se,{children:t.jsxs(Z,{modules:[$],slidesPerView:1,speed:1e3,autoplay:{delay:3e3,disableOnInteraction:!1},loop:!0,style:{height:"100%"},children:[t.jsx(L,{children:t.jsx(C,{children:t.jsx("img",{src:te,alt:"create-slider"})})}),t.jsx(L,{children:t.jsx(C,{children:t.jsx("img",{src:ie,alt:"create-slider"})})}),t.jsx(L,{children:t.jsx(C,{children:t.jsx("img",{src:ae,alt:"create-slider"})})})]})}),C=a.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,se=a.div`
  width: 100%;
  height: calc(100vh - 100px);
`;a.div`
  width: 858px;
  height: 130px;
  margin: 0 auto;
`;function he(){return X.useEffect(()=>{window.scrollTo(0,0)},[]),t.jsx(me,{children:t.jsx(ye,{children:t.jsxs("div",{style:{display:"flex"},children:[t.jsxs(re,{children:[t.jsx(de,{children:t.jsxs(D,{children:[t.jsx("div",{children:t.jsx(B,{children:t.jsx("img",{src:H,alt:"openseaSymbol"})})}),t.jsx("h1",{children:"Create"})]})}),t.jsx("div",{style:{width:"100%"},children:t.jsx(z,{to:"/create-mint-nft",children:t.jsx(oe,{children:t.jsxs("div",{style:{display:"flex"},children:[t.jsxs(pe,{children:[t.jsxs(ce,{children:[t.jsx("div",{children:t.jsx(B,{style:{width:"25px"},children:t.jsx("img",{src:_,alt:"openseaSymbol"})})}),t.jsx("h2",{children:"NFT mint 하기"})]}),t.jsx("p",{children:"이미지 파일만 있으면 누구나 NFT를 만들 수 있습니다"})]}),t.jsx("div",{style:{width:"6%",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"24px"},children:">"})]})})})}),t.jsx("div",{style:{width:"100%"},children:t.jsx(z,{to:"/create-collection/step-1",children:t.jsx(P,{children:t.jsxs("div",{style:{display:"flex"},children:[t.jsxs(V,{children:[t.jsxs(ue,{children:[t.jsx("div",{children:t.jsx(B,{style:{width:"20px"},children:t.jsx("img",{src:ee,alt:"openseaSymbol"})})}),t.jsx("h2",{children:"Collection 드롭"})]}),t.jsx("p",{children:"컬렉션 NFT를 생성하고 에어드랍 하세요"})]}),t.jsx("div",{style:{width:"6%",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"24px"},children:">"})]})})})})]}),t.jsx(le,{children:t.jsx(ne,{})})]})})})}const B=a.div`
  /* width: 20px;
  height: 20px; */
  /* padding: 12px; */
  img {
    width: 100%;
    height: 100%;
  }
`,re=a.div`
  /* div style={{ width: '50%', paddingRight: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} */
  width: 50%;
  padding-right: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: ${({theme:n})=>n.size.mobile}) {
    width: 100%;
    padding: 0;
  }
`,le=a.div`
  width: 50%;
  height: 100%;
  @media (max-width: ${({theme:n})=>n.size.mobile}) {
    display: none;
  }
`,P=a.div`
  /* style={{ border: '1px solid #dedede', borderRadius: '20px', padding: '24px 32px 24px 24px' }} */
  /* border: 1px solid #dedede; */
  border-radius: 20px;
  padding: 24px 32px 24px 24px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
  &:hover {
    background-color: #f8f8f8;
  }
`,oe=a(P)``,de=a.div`
  width: 100%;
  padding: 7rem 0.5rem 0rem 1.5rem;
  margin-bottom: 1rem;
  @media (max-width: ${({theme:n})=>n.size.mobile}) {
    padding: 1rem 0 0 0;
  }
`,V=a.div`
  /* div style={{ width: '94%' }} */
  width: 94%;
  p {
    display: block;
  }
  @media (max-width: ${({theme:n})=>n.size.mobile}) {
    p {
      display: none;
    }
  }
`,pe=a(V)``,D=a.div`
  ${n=>n.theme.variables.flexGap("row","1rem")};
  align-items: end;
  h1 {
    font-size: 48px;
    font-weight: 700;
  }
`,ue=a(D)`
  /* align-items: baseline; */
  align-items: center;
  padding: 0.5rem 4px;
  gap: 10px;
`,ce=a(D)`
  /* align-items: flex-start; */
  align-items: center;
  padding: 0.5rem 0px;
  gap: 10px;
`,me=a.div`
  /* height: 100%; */
  padding-top: 100px;
  width: 100%;
  background-color: #ffffff;
  background-size: cover;
`,ye=a.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  padding: 0 0 0 30px;
  margin-bottom: 0;
  @media (max-width: ${({theme:n})=>n.size.mobile}) {
    padding: 0 1rem;
    min-height: 50vh;
  }
`;export{he as default};
