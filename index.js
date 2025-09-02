import{i as U,a as E,g as $,P as ne,S as oe,b as ie,N as le}from"./assets/vendor-DZ7zuj1H.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const s={feedbacksContainer:document.querySelector(".feedbacks-container"),artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),loader:document.querySelector(".loader"),btnSearch:document.querySelector(".search-and-filters-toggle"),searchInput:document.querySelector(".search-input"),searchBtnRequest:document.querySelector(".search-btn"),iconSearch:document.querySelector(".dropdown-icon-search"),iconSort:document.querySelector(".sort-icon"),iconGenres:document.querySelector(".genres-icon"),loaderArtistsWrapper:document.querySelector(".artists-loader-container"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link"),artistDetailsModalBackdrope:document.querySelector(".artist-details-backdrop"),heroBtn:document.querySelector(".hero-btn"),resetBtn:document.querySelector(".filters-reset-btn"),feedbackLoader:document.querySelector(".feedback-loader"),feedbackLoaderContainer:document.querySelector(".feedback-loader-container")},ce="https://sound-wave.b.goit.study/api",w={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},W=8,de=10;//!======================================================
function k(e="Something went wrong. Please try again later.",t="topCenter"){U.error({title:"",message:e,position:t,timeout:3e3,progressBar:!1})}function te(e="Thank you! Your feedback means a lot to us.",t="topCenter",a="ico-success"){U.success({title:"",message:e,position:t,timeout:3e3,progressBar:!1,icon:a})}function ue(e="We couldn’t load the reviews. Please try again later.",t="topRight"){U.error({title:"",message:e,position:t,timeout:3e3,progressBar:!1})}//!======================================================
function B(){s.loaderArtistsWrapper.classList.add("hidden")}function G(){s.loaderArtistsWrapper.classList.remove("hidden")}//!======================================================
function me(){var e,t,a,r;(e=s.feedbackLoader)==null||e.classList.add("hidden"),(t=s.feedbackLoaderContainer)==null||t.classList.add("hidden"),(a=s.feedbackLoaderContainer)==null||a.setAttribute("aria-hidden","true"),(r=s.feedbackLoader)==null||r.setAttribute("aria-hidden","true")}function pe(){var e,t,a,r;(e=s.feedbackLoaderContainer)==null||e.classList.remove("hidden"),(t=s.feedbackLoader)==null||t.classList.remove("hidden"),(a=s.feedbackLoaderContainer)==null||a.setAttribute("aria-hidden","false"),(r=s.feedbackLoader)==null||r.setAttribute("aria-hidden","false")}//!======================================================
document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:e,mobileMenu:t,menuLinks:a}=s;function r(){t.classList.add("active"),e.classList.add("active")}function n(){t.classList.remove("active"),e.classList.remove("active")}e==null||e.addEventListener("click",()=>{t.classList.contains("active")?n():r()}),a==null||a.forEach(i=>i.addEventListener("click",n))});E.defaults.baseURL=ce;const V=async e=>{const{data:t}=await E.get(`${w.ARTISTS}?limit=${W}&page=${e}`);return t},fe=async e=>{const{data:t}=await E.get(`${w.ARTIST_BY_ID}${e}`);return t},he=async e=>{const{data:t}=await E.get(`${w.ARTIST_BY_ID}${e}${w.ARTIST_ALBUMS_BY_ID}`);return t},ge=async(e=1)=>{const{data:t}=await E.get(`${w.FEEDBACKS}?limit=${de}&page=${e}`);return t},be=async()=>{const{data:e}=await E.get(`${w.GENRES}`);return e},x=async({name:e,page:t=1,sorted:a="0",genre:r=""})=>{const{data:n}=await E.get(`${w.ARTISTS}?limit=${W}&page=${t}${e!=null&&e.length?`&name=${e}`:""}${a==="2"?"&sortName=desc":a==="1"?"&sortName=asc":""}${r?`&genre=${r}`:""}`);return n},ye=async(e,t,a)=>{await E.post(`${w.FEEDBACKS}`,{name:e,rating:t,descr:a})},o={tlOpenSearch:window.matchMedia("(min-width: 1440px)").matches?null:$.timeline({paused:!0}).to(s.iconSearch,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSearch:window.matchMedia("(min-width: 1440px)").matches?null:$.timeline({paused:!0}).to(s.iconSearch,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenSort:$.timeline({paused:!0}).to(s.iconSort,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuSort,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuSort.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSort:$.timeline({paused:!0}).to(s.iconSort,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuSort,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenGenres:$.timeline({paused:!0}).to(s.iconGenres,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseGenres:$.timeline({paused:!0}).to(s.iconGenres,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0)};o.tlOpenSort.eventCallback("onStart",()=>{var e;(e=o.tlCloseSort)==null||e.pause(0).progress(0)});o.tlCloseSort.eventCallback("onStart",()=>{var e;(e=o.tlOpenSort)==null||e.pause(0).progress(0)});let c={name:"",page:1,sorted:0,genre:""};Se();ke();ve();Le();we();Ae();$e();Ce();function ve(){s.searchInput.addEventListener("input",()=>{c.name=s.searchInput.value.trim()});const e=async()=>{var t;if(!((t=c.name)!=null&&t.length)){te("Silence from you","topCenter",null);return}G();try{const{artists:a}=await x(c);s.artistsList.innerHTML="",L(a)}catch(a){k(`Silence due problem ${a}`)}B(),window.matchMedia("(min-width: 1440px)")||o.tlCloseSearch.play(0)};s.searchBtnRequest.addEventListener("click",e),s.searchInput.addEventListener("keydown",t=>{t.key==="Enter"&&e()})}async function Se(){try{const t='<li data-value="all">All Genres</li>'+(await be()).map(({genre:a})=>`<li data-value="${a}">${a}</li>`).join("");s.menuGenres.insertAdjacentHTML("beforeend",t)}catch(e){k(`While loading genres ${e}`)}}function Le(){const e=t=>{document.querySelector(".artists-dropdown-sort").contains(t.target)||(o.tlCloseSort.restart(),o.tlCloseGenres.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"))};s.btnSort.addEventListener("click",t=>{t.stopPropagation(),s.menuSort.classList.contains("open")?(o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")):(o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"),o.tlCloseSort.pause(0),o.tlOpenSort.restart(),s.btnSort.classList.add("open"),s.menuSort.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuSort.addEventListener("click",async t=>{const a=t.target.closest("li");if(a){s.btnSort.querySelector(".dropdown-label").textContent=a.textContent,s.btnSort.dataset.value=a.dataset.value,c.sorted=a.dataset.value,G();try{const{artists:r}=await x(c);s.artistsList.innerHTML="",L(r)}catch(r){k(`Silence due problem ${r}`)}B(),o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")}})}async function we(){const e=t=>{document.querySelector(".artists-dropdown-genres").contains(t.target)||(o.tlCloseGenres.restart(),o.tlCloseSort.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"))};s.btnGenres.addEventListener("click",t=>{t.stopPropagation(),s.menuGenres.classList.contains("open")?(o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")):(o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"),o.tlCloseGenres.pause(0),o.tlOpenGenres.restart(),s.btnGenres.classList.add("open"),s.menuGenres.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuGenres.addEventListener("click",async t=>{const a=t.target.closest("li");if(a){s.btnGenres.querySelector(".dropdown-label").textContent=a.textContent,s.btnGenres.dataset.value=a.dataset.value,c.genre=a.textContent==="All Genres"?"":a.textContent,G();try{const{artists:r}=await x(c);s.artistsList.innerHTML="",L(r)}catch(r){k(`Silence due problem ${r}`)}B(),o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")}})}function ke(){if(window.matchMedia("(min-width: 1440px)").matches)return;const e=t=>{document.querySelector(".filters-content").contains(t.target)||(o.tlCloseSearch.play(0),document.removeEventListener("click",e))};s.btnSearch.addEventListener("click",t=>{t.stopPropagation(),$.isTweening(s.panelSearch)||s.panelSearch.style.pointerEvents==="auto"?(o.tlOpenSearch.pause(0),o.tlCloseSearch.restart(),document.removeEventListener("click",e)):(o.tlCloseSearch.pause(0),o.tlOpenSearch.restart(),document.addEventListener("click",e))})}async function Ee(){c={name:"",page:1,sorted:0,genre:""},s.btnGenres.querySelector(".dropdown-label").textContent="Genre",s.btnSort.querySelector(".dropdown-label").textContent="Sorting",s.searchInput.value="",G();try{s.artistsList.innerHTML="";const{artists:e}=await x(c);L(e)}catch(e){k(`Silence due problem ${e}`)}B(),o.tlCloseGenres.play(0),o.tlCloseSort.play(0)}function Ae(){s.resetBtn.addEventListener("click",Ee)}function $e(){s.heroBtn.addEventListener("click",e=>{e.preventDefault(),document.querySelector("#artists").scrollIntoView({behavior:"smooth"})})}function Ce(){document.querySelectorAll("button").forEach(e=>{e.addEventListener("click",()=>{e.blur()})})}const Me=window.matchMedia("(max-width: 767.98px)").matches,Te=Me?3:5;let f=null,P=!1,A=!1;function qe(){return`
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
  `}function Be(){let e=document.querySelector("[data-no-artists]");return e||(s.artistsList.insertAdjacentHTML("afterend",qe()),e=document.querySelector("[data-no-artists]"),e.addEventListener("click",t=>{var a;t.target.closest(".btn-reset-filters")&&((a=document.querySelector('[data-action="filters-reset"]'))==null||a.click(),document.dispatchEvent(new CustomEvent("filters:reset")))})),e}function Ge(){Be().classList.remove("is-hidden")}function z(){var e;(e=document.querySelector("[data-no-artists]"))==null||e.classList.add("is-hidden")}function q(e,t=0){const a=document.querySelector("#tui-pagination");a&&a.classList.toggle("hidden",!e||t<=0)}function H(){return!!(c.name&&c.name.trim().length||c.genre&&c.genre!=="all"||c.sorted&&Number(c.sorted)!==0)}async function Q({init:e=!1}={}){G();try{e&&(c.page=1);const a=H()?await x(c):await V(c.page),r=a.artists??[],n=Number(a.totalArtists)||0;if(n===0&&(f&&f.reset(0),q(!1,0)),s.artistsList.innerHTML="",L(r),e){f||(A=!0,f=new ne("#tui-pagination",{totalItems:n,itemsPerPage:W,page:c.page||1,visiblePages:Te,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn is-active" aria-current="page">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',disabledMoveButton:'<span class="tui-page-btn is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',moreButton:'<span class="tui-page-btn tui-ellipsis">…</span>'}}),f.on("afterMove",async({page:d})=>{if(!P){P=!0,G();try{c.page=d,s.artistsList.innerHTML="";const h=H()?await x(c):await V(d),g=h.artists??[];L(g),q(g.length>0,Number(h==null?void 0:h.totalArtists)||0),A||requestAnimationFrame(xe)}catch{k("Failed to fetch artists"),L([]),q(!1,0)}finally{P=!1,A=!1,B()}}})),f.reset(n);const i=c.page||1;f.getCurrentPage()!==i?(A=!0,f.movePageTo(i)):A=!0}else if(f){f.reset(n);const i=c.page||1;f.getCurrentPage()!==i?(A=!0,f.movePageTo(i)):A=!0}q(n>0,n)}catch{H()&&k("Failed to fetch artists"),s.artistsList.innerHTML="",L([]),q(!1,0)}finally{B()}}function L(e=[]){const t=new URL("/developers-orchestra-project/assets/icons-B2bnHc1q.svg",import.meta.url).href;if(!Array.isArray(e)||e.length===0){z(),s.artistsList.innerHTML="",Ge(),q(!1,0),document.dispatchEvent(new Event("artists:updated"));return}z();const a=e.map(({_id:r,strArtist:n="Unknown",strArtistThumb:i,strBiographyEN:d="",genres:b=[]})=>{const h=i||"https://placehold.co/736x414?text=No+Image",g=Array.isArray(b)&&b.length?`<ul class="artist-tags">${b.map(C=>`<li class="tag">${C}</li>`).join("")}</ul>`:'<ul class="artist-tags" aria-hidden="true"></ul>';return`
          <li class="artists-item">
            <div class="artist-card" data-id="${r}">
              <img
                src="${h}"
                alt="${n} — portrait"
                class="artist-img"
                loading="lazy"
                decoding="async"
                width="736" height="414"
              >
              ${g}
              <h3 class="artist-name">${n}</h3>
              ${d?`<p class="artist-desc text-clamp-3">${d}</p>`:""}
              <button class="artist-cta" type="button" data-artist-id="${r}" aria-label="Learn more about ${n}">
                Learn More
                <svg class="artist-cta-icon" width="16" height="16" aria-hidden="true">
                  <use href="${t}#icon-arrow-1"></use>
                </svg>
              </button>
            </div>
          </li>`}).join("");s.artistsList.insertAdjacentHTML("beforeend",a),document.dispatchEvent(new Event("artists:updated"))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{c.page=1,Q({init:!0})}):(c.page=1,Q({init:!0}));function xe(){const e=document.querySelector(".js-artists-top");if(!e)return;let t=parseFloat(getComputedStyle(e).scrollMarginTop)||0;t||(t=window.matchMedia("(min-width:1440px)").matches?112:window.matchMedia("(min-width:768px)").matches?96:120,e.style.scrollMarginTop=`${t}px`);const a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({block:"start",inline:"nearest",behavior:a?"auto":"smooth"})}const Ie=5;function Oe(e){const t=De(e),a=se(e);return`
    <div class="${t}" role="img" aria-label="Rating ${a} out of 5">
      <div class="star-container">
        ${Pe(a,Ie)}
      </div>
    </div>`}function Re({descr:e,name:t,rating:a}){return`
    <div class="swiper-slide feedback-card">
      ${Oe(a)}
      <p class="feedback-text">"${e}"</p>
      <p class="feedback-author">${t}</p>
    </div>`}function Ne(e){const t=e.map(Re).join("");s.feedbacksContainer.insertAdjacentHTML("beforeend",t)}function se(e){const t=Number(e);return Math.min(5,Math.max(0,Number.isNaN(t)?0:t))}function De(e){const t=se(e),a=Math.floor(t),r=t%1>=.5;return`rating medium star-icon label-hidden value-${a} ${r?"half":""}`}function Pe(e,t){const a=Math.floor(e),r=e%1>=.5;return Array.from({length:t},(n,i)=>i<a?F("full"):F(i===a&&r?"half":"empty")).join("")}function F(e){return`
    <div class="star">
      <span class="star-empty">${_()}</span>
      <span class="star-half" ${e==="half"?"":'style="display:none" aria-hidden="true"'}>
        ${_()}
      </span>
      <span class="star-filled" ${e==="full"?"":'style="display:none" aria-hidden="true"'}>
        ${_()}
      </span>
    </div>`}function _(){return`
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
        1.402 8.173L12 18.897l-7.336 3.86 
        1.402-8.173L.132 9.21l8.2-1.192z"></path>
    </svg>`}let N=null;async function He(){var t;const e=document.querySelector("#reviews");e==null||e.setAttribute("data-state","loading"),e==null||e.setAttribute("aria-busy","true"),pe();try{if(N)return;const a=((t=document.fonts)==null?void 0:t.ready)??Promise.resolve(),r=await ge(1);await a;const n=Array.isArray(r==null?void 0:r.data)?r.data:[];n.length?Ne(n):J(),N=new oe(".swiper",{modules:[ie,le],slidesPerView:1,spaceBetween:30,pagination:{el:".swiper-pagination",clickable:!1,renderBullet:Fe},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:X}}),X(N),N.update(),e==null||e.setAttribute("data-state","ready"),e==null||e.setAttribute("aria-busy","false")}catch{ue(),J(),e==null||e.setAttribute("data-state","ready"),e==null||e.setAttribute("aria-busy","false")}finally{me()}}He();function Fe(e,t){return e<3?`<span class="${t}"></span>`:""}function X(e){Ye(e),Ue(e)}const _e=document.querySelector(".swiper-button-prev"),je=document.querySelector(".swiper-button-next"),j=document.querySelector(".swiper-pagination");function Ye(e){_e.classList.toggle("swiper-button-disabled",e.activeIndex===0),je.classList.toggle("swiper-button-disabled",e.activeIndex===e.slides.length-1)}function Ue(e){const t=j==null?void 0:j.querySelectorAll("span");if(!t.length)return;if(t.forEach(n=>n.classList.remove("swiper-pagination-bullet-active")),t.length===1){t[0].classList.add("swiper-pagination-bullet-active");return}const a=e.activeIndex===0,r=e.activeIndex===e.slides.length-1;t.length>=3?(a?t[0]:r?t[2]:t[1]).classList.add("swiper-pagination-bullet-active"):(a?t[0]:t[1]).classList.add("swiper-pagination-bullet-active")}function J(){var e,t;s.feedbacksContainer.insertAdjacentHTML("beforeend",`
    <div class="swiper-slide feedback-card">
      <p class="feedback-text">We are waiting for your feedback! Be the first to share your impressions.</p>
    </div>`),(e=document.querySelector(".swiper-nav"))==null||e.classList.add("hidden"),(t=document.querySelector(".swiper-pagination"))==null||t.classList.add("hidden")}function We(){s.artistDetailsModalBackdrope.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",ae),s.artistDetailsModalBackdrope.addEventListener("click",re)}function K(){s.artistDetailsModalBackdrope.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",ae),s.artistDetailsModalBackdrope.removeEventListener("click",re)}function ae(e){e.key==="Escape"&&K()}function re(e){e.target===s.artistDetailsModalBackdrope&&K()}function Ke(){var e;(e=s.loader)==null||e.classList.remove("is-hidden")}function Ve(){var e;(e=s.loader)==null||e.classList.add("is-hidden")}async function ze(e){try{Ke();const t=await fe(e),a=await he(e),r=(a==null?void 0:a.albumsList)||[],{intFormedYear:n,intDiedYear:i,strArtist:d,strArtistThumb:b,strGender:h,intMembers:g,strCountry:C,strBiographyEN:M,genres:T}=t;let S;n&&i?S=`${n} - ${t.intDiedYear}`:n&&!i?S=`${n} - present`:S="information missing";const l=m=>{if(!m||isNaN(m))return"";const y=Math.floor(m/1e3),v=Math.floor(y/60),O=String(y%60).padStart(2,"0");return`${v}:${O}`},u=`
        <div class="artist-details-modal-content">
            <button class="artist-details-modal-close-btn" type="button">
                <svg class="modal-svg" width="32" height="32">
                    <use href="/img/icons.svg#icon-close"></use>
                </svg>
            </button> 

            <h2 class="artist-details-modal-main-title">${d}</h2>
            <div class="artist-details-modal-main-block">
                <img class="artist-details-modal-img" src="${b}" alt="${t.name}" />

                <div class="artist-details-modal-info">
                <ul class="artist-details-modal-list">
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Years active</h3>
                    <p  class="artist-details-modal-text">${S}</p>
                </li>
                ${h?`
                    <li class="artist-details-modal-list-item">
                        <h3 class="artist-details-modal-title">Sex</h3>
                        <p class="artist-details-modal-text">${h}</p>
                    </li>
                    `:""}
                ${g?`
                    <li class="artist-details-modal-list-item">
                        <h3 class="artist-details-modal-title">Members</h3>
                        <p class="artist-details-modal-text">${g}</p>
                    </li>
                    `:""}
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Country</h3>
                    <p class="artist-details-modal-text">${C}</p>
                </li>
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Biography</h3>
                    <p class="artist-details-modal-text">${M}</p>
                </li>
                </ul>
                
                ${Array.isArray(T)&&T.length?`<ul class="artist-details-modal-block-genres">${T.map(m=>`<li class="artist-details-modal-block-genres-item">${m}</li>`).join("")}</ul>`:""}
            </div>
            </div>
            <h3 class="artist-details-modal-albums">Albums</h3>
            <div class="artist-details-modal-albums-wrap">
            ${r.length>0?r.map(m=>{var y;return`
                <div class="artist-details-modal-albums-list">
                <h4 class="artist-details-modal-albums-list-title">${m.strAlbum}</h4>
                <table>
                <thead class="artist-details-modal-albums-list-table-head">
                    <tr>
                    <th class="artist-details-modal-albums-list-table col-1">Track</th>
                    <th class="artist-details-modal-albums-list-table col-2">Time</th>
                    <th class="artist-details-modal-albums-list-table col-3">Link</th>
                    </tr>
                </thead>
                <tbody class="artist-details-modal-albums-list-table-body">
                    ${((y=m.tracks)==null?void 0:y.map(v=>`
                    <tr>
                        <td class="artist-details-modal-albums-list-table-text col-1">${v.strTrack}</td>
                        <td class="artist-details-modal-albums-list-table-text col-2">${l(v.intDuration)}</td>
                        <td class= "col-3">
                            ${v.movie&&v.movie!=="null"?`
                                <a class="modal-link-youtube" href="${v.movie}" target="_blank">
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
        `;s.artistDetailsModal.innerHTML=`${u}`,s.artistDetailsModalBackdrope.querySelector(".artist-details-modal-close-btn").addEventListener("click",K),We()}catch(t){k(t.message)}finally{Ve()}}s.artistsList.addEventListener("click",e=>{const t=e.target.closest(".artist-cta");if(!t)return;const a=t.dataset.artistId;a&&ze(a)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".feedback-backdrop"),t=document.querySelector(".feedback-modal-form"),a=document.getElementById("user-name"),r=document.getElementById("user-feedback"),n=document.getElementById("ratingValue"),i=t.querySelector(".feedback-modal-btn"),d=document.querySelectorAll("#myRating svg"),b=document.getElementById("ratingError");function h(l){b.textContent=l}function g(){b.textContent=""}d.forEach((l,u)=>{l.innerHTML=`<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
      1.402 8.173L12 18.897l-7.336 3.86 
      1.402-8.173L.132 9.21l8.2-1.192z"/>`,l.style.fill="#ffffff",l.style.cursor="pointer",l.addEventListener("click",()=>{n.value=u+1,d.forEach((p,m)=>p.style.fill=m<=u?"#764191":"#ffffff"),g()})});const C=document.querySelector(".leave-feedback-button");C&&C.addEventListener("click",()=>{t.reset(),n.value="0",g(),d.forEach(l=>l.style.fill="#ffffff"),S(a),S(r),e.classList.add("is-open"),document.body.style.overflow="hidden"});const M=()=>{e.classList.remove("is-open"),document.body.style.overflow=""};document.querySelector(".feedback-modal-close").addEventListener("click",M),e.addEventListener("click",l=>{l.target===e&&M()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&M()});const T=(l,u)=>{let p=l.nextElementSibling;(!p||!p.classList.contains("field-error"))&&(p=document.createElement("div"),p.classList.add("field-error"),l.insertAdjacentElement("afterend",p)),p.textContent=u,l.classList.add("input-error"),l.setAttribute("aria-invalid","true")},S=l=>{let u=l.nextElementSibling;u&&u.classList.contains("field-error")&&(u.textContent=""),l.classList.remove("input-error"),l.removeAttribute("aria-invalid")};t.addEventListener("submit",async l=>{var v,O;l.preventDefault(),S(a),S(r),g();const u=a.value.trim(),p=r.value.trim(),m=parseFloat(n.value);let y=!1;if((u.length<2||u.length>16)&&(T(a,"Name must be between 2 and 16 characters"),y=!0),(p.length<10||p.length>512)&&(T(r,"Message must be between 10 and 512 characters"),y=!0),(m<1||m>5)&&(h("Please provide a rating between 1 and 5"),y=!0),!y){i.disabled=!0;try{await ye(u,m,p),te("Thank you! Your feedback has been submitted."),t.reset(),n.value="0",d.forEach(R=>R.style.fill="#ffffff"),M()}catch(R){alert("Server error: "+(((O=(v=R.response)==null?void 0:v.data)==null?void 0:O.message)||R.message))}finally{i.disabled=!1}}})});const D=document.querySelector(".scroll-to-top");let Z=window.scrollY,I=!1,ee,Y;window.addEventListener("scroll",()=>{clearTimeout(ee),ee=setTimeout(()=>{const e=window.scrollY,t=e<Z-70,r=window.innerHeight+e>=document.body.offsetHeight-10||t&&e>350;r&&!I?(D.classList.add("visible"),I=!0,clearTimeout(Y),Y=setTimeout(()=>{D.classList.remove("visible"),I=!1},2e3)):!r&&I&&(D.classList.remove("visible"),I=!1,clearTimeout(Y)),Z=e},70)});D.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
