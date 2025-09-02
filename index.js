import{i as K,a as w,g as k,P as de,S as ue,b as me,N as pe}from"./assets/vendor-DZ7zuj1H.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const s={feedbacksContainer:document.querySelector(".feedbacks-container"),artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),loader:document.querySelector(".loader"),btnSearch:document.querySelector(".search-and-filters-toggle"),searchInput:document.querySelector(".search-input"),searchBtnRequest:document.querySelector(".search-btn"),iconSearch:document.querySelector(".dropdown-icon-search"),iconSort:document.querySelector(".sort-icon"),iconGenres:document.querySelector(".genres-icon"),loaderArtistsWrapper:document.querySelector(".artists-loader-container"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link"),artistDetailsModalBackdrope:document.querySelector(".artist-details-backdrop"),heroBtn:document.querySelector(".hero-btn"),resetBtn:document.querySelector(".filters-reset-btn"),feedbackLoader:document.querySelector(".feedback-loader"),feedbackLoaderContainer:document.querySelector(".feedback-loader-container")},fe="https://sound-wave.b.goit.study/api",S={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},I=8,he=10;//!======================================================
function E(e="Something went wrong. Please try again later.",t="topCenter"){K.error({title:"",message:e,position:t,timeout:3e3,progressBar:!1})}function se(e="Thank you! Your feedback means a lot to us.",t="topCenter",a="ico-success"){K.success({title:"",message:e,position:t,timeout:3e3,progressBar:!1,icon:a})}function ge(e="We couldn’t load the reviews. Please try again later.",t="topRight"){K.error({title:"",message:e,position:t,timeout:3e3,progressBar:!1})}//!======================================================
function T(){s.loaderArtistsWrapper.classList.add("hidden")}function q(){s.loaderArtistsWrapper.classList.remove("hidden")}//!======================================================
function be(){var e,t,a,r;(e=s.feedbackLoader)==null||e.classList.add("hidden"),(t=s.feedbackLoaderContainer)==null||t.classList.add("hidden"),(a=s.feedbackLoaderContainer)==null||a.setAttribute("aria-hidden","true"),(r=s.feedbackLoader)==null||r.setAttribute("aria-hidden","true")}function ye(){var e,t,a,r;(e=s.feedbackLoaderContainer)==null||e.classList.remove("hidden"),(t=s.feedbackLoader)==null||t.classList.remove("hidden"),(a=s.feedbackLoaderContainer)==null||a.setAttribute("aria-hidden","false"),(r=s.feedbackLoader)==null||r.setAttribute("aria-hidden","false")}//!======================================================
document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:e,mobileMenu:t,menuLinks:a}=s;function r(){t.classList.add("active"),e.classList.add("active")}function n(){t.classList.remove("active"),e.classList.remove("active")}e==null||e.addEventListener("click",()=>{t.classList.contains("active")?n():r()}),a==null||a.forEach(i=>i.addEventListener("click",n))});w.defaults.baseURL=fe;const ae=async e=>{const{data:t}=await w.get(`${S.ARTISTS}?limit=${I}&page=${e}`);return t},ve=async e=>{const{data:t}=await w.get(`${S.ARTIST_BY_ID}${e}`);return t},Se=async e=>{const{data:t}=await w.get(`${S.ARTIST_BY_ID}${e}${S.ARTIST_ALBUMS_BY_ID}`);return t},Le=async(e=1)=>{const{data:t}=await w.get(`${S.FEEDBACKS}?limit=${he}&page=${e}`);return t},we=async()=>{const{data:e}=await w.get(`${S.GENRES}`);return e},B=async({name:e,page:t=1,sorted:a="0",genre:r=""})=>{const{data:n}=await w.get(`${S.ARTISTS}?limit=${I}&page=${t}${e!=null&&e.length?`&name=${e}`:""}${a==="2"?"&sortName=desc":a==="1"?"&sortName=asc":""}${r?`&genre=${r}`:""}`);return n},Ee=async(e,t,a)=>{await w.post(`${S.FEEDBACKS}`,{name:e,rating:t,descr:a})},o={tlOpenSearch:window.matchMedia("(min-width: 1440px)").matches?null:k.timeline({paused:!0}).to(s.iconSearch,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSearch:window.matchMedia("(min-width: 1440px)").matches?null:k.timeline({paused:!0}).to(s.iconSearch,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenSort:k.timeline({paused:!0}).to(s.iconSort,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuSort,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuSort.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSort:k.timeline({paused:!0}).to(s.iconSort,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuSort,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenGenres:k.timeline({paused:!0}).to(s.iconGenres,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseGenres:k.timeline({paused:!0}).to(s.iconGenres,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0)};o.tlOpenSort.eventCallback("onStart",()=>{var e;(e=o.tlCloseSort)==null||e.pause(0).progress(0)});o.tlCloseSort.eventCallback("onStart",()=>{var e;(e=o.tlOpenSort)==null||e.pause(0).progress(0)});let c={name:"",page:1,sorted:0,genre:""};Ae();Ce();ke();$e();Me();Te();qe();Be();function ke(){s.searchInput.addEventListener("input",()=>{c.name=s.searchInput.value.trim()});const e=async()=>{var t;if(!((t=c.name)!=null&&t.length)){se("Silence from you","topCenter",null);return}q();try{const{artists:a}=await B(c);s.artistsList.innerHTML="",L(a)}catch(a){E(`Silence due problem ${a}`)}T(),window.matchMedia("(min-width: 1440px)")||o.tlCloseSearch.play(0)};s.searchBtnRequest.addEventListener("click",e),s.searchInput.addEventListener("keydown",t=>{t.key==="Enter"&&e()})}async function Ae(){try{const t='<li data-value="all">All Genres</li>'+(await we()).map(({genre:a})=>`<li data-value="${a}">${a}</li>`).join("");s.menuGenres.insertAdjacentHTML("beforeend",t)}catch(e){E(`While loading genres ${e}`)}}function $e(){const e=t=>{document.querySelector(".artists-dropdown-sort").contains(t.target)||(o.tlCloseSort.restart(),o.tlCloseGenres.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"))};s.btnSort.addEventListener("click",t=>{t.stopPropagation(),s.menuSort.classList.contains("open")?(o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")):(o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"),o.tlCloseSort.pause(0),o.tlOpenSort.restart(),s.btnSort.classList.add("open"),s.menuSort.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuSort.addEventListener("click",async t=>{const a=t.target.closest("li");if(a){s.btnSort.querySelector(".dropdown-label").textContent=a.textContent,s.btnSort.dataset.value=a.dataset.value,c.sorted=a.dataset.value,q();try{const{artists:r}=await B(c);s.artistsList.innerHTML="",L(r)}catch(r){E(`Silence due problem ${r}`)}T(),o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")}})}async function Me(){const e=t=>{document.querySelector(".artists-dropdown-genres").contains(t.target)||(o.tlCloseGenres.restart(),o.tlCloseSort.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"))};s.btnGenres.addEventListener("click",t=>{t.stopPropagation(),s.menuGenres.classList.contains("open")?(o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")):(o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"),o.tlCloseGenres.pause(0),o.tlOpenGenres.restart(),s.btnGenres.classList.add("open"),s.menuGenres.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuGenres.addEventListener("click",async t=>{const a=t.target.closest("li");if(a){s.btnGenres.querySelector(".dropdown-label").textContent=a.textContent,s.btnGenres.dataset.value=a.dataset.value,c.genre=a.textContent==="All Genres"?"":a.textContent,q();try{const{artists:r}=await B(c);s.artistsList.innerHTML="",L(r)}catch(r){E(`Silence due problem ${r}`)}T(),o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")}})}function Ce(){if(window.matchMedia("(min-width: 1440px)").matches)return;const e=t=>{document.querySelector(".filters-content").contains(t.target)||(o.tlCloseSearch.play(0),document.removeEventListener("click",e))};s.btnSearch.addEventListener("click",t=>{t.stopPropagation(),k.isTweening(s.panelSearch)||s.panelSearch.style.pointerEvents==="auto"?(o.tlOpenSearch.pause(0),o.tlCloseSearch.restart(),document.removeEventListener("click",e)):(o.tlCloseSearch.pause(0),o.tlOpenSearch.restart(),document.addEventListener("click",e))})}async function re(){c={name:"",page:1,sorted:0,genre:""},s.btnGenres.querySelector(".dropdown-label").textContent="Genre",s.btnSort.querySelector(".dropdown-label").textContent="Sorting",s.searchInput.value="",q();try{s.artistsList.innerHTML="";const{artists:e}=await B(c);L(e)}catch(e){E(`Silence due problem ${e}`)}T(),o.tlCloseGenres.play(0),o.tlCloseSort.play(0)}function Te(){s.resetBtn.addEventListener("click",re)}function qe(){s.heroBtn.addEventListener("click",e=>{e.preventDefault(),document.querySelector("#artists").scrollIntoView({behavior:"smooth"})})}function Be(){document.querySelectorAll("button").forEach(e=>{e.addEventListener("click",()=>{e.blur()})})}const xe=window.matchMedia("(max-width: 767.98px)").matches,Ge=xe?3:5;let f=null,_=!1,N=!1,H=!1;function Ie(){return`
    <div class="no-artists is-hidden" data-no-artists>
      <svg class="no-artists-icon" width="40" height="40" aria-hidden="true">
        <use href="${new URL("/developers-orchestra-project/assets/icons-B2bnHc1q.svg",import.meta.url).href}#icon-error"></use>
      </svg>
      <h2 class="no-artists-title">Silence on the stage…</h2>
      <p class="no-artists-text">
        Looks like no artists match your filters.<br />
        Try changing them or hit “Reset Filters” to bring back the beat.
      </p>
      <button class="btn-reset-filters" type="button">Reset filters</button>
    </div>
  `}function Oe(){let e=document.querySelector("[data-no-artists]");return e||(s.artistsList.insertAdjacentHTML("afterend",Ie()),e=document.querySelector("[data-no-artists]")),e}function Re(){Oe().classList.remove("is-hidden");const e=document.querySelector(".btn-reset-filters");e&&e.addEventListener("click",re,{once:!0})}function Q(){var e;(e=document.querySelector("[data-no-artists]"))==null||e.classList.add("is-hidden")}function G(e,t=0){const a=document.querySelector("#tui-pagination");a&&a.classList.toggle("hidden",!e||t<=0)}function z(){return!!(c.name&&c.name.trim().length||c.genre&&c.genre!=="all"&&c.genre!==""||c.sorted&&Number(c.sorted)!==0)}function Pe(e=0){f||(f=new de("#tui-pagination",{totalItems:e,itemsPerPage:I,page:c.page||1,visiblePages:Ge,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn is-active" aria-current="page">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',disabledMoveButton:'<span class="tui-page-btn is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',moreButton:'<span class="tui-page-btn tui-ellipsis">…</span>'}}),f.on("afterMove",De))}function ne(e){if(!f)return;const t=Math.max(1,Math.ceil(e/I)),a=Math.min(Math.max(c.page||1,1),t);f.getCurrentPage()!==a&&(N=!0,f.movePageTo(a)),G(t>1,e)}async function X({init:e=!1}={}){q();try{e&&(c.page=1);const a=z()?await B(c):await ae(c.page),r=a.artists??[],n=Number(a.totalArtists)||0;if(H=!0,s.artistsList.innerHTML="",L(r),H=!1,Pe(n),f.setTotalItems(n),ne(n),!e){const i=Math.ceil(n/I);G(i>1,n),N||oe()}}catch{z()&&E("Failed to fetch artists"),s.artistsList.innerHTML="",L([]),G(!1,0)}finally{T()}}async function De({page:e}){if(!_){_=!0,q();try{c.page=e,s.artistsList.innerHTML="";const a=z()?await B(c):await ae(e),r=a.artists??[],n=Number(a.totalArtists)||0;H=!0,L(r),H=!1,f.setTotalItems(n),ne(n),N?N=!1:oe()}catch{E("Failed to fetch artists"),L([]),G(!1,0)}finally{_=!1,T()}}}function L(e=[]){const t=new URL("/developers-orchestra-project/assets/icons-B2bnHc1q.svg",import.meta.url).href;if(!Array.isArray(e)||e.length===0){Q(),s.artistsList.innerHTML="",Re(),f==null||f.setTotalItems(0),G(!1,0),document.dispatchEvent(new Event("artists:updated"));return}Q();const a=e.map(({_id:r,strArtist:n="Unknown",strArtistThumb:i,strBiographyEN:m="",genres:y=[]})=>{const A=i||"https://placehold.co/736x414?text=No+Image",v=Array.isArray(y)&&y.length?`<ul class="artist-tags">${y.map($=>`<li class="tag">${$}</li>`).join("")}</ul>`:'<ul class="artist-tags" aria-hidden="true"></ul>';return`
          <li class="artists-item">
            <div class="artist-card" data-id="${r}">
              <img
                src="${A}"
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
                <svg class="artist-cta-icon" width="16" height="16" aria-hidden="true">
                  <use href="${t}#icon-arrow-1"></use>
                </svg>
              </button>
            </div>
          </li>`}).join("");s.artistsList.insertAdjacentHTML("beforeend",a),document.dispatchEvent(new Event("artists:updated"))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{c.page=1,X({init:!0})}):(c.page=1,X({init:!0}));function F(){const e=document.querySelector(".js-artists-top")||document.querySelector("#artists");if(!e)return;let t=parseFloat(getComputedStyle(e).scrollMarginTop)||0;t||(t=window.matchMedia("(min-width:1440px)").matches?112:window.matchMedia("(min-width:768px)").matches?96:120);let a=Math.round(e.getBoundingClientRect().top+window.pageYOffset-t);Math.abs(window.pageYOffset-a)<2&&(a=Math.max(0,a-1));const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:a,left:0,behavior:r?"auto":"smooth"})}function Ne(){const e=document.querySelector(".artists-list");if(!e)return;const t=Array.from(e.querySelectorAll("img"));if(t.length===0){F();return}let a=0;const r=()=>{a++,a===t.length&&F()};t.forEach(n=>{n.complete?r():(n.addEventListener("load",r,{once:!0}),n.addEventListener("error",r,{once:!0}))})}function oe(){requestAnimationFrame(F),Ne(),setTimeout(F,400)}const He=5;function Fe(e){const t=je(e),a=ie(e);return`
    <div class="${t}" role="img" aria-label="Rating ${a} out of 5">
      <div class="star-container">
        ${Ue(a,He)}
      </div>
    </div>`}function _e({descr:e,name:t,rating:a}){return`
    <div class="swiper-slide feedback-card">
      ${Fe(a)}
      <p class="feedback-text">"${e}"</p>
      <p class="feedback-author">${t}</p>
    </div>`}function Ye(e){const t=e.map(_e).join("");s.feedbacksContainer.insertAdjacentHTML("beforeend",t)}function ie(e){const t=Number(e);return Math.min(5,Math.max(0,Number.isNaN(t)?0:t))}function je(e){const t=ie(e),a=Math.floor(t),r=t%1>=.5;return`rating medium star-icon label-hidden value-${a} ${r?"half":""}`}function Ue(e,t){const a=Math.floor(e),r=e%1>=.5;return Array.from({length:t},(n,i)=>i<a?Y("full"):Y(i===a&&r?"half":"empty")).join("")}function Y(e){return`
    <div class="star">
      <span class="star-empty">${j()}</span>
      <span class="star-half" ${e==="half"?"":'style="display:none" aria-hidden="true"'}>
        ${j()}
      </span>
      <span class="star-filled" ${e==="full"?"":'style="display:none" aria-hidden="true"'}>
        ${j()}
      </span>
    </div>`}function j(){return`
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
        1.402 8.173L12 18.897l-7.336 3.86 
        1.402-8.173L.132 9.21l8.2-1.192z"></path>
    </svg>`}let P=null;async function We(){var t;const e=document.querySelector("#reviews");e==null||e.setAttribute("data-state","loading"),e==null||e.setAttribute("aria-busy","true"),ye();try{if(P)return;const a=((t=document.fonts)==null?void 0:t.ready)??Promise.resolve(),r=await Le(1);await a;const n=Array.isArray(r==null?void 0:r.data)?r.data:[];n.length?Ye(n):Z(),P=new ue(".swiper",{modules:[me,pe],slidesPerView:1,spaceBetween:30,pagination:{el:".swiper-pagination",clickable:!1,renderBullet:ze},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:J}}),J(P),P.update(),e==null||e.setAttribute("data-state","ready"),e==null||e.setAttribute("aria-busy","false")}catch{ge(),Z(),e==null||e.setAttribute("data-state","ready"),e==null||e.setAttribute("aria-busy","false")}finally{be()}}We();function ze(e,t){return e<3?`<span class="${t}"></span>`:""}function J(e){Qe(e),Xe(e)}const Ke=document.querySelector(".swiper-button-prev"),Ve=document.querySelector(".swiper-button-next"),U=document.querySelector(".swiper-pagination");function Qe(e){Ke.classList.toggle("swiper-button-disabled",e.activeIndex===0),Ve.classList.toggle("swiper-button-disabled",e.activeIndex===e.slides.length-1)}function Xe(e){const t=U==null?void 0:U.querySelectorAll("span");if(!t.length)return;if(t.forEach(n=>n.classList.remove("swiper-pagination-bullet-active")),t.length===1){t[0].classList.add("swiper-pagination-bullet-active");return}const a=e.activeIndex===0,r=e.activeIndex===e.slides.length-1;t.length>=3?(a?t[0]:r?t[2]:t[1]).classList.add("swiper-pagination-bullet-active"):(a?t[0]:t[1]).classList.add("swiper-pagination-bullet-active")}function Z(){var e,t;s.feedbacksContainer.insertAdjacentHTML("beforeend",`
    <div class="swiper-slide feedback-card">
      <p class="feedback-text">We are waiting for your feedback! Be the first to share your impressions.</p>
    </div>`),(e=document.querySelector(".swiper-nav"))==null||e.classList.add("hidden"),(t=document.querySelector(".swiper-pagination"))==null||t.classList.add("hidden")}function Je(){s.artistDetailsModalBackdrope.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",le),s.artistDetailsModalBackdrope.addEventListener("click",ce)}function V(){s.artistDetailsModalBackdrope.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",le),s.artistDetailsModalBackdrope.removeEventListener("click",ce)}function le(e){e.key==="Escape"&&V()}function ce(e){e.target===s.artistDetailsModalBackdrope&&V()}function Ze(){var e;(e=s.loader)==null||e.classList.remove("is-hidden")}function et(){var e;(e=s.loader)==null||e.classList.add("is-hidden")}async function tt(e){try{Ze();const t=await ve(e),a=await Se(e),r=(a==null?void 0:a.albumsList)||[],{intFormedYear:n,intDiedYear:i,strArtist:m,strArtistThumb:y,strGender:A,intMembers:v,strCountry:$,strBiographyEN:M,genres:C}=t;let b;n&&i?b=`${n} - ${t.intDiedYear}`:n&&!i?b=`${n} - present`:b="information missing";const l=u=>{if(!u||isNaN(u))return"";const h=Math.floor(u/1e3),g=Math.floor(h/60),O=String(h%60).padStart(2,"0");return`${g}:${O}`},d=`
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
                ${A?`
                    <li class="artist-details-modal-list-item">
                        <h3 class="artist-details-modal-title">Sex</h3>
                        <p class="artist-details-modal-text">${A}</p>
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
                    <p class="artist-details-modal-text">${$}</p>
                </li>
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Biography</h3>
                    <p class="artist-details-modal-text">${M}</p>
                </li>
                </ul>
                
                ${Array.isArray(C)&&C.length?`<ul class="artist-details-modal-block-genres">${C.map(u=>`<li class="artist-details-modal-block-genres-item">${u}</li>`).join("")}</ul>`:""}
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
                        <td class="artist-details-modal-albums-list-table-text col-2">${l(g.intDuration)}</td>
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
        `;s.artistDetailsModal.innerHTML=`${d}`,s.artistDetailsModalBackdrope.querySelector(".artist-details-modal-close-btn").addEventListener("click",V),Je()}catch(t){E(t.message)}finally{et()}}s.artistsList.addEventListener("click",e=>{const t=e.target.closest(".artist-cta");if(!t)return;const a=t.dataset.artistId;a&&tt(a)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".feedback-backdrop"),t=document.querySelector(".feedback-modal-form"),a=document.getElementById("user-name"),r=document.getElementById("user-feedback"),n=document.getElementById("ratingValue"),i=t.querySelector(".feedback-modal-btn"),m=document.querySelectorAll("#myRating svg"),y=document.getElementById("ratingError");function A(l){y.textContent=l}function v(){y.textContent=""}m.forEach((l,d)=>{l.innerHTML=`<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
      1.402 8.173L12 18.897l-7.336 3.86 
      1.402-8.173L.132 9.21l8.2-1.192z"/>`,l.style.fill="#ffffff",l.style.cursor="pointer",l.addEventListener("click",()=>{n.value=d+1,m.forEach((p,u)=>p.style.fill=u<=d?"#764191":"#ffffff"),v()})});const $=document.querySelector(".leave-feedback-button");$&&$.addEventListener("click",()=>{t.reset(),n.value="0",v(),m.forEach(l=>l.style.fill="#ffffff"),b(a),b(r),e.classList.add("is-open"),document.body.style.overflow="hidden"});const M=()=>{e.classList.remove("is-open"),document.body.style.overflow=""};document.querySelector(".feedback-modal-close").addEventListener("click",M),e.addEventListener("click",l=>{l.target===e&&M()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&M()});const C=(l,d)=>{let p=l.nextElementSibling;(!p||!p.classList.contains("field-error"))&&(p=document.createElement("div"),p.classList.add("field-error"),l.insertAdjacentElement("afterend",p)),p.textContent=d,l.classList.add("input-error"),l.setAttribute("aria-invalid","true")},b=l=>{let d=l.nextElementSibling;d&&d.classList.contains("field-error")&&(d.textContent=""),l.classList.remove("input-error"),l.removeAttribute("aria-invalid")};t.addEventListener("submit",async l=>{var g,O;l.preventDefault(),b(a),b(r),v();const d=a.value.trim(),p=r.value.trim(),u=parseFloat(n.value);let h=!1;if((d.length<2||d.length>16)&&(C(a,"Name must be between 2 and 16 characters"),h=!0),(p.length<10||p.length>512)&&(C(r,"Message must be between 10 and 512 characters"),h=!0),(u<1||u>5)&&(A("Please provide a rating between 1 and 5"),h=!0),!h){i.disabled=!0;try{await Ee(d,u,p),se("Thank you! Your feedback has been submitted."),t.reset(),n.value="0",m.forEach(R=>R.style.fill="#ffffff"),M()}catch(R){alert("Server error: "+(((O=(g=R.response)==null?void 0:g.data)==null?void 0:O.message)||R.message))}finally{i.disabled=!1}}})});const D=document.querySelector(".scroll-to-top");let ee=window.scrollY,x=!1,te,W;window.addEventListener("scroll",()=>{clearTimeout(te),te=setTimeout(()=>{const e=window.scrollY,t=e<ee-70,r=window.innerHeight+e>=document.body.offsetHeight-10||t&&e>350;r&&!x?(D.classList.add("visible"),x=!0,clearTimeout(W),W=setTimeout(()=>{D.classList.remove("visible"),x=!1},2e3)):!r&&x&&(D.classList.remove("visible"),x=!1,clearTimeout(W)),ee=e},70)});D.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
