import{i as K,a as w,g as k,P as me,S as pe,b as fe,N as he}from"./assets/vendor-DZ7zuj1H.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const m of l.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function s(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(n){if(n.ep)return;n.ep=!0;const l=s(n);fetch(n.href,l)}})();const a={feedbacksContainer:document.querySelector(".feedbacks-container"),artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),loader:document.querySelector(".loader"),btnSearch:document.querySelector(".search-and-filters-toggle"),searchInput:document.querySelector(".search-input"),searchBtnRequest:document.querySelector(".search-btn"),iconSearch:document.querySelector(".dropdown-icon-search"),iconSort:document.querySelector(".sort-icon"),iconGenres:document.querySelector(".genres-icon"),loaderArtistsWrapper:document.querySelector(".artists-loader-container"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link"),artistDetailsModalBackdrope:document.querySelector(".artist-details-backdrop"),heroBtn:document.querySelector(".hero-btn"),resetBtn:document.querySelector(".filters-reset-btn"),feedbackLoader:document.querySelector(".feedback-loader"),feedbackLoaderContainer:document.querySelector(".feedback-loader-container")},ge="https://sound-wave.b.goit.study/api",S={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},B=8,be=10;//!======================================================
function E(e="Something went wrong. Please try again later.",t="topCenter"){K.error({title:"",message:e,position:t,timeout:3e3,progressBar:!1})}function re(e="Thank you! Your feedback means a lot to us.",t="topCenter",s="ico-success"){K.success({title:"",message:e,position:t,timeout:3e3,progressBar:!1,icon:s})}function ye(e="We couldn’t load the reviews. Please try again later.",t="topRight"){K.error({title:"",message:e,position:t,timeout:3e3,progressBar:!1})}//!======================================================
function x(){a.loaderArtistsWrapper.classList.add("hidden")}function G(){a.loaderArtistsWrapper.classList.remove("hidden")}//!======================================================
function ve(){var e,t,s,r;(e=a.feedbackLoader)==null||e.classList.add("hidden"),(t=a.feedbackLoaderContainer)==null||t.classList.add("hidden"),(s=a.feedbackLoaderContainer)==null||s.setAttribute("aria-hidden","true"),(r=a.feedbackLoader)==null||r.setAttribute("aria-hidden","true")}function Se(){var e,t,s,r;(e=a.feedbackLoaderContainer)==null||e.classList.remove("hidden"),(t=a.feedbackLoader)==null||t.classList.remove("hidden"),(s=a.feedbackLoaderContainer)==null||s.setAttribute("aria-hidden","false"),(r=a.feedbackLoader)==null||r.setAttribute("aria-hidden","false")}//!======================================================
document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:e,mobileMenu:t,menuLinks:s}=a;function r(){t.classList.add("active"),e.classList.add("active")}function n(){t.classList.remove("active"),e.classList.remove("active")}e==null||e.addEventListener("click",()=>{t.classList.contains("active")?n():r()}),s==null||s.forEach(l=>l.addEventListener("click",n))});w.defaults.baseURL=ge;const V=async e=>{const{data:t}=await w.get(`${S.ARTISTS}?limit=${B}&page=${e}`);return t},Le=async e=>{const{data:t}=await w.get(`${S.ARTIST_BY_ID}${e}`);return t},we=async e=>{const{data:t}=await w.get(`${S.ARTIST_BY_ID}${e}${S.ARTIST_ALBUMS_BY_ID}`);return t},Ee=async(e=1)=>{const{data:t}=await w.get(`${S.FEEDBACKS}?limit=${be}&page=${e}`);return t},ke=async()=>{const{data:e}=await w.get(`${S.GENRES}`);return e},$=async({name:e,page:t=1,sorted:s="0",genre:r=""})=>{const{data:n}=await w.get(`${S.ARTISTS}?limit=${B}&page=${t}${e!=null&&e.length?`&name=${e}`:""}${s==="2"?"&sortName=desc":s==="1"?"&sortName=asc":""}${r?`&genre=${r}`:""}`);return n},Ae=async(e,t,s)=>{await w.post(`${S.FEEDBACKS}`,{name:e,rating:t,descr:s})},o={tlOpenSearch:window.matchMedia("(min-width: 1440px)").matches?null:k.timeline({paused:!0}).to(a.iconSearch,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(a.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(a.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSearch:window.matchMedia("(min-width: 1440px)").matches?null:k.timeline({paused:!0}).to(a.iconSearch,{rotate:0,duration:.3,ease:"power2.in"},0).to(a.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenSort:k.timeline({paused:!0}).to(a.iconSort,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(a.menuSort,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(a.menuSort.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSort:k.timeline({paused:!0}).to(a.iconSort,{rotate:0,duration:.3,ease:"power2.in"},0).to(a.menuSort,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenGenres:k.timeline({paused:!0}).to(a.iconGenres,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(a.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(a.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseGenres:k.timeline({paused:!0}).to(a.iconGenres,{rotate:0,duration:.3,ease:"power2.in"},0).to(a.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0)};o.tlOpenSort.eventCallback("onStart",()=>{var e;(e=o.tlCloseSort)==null||e.pause(0).progress(0)});o.tlCloseSort.eventCallback("onStart",()=>{var e;(e=o.tlOpenSort)==null||e.pause(0).progress(0)});let i={name:"",page:1,sorted:0,genre:""};Me();qe();$e();Ce();Te();Be();xe();Ge();function $e(){a.searchInput.addEventListener("input",()=>{i.name=a.searchInput.value.trim()});const e=async()=>{var t;if(!((t=i.name)!=null&&t.length)){re("Silence from you","topCenter",null);return}G();try{const{artists:s}=await $(i);a.artistsList.innerHTML="",L(s)}catch(s){E(`Silence due problem ${s}`)}x(),window.matchMedia("(min-width: 1440px)")||o.tlCloseSearch.play(0)};a.searchBtnRequest.addEventListener("click",e),a.searchInput.addEventListener("keydown",t=>{t.key==="Enter"&&e()})}async function Me(){try{const t='<li data-value="all">All Genres</li>'+(await ke()).map(({genre:s})=>`<li data-value="${s}">${s}</li>`).join("");a.menuGenres.insertAdjacentHTML("beforeend",t)}catch(e){E(`While loading genres ${e}`)}}function Ce(){const e=t=>{document.querySelector(".artists-dropdown-sort").contains(t.target)||(o.tlCloseSort.restart(),o.tlCloseGenres.restart(),a.btnSort.classList.remove("open"),a.menuSort.classList.remove("open"))};a.btnSort.addEventListener("click",t=>{t.stopPropagation(),a.menuSort.classList.contains("open")?(o.tlOpenSort.pause(0),o.tlCloseSort.restart(),a.btnSort.classList.remove("open"),a.menuSort.classList.remove("open")):(o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),a.btnGenres.classList.remove("open"),a.menuGenres.classList.remove("open"),o.tlCloseSort.pause(0),o.tlOpenSort.restart(),a.btnSort.classList.add("open"),a.menuSort.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),a.menuSort.addEventListener("click",async t=>{const s=t.target.closest("li");if(s){a.btnSort.querySelector(".dropdown-label").textContent=s.textContent,a.btnSort.dataset.value=s.dataset.value,i.sorted=s.dataset.value,G();try{const{artists:r}=await $(i);a.artistsList.innerHTML="",L(r)}catch(r){E(`Silence due problem ${r}`)}x(),o.tlOpenSort.pause(0),o.tlCloseSort.restart(),a.btnSort.classList.remove("open"),a.menuSort.classList.remove("open")}})}async function Te(){const e=t=>{document.querySelector(".artists-dropdown-genres").contains(t.target)||(o.tlCloseGenres.restart(),o.tlCloseSort.restart(),a.btnGenres.classList.remove("open"),a.menuGenres.classList.remove("open"))};a.btnGenres.addEventListener("click",t=>{t.stopPropagation(),a.menuGenres.classList.contains("open")?(o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),a.btnGenres.classList.remove("open"),a.menuGenres.classList.remove("open")):(o.tlOpenSort.pause(0),o.tlCloseSort.restart(),a.btnSort.classList.remove("open"),a.menuSort.classList.remove("open"),o.tlCloseGenres.pause(0),o.tlOpenGenres.restart(),a.btnGenres.classList.add("open"),a.menuGenres.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),a.menuGenres.addEventListener("click",async t=>{const s=t.target.closest("li");if(s){a.btnGenres.querySelector(".dropdown-label").textContent=s.textContent,a.btnGenres.dataset.value=s.dataset.value,i.genre=s.textContent==="All Genres"?"":s.textContent,G();try{const{artists:r}=await $(i);a.artistsList.innerHTML="",L(r)}catch(r){E(`Silence due problem ${r}`)}x(),o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),a.btnGenres.classList.remove("open"),a.menuGenres.classList.remove("open")}})}function qe(){if(window.matchMedia("(min-width: 1440px)").matches)return;const e=t=>{document.querySelector(".filters-content").contains(t.target)||(o.tlCloseSearch.play(0),document.removeEventListener("click",e))};a.btnSearch.addEventListener("click",t=>{t.stopPropagation(),k.isTweening(a.panelSearch)||a.panelSearch.style.pointerEvents==="auto"?(o.tlOpenSearch.pause(0),o.tlCloseSearch.restart(),document.removeEventListener("click",e)):(o.tlCloseSearch.pause(0),o.tlOpenSearch.restart(),document.addEventListener("click",e))})}async function ne(){i={name:"",page:1,sorted:0,genre:""},a.btnGenres.querySelector(".dropdown-label").textContent="Genre",a.btnSort.querySelector(".dropdown-label").textContent="Sorting",a.searchInput.value="",G();try{a.artistsList.innerHTML="";const{artists:e}=await $(i);L(e)}catch(e){E(`Silence due problem ${e}`)}x(),o.tlCloseGenres.play(0),o.tlCloseSort.play(0)}function Be(){a.resetBtn.addEventListener("click",ne)}function xe(){a.heroBtn.addEventListener("click",e=>{e.preventDefault(),document.querySelector("#artists").scrollIntoView({behavior:"smooth"})})}function Ge(){document.querySelectorAll("button").forEach(e=>{e.addEventListener("click",()=>{e.blur()})})}const Ie=window.matchMedia("(max-width: 767.98px)").matches,Oe=Ie?3:5;let f=null,Y=!1,H=!1,O=!1;function Pe(){return`
    <div class="no-artists is-hidden" data-no-artists>
      <svg class="no-artists-icon" width="40" height="40" aria-hidden="true">
        <use href="${new URL("/developers-orchestra-project/assets/icons-C5DxDna9.svg",import.meta.url).href}#icon-error"></use>
      </svg>
      <h2 class="no-artists-title">Silence on the stage…</h2>
      <p class="no-artists-text">
        Looks like no artists match your filters.<br />
        Try changing them or hit “Reset Filters” to bring back the beat.
      </p>
      <button class="btn-reset-filters" type="button">Reset filters</button>
    </div>
  `}function Re(){let e=document.querySelector("[data-no-artists]");return e||(a.artistsList.insertAdjacentHTML("afterend",Pe()),e=document.querySelector("[data-no-artists]")),e}function De(){Re().classList.remove("is-hidden");const e=document.querySelector(".btn-reset-filters");e&&e.addEventListener("click",ne,{once:!0})}function J(){var e;(e=document.querySelector("[data-no-artists]"))==null||e.classList.add("is-hidden")}function A(e,t=0){const s=document.querySelector("#tui-pagination");s&&s.classList.toggle("hidden",!e||t<=0)}function F(){return!!(i.name&&i.name.trim().length||i.genre&&i.genre!=="all"&&i.genre!==""||i.sorted&&Number(i.sorted)!==0)}function oe(e=0){f||(f=new me("#tui-pagination",{totalItems:e,itemsPerPage:B,page:i.page||1,visiblePages:Oe,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn is-active" aria-current="page">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',disabledMoveButton:'<span class="tui-page-btn is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',moreButton:'<span class="tui-page-btn tui-ellipsis">…</span>'}}),f.on("afterMove",Ne))}function Q(e){if(!f)return;const t=Math.max(1,Math.ceil(e/B)),s=Math.min(Math.max(i.page||1,1),t);f.getCurrentPage()!==s&&(H=!0,f.movePageTo(s)),A(t>1,e)}async function Z({init:e=!1}={}){G();try{e&&(i.page=1);const s=F()?await $(i):await V(i.page),r=s.artists??[],n=Number(s.totalArtists)||0;if(O=!0,a.artistsList.innerHTML="",L(r),O=!1,oe(n),f.setTotalItems(n),Q(n),!e){const l=Math.ceil(n/B);A(l>1,n),H||le()}}catch{F()&&E("Failed to fetch artists"),a.artistsList.innerHTML="",L([]),A(!1,0)}finally{x()}}async function Ne({page:e}){if(!Y){Y=!0,G();try{i.page=e,a.artistsList.innerHTML="";const s=F()?await $(i):await V(e),r=s.artists??[],n=Number(s.totalArtists)||0;O=!0,L(r),O=!1,f.setTotalItems(n),Q(n),H?H=!1:le()}catch{E("Failed to fetch artists"),L([]),A(!1,0)}finally{Y=!1,x()}}}function L(e=[]){const t=new URL("/developers-orchestra-project/assets/icons-C5DxDna9.svg",import.meta.url).href;if(!Array.isArray(e)||e.length===0){J(),a.artistsList.innerHTML="",De(),f==null||f.setTotalItems(0),A(!1,0),document.dispatchEvent(new Event("artists:updated"));return}J();const s=e.map(({_id:r,strArtist:n="Unknown",strArtistThumb:l,strBiographyEN:m="",genres:y=[]})=>{const M=l||"https://placehold.co/736x414?text=No+Image",v=Array.isArray(y)&&y.length?`<ul class="artist-tags">${y.map(C=>`<li class="tag">${C}</li>`).join("")}</ul>`:'<ul class="artist-tags" aria-hidden="true"></ul>';return`
          <li class="artists-item">
            <div class="artist-card" data-id="${r}">
              <img
                src="${M}"
                alt="${n} — portrait"
                class="artist-img"
                loading="lazy"
                decoding="async"
                width="736" height="414"
              >
              ${v}
              <h3 class="artist-name">${n}</h3>
              ${m?`<p class="artist-desc text-clamp-3">${m}</p>`:""}
              <button class="artist-cta" type="button" data-artist-id="${r}" aria-label="Learn more about ${n}">
                Learn More
                <svg class="artist-cta-icon" width="24" height="24" aria-hidden="true">
                  <use href="${t}#icon-arrow-1"></use>
                </svg>
              </button>
            </div>
          </li>`}).join("");a.artistsList.insertAdjacentHTML("beforeend",s),document.dispatchEvent(new Event("artists:updated"))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{i.page=1,Z({init:!0})}):(i.page=1,Z({init:!0}));function _(){const e=document.querySelector(".js-artists-top")||document.querySelector("#artists");if(!e)return;let t=parseFloat(getComputedStyle(e).scrollMarginTop)||0;t||(t=window.matchMedia("(min-width:1440px)").matches?112:window.matchMedia("(min-width:768px)").matches?96:120);let s=Math.round(e.getBoundingClientRect().top+window.pageYOffset-t);Math.abs(window.pageYOffset-s)<2&&(s=Math.max(0,s-1));const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:s,left:0,behavior:r?"auto":"smooth"})}function ie(){const e=document.querySelector(".artists-list");if(!e)return;const t=Array.from(e.querySelectorAll("img"));if(t.length===0){_();return}let s=0;const r=()=>{s++,s===t.length&&_()};t.forEach(n=>{n.complete?r():(n.addEventListener("load",r,{once:!0}),n.addEventListener("error",r,{once:!0}))})}function le(){requestAnimationFrame(_),ie(),setTimeout(_,400)}document.addEventListener("artists:updated",async()=>{if(a.artistsList.children.length!==0&&!O)try{oe();const t=F()?await $({...i,page:1}):await V(i.page||1),s=Number(t.totalArtists)||0;f.setTotalItems(s),Q(s);const r=Math.ceil(s/B);A(r>1,s),ie()}catch{A(!1,0)}});const He=5;function Fe(e){const t=je(e),s=ce(e);return`
    <div class="${t}" role="img" aria-label="Rating ${s} out of 5">
      <div class="star-container">
        ${Ue(s,He)}
      </div>
    </div>`}function _e({descr:e,name:t,rating:s}){return`
    <div class="swiper-slide feedback-card">
      ${Fe(s)}
      <p class="feedback-text">"${e}"</p>
      <p class="feedback-author">${t}</p>
    </div>`}function Ye(e){const t=e.map(_e).join("");a.feedbacksContainer.insertAdjacentHTML("beforeend",t)}function ce(e){const t=Number(e);return Math.min(5,Math.max(0,Number.isNaN(t)?0:t))}function je(e){const t=ce(e),s=Math.floor(t),r=t%1>=.5;return`rating medium star-icon label-hidden value-${s} ${r?"half":""}`}function Ue(e,t){const s=Math.floor(e),r=e%1>=.5;return Array.from({length:t},(n,l)=>l<s?j("full"):j(l===s&&r?"half":"empty")).join("")}function j(e){return`
    <div class="star">
      <span class="star-empty">${U()}</span>
      <span class="star-half" ${e==="half"?"":'style="display:none" aria-hidden="true"'}>
        ${U()}
      </span>
      <span class="star-filled" ${e==="full"?"":'style="display:none" aria-hidden="true"'}>
        ${U()}
      </span>
    </div>`}function U(){return`
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
        1.402 8.173L12 18.897l-7.336 3.86 
        1.402-8.173L.132 9.21l8.2-1.192z"></path>
    </svg>`}let D=null;async function We(){var t;const e=document.querySelector("#reviews");e==null||e.setAttribute("data-state","loading"),e==null||e.setAttribute("aria-busy","true"),Se();try{if(D)return;const s=((t=document.fonts)==null?void 0:t.ready)??Promise.resolve(),r=await Ee(1);await s;const n=Array.isArray(r==null?void 0:r.data)?r.data:[];n.length?Ye(n):te(),D=new pe(".swiper",{modules:[fe,he],slidesPerView:1,spaceBetween:30,pagination:{el:".swiper-pagination",clickable:!1,renderBullet:ze},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:ee}}),ee(D),D.update(),e==null||e.setAttribute("data-state","ready"),e==null||e.setAttribute("aria-busy","false")}catch{ye(),te(),e==null||e.setAttribute("data-state","ready"),e==null||e.setAttribute("aria-busy","false")}finally{ve()}}We();function ze(e,t){return e<3?`<span class="${t}"></span>`:""}function ee(e){Qe(e),Xe(e)}const Ke=document.querySelector(".swiper-button-prev"),Ve=document.querySelector(".swiper-button-next"),W=document.querySelector(".swiper-pagination");function Qe(e){Ke.classList.toggle("swiper-button-disabled",e.activeIndex===0),Ve.classList.toggle("swiper-button-disabled",e.activeIndex===e.slides.length-1)}function Xe(e){const t=W==null?void 0:W.querySelectorAll("span");if(!t.length)return;if(t.forEach(n=>n.classList.remove("swiper-pagination-bullet-active")),t.length===1){t[0].classList.add("swiper-pagination-bullet-active");return}const s=e.activeIndex===0,r=e.activeIndex===e.slides.length-1;t.length>=3?(s?t[0]:r?t[2]:t[1]).classList.add("swiper-pagination-bullet-active"):(s?t[0]:t[1]).classList.add("swiper-pagination-bullet-active")}function te(){var e,t;a.feedbacksContainer.insertAdjacentHTML("beforeend",`
    <div class="swiper-slide feedback-card">
      <p class="feedback-text">We are waiting for your feedback! Be the first to share your impressions.</p>
    </div>`),(e=document.querySelector(".swiper-nav"))==null||e.classList.add("hidden"),(t=document.querySelector(".swiper-pagination"))==null||t.classList.add("hidden")}function Je(){a.artistDetailsModalBackdrope.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",de),a.artistDetailsModalBackdrope.addEventListener("click",ue)}function X(){a.artistDetailsModalBackdrope.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",de),a.artistDetailsModalBackdrope.removeEventListener("click",ue)}function de(e){e.key==="Escape"&&X()}function ue(e){e.target===a.artistDetailsModalBackdrope&&X()}function Ze(){var e;(e=a.loader)==null||e.classList.remove("is-hidden")}function et(){var e;(e=a.loader)==null||e.classList.add("is-hidden")}async function tt(e){try{Ze();const t=await Le(e),s=await we(e),r=(s==null?void 0:s.albumsList)||[],{intFormedYear:n,intDiedYear:l,strArtist:m,strArtistThumb:y,strGender:M,intMembers:v,strCountry:C,strBiographyEN:T,genres:q}=t;let b;n&&l?b=`${n} - ${t.intDiedYear}`:n&&!l?b=`${n} - present`:b="information missing";const c=u=>{if(!u||isNaN(u))return"";const h=Math.floor(u/1e3),g=Math.floor(h/60),P=String(h%60).padStart(2,"0");return`${g}:${P}`},d=`
        <div class="artist-details-modal-content">
            <button class="artist-details-modal-close-btn" type="button">
                <svg class="modal-svg" width="32" height="32">
                    <use href="/img/icons.svg#icon-close"></use>
                </svg>
            </button> 

            <h2 class="artist-details-modal-main-title">${m}</h2>
            <div class="artist-details-modal-main-block">
                <img class="artist-details-modal-img" src="${y}" alt="${t.name}" />

                <div class="artist-details-modal-info">
                <ul class="artist-details-modal-list">
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Years active</h3>
                    <p  class="artist-details-modal-text">${b}</p>
                </li>
                ${M?`
                    <li class="artist-details-modal-list-item">
                        <h3 class="artist-details-modal-title">Sex</h3>
                        <p class="artist-details-modal-text">${M}</p>
                    </li>
                    `:""}
                ${v?`
                    <li class="artist-details-modal-list-item">
                        <h3 class="artist-details-modal-title">Members</h3>
                        <p class="artist-details-modal-text">${v}</p>
                    </li>
                    `:""}
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Country</h3>
                    <p class="artist-details-modal-text">${C}</p>
                </li>
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Biography</h3>
                    <p class="artist-details-modal-text">${T}</p>
                </li>
                </ul>
                
                ${Array.isArray(q)&&q.length?`<ul class="artist-details-modal-block-genres">${q.map(u=>`<li class="artist-details-modal-block-genres-item">${u}</li>`).join("")}</ul>`:""}
            </div>
            </div>
            <h3 class="artist-details-modal-albums">Albums</h3>
            <div class="artist-details-modal-albums-wrap">
            ${r.length>0?r.map(u=>{var h;return`
                <div class="artist-details-modal-albums-list">
                <h4 class="artist-details-modal-albums-list-title">${u.strAlbum}</h4>
                <table>
                <thead class="artist-details-modal-albums-list-table-head">
                    <tr>
                    <th class="artist-details-modal-albums-list-table col-1">Track</th>
                    <th class="artist-details-modal-albums-list-table col-2">Time</th>
                    <th class="artist-details-modal-albums-list-table col-3">Link</th>
                    </tr>
                </thead>
                <tbody class="artist-details-modal-albums-list-table-body">
                    ${((h=u.tracks)==null?void 0:h.map(g=>`
                    <tr>
                        <td class="artist-details-modal-albums-list-table-text col-1">${g.strTrack}</td>
                        <td class="artist-details-modal-albums-list-table-text col-2">${c(g.intDuration)}</td>
                        <td class= "col-3">
                            ${g.movie&&g.movie!=="null"?`
                                <a class="modal-link-youtube" href="${g.movie}" target="_blank">
                                    <svg class="modal-youtube" width="24" height="20">
                                        <use href="/img/icons.svg#icon-youtube"></use>
                                    </svg>
                                </a>
                            `:""}
                        </td>
                    </tr>
                    `).join(""))||""}
                </tbody>
                </table>
            </div>
            `}).join(""):"<p>No albums found</p>"}
            </div>
        </div>
        `;a.artistDetailsModal.innerHTML=`${d}`,a.artistDetailsModalBackdrope.querySelector(".artist-details-modal-close-btn").addEventListener("click",X),Je()}catch(t){E(t.message)}finally{et()}}a.artistsList.addEventListener("click",e=>{const t=e.target.closest(".artist-cta");if(!t)return;const s=t.dataset.artistId;s&&tt(s)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".feedback-backdrop"),t=document.querySelector(".feedback-modal-form"),s=document.getElementById("user-name"),r=document.getElementById("user-feedback"),n=document.getElementById("ratingValue"),l=t.querySelector(".feedback-modal-btn"),m=document.querySelectorAll("#myRating svg"),y=document.getElementById("ratingError");function M(c){y.textContent=c}function v(){y.textContent=""}m.forEach((c,d)=>{c.innerHTML=`<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
      1.402 8.173L12 18.897l-7.336 3.86 
      1.402-8.173L.132 9.21l8.2-1.192z"/>`,c.style.fill="#ffffff",c.style.cursor="pointer",c.addEventListener("click",()=>{n.value=d+1,m.forEach((p,u)=>p.style.fill=u<=d?"#764191":"#ffffff"),v()})});const C=document.querySelector(".leave-feedback-button");C&&C.addEventListener("click",()=>{t.reset(),n.value="0",v(),m.forEach(c=>c.style.fill="#ffffff"),b(s),b(r),e.classList.add("is-open"),document.body.style.overflow="hidden"});const T=()=>{e.classList.remove("is-open"),document.body.style.overflow=""};document.querySelector(".feedback-modal-close").addEventListener("click",T),e.addEventListener("click",c=>{c.target===e&&T()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&T()});const q=(c,d)=>{let p=c.nextElementSibling;(!p||!p.classList.contains("field-error"))&&(p=document.createElement("div"),p.classList.add("field-error"),c.insertAdjacentElement("afterend",p)),p.textContent=d,c.classList.add("input-error"),c.setAttribute("aria-invalid","true")},b=c=>{let d=c.nextElementSibling;d&&d.classList.contains("field-error")&&(d.textContent=""),c.classList.remove("input-error"),c.removeAttribute("aria-invalid")};t.addEventListener("submit",async c=>{var g,P;c.preventDefault(),b(s),b(r),v();const d=s.value.trim(),p=r.value.trim(),u=parseFloat(n.value);let h=!1;if((d.length<2||d.length>16)&&(q(s,"Name must be between 2 and 16 characters"),h=!0),(p.length<10||p.length>512)&&(q(r,"Message must be between 10 and 512 characters"),h=!0),(u<1||u>5)&&(M("Please provide a rating between 1 and 5"),h=!0),!h){l.disabled=!0;try{await Ae(d,u,p),re("Thank you! Your feedback has been submitted."),t.reset(),n.value="0",m.forEach(R=>R.style.fill="#ffffff"),T()}catch(R){alert("Server error: "+(((P=(g=R.response)==null?void 0:g.data)==null?void 0:P.message)||R.message))}finally{l.disabled=!1}}})});const N=document.querySelector(".scroll-to-top");let se=window.scrollY,I=!1,ae,z;window.addEventListener("scroll",()=>{clearTimeout(ae),ae=setTimeout(()=>{const e=window.scrollY,t=e<se-70,r=window.innerHeight+e>=document.body.offsetHeight-10||t&&e>350;r&&!I?(N.classList.add("visible"),I=!0,clearTimeout(z),z=setTimeout(()=>{N.classList.remove("visible"),I=!1},2e3)):!r&&I&&(N.classList.remove("visible"),I=!1,clearTimeout(z)),se=e},70)});N.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
