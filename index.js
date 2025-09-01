import{i as Q,a as k,g as A,P as Z,S as ee,b as te,N as se}from"./assets/vendor-DZ7zuj1H.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const s={feedbacksContainer:document.querySelector(".feedbacks-container"),artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),loader:document.querySelector(".loader"),btnSearch:document.querySelector(".search-and-filters-toggle"),searchInput:document.querySelector(".search-input"),searchBtnRequest:document.querySelector(".search-btn"),iconSearch:document.querySelector(".dropdown-icon-search"),iconSort:document.querySelector(".sort-icon"),iconGenres:document.querySelector(".genres-icon"),loaderArtistsWrapper:document.querySelector(".artists-loader-container"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link"),artistDetailsModalBackdrope:document.querySelector(".artist-details-backdrop"),heroBtn:document.querySelector(".hero-btn"),resetBtn:document.querySelector(".filters-reset-btn"),feedbackLoader:document.querySelector(".feedback-loader")},ae="https://sound-wave.b.goit.study/api",E={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},_=8,re=10;//!======================================================
function L(e="Something went wrong. Please try again later.",t="topCenter"){Q.error({title:"",message:e,position:t,timeout:3e3,progressBar:!1})}function ne(e="We couldn’t load the reviews. Please try again later.",t="topRight"){Q.error({title:"",message:e,position:t,timeout:3e3,progressBar:!1})}//!======================================================
function q(){s.loaderArtistsWrapper.classList.add("hidden")}function x(){s.loaderArtistsWrapper.classList.remove("hidden")}//!======================================================
function oe(){s.feedbackLoader.classList.add("hidden"),s.feedbackLoader.setAttribute("aria-hidden","true")}function ie(){s.feedbackLoader.classList.remove("hidden"),s.feedbackLoader.setAttribute("aria-hidden","false")}//!======================================================
document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:e,mobileMenu:t,menuLinks:a}=s;function n(){t.classList.add("active"),e.classList.add("active")}function r(){t.classList.remove("active"),e.classList.remove("active")}e==null||e.addEventListener("click",()=>{t.classList.contains("active")?r():n()}),a==null||a.forEach(o=>o.addEventListener("click",r))});k.defaults.baseURL=ae;const Y=async e=>{const{data:t}=await k.get(`${E.ARTISTS}?limit=${_}&page=${e}`);return t},le=async e=>{const{data:t}=await k.get(`${E.ARTIST_BY_ID}${e}`);return t},ce=async e=>{const{data:t}=await k.get(`${E.ARTIST_BY_ID}${e}${E.ARTIST_ALBUMS_BY_ID}`);return t},de=async(e=1)=>{const{data:t}=await k.get(`${E.FEEDBACKS}?limit=${re}&page=${e}`);return t},ue=async()=>{const{data:e}=await k.get(`${E.GENRES}`);return e},G=async({name:e,page:t=1,sorted:a="0",genre:n=""})=>{const{data:r}=await k.get(`${E.ARTISTS}?limit=${_}&page=${t}${e!=null&&e.length?`&name=${e}`:""}${a==="2"?"&sortName=desc":a==="1"?"&sortName=asc":""}${n?`&genre=${n}`:""}`);return r},me=async(e,t,a)=>{await k.post(`${E.FEEDBACKS}`,{name:e,rating:t,descr:a})},i={tlOpenSearch:window.matchMedia("(min-width: 1440px)").matches?null:A.timeline({paused:!0}).to(s.iconSearch,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSearch:window.matchMedia("(min-width: 1440px)").matches?null:A.timeline({paused:!0}).to(s.iconSearch,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenSort:A.timeline({paused:!0}).to(s.iconSort,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuSort,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuSort.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSort:A.timeline({paused:!0}).to(s.iconSort,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuSort,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenGenres:A.timeline({paused:!0}).to(s.iconGenres,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseGenres:A.timeline({paused:!0}).to(s.iconGenres,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0)};i.tlOpenSort.eventCallback("onStart",()=>{var e;(e=i.tlCloseSort)==null||e.pause(0).progress(0)});i.tlCloseSort.eventCallback("onStart",()=>{var e;(e=i.tlOpenSort)==null||e.pause(0).progress(0)});let c={name:"",page:1,sorted:0,genre:""};fe();be();pe();he();ge();ve();ye();Se();function pe(){s.searchInput.addEventListener("input",()=>{c.name=s.searchInput.value.trim()});const e=async()=>{var t;if(!((t=c.name)!=null&&t.length)){L("Silence from you");return}x();try{const{artists:a}=await G(c);s.artistsList.innerHTML="",w(a)}catch(a){L(`Silence due problem ${a}`)}q(),window.matchMedia("(min-width: 1440px)")||i.tlCloseSearch.play(0)};s.searchBtnRequest.addEventListener("click",e),s.searchInput.addEventListener("keydown",t=>{t.key==="Enter"&&e()})}async function fe(){try{const t='<li data-value="all">All Genres</li>'+(await ue()).map(({genre:a})=>`<li data-value="${a}">${a}</li>`).join("");s.menuGenres.insertAdjacentHTML("beforeend",t)}catch(e){L(`While loading genres ${e}`)}}function he(){const e=t=>{document.querySelector(".artists-dropdown-sort").contains(t.target)||(i.tlCloseSort.restart(),i.tlCloseGenres.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"))};s.btnSort.addEventListener("click",t=>{t.stopPropagation(),s.menuSort.classList.contains("open")?(i.tlOpenSort.pause(0),i.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")):(i.tlOpenGenres.pause(0),i.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"),i.tlCloseSort.pause(0),i.tlOpenSort.restart(),s.btnSort.classList.add("open"),s.menuSort.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuSort.addEventListener("click",async t=>{const a=t.target.closest("li");if(a){s.btnSort.querySelector(".dropdown-label").textContent=a.textContent,s.btnSort.dataset.value=a.dataset.value,c.sorted=a.dataset.value,x();try{const{artists:n}=await G(c);s.artistsList.innerHTML="",w(n)}catch(n){L(`Silence due problem ${n}`)}q(),i.tlOpenSort.pause(0),i.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")}})}async function ge(){const e=t=>{document.querySelector(".artists-dropdown-genres").contains(t.target)||(i.tlCloseGenres.restart(),i.tlCloseSort.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"))};s.btnGenres.addEventListener("click",t=>{t.stopPropagation(),s.menuGenres.classList.contains("open")?(i.tlOpenGenres.pause(0),i.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")):(i.tlOpenSort.pause(0),i.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"),i.tlCloseGenres.pause(0),i.tlOpenGenres.restart(),s.btnGenres.classList.add("open"),s.menuGenres.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuGenres.addEventListener("click",async t=>{const a=t.target.closest("li");if(a){s.btnGenres.querySelector(".dropdown-label").textContent=a.textContent,s.btnGenres.dataset.value=a.dataset.value,c.genre=a.textContent==="All Genres"?"":a.textContent,x();try{const{artists:n}=await G(c);s.artistsList.innerHTML="",w(n)}catch(n){L(`Silence due problem ${n}`)}q(),i.tlOpenGenres.pause(0),i.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")}})}function be(){if(window.matchMedia("(min-width: 1440px)").matches)return;const e=t=>{document.querySelector(".filters-content").contains(t.target)||(i.tlCloseSearch.play(0),document.removeEventListener("click",e))};s.btnSearch.addEventListener("click",t=>{t.stopPropagation(),A.isTweening(s.panelSearch)||s.panelSearch.style.pointerEvents==="auto"?(i.tlOpenSearch.pause(0),i.tlCloseSearch.restart(),document.removeEventListener("click",e)):(i.tlCloseSearch.pause(0),i.tlOpenSearch.restart(),document.addEventListener("click",e))})}function ve(){const e=async()=>{c={name:"",page:1,sorted:0,genre:""},s.btnGenres.querySelector(".dropdown-label").textContent="Genre",s.btnSort.querySelector(".dropdown-label").textContent="Sorting",s.searchInput.value="",x();try{s.artistsList.innerHTML="";const{artists:t}=await G(c);w(t)}catch(t){L(`Silence due problem ${t}`)}q(),i.tlCloseGenres.play(0),i.tlCloseSort.play(0)};s.resetBtn.addEventListener("click",e)}function ye(){s.heroBtn.addEventListener("click",e=>{e.preventDefault(),document.querySelector("#artists").scrollIntoView({behavior:"smooth"})})}function Se(){document.querySelectorAll("button").forEach(e=>{e.addEventListener("click",()=>{e.blur()})})}const Le=window.matchMedia("(max-width: 767.98px)").matches,we=Le?3:5;let f=null,D=!1,$=!1;function Ee(){return`
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
  `}function ke(){let e=document.querySelector("[data-no-artists]");return e||(s.artistsList.insertAdjacentHTML("afterend",Ee()),e=document.querySelector("[data-no-artists]"),e.addEventListener("click",t=>{var a;t.target.closest(".btn-reset-filters")&&((a=document.querySelector('[data-action="filters-reset"]'))==null||a.click(),document.dispatchEvent(new CustomEvent("filters:reset")))})),e}function $e(){ke().classList.remove("is-hidden")}function U(){var e;(e=document.querySelector("[data-no-artists]"))==null||e.classList.add("is-hidden")}function B(e,t=0){const a=document.querySelector("#tui-pagination");a&&a.classList.toggle("hidden",!e||t<=0)}function F(){return!!(c.name&&c.name.trim().length||c.genre&&c.genre!=="all"||c.sorted&&Number(c.sorted)!==0)}async function W({init:e=!1}={}){x();try{e&&(c.page=1);const a=F()?await G(c):await Y(c.page),n=a.artists??[],r=Number(a.totalArtists)||0;if(r===0&&(f&&f.reset(0),B(!1,0)),s.artistsList.innerHTML="",w(n),e){f||($=!0,f=new Z("#tui-pagination",{totalItems:r,itemsPerPage:_,page:c.page||1,visiblePages:we,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn is-active" aria-current="page">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',disabledMoveButton:'<span class="tui-page-btn is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',moreButton:'<span class="tui-page-btn tui-ellipsis">…</span>'}}),f.on("afterMove",async({page:d})=>{if(!D){D=!0,x();try{c.page=d,s.artistsList.innerHTML="";const h=F()?await G(c):await Y(d),g=h.artists??[];w(g),B(g.length>0,Number(h==null?void 0:h.totalArtists)||0),$||requestAnimationFrame(Ae)}catch{L("Failed to fetch artists"),w([]),B(!1,0)}finally{D=!1,$=!1,q()}}})),f.reset(r);const o=c.page||1;f.getCurrentPage()!==o?($=!0,f.movePageTo(o)):$=!0}else if(f){f.reset(r);const o=c.page||1;f.getCurrentPage()!==o?($=!0,f.movePageTo(o)):$=!0}B(r>0,r)}catch{F()&&L("Failed to fetch artists"),s.artistsList.innerHTML="",w([]),B(!1,0)}finally{q()}}function w(e=[]){const t=new URL("/developers-orchestra-project/assets/icons-BW1fWait.svg",import.meta.url).href;if(!Array.isArray(e)||e.length===0){U(),s.artistsList.innerHTML="",$e(),B(!1,0),document.dispatchEvent(new Event("artists:updated"));return}U();const a=e.map(({_id:n,strArtist:r="Unknown",strArtistThumb:o,strBiographyEN:d="",genres:b=[]})=>{const h=o||"https://placehold.co/736x414?text=No+Image",g=Array.isArray(b)&&b.length?`<ul class="artist-tags">${b.map(C=>`<li class="tag">${C}</li>`).join("")}</ul>`:'<ul class="artist-tags" aria-hidden="true"></ul>';return`
          <li class="artists-item">
            <div class="artist-card" data-id="${n}">
              <img
                src="${h}"
                alt="${r} — portrait"
                class="artist-img"
                loading="lazy"
                decoding="async"
                width="736" height="414"
              >
              ${g}
              <h3 class="artist-name">${r}</h3>
              ${d?`<p class="artist-desc text-clamp-3">${d}</p>`:""}
              <button class="artist-cta" type="button" data-artist-id="${n}" aria-label="Learn more about ${r}">
                Learn More
                <svg class="artist-cta-icon" width="16" height="16" aria-hidden="true">
                  <use href="${t}#icon-arrow-1"></use>
                </svg>
              </button>
            </div>
          </li>`}).join("");s.artistsList.insertAdjacentHTML("beforeend",a),document.dispatchEvent(new Event("artists:updated"))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{c.page=1,W({init:!0})}):(c.page=1,W({init:!0}));function Ae(){const e=document.querySelector(".js-artists-top");if(!e)return;let t=parseFloat(getComputedStyle(e).scrollMarginTop)||0;t||(t=window.matchMedia("(min-width:1440px)").matches?112:window.matchMedia("(min-width:768px)").matches?96:120,e.style.scrollMarginTop=`${t}px`);const a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({block:"start",inline:"nearest",behavior:a?"auto":"smooth"})}function Ce(e){const t=Be(e),{full:a,frac:n}=qe(t),r=xe(a,n,5),o=Ie(r);return`
    <div class="rating" role="img" aria-label="Rating ${Re(t,n)}">
      ${o}
    </div>`}function Me({descr:e,name:t,rating:a}){return`
    <div class="swiper-slide feedback-card">
      ${Ce(a)}
      <p class="feedback-text">"${e}"</p>
      <p class="feedback-author">${t}</p>
    </div>`}function Te(e){const t=e.map(Me).join("");s.feedbacksContainer.insertAdjacentHTML("beforeend",t)}function Be(e){const t=Number(e);return Number.isNaN(t)?0:Math.min(5,Math.max(0,t))}function qe(e){const t=Math.floor(e),a=e-t;return{full:t,frac:a}}function xe(e,t,a=5){return Array.from({length:a},(n,r)=>r<e?100:r===e?Math.round(t*100):0)}function Ge(e){return`
    <span class="star" style="--p:${e}%">
      <svg class="star-base" width="20" height="20" aria-hidden="true">
        <use href="img/icons.svg#icon-star"></use>
      </svg>
      <svg class="star-fill" width="20" height="20" aria-hidden="true">
        <use href="img/icons.svg#icon-star"></use>
      </svg>
    </span>`}function Ie(e){return e.map(Ge).join("")}function Re(e,t){return t===0?`${Math.floor(e)} out of 5`:`${e.toFixed(1)} out of 5`}let N=null;async function Oe(){var e;ie();try{if(N)return;const t=((e=document.fonts)==null?void 0:e.ready)??Promise.resolve(),a=await de(1);await t;const n=document.querySelector(".swiper-nav"),r=Array.isArray(a==null?void 0:a.data)?a.data:[];r.length?Te(r):(s.feedbacksContainer.insertAdjacentHTML("beforeend",`<div class="swiper-slide feedback-card">
          <p class="feedback-text">
            We are waiting for your feedback! Be the first to share your impressions.
          </p>
        </div>`),n.classList.toggle("hidden")),N=new ee(".swiper",{modules:[te,se],slidesPerView:1,spaceBetween:30,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination",clickable:!1,renderBullet:Ne},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:K}}),K(N),N.update();const o=document.querySelector("#reviews");o==null||o.classList.add("is-ready"),o==null||o.setAttribute("role","region"),o==null||o.setAttribute("aria-label","User feedback carousel")}catch{ne();const a=document.querySelector(".swiper-nav");s.feedbacksContainer.insertAdjacentHTML("beforeend",`<div class="swiper-slide feedback-card">
          <p class="feedback-text">
            We are waiting for your feedback! Be the first to share your impressions.
          </p>
        </div>`),a.classList.toggle("hidden")}finally{oe()}}Oe();function Ne(e,t){return e<3?`<span class="${t}"></span>`:""}function K(e){Pe(e),De(e)}function Pe(e){const t=document.querySelector(".swiper-button-prev"),a=document.querySelector(".swiper-button-next");t.classList.toggle("swiper-button-disabled",e.activeIndex===0),a.classList.toggle("swiper-button-disabled",e.activeIndex===e.slides.length-1)}function De(e){const t=document.querySelectorAll(".swiper-pagination span");if(!t.length)return;if(t.forEach(r=>r.classList.remove("swiper-pagination-bullet-active")),t.length===1){t[0].classList.add("swiper-pagination-bullet-active");return}const a=e.activeIndex===0,n=e.activeIndex===e.slides.length-1;t.length>=3?(a?t[0]:n?t[2]:t[1]).classList.add("swiper-pagination-bullet-active"):(a?t[0]:t[1]).classList.add("swiper-pagination-bullet-active")}function Fe(){s.artistDetailsModalBackdrope.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",J),s.artistDetailsModalBackdrope.addEventListener("click",X)}function j(){s.artistDetailsModalBackdrope.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",J),s.artistDetailsModalBackdrope.removeEventListener("click",X)}function J(e){e.key==="Escape"&&j()}function X(e){e.target===s.artistDetailsModalBackdrope&&j()}function He(){var e;(e=s.loader)==null||e.classList.remove("is-hidden")}function _e(){var e;(e=s.loader)==null||e.classList.add("is-hidden")}async function je(e){try{He();const t=await le(e),a=await ce(e),n=(a==null?void 0:a.albumsList)||[],{intFormedYear:r,intDiedYear:o,strArtist:d,strArtistThumb:b,strGender:h,intMembers:g,strCountry:C,strBiographyEN:M,genres:T}=t;let S;r&&o?S=`${r} - ${t.intDiedYear}`:r&&!o?S=`${r} - present`:S="information missing";const l=m=>{if(!m||isNaN(m))return"";const v=Math.floor(m/1e3),y=Math.floor(v/60),R=String(v%60).padStart(2,"0");return`${y}:${R}`},u=`
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
                
                ${Array.isArray(T)&&T.length?`<ul class="artist-details-modal-block-genres">${T.map(m=>`<li class="artist-details-modal-block-genres-item">${m}</li>`).join("")}</ul>`:""}
            </div>
            </div>
            <h3 class="artist-details-modal-albums">Albums</h3>
            ${n.length>0?n.map(m=>{var v;return`
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
                    ${((v=m.tracks)==null?void 0:v.map(y=>`
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
        `;s.artistDetailsModal.innerHTML=`${u}`,s.artistDetailsModalBackdrope.querySelector(".artist-details-modal-close-btn").addEventListener("click",j),Fe()}catch(t){L(t.message)}finally{_e()}}s.artistsList.addEventListener("click",e=>{const t=e.target.closest(".artist-cta");if(!t)return;const a=t.dataset.artistId;a&&je(a)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".feedback-backdrop"),t=document.querySelector(".feedback-modal-form"),a=document.getElementById("user-name"),n=document.getElementById("user-feedback"),r=document.getElementById("ratingValue"),o=t.querySelector(".feedback-modal-btn"),d=document.querySelectorAll("#myRating svg"),b=document.getElementById("ratingError");function h(l){b.textContent=l}function g(){b.textContent=""}d.forEach((l,u)=>{l.innerHTML=`<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
      1.402 8.173L12 18.897l-7.336 3.86 
      1.402-8.173L.132 9.21l8.2-1.192z"/>`,l.style.fill="#ffffff",l.style.cursor="pointer",l.addEventListener("click",()=>{r.value=u+1,d.forEach((p,m)=>p.style.fill=m<=u?"#764191":"#ffffff"),g()})});const C=document.querySelector(".leave-feedback-button");C&&C.addEventListener("click",()=>{t.reset(),r.value="0",g(),d.forEach(l=>l.style.fill="#ffffff"),S(a),S(n),e.classList.add("is-open"),document.body.style.overflow="hidden"});const M=()=>{e.classList.remove("is-open"),document.body.style.overflow=""};document.querySelector(".feedback-modal-close").addEventListener("click",M),e.addEventListener("click",l=>{l.target===e&&M()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&M()});const T=(l,u)=>{let p=l.nextElementSibling;(!p||!p.classList.contains("field-error"))&&(p=document.createElement("div"),p.classList.add("field-error"),l.insertAdjacentElement("afterend",p)),p.textContent=u,l.classList.add("input-error"),l.setAttribute("aria-invalid","true")},S=l=>{let u=l.nextElementSibling;u&&u.classList.contains("field-error")&&(u.textContent=""),l.classList.remove("input-error"),l.removeAttribute("aria-invalid")};t.addEventListener("submit",async l=>{var y,R;l.preventDefault(),S(a),S(n),g();const u=a.value.trim(),p=n.value.trim(),m=parseFloat(r.value);let v=!1;if((u.length<2||u.length>16)&&(T(a,"Name must be between 2 and 16 characters"),v=!0),(p.length<10||p.length>512)&&(T(n,"Message must be between 10 and 512 characters"),v=!0),(m<1||m>5)&&(h("Please provide a rating between 1 and 5"),v=!0),!v){o.disabled=!0;try{await me(u,m,p),toastSuccess("Thank you! Your feedback has been submitted."),t.reset(),r.value="0",d.forEach(O=>O.style.fill="#ffffff"),M()}catch(O){alert("Server error: "+(((R=(y=O.response)==null?void 0:y.data)==null?void 0:R.message)||O.message))}finally{o.disabled=!1}}})});const P=document.querySelector(".scroll-to-top");let V=window.scrollY,I=!1,z,H;window.addEventListener("scroll",()=>{clearTimeout(z),z=setTimeout(()=>{const e=window.scrollY,t=e<V-70,n=window.innerHeight+e>=document.body.offsetHeight-10||t&&e>350;n&&!I?(P.classList.add("visible"),I=!0,clearTimeout(H),H=setTimeout(()=>{P.classList.remove("visible"),I=!1},2e3)):!n&&I&&(P.classList.remove("visible"),I=!1,clearTimeout(H)),V=e},70)});P.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
