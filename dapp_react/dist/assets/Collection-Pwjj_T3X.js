import{F,H as V,I as C,y as $,J as U,K as P,N as L,p as y,r as M,G as H,j as l,z as B,A as D,O as q,Q as J}from"./index-NKWmM4Ap.js";import{F as _,H as G,e as X,a as Q,i as K}from"./MintNft-a34DPwBl.js";import"./index-PYMElNa_.js";function Y(p,e,w,d){return p.params.createElements&&Object.keys(d).forEach(g=>{if(!w[g]&&w.auto===!0){let v=F(p.el,`.${d[g]}`)[0];v||(v=V("div",d[g]),v.className=d[g],p.el.append(v)),w[g]=v,e[g]=v}}),w}function A(p){let{swiper:e,extendParams:w,on:d,emit:g}=p;w({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),e.navigation={nextEl:null,prevEl:null};function v(i){let a;return i&&typeof i=="string"&&e.isElement&&(a=e.el.querySelector(i),a)?a:(i&&(typeof i=="string"&&(a=[...document.querySelectorAll(i)]),e.params.uniqueNavElements&&typeof i=="string"&&a.length>1&&e.el.querySelectorAll(i).length===1&&(a=e.el.querySelector(i))),i&&!a?i:a)}function b(i,a){const r=e.params.navigation;i=C(i),i.forEach(n=>{n&&(n.classList[a?"add":"remove"](...r.disabledClass.split(" ")),n.tagName==="BUTTON"&&(n.disabled=a),e.params.watchOverflow&&e.enabled&&n.classList[e.isLocked?"add":"remove"](r.lockClass))})}function x(){const{nextEl:i,prevEl:a}=e.navigation;if(e.params.loop){b(a,!1),b(i,!1);return}b(a,e.isBeginning&&!e.params.rewind),b(i,e.isEnd&&!e.params.rewind)}function h(i){i.preventDefault(),!(e.isBeginning&&!e.params.loop&&!e.params.rewind)&&(e.slidePrev(),g("navigationPrev"))}function s(i){i.preventDefault(),!(e.isEnd&&!e.params.loop&&!e.params.rewind)&&(e.slideNext(),g("navigationNext"))}function t(){const i=e.params.navigation;if(e.params.navigation=Y(e,e.originalParams.navigation,e.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!(i.nextEl||i.prevEl))return;let a=v(i.nextEl),r=v(i.prevEl);Object.assign(e.navigation,{nextEl:a,prevEl:r}),a=C(a),r=C(r);const n=(f,o)=>{f&&f.addEventListener("click",o==="next"?s:h),!e.enabled&&f&&f.classList.add(...i.lockClass.split(" "))};a.forEach(f=>n(f,"next")),r.forEach(f=>n(f,"prev"))}function c(){let{nextEl:i,prevEl:a}=e.navigation;i=C(i),a=C(a);const r=(n,f)=>{n.removeEventListener("click",f==="next"?s:h),n.classList.remove(...e.params.navigation.disabledClass.split(" "))};i.forEach(n=>r(n,"next")),a.forEach(n=>r(n,"prev"))}d("init",()=>{e.params.navigation.enabled===!1?m():(t(),x())}),d("toEdge fromEdge lock unlock",()=>{x()}),d("destroy",()=>{c()}),d("enable disable",()=>{let{nextEl:i,prevEl:a}=e.navigation;if(i=C(i),a=C(a),e.enabled){x();return}[...i,...a].filter(r=>!!r).forEach(r=>r.classList.add(e.params.navigation.lockClass))}),d("click",(i,a)=>{let{nextEl:r,prevEl:n}=e.navigation;r=C(r),n=C(n);const f=a.target;if(e.params.navigation.hideOnClick&&!n.includes(f)&&!r.includes(f)){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===f||e.pagination.el.contains(f)))return;let o;r.length?o=r[0].classList.contains(e.params.navigation.hiddenClass):n.length&&(o=n[0].classList.contains(e.params.navigation.hiddenClass)),g(o===!0?"navigationShow":"navigationHide"),[...r,...n].filter(E=>!!E).forEach(E=>E.classList.toggle(e.params.navigation.hiddenClass))}});const u=()=>{e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")),t(),x()},m=()=>{e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")),c()};Object.assign(e.navigation,{enable:u,disable:m,update:x,init:t,destroy:c})}function N(p){let{swiper:e,extendParams:w,on:d}=p;w({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let g=!1,v=!1;e.thumbs={swiper:null};function b(){const s=e.thumbs.swiper;if(!s||s.destroyed)return;const t=s.clickedIndex,c=s.clickedSlide;if(c&&c.classList.contains(e.params.thumbs.slideThumbActiveClass)||typeof t>"u"||t===null)return;let u;s.params.loop?u=parseInt(s.clickedSlide.getAttribute("data-swiper-slide-index"),10):u=t,e.params.loop?e.slideToLoop(u):e.slideTo(u)}function x(){const{thumbs:s}=e.params;if(g)return!1;g=!0;const t=e.constructor;if(s.swiper instanceof t)e.thumbs.swiper=s.swiper,Object.assign(e.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(e.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper.update();else if(U(s.swiper)){const c=Object.assign({},s.swiper);Object.assign(c,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper=new t(c),v=!0}return e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass),e.thumbs.swiper.on("tap",b),!0}function h(s){const t=e.thumbs.swiper;if(!t||t.destroyed)return;const c=t.params.slidesPerView==="auto"?t.slidesPerViewDynamic():t.params.slidesPerView;let u=1;const m=e.params.thumbs.slideThumbActiveClass;if(e.params.slidesPerView>1&&!e.params.centeredSlides&&(u=e.params.slidesPerView),e.params.thumbs.multipleActiveThumbs||(u=1),u=Math.floor(u),t.slides.forEach(r=>r.classList.remove(m)),t.params.loop||t.params.virtual&&t.params.virtual.enabled)for(let r=0;r<u;r+=1)F(t.slidesEl,`[data-swiper-slide-index="${e.realIndex+r}"]`).forEach(n=>{n.classList.add(m)});else for(let r=0;r<u;r+=1)t.slides[e.realIndex+r]&&t.slides[e.realIndex+r].classList.add(m);const i=e.params.thumbs.autoScrollOffset,a=i&&!t.params.loop;if(e.realIndex!==t.realIndex||a){const r=t.activeIndex;let n,f;if(t.params.loop){const o=t.slides.filter(E=>E.getAttribute("data-swiper-slide-index")===`${e.realIndex}`)[0];n=t.slides.indexOf(o),f=e.activeIndex>e.previousIndex?"next":"prev"}else n=e.realIndex,f=n>e.previousIndex?"next":"prev";a&&(n+=f==="next"?i:-1*i),t.visibleSlidesIndexes&&t.visibleSlidesIndexes.indexOf(n)<0&&(t.params.centeredSlides?n>r?n=n-Math.floor(c/2)+1:n=n+Math.floor(c/2)-1:n>r&&t.params.slidesPerGroup,t.slideTo(n,s?0:void 0))}}d("beforeInit",()=>{const{thumbs:s}=e.params;if(!(!s||!s.swiper))if(typeof s.swiper=="string"||s.swiper instanceof HTMLElement){const t=$(),c=()=>{const m=typeof s.swiper=="string"?t.querySelector(s.swiper):s.swiper;if(m&&m.swiper)s.swiper=m.swiper,x(),h(!0);else if(m){const i=a=>{s.swiper=a.detail[0],m.removeEventListener("init",i),x(),h(!0),s.swiper.update(),e.update()};m.addEventListener("init",i)}return m},u=()=>{if(e.destroyed)return;c()||requestAnimationFrame(u)};requestAnimationFrame(u)}else x(),h(!0)}),d("slideChange update resize observerUpdate",()=>{h()}),d("setTransition",(s,t)=>{const c=e.thumbs.swiper;!c||c.destroyed||c.setTransition(t)}),d("beforeDestroy",()=>{const s=e.thumbs.swiper;!s||s.destroyed||v&&s.destroy()}),Object.assign(e.thumbs,{init:x,update:h})}function R(p){let{swiper:e,extendParams:w,emit:d,once:g}=p;w({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}});function v(){if(e.params.cssMode)return;const h=e.getTranslate();e.setTranslate(h),e.setTransition(0),e.touchEventsData.velocities.length=0,e.freeMode.onTouchEnd({currentPos:e.rtl?e.translate:-e.translate})}function b(){if(e.params.cssMode)return;const{touchEventsData:h,touches:s}=e;h.velocities.length===0&&h.velocities.push({position:s[e.isHorizontal()?"startX":"startY"],time:h.touchStartTime}),h.velocities.push({position:s[e.isHorizontal()?"currentX":"currentY"],time:P()})}function x(h){let{currentPos:s}=h;if(e.params.cssMode)return;const{params:t,wrapperEl:c,rtlTranslate:u,snapGrid:m,touchEventsData:i}=e,r=P()-i.touchStartTime;if(s<-e.minTranslate()){e.slideTo(e.activeIndex);return}if(s>-e.maxTranslate()){e.slides.length<m.length?e.slideTo(m.length-1):e.slideTo(e.slides.length-1);return}if(t.freeMode.momentum){if(i.velocities.length>1){const T=i.velocities.pop(),S=i.velocities.pop(),z=T.position-S.position,O=T.time-S.time;e.velocity=z/O,e.velocity/=2,Math.abs(e.velocity)<t.freeMode.minimumVelocity&&(e.velocity=0),(O>150||P()-T.time>300)&&(e.velocity=0)}else e.velocity=0;e.velocity*=t.freeMode.momentumVelocityRatio,i.velocities.length=0;let n=1e3*t.freeMode.momentumRatio;const f=e.velocity*n;let o=e.translate+f;u&&(o=-o);let E=!1,j;const k=Math.abs(e.velocity)*20*t.freeMode.momentumBounceRatio;let I;if(o<e.maxTranslate())t.freeMode.momentumBounce?(o+e.maxTranslate()<-k&&(o=e.maxTranslate()-k),j=e.maxTranslate(),E=!0,i.allowMomentumBounce=!0):o=e.maxTranslate(),t.loop&&t.centeredSlides&&(I=!0);else if(o>e.minTranslate())t.freeMode.momentumBounce?(o-e.minTranslate()>k&&(o=e.minTranslate()+k),j=e.minTranslate(),E=!0,i.allowMomentumBounce=!0):o=e.minTranslate(),t.loop&&t.centeredSlides&&(I=!0);else if(t.freeMode.sticky){let T;for(let S=0;S<m.length;S+=1)if(m[S]>-o){T=S;break}Math.abs(m[T]-o)<Math.abs(m[T-1]-o)||e.swipeDirection==="next"?o=m[T]:o=m[T-1],o=-o}if(I&&g("transitionEnd",()=>{e.loopFix()}),e.velocity!==0){if(u?n=Math.abs((-o-e.translate)/e.velocity):n=Math.abs((o-e.translate)/e.velocity),t.freeMode.sticky){const T=Math.abs((u?-o:o)-e.translate),S=e.slidesSizesGrid[e.activeIndex];T<S?n=t.speed:T<2*S?n=t.speed*1.5:n=t.speed*2.5}}else if(t.freeMode.sticky){e.slideToClosest();return}t.freeMode.momentumBounce&&E?(e.updateProgress(j),e.setTransition(n),e.setTranslate(o),e.transitionStart(!0,e.swipeDirection),e.animating=!0,L(c,()=>{!e||e.destroyed||!i.allowMomentumBounce||(d("momentumBounce"),e.setTransition(t.speed),setTimeout(()=>{e.setTranslate(j),L(c,()=>{!e||e.destroyed||e.transitionEnd()})},0))})):e.velocity?(d("_freeModeNoMomentumRelease"),e.updateProgress(o),e.setTransition(n),e.setTranslate(o),e.transitionStart(!0,e.swipeDirection),e.animating||(e.animating=!0,L(c,()=>{!e||e.destroyed||e.transitionEnd()}))):e.updateProgress(o),e.updateActiveIndex(),e.updateSlidesClasses()}else if(t.freeMode.sticky){e.slideToClosest();return}else t.freeMode&&d("_freeModeNoMomentumRelease");(!t.freeMode.momentum||r>=t.longSwipesMs)&&(d("_freeModeStaticRelease"),e.updateProgress(),e.updateActiveIndex(),e.updateSlidesClasses())}Object.assign(e,{freeMode:{onTouchStart:v,onTouchMove:b,onTouchEnd:x}})}function Z({files:p,cancelHandler:e}){const{account:w,collection:d,setCollection:g,setCollectionIndex:v}=M.useContext(H),[b,x]=M.useState(null),h=s=>`https://gateway.pinata.cloud/ipfs/${s}`;return l.jsxs(l.Fragment,{children:[l.jsx(B,{style:{"--swiper-navigation-color":"#fff","--swiper-pagination-color":"#fff"},spaceBetween:10,navigation:!0,thumbs:{swiper:b&&!b.destroyed?b:null},modules:[R,A,N],className:"mySwiper2",onSlideChange:s=>v(s.activeIndex),children:p==null?void 0:p.map((s,t)=>{var c;return l.jsx(D,{children:l.jsxs(te,{children:[l.jsx("img",{src:(c=d.nfts[t])!=null&&c.image?h(d.nfts[t].image):URL.createObjectURL(s),alt:"preview"}),l.jsx(W,{children:l.jsx(ee,{onClick:e,children:"x"})})]})},`slider-${t}`)})}),l.jsx(B,{onSwiper:x,spaceBetween:10,slidesPerView:5,freeMode:!0,watchSlidesProgress:!0,modules:[R,A,N],className:"mySwiper",children:p==null?void 0:p.map((s,t)=>{var c;return l.jsx(D,{children:l.jsx("img",{src:(c=d.nfts[t])!=null&&c.image?h(d.nfts[t].image):URL.createObjectURL(s),alt:"thumb"})},`slider-thumnail-${t}`)})})]})}const W=y.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`,ee=y.button`
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  &:hover {
    color: #cccccc;
  }
`,te=y.div`
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
`;function pe(){const{account:p,collection:e,setCollection:w,resetCollection:d}=M.useContext(H),[g,v]=M.useState(null),b=c=>{const u=Object.values(c.target.files);if(u.length!==10){J.fire("업로드 에러","현재 버전에서는 파일 업로드 시 정확히 10개의 파일만 업로드 가능합니다. 감사합니다👩‍💻"),v(null);return}v(u),u.forEach(m=>{const i=new FileReader;i.onload=()=>{const a=JSON.parse(i.result),r=a.name?a.name:"",n=a.description?a.description:"",f=a.image?a.image:"",o=a.attributes?a.attributes:[{trait_type:"",value:""}],E={name:r,description:n,image:f,attributes:o};w(j=>({...j,nfts:[...j.nfts,E]}))},i.readAsText(m)})},x=M.useRef(),h=()=>{x.current.click()},s=()=>{d(),v(null),x.current.value=""};return l.jsx(le,{children:l.jsxs(ce,{children:[l.jsxs(oe,{children:[l.jsx("h1",{children:"Collection NFT 생성"}),l.jsxs(_,{style:{position:"relative"},children:[l.jsx("p",{children:"아이템이 발행된 후에는 해당 정보를 변경할 수 없습니다."}),l.jsx(G,{children:l.jsx("img",{src:X,width:30,height:30,alt:"느낌표"})}),l.jsx(Q,{children:l.jsx("pre",{children:`
JSON 파일 아래 형식 준수

※image: only ipfsHash cid (string)
아래 예시 ipfsHash cid
{
  "name": string,
  "description": string,
  "image": "QmZEPe3V5hB6SiJ3Nc2ECcKVQCXZbsUEba3rRbVse6MgXy",
  "attributes": [
    {
      "trait_type": string,
      "value": string
    }
  ]
}
  `})})]})]}),l.jsxs(se,{children:[l.jsxs(ne,{children:[g?l.jsx("div",{style:{width:"100%",height:"100%",minHeight:"425px",maxHeight:"555px"},children:l.jsx(Z,{files:g,cancelHandler:s})}):l.jsxs(re,{onClick:h,onDrop:b,accept:"application/json",children:[l.jsx("div",{style:{width:"40px",height:"40px"},children:l.jsx(ie,{})}),l.jsx("h2",{children:"클릭해서 폴더 업로드"}),l.jsx("h3",{children:"폴더 찾아보기"}),l.jsx("h4",{children:"최대 크기: 50MB"}),l.jsx("h4",{children:"JSON"})]}),l.jsx("input",{type:"file",ref:x,webkitdirectory:"true",multiple:!0,style:{display:"none"},onChange:b})]}),l.jsx(ae,{children:l.jsx(q,{context:{files:g,setFiles:v}})})]})]})})}const ie=y.div`
  background-image: url(${K});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
`,se=y.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
  @media (max-width: ${({theme:p})=>p.size.mobile}) {
    flex-direction: column;
    gap: 20px;
  }
`,ne=y.div`
  width: 47%;

  @media (max-width: ${({theme:p})=>p.size.mobile}) {
    width: 100%;
  }
`,ae=y.div`
  width: 44%;
  @media (max-width: ${({theme:p})=>p.size.mobile}) {
    width: 100%;
  }
`,re=y.div`
  width: 100%;
  height: 100%;
  max-height: 555px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed rgba(18, 18, 18, 0.32);
  border-radius: 10px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-top: 1rem;
  }
  h3 {
    font-size: 14px;
    font-weight: 600;
    margin-top: 0.5rem;
    color: #fe5050;
  }
  h4 {
    font-size: 11px;
    font-weight: 400;
    margin-top: 0.5rem;
  }

  &:hover {
    border: 1px solid rgba(18, 18, 18, 0.32);
    background-color: rgba(18, 18, 18, 0.1);
    transition: 0.3s;
  }
  cursor: pointer;
`,oe=y.div`
  width: 100%;
  padding-bottom: 20px;
  /* padding-top: 130px; */
  /* height: 210px; */

  p {
    margin-top: 10px;
  }
`,le=y.div`
  /* height: 100%; */
  padding-top: 100px;
  width: 100%;
  background-color: #ffffff;
  background-size: cover;
`,ce=y.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  padding: 0 50px 0 30px;
`;export{pe as default};
