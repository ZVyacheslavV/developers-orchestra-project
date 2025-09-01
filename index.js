import{i as J,a as E,g as A,P as te,S as se,b as ae,N as re}from"./assets/vendor-DZ7zuj1H.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const s={feedbacksContainer:document.querySelector(".feedbacks-container"),artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),loader:document.querySelector(".loader"),btnSearch:document.querySelector(".search-and-filters-toggle"),searchInput:document.querySelector(".search-input"),searchBtnRequest:document.querySelector(".search-btn"),iconSearch:document.querySelector(".dropdown-icon-search"),iconSort:document.querySelector(".sort-icon"),iconGenres:document.querySelector(".genres-icon"),loaderArtistsWrapper:document.querySelector(".artists-loader-container"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link"),artistDetailsModalBackdrope:document.querySelector(".artist-details-backdrop"),heroBtn:document.querySelector(".hero-btn"),resetBtn:document.querySelector(".filters-reset-btn"),feedbackLoader:document.querySelector(".feedback-loader"),feedbackLoaderContainer:document.querySelector(".feedback-loader-container")},ne="https://sound-wave.b.goit.study/api",k={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},_=8,oe=10;//!======================================================
function L(e="Something went wrong. Please try again later.",t="topCenter"){J.error({title:"",message:e,position:t,timeout:3e3,progressBar:!1})}function ie(e="We couldn’t load the reviews. Please try again later.",t="topRight"){J.error({title:"",message:e,position:t,timeout:3e3,progressBar:!1})}//!======================================================
function q(){s.loaderArtistsWrapper.classList.add("hidden")}function G(){s.loaderArtistsWrapper.classList.remove("hidden")}//!======================================================
function le(){var e,t,a,r;(e=s.feedbackLoader)==null||e.classList.add("hidden"),(t=s.feedbackLoaderContainer)==null||t.classList.add("hidden"),(a=s.feedbackLoaderContainer)==null||a.setAttribute("aria-hidden","true"),(r=s.feedbackLoader)==null||r.setAttribute("aria-hidden","true")}function ce(){var e,t,a,r;(e=s.feedbackLoaderContainer)==null||e.classList.remove("hidden"),(t=s.feedbackLoader)==null||t.classList.remove("hidden"),(a=s.feedbackLoaderContainer)==null||a.setAttribute("aria-hidden","false"),(r=s.feedbackLoader)==null||r.setAttribute("aria-hidden","false")}//!======================================================
document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:e,mobileMenu:t,menuLinks:a}=s;function r(){t.classList.add("active"),e.classList.add("active")}function n(){t.classList.remove("active"),e.classList.remove("active")}e==null||e.addEventListener("click",()=>{t.classList.contains("active")?n():r()}),a==null||a.forEach(i=>i.addEventListener("click",n))});E.defaults.baseURL=ne;const Y=async e=>{const{data:t}=await E.get(`${k.ARTISTS}?limit=${_}&page=${e}`);return t},de=async e=>{const{data:t}=await E.get(`${k.ARTIST_BY_ID}${e}`);return t},ue=async e=>{const{data:t}=await E.get(`${k.ARTIST_BY_ID}${e}${k.ARTIST_ALBUMS_BY_ID}`);return t},pe=async(e=1)=>{const{data:t}=await E.get(`${k.FEEDBACKS}?limit=${oe}&page=${e}`);return t},me=async()=>{const{data:e}=await E.get(`${k.GENRES}`);return e},x=async({name:e,page:t=1,sorted:a="0",genre:r=""})=>{const{data:n}=await E.get(`${k.ARTISTS}?limit=${_}&page=${t}${e!=null&&e.length?`&name=${e}`:""}${a==="2"?"&sortName=desc":a==="1"?"&sortName=asc":""}${r?`&genre=${r}`:""}`);return n},fe=async(e,t,a)=>{await E.post(`${k.FEEDBACKS}`,{name:e,rating:t,descr:a})},o={tlOpenSearch:window.matchMedia("(min-width: 1440px)").matches?null:A.timeline({paused:!0}).to(s.iconSearch,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSearch:window.matchMedia("(min-width: 1440px)").matches?null:A.timeline({paused:!0}).to(s.iconSearch,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenSort:A.timeline({paused:!0}).to(s.iconSort,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuSort,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuSort.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSort:A.timeline({paused:!0}).to(s.iconSort,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuSort,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenGenres:A.timeline({paused:!0}).to(s.iconGenres,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseGenres:A.timeline({paused:!0}).to(s.iconGenres,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0)};o.tlOpenSort.eventCallback("onStart",()=>{var e;(e=o.tlCloseSort)==null||e.pause(0).progress(0)});o.tlCloseSort.eventCallback("onStart",()=>{var e;(e=o.tlOpenSort)==null||e.pause(0).progress(0)});let c={name:"",page:1,sorted:0,genre:""};ge();ye();he();be();ve();Se();Le();we();function he(){s.searchInput.addEventListener("input",()=>{c.name=s.searchInput.value.trim()});const e=async()=>{var t;if(!((t=c.name)!=null&&t.length)){L("Silence from you");return}G();try{const{artists:a}=await x(c);s.artistsList.innerHTML="",w(a)}catch(a){L(`Silence due problem ${a}`)}q(),window.matchMedia("(min-width: 1440px)")||o.tlCloseSearch.play(0)};s.searchBtnRequest.addEventListener("click",e),s.searchInput.addEventListener("keydown",t=>{t.key==="Enter"&&e()})}async function ge(){try{const t='<li data-value="all">All Genres</li>'+(await me()).map(({genre:a})=>`<li data-value="${a}">${a}</li>`).join("");s.menuGenres.insertAdjacentHTML("beforeend",t)}catch(e){L(`While loading genres ${e}`)}}function be(){const e=t=>{document.querySelector(".artists-dropdown-sort").contains(t.target)||(o.tlCloseSort.restart(),o.tlCloseGenres.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"))};s.btnSort.addEventListener("click",t=>{t.stopPropagation(),s.menuSort.classList.contains("open")?(o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")):(o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"),o.tlCloseSort.pause(0),o.tlOpenSort.restart(),s.btnSort.classList.add("open"),s.menuSort.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuSort.addEventListener("click",async t=>{const a=t.target.closest("li");if(a){s.btnSort.querySelector(".dropdown-label").textContent=a.textContent,s.btnSort.dataset.value=a.dataset.value,c.sorted=a.dataset.value,G();try{const{artists:r}=await x(c);s.artistsList.innerHTML="",w(r)}catch(r){L(`Silence due problem ${r}`)}q(),o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")}})}async function ve(){const e=t=>{document.querySelector(".artists-dropdown-genres").contains(t.target)||(o.tlCloseGenres.restart(),o.tlCloseSort.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"))};s.btnGenres.addEventListener("click",t=>{t.stopPropagation(),s.menuGenres.classList.contains("open")?(o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")):(o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"),o.tlCloseGenres.pause(0),o.tlOpenGenres.restart(),s.btnGenres.classList.add("open"),s.menuGenres.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuGenres.addEventListener("click",async t=>{const a=t.target.closest("li");if(a){s.btnGenres.querySelector(".dropdown-label").textContent=a.textContent,s.btnGenres.dataset.value=a.dataset.value,c.genre=a.textContent==="All Genres"?"":a.textContent,G();try{const{artists:r}=await x(c);s.artistsList.innerHTML="",w(r)}catch(r){L(`Silence due problem ${r}`)}q(),o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")}})}function ye(){if(window.matchMedia("(min-width: 1440px)").matches)return;const e=t=>{document.querySelector(".filters-content").contains(t.target)||(o.tlCloseSearch.play(0),document.removeEventListener("click",e))};s.btnSearch.addEventListener("click",t=>{t.stopPropagation(),A.isTweening(s.panelSearch)||s.panelSearch.style.pointerEvents==="auto"?(o.tlOpenSearch.pause(0),o.tlCloseSearch.restart(),document.removeEventListener("click",e)):(o.tlCloseSearch.pause(0),o.tlOpenSearch.restart(),document.addEventListener("click",e))})}function Se(){const e=async()=>{c={name:"",page:1,sorted:0,genre:""},s.btnGenres.querySelector(".dropdown-label").textContent="Genre",s.btnSort.querySelector(".dropdown-label").textContent="Sorting",s.searchInput.value="",G();try{s.artistsList.innerHTML="";const{artists:t}=await x(c);w(t)}catch(t){L(`Silence due problem ${t}`)}q(),o.tlCloseGenres.play(0),o.tlCloseSort.play(0)};s.resetBtn.addEventListener("click",e)}function Le(){s.heroBtn.addEventListener("click",e=>{e.preventDefault(),document.querySelector("#artists").scrollIntoView({behavior:"smooth"})})}function we(){document.querySelectorAll("button").forEach(e=>{e.addEventListener("click",()=>{e.blur()})})}const ke=window.matchMedia("(max-width: 767.98px)").matches,Ee=ke?3:5;let f=null,N=!1,$=!1;function $e(){return`
    <div class="no-artists is-hidden" data-no-artists>
      <svg class="no-artists-icon" width="40" height="40" aria-hidden="true">
        <use href="${new URL("/developers-orchestra-project/assets/icons-BW1fWait.svg",import.meta.url).href}#icon-error"></use>
      </svg>
      <h2 class="no-artists-title">Silence on the stage…</h2>
      <p class="no-artists-text">
        Looks like no artists match your filters.<br />
        Try changing them or hit “Reset Filters” to bring back the beat.
      </p>
      <button class="btn-reset-filters" type="button">Reset filters</button>
    </div>
  `}function Ae(){let e=document.querySelector("[data-no-artists]");return e||(s.artistsList.insertAdjacentHTML("afterend",$e()),e=document.querySelector("[data-no-artists]"),e.addEventListener("click",t=>{var a;t.target.closest(".btn-reset-filters")&&((a=document.querySelector('[data-action="filters-reset"]'))==null||a.click(),document.dispatchEvent(new CustomEvent("filters:reset")))})),e}function Ce(){Ae().classList.remove("is-hidden")}function U(){var e;(e=document.querySelector("[data-no-artists]"))==null||e.classList.add("is-hidden")}function B(e,t=0){const a=document.querySelector("#tui-pagination");a&&a.classList.toggle("hidden",!e||t<=0)}function H(){return!!(c.name&&c.name.trim().length||c.genre&&c.genre!=="all"||c.sorted&&Number(c.sorted)!==0)}async function W({init:e=!1}={}){G();try{e&&(c.page=1);const a=H()?await x(c):await Y(c.page),r=a.artists??[],n=Number(a.totalArtists)||0;if(n===0&&(f&&f.reset(0),B(!1,0)),s.artistsList.innerHTML="",w(r),e){f||($=!0,f=new te("#tui-pagination",{totalItems:n,itemsPerPage:_,page:c.page||1,visiblePages:Ee,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn is-active" aria-current="page">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',disabledMoveButton:'<span class="tui-page-btn is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',moreButton:'<span class="tui-page-btn tui-ellipsis">…</span>'}}),f.on("afterMove",async({page:d})=>{if(!N){N=!0,G();try{c.page=d,s.artistsList.innerHTML="";const h=H()?await x(c):await Y(d),g=h.artists??[];w(g),B(g.length>0,Number(h==null?void 0:h.totalArtists)||0),$||requestAnimationFrame(Me)}catch{L("Failed to fetch artists"),w([]),B(!1,0)}finally{N=!1,$=!1,q()}}})),f.reset(n);const i=c.page||1;f.getCurrentPage()!==i?($=!0,f.movePageTo(i)):$=!0}else if(f){f.reset(n);const i=c.page||1;f.getCurrentPage()!==i?($=!0,f.movePageTo(i)):$=!0}B(n>0,n)}catch{H()&&L("Failed to fetch artists"),s.artistsList.innerHTML="",w([]),B(!1,0)}finally{q()}}function w(e=[]){const t=new URL("/developers-orchestra-project/assets/icons-BW1fWait.svg",import.meta.url).href;if(!Array.isArray(e)||e.length===0){U(),s.artistsList.innerHTML="",Ce(),B(!1,0),document.dispatchEvent(new Event("artists:updated"));return}U();const a=e.map(({_id:r,strArtist:n="Unknown",strArtistThumb:i,strBiographyEN:d="",genres:b=[]})=>{const h=i||"https://placehold.co/736x414?text=No+Image",g=Array.isArray(b)&&b.length?`<ul class="artist-tags">${b.map(C=>`<li class="tag">${C}</li>`).join("")}</ul>`:'<ul class="artist-tags" aria-hidden="true"></ul>';return`
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
          </li>`}).join("");s.artistsList.insertAdjacentHTML("beforeend",a),document.dispatchEvent(new Event("artists:updated"))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{c.page=1,W({init:!0})}):(c.page=1,W({init:!0}));function Me(){const e=document.querySelector(".js-artists-top");if(!e)return;let t=parseFloat(getComputedStyle(e).scrollMarginTop)||0;t||(t=window.matchMedia("(min-width:1440px)").matches?112:window.matchMedia("(min-width:768px)").matches?96:120,e.style.scrollMarginTop=`${t}px`);const a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({block:"start",inline:"nearest",behavior:a?"auto":"smooth"})}function Te(e){const t=Ie(e),a=X(e),r=`
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
        1.402 8.173L12 18.897l-7.336 3.86 
        1.402-8.173L.132 9.21l8.2-1.192z"></path>
    </svg>`;return`
    <div class="${t}" aria-label="Rating ${a} out of 5">
      <div class="star-container">
        <div class="star"><span class="star-empty">${r}</span><span class="star-half">${r}</span><span class="star-filled">${r}</span></div>
        <div class="star"><span class="star-empty">${r}</span><span class="star-half">${r}</span><span class="star-filled">${r}</span></div>
        <div class="star"><span class="star-empty">${r}</span><span class="star-half">${r}</span><span class="star-filled">${r}</span></div>
        <div class="star"><span class="star-empty">${r}</span><span class="star-half">${r}</span><span class="star-filled">${r}</span></div>
        <div class="star"><span class="star-empty">${r}</span><span class="star-half">${r}</span><span class="star-filled">${r}</span></div>
      </div>
    </div>`}function Be(e){return Te(e)}function qe({descr:e,name:t,rating:a}){return`
    <div class="swiper-slide feedback-card">
      ${Be(a)}
      <p class="feedback-text">"${e}"</p>
      <p class="feedback-author">${t}</p>
    </div>`}function Ge(e){const t=e.map(qe).join("");s.feedbacksContainer.insertAdjacentHTML("beforeend",t)}function xe(e){const t=Number(e);return Math.min(5,Math.max(0,Number.isNaN(t)?0:t))}function X(e){return Math.round(xe(e)*2)/2}function Ie(e){const t=X(e),a=Math.floor(t);return`rating medium star-icon ${t%1!==0?"half":""} value-${a} label-hidden`}let P=null;async function Oe(){var e;ce();try{if(P)return;const t=((e=document.fonts)==null?void 0:e.ready)??Promise.resolve(),a=await pe(1);await t;const r=Array.isArray(a==null?void 0:a.data)?a.data:[];r.length?Ge(r):V(),P=new se(".swiper",{modules:[ae,re],slidesPerView:1,spaceBetween:30,pagination:{el:".swiper-pagination",clickable:!1,renderBullet:Re},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:K}}),K(P),P.update();const n=document.querySelector("#reviews");n==null||n.classList.add("is-ready")}catch{ie(),V()}finally{le()}}Oe();function Re(e,t){return e<3?`<span class="${t}"></span>`:""}function K(e){Pe(e),De(e)}function Pe(e){const t=document.querySelector(".swiper-button-prev"),a=document.querySelector(".swiper-button-next");t.classList.toggle("swiper-button-disabled",e.activeIndex===0),a.classList.toggle("swiper-button-disabled",e.activeIndex===e.slides.length-1)}function De(e){const t=document.querySelectorAll(".swiper-pagination span");if(!t.length)return;if(t.forEach(n=>n.classList.remove("swiper-pagination-bullet-active")),t.length===1){t[0].classList.add("swiper-pagination-bullet-active");return}const a=e.activeIndex===0,r=e.activeIndex===e.slides.length-1;t.length>=3?(a?t[0]:r?t[2]:t[1]).classList.add("swiper-pagination-bullet-active"):(a?t[0]:t[1]).classList.add("swiper-pagination-bullet-active")}function V(){s.feedbacksContainer.insertAdjacentHTML("beforeend",`
    <div class="swiper-slide feedback-card">
      <p class="feedback-text">
        We are waiting for your feedback! Be the first to share your impressions.
      </p>
    </div>`);const e=document.querySelector(".swiper-nav");e==null||e.classList.add("hidden")}function Ne(){s.artistDetailsModalBackdrope.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",Z),s.artistDetailsModalBackdrope.addEventListener("click",ee)}function j(){s.artistDetailsModalBackdrope.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",Z),s.artistDetailsModalBackdrope.removeEventListener("click",ee)}function Z(e){e.key==="Escape"&&j()}function ee(e){e.target===s.artistDetailsModalBackdrope&&j()}function He(){var e;(e=s.loader)==null||e.classList.remove("is-hidden")}function Fe(){var e;(e=s.loader)==null||e.classList.add("is-hidden")}async function _e(e){try{He();const t=await de(e),a=await ue(e),r=(a==null?void 0:a.albumsList)||[],{intFormedYear:n,intDiedYear:i,strArtist:d,strArtistThumb:b,strGender:h,intMembers:g,strCountry:C,strBiographyEN:M,genres:T}=t;let S;n&&i?S=`${n} - ${t.intDiedYear}`:n&&!i?S=`${n} - present`:S="information missing";const l=p=>{if(!p||isNaN(p))return"";const v=Math.floor(p/1e3),y=Math.floor(v/60),O=String(v%60).padStart(2,"0");return`${y}:${O}`},u=`
        <div class="artist-details-modal-content">
            <button class="artist-details-modal-close-btn" type="button">
                <svg class="modal-svg" width="32" height="32">
                    <use href="./img/icons.svg#icon-close"></use>
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
                
                ${Array.isArray(T)&&T.length?`<ul class="artist-details-modal-block-genres">${T.map(p=>`<li class="artist-details-modal-block-genres-item">${p}</li>`).join("")}</ul>`:""}
            </div>
            </div>
            <h3 class="artist-details-modal-albums">Albums</h3>
            ${r.length>0?r.map(p=>{var v;return`
            <div class="artist-details-modal-albums-list">
                <h4 class="artist-details-modal-albums-list-title">${p.strAlbum}</h4>
                <table>
                <thead class="artist-details-modal-albums-list-table-head">
                    <tr>
                    <th class="artist-details-modal-albums-list-table col-1">Track</th>
                    <th class="artist-details-modal-albums-list-table col-2">Time</th>
                    <th class="artist-details-modal-albums-list-table col-3">Link</th>
                    </tr>
                </thead>
                <tbody class="artist-details-modal-albums-list-table-body">
                    ${((v=p.tracks)==null?void 0:v.map(y=>`
                    <tr>
                        <td class="artist-details-modal-albums-list-table-text col-1">${y.strTrack}</td>
                        <td class="artist-details-modal-albums-list-table-text col-2">${l(y.intDuration)}</td>
                        <td class= "col-3">
                            ${y.movie&&y.movie!=="null"?`
                                <a class="modal-link-youtube" href="${y.movie}" target="_blank">
                                    <svg class="modal-youtube" width="20" height="14">
                                        <use href="./img/icons.svg#icon-youtube"></use>
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
        `;s.artistDetailsModal.innerHTML=`${u}`,s.artistDetailsModalBackdrope.querySelector(".artist-details-modal-close-btn").addEventListener("click",j),Ne()}catch(t){L(t.message)}finally{Fe()}}s.artistsList.addEventListener("click",e=>{const t=e.target.closest(".artist-cta");if(!t)return;const a=t.dataset.artistId;a&&_e(a)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".feedback-backdrop"),t=document.querySelector(".feedback-modal-form"),a=document.getElementById("user-name"),r=document.getElementById("user-feedback"),n=document.getElementById("ratingValue"),i=t.querySelector(".feedback-modal-btn"),d=document.querySelectorAll("#myRating svg"),b=document.getElementById("ratingError");function h(l){b.textContent=l}function g(){b.textContent=""}d.forEach((l,u)=>{l.innerHTML=`<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
      1.402 8.173L12 18.897l-7.336 3.86 
      1.402-8.173L.132 9.21l8.2-1.192z"/>`,l.style.fill="#ffffff",l.style.cursor="pointer",l.addEventListener("click",()=>{n.value=u+1,d.forEach((m,p)=>m.style.fill=p<=u?"#764191":"#ffffff"),g()})});const C=document.querySelector(".leave-feedback-button");C&&C.addEventListener("click",()=>{t.reset(),n.value="0",g(),d.forEach(l=>l.style.fill="#ffffff"),S(a),S(r),e.classList.add("is-open"),document.body.style.overflow="hidden"});const M=()=>{e.classList.remove("is-open"),document.body.style.overflow=""};document.querySelector(".feedback-modal-close").addEventListener("click",M),e.addEventListener("click",l=>{l.target===e&&M()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&M()});const T=(l,u)=>{let m=l.nextElementSibling;(!m||!m.classList.contains("field-error"))&&(m=document.createElement("div"),m.classList.add("field-error"),l.insertAdjacentElement("afterend",m)),m.textContent=u,l.classList.add("input-error"),l.setAttribute("aria-invalid","true")},S=l=>{let u=l.nextElementSibling;u&&u.classList.contains("field-error")&&(u.textContent=""),l.classList.remove("input-error"),l.removeAttribute("aria-invalid")};t.addEventListener("submit",async l=>{var y,O;l.preventDefault(),S(a),S(r),g();const u=a.value.trim(),m=r.value.trim(),p=parseFloat(n.value);let v=!1;if((u.length<2||u.length>16)&&(T(a,"Name must be between 2 and 16 characters"),v=!0),(m.length<10||m.length>512)&&(T(r,"Message must be between 10 and 512 characters"),v=!0),(p<1||p>5)&&(h("Please provide a rating between 1 and 5"),v=!0),!v){i.disabled=!0;try{await fe(u,p,m),toastSuccess("Thank you! Your feedback has been submitted."),t.reset(),n.value="0",d.forEach(R=>R.style.fill="#ffffff"),M()}catch(R){alert("Server error: "+(((O=(y=R.response)==null?void 0:y.data)==null?void 0:O.message)||R.message))}finally{i.disabled=!1}}})});const D=document.querySelector(".scroll-to-top");let z=window.scrollY,I=!1,Q,F;window.addEventListener("scroll",()=>{clearTimeout(Q),Q=setTimeout(()=>{const e=window.scrollY,t=e<z-70,r=window.innerHeight+e>=document.body.offsetHeight-10||t&&e>350;r&&!I?(D.classList.add("visible"),I=!0,clearTimeout(F),F=setTimeout(()=>{D.classList.remove("visible"),I=!1},2e3)):!r&&I&&(D.classList.remove("visible"),I=!1,clearTimeout(F)),z=e},70)});D.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
