import{i as K,a as h,P as V,g as u,S as W,b as z,N as Q}from"./assets/vendor-CekFymhr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const s={feedbacksContainer:document.querySelector(".feedbacks-container"),artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),loader:document.querySelector(".loader"),btnSearch:document.querySelector(".search-and-filters-toggle"),searchInput:document.querySelector(".search-input"),searchBtnRequest:document.querySelector(".search-btn"),iconSearch:document.querySelector(".dropdown-icon-search"),iconSort:document.querySelector(".sort-icon"),iconGenres:document.querySelector(".genres-icon"),loaderArtistsWrapper:document.querySelector(".artists-loader-container"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link"),heroBtn:document.querySelector(".hero-btn"),resetBtn:document.querySelector(".filters-reset-btn")},J="https://sound-wave.b.goit.study/api",p={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},G=8,X=10;function d(e,t="center"){K.error({message:e,position:t})}function k(){s.loaderArtistsWrapper.classList.add("hidden")}function A(){s.loaderArtistsWrapper.classList.remove("hidden")}const g={currentPage:1};document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:e,mobileMenu:t,menuLinks:a}=s;function r(){t.classList.add("active"),e.classList.add("active")}function n(){t.classList.remove("active"),e.classList.remove("active")}e==null||e.addEventListener("click",()=>{t.classList.contains("active")?n():r()}),a==null||a.forEach(i=>i.addEventListener("click",n))});h.defaults.baseURL=J;const P=async e=>{const{data:t}=await h.get(`${p.ARTISTS}?limit=${G}&page=${e}`);return t},Z=async e=>{const{data:t}=await h.get(`${p.ARTIST_BY_ID}${e}`);return t},ee=async e=>{const{data:t}=await h.get(`${p.ARTIST_BY_ID}${e}${p.ARTIST_ALBUMS_BY_ID}`);return t},te=async(e=1)=>{const{data:t}=await h.get(`${p.FEEDBACKS}?limit=${X}&page=${e}`);return t},se=async()=>{const{data:e}=await h.get(`${p.GENRES}`);return e},T=async({name:e,page:t=1,sorted:a="0",genre:r=""})=>{const{data:n}=await h.get(`${p.ARTISTS}?limit=${G}&page=${t}${e!=null&&e.length?`&name=${e}`:""}${a==="2"?"&sortName=desc":a==="1"?"&sortName=asc":""}${r?`&genre=${r}`:""}`);return n},ae=window.matchMedia("(max-width: 767.98px)").matches,ne=ae?3:5;let f=null,M=!1;async function O({init:e=!1}={}){try{const t=await P(g.currentPage),a=t.artists??[],r=Number(t.totalArtists)||0;if(e){s.artistsList.innerHTML="",m(a),f?(f.reset(r),f.movePageTo(g.currentPage||1)):(f=new V("#tui-pagination",{totalItems:r,itemsPerPage:G,page:g.currentPage||1,visiblePages:ne,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn is-active" aria-current="page">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',disabledMoveButton:'<span class="tui-page-btn is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',moreButton:'<span class="tui-page-btn tui-ellipsis">…</span>'}}),f.on("afterMove",async({page:n})=>{if(!M){M=!0;try{g.currentPage=n,s.artistsList.innerHTML="";const i=await P(n);m(i.artists??[]),requestAnimationFrame(re)}catch(i){console.error("[artists] fetch/render error:",i),d("Failed to fetch artists")}finally{M=!1}}}));return}s.artistsList.innerHTML="",m(a)}catch(t){console.error("[artists] init error:",t),d("Failed to fetch artists")}}function m(e=[]){const t=e.map(({_id:a,strArtist:r="Unknown",strArtistThumb:n,strBiographyEN:i="",genres:l=[]})=>{const v=n||"https://placehold.co/736x414?text=No+Image",S=Array.isArray(l)&&l.length?`<ul class="artist-tags">${l.map(C=>`<li class="tag">${C}</li>`).join("")}</ul>`:'<ul class="artist-tags" aria-hidden="true"></ul>';return`
          <li class="artists-item">
            <div class="artist-card" data-id="${a}">
              <img
                src="${v}"
                alt="${r} — portrait"
                class="artist-img"
                loading="lazy"
                decoding="async"
                width="736" height="414"
              >
              ${S}
              <h3 class="artist-name">${r}</h3>
              ${i?`<p class="artist-desc text-clamp-3">${i}</p>`:""}
              <button class="artist-cta" type="button" data-artist-id="${a}" aria-label="Learn more about ${r}">
                Learn More
                <svg class="artist-cta-icon" width="16" height="16" aria-hidden="true">
                  <use href="/img/icons.svg#icon-arrow-1"></use>
                </svg>
              </button>
            </div>
          </li>`}).join("");s.artistsList?s.artistsList.insertAdjacentHTML("beforeend",t):console.warn("refs.artistsList is null. Перевір HTML і момент ініціалізації скрипта.")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{g.currentPage=1,O({init:!0})}):(g.currentPage=1,O({init:!0}));function re(){if(!window.matchMedia("(min-width: 1440px)").matches)return;const e=document.querySelector(".js-artists-top");if(!e)return;const t=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:t?"auto":"smooth",block:"start"})}const o={tlOpenSearch:window.matchMedia("(min-width: 1440px)").matches?null:u.timeline({paused:!0}).to(s.iconSearch,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSearch:window.matchMedia("(min-width: 1440px)").matches?null:u.timeline({paused:!0}).to(s.iconSearch,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenSort:u.timeline({paused:!0}).to(s.iconSort,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuSort,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuSort.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSort:u.timeline({paused:!0}).to(s.iconSort,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuSort,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenGenres:u.timeline({paused:!0}).to(s.iconGenres,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseGenres:u.timeline({paused:!0}).to(s.iconGenres,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0)};o.tlOpenSort.eventCallback("onStart",()=>{var e;(e=o.tlCloseSort)==null||e.pause(0).progress(0)});o.tlCloseSort.eventCallback("onStart",()=>{var e;(e=o.tlOpenSort)==null||e.pause(0).progress(0)});let c={name:"",page:1,sorted:0,genre:""};ie();de();oe();le();ce();ue();me();pe();function oe(){s.searchInput.addEventListener("input",()=>{c.name=s.searchInput.value.trim()});const e=async()=>{var t;if(!((t=c.name)!=null&&t.length)){d("Silence from you");return}A();try{const{artists:a}=await T(c);s.artistsList.innerHTML="",m(a)}catch(a){d(`Silence due problem ${a}`)}k(),window.matchMedia("(min-width: 1440px)")||o.tlCloseSearch.play(0)};s.searchBtnRequest.addEventListener("click",e),s.searchInput.addEventListener("keydown",t=>{t.key==="Enter"&&e()})}async function ie(){try{const t='<li data-value="all">All Genres</li>'+(await se()).map(({genre:a})=>`<li data-value="${a}">${a}</li>`).join("");s.menuGenres.insertAdjacentHTML("beforeend",t)}catch(e){d(`While loading genres ${e}`)}}function le(){const e=t=>{document.querySelector(".artists-dropdown-sort").contains(t.target)||(o.tlCloseSort.restart(),o.tlCloseGenres.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"))};s.btnSort.addEventListener("click",t=>{t.stopPropagation(),s.menuSort.classList.contains("open")?(o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")):(o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"),o.tlCloseSort.pause(0),o.tlOpenSort.restart(),s.btnSort.classList.add("open"),s.menuSort.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuSort.addEventListener("click",async t=>{const a=t.target.closest("li");if(a){s.btnSort.querySelector(".dropdown-label").textContent=a.textContent,s.btnSort.dataset.value=a.dataset.value,c.sorted=a.dataset.value,A();try{const{artists:r}=await T(c);s.artistsList.innerHTML="",m(r)}catch(r){d(`Silence due problem ${r}`)}k(),o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")}})}async function ce(){const e=t=>{document.querySelector(".artists-dropdown-genres").contains(t.target)||(o.tlCloseGenres.restart(),o.tlCloseSort.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"))};s.btnGenres.addEventListener("click",t=>{t.stopPropagation(),s.menuGenres.classList.contains("open")?(o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")):(o.tlOpenSort.pause(0),o.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"),o.tlCloseGenres.pause(0),o.tlOpenGenres.restart(),s.btnGenres.classList.add("open"),s.menuGenres.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuGenres.addEventListener("click",async t=>{const a=t.target.closest("li");if(a){s.btnGenres.querySelector(".dropdown-label").textContent=a.textContent,s.btnGenres.dataset.value=a.dataset.value,c.genre=a.textContent==="All Genres"?"":a.textContent,A();try{const{artists:r}=await T(c);s.artistsList.innerHTML="",m(r)}catch(r){d(`Silence due problem ${r}`)}k(),o.tlOpenGenres.pause(0),o.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")}})}function de(){if(window.matchMedia("(min-width: 1440px)").matches)return;const e=t=>{document.querySelector(".filters-content").contains(t.target)||(o.tlCloseSearch.play(0),document.removeEventListener("click",e))};s.btnSearch.addEventListener("click",t=>{t.stopPropagation(),u.isTweening(s.panelSearch)||s.panelSearch.style.pointerEvents==="auto"?(o.tlOpenSearch.pause(0),o.tlCloseSearch.restart(),document.removeEventListener("click",e)):(o.tlCloseSearch.pause(0),o.tlOpenSearch.restart(),document.addEventListener("click",e))})}function ue(){const e=async()=>{c={name:"",page:1,sorted:0,genre:""},s.btnGenres.querySelector(".dropdown-label").textContent="Genre",s.btnSort.querySelector(".dropdown-label").textContent="Sorting",s.searchInput.value="",A();try{s.artistsList.innerHTML="";const{artists:t}=await T(c);m(t)}catch(t){d(`Silence due problem ${t}`)}k(),o.tlCloseGenres.play(0),o.tlCloseSort.play(0)};s.resetBtn.addEventListener("click",e)}function me(){s.heroBtn.addEventListener("click",e=>{e.preventDefault(),document.querySelector("#artists").scrollIntoView({behavior:"smooth"})})}function pe(){document.querySelectorAll("button").forEach(e=>{e.addEventListener("click",()=>{e.blur()})})}function he(e){const t=ye(e),{full:a,frac:r}=be(t),n=ve(a,r,5),i=Le(n);return`
    <div class="rating" role="img" aria-label="Rating ${we(t,r)}">
      ${i}
    </div>`}function ge({descr:e,name:t,rating:a}){return`
    <div class="swiper-slide feedback-card">
      ${he(a)}
      <p class="feedback-text">"${e}"</p>
      <p class="feedback-author">${t}</p>
    </div>`}function fe(e){const t=e.map(ge).join("");s.feedbacksContainer.insertAdjacentHTML("beforeend",t)}function ye(e){const t=Number(e);return Number.isNaN(t)?0:Math.min(5,Math.max(0,t))}function be(e){const t=Math.floor(e),a=e-t;return{full:t,frac:a}}function ve(e,t,a=5){return Array.from({length:a},(r,n)=>n<e?100:n===e?Math.round(t*100):0)}function Se(e){return`
    <span class="star" style="--p:${e}%">
      <svg class="star-base" width="20" height="20" aria-hidden="true">
        <use href="img/icons.svg#icon-star"></use>
      </svg>
      <svg class="star-fill" width="20" height="20" aria-hidden="true">
        <use href="img/icons.svg#icon-star"></use>
      </svg>
    </span>`}function Le(e){return e.map(Se).join("")}function we(e,t){return t===0?`${Math.floor(e)} out of 5`:`${e.toFixed(1)} out of 5`}let E=null;async function Ee(){var e;try{if(E)return;const t=((e=document.fonts)==null?void 0:e.ready)??Promise.resolve(),a=await te(1);await t;const r=Array.isArray(a==null?void 0:a.data)?a.data:[];fe(r),E=new W(".swiper",{modules:[z,Q],slidesPerView:1,spaceBetween:30,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination",clickable:!1,renderBullet:$e},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:R}}),R(E),E.update();const n=document.querySelector("#reviews");n==null||n.classList.add("is-ready"),n==null||n.setAttribute("role","region"),n==null||n.setAttribute("aria-label","User feedback carousel")}catch(t){console.error(t)}}Ee();function $e(e,t){return e<3?`<span class="${t}"></span>`:""}function R(e){ke(e),Ae(e)}function ke(e){const t=document.querySelector(".swiper-button-prev"),a=document.querySelector(".swiper-button-next");t.classList.toggle("swiper-button-disabled",e.activeIndex===0),a.classList.toggle("swiper-button-disabled",e.activeIndex===e.slides.length-1)}function Ae(e){const t=document.querySelectorAll(".swiper-pagination span");if(!t.length)return;if(t.forEach(n=>n.classList.remove("swiper-pagination-bullet-active")),t.length===1){t[0].classList.add("swiper-pagination-bullet-active");return}const a=e.activeIndex===0,r=e.activeIndex===e.slides.length-1;t.length>=3?(a?t[0]:r?t[2]:t[1]).classList.add("swiper-pagination-bullet-active"):(a?t[0]:t[1]).classList.add("swiper-pagination-bullet-active")}function Te(){s.artistDetailsModal.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",N),s.artistDetailsModal.addEventListener("click",F)}function B(){s.artistDetailsModal.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",N),s.artistDetailsModal.removeEventListener("click",F)}function N(e){e.key==="Escape"&&B()}function F(e){e.target===s.artistDetailsModal&&B()}function Ce(){var e;(e=s.loader)==null||e.classList.remove("is-hidden")}function Me(){var e;(e=s.loader)==null||e.classList.add("is-hidden")}async function qe(e){try{Ce();const t=await Z(e);let a=await ee(e);Array.isArray(a)||(a=(a==null?void 0:a.albums)||[]);const{startYear:r,endYear:n,name:i,image:l,gender:v,members:S,country:C,biography:Y,genres:j}=t;let L;r&&n?L=`${r} - ${t.endYear}`:r&&!n?L=`${r} - present`:L="information missing";const U=`
        <div class="artist-details-modal-content">
            <button class="artist-details-modal-close-btn" type="button">
                <svg class="modal-svg" width="14" height="14">
                    <use href="/src/img/icons.svg#icon-close"></use>
                </svg>
            </button> 

            <h2 class="artist-details-modal-main-title">${i}</h2>
            <div class="artist-details-modal-main-block">
            <img class="artist-details-modal-img" src="${l}" alt="${t.name}" />

            <ul class="artist-details-modal-list">
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Years active</h3>
                <p  class="artist-details-modal-text">${L}</p>
            </li>
            ${v?`
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Sex</h3>
                    <p class="artist-details-modal-text">${v}</p>
                </li>
                `:""}
            ${S?`
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Members</h3>
                    <p class="artist-details-modal-text">${S.length}</p>
                </li>
                `:""}
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Country</h3>
                <p class="artist-details-modal-text">${C}</p>
            </li>
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Biography</h3>
                <p class="artist-details-modal-text">${Y}</p>
            </li>
            </ul>
           
            <ul class="artist-details-modal-block-genres">
            <li class="artist-details-modal-block-genres-item">
                <p class="artist-details-modal-genres">${j}</p>
            </li>
            </ul>
            </div>

            <h3 class="artist-details-modal-albums">Albums</h3>
            ${a.length>0?a.map(x=>{var I;return`
            <div class="artist-details-modal-albums-list">
                <h4 class="artist-details-modal-albums-list-title">${x.title}</h4>
                <table>
                <thead class="artist-details-modal-albums-list-table-head">
                    <tr>
                    <th class="artist-details-modal-albums-list-table col-1">Track</th>
                    <th class="artist-details-modal-albums-list-table col-2">Time</th>
                    <th class="artist-details-modal-albums-list-table col-3">Link</th>
                    </tr>
                </thead>
                <tbody class="artist-details-modal-albums-list-table-body">
                    ${((I=x.tracks)==null?void 0:I.map(w=>`
                    <tr>
                        <td class="artist-details-modal-albums-list-table-text col-1">${w.title}</td>
                        <td class="artist-details-modal-albums-list-table-text col-2">${w.duration}</td>
                        <td class= "col-3">
                            ${w.youtubeLink?`
                                <a class="modal-link-youtube" href="${w.youtubeLink}" target="_blank">
                                    <svg class="modal-youtube" width="20" height="14">
                                        <use href="/src/img/icons.svg#icon-youtube"></use>
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
        `;s.artistDetailsModal.innerHTML=`
        <button class="artist-details-modal-close-btn" type="button">
            <svg class="modal-svg" width="14" height="14">
            <use href="/src/img/icons.svg#icon-close"></use>
            </svg>
        </button>
        ${U}
        `,s.artistDetailsModal.querySelector(".artist-details-modal-close-btn").addEventListener("click",B),Te()}catch(t){console.log(t)}finally{Me()}}s.artistsList.addEventListener("click",e=>{const t=e.target.closest(".artist-cta");if(!t)return;const a=t.dataset.artistId;a&&qe(a)});const D=document.querySelectorAll("#myRating svg"),Ge=document.getElementById("ratingValue");D.forEach((e,t)=>{e.innerHTML=`<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
  1.402 8.173L12 18.897l-7.336 3.86 
  1.402-8.173L.132 9.21l8.2-1.192z"/>`,e.style.fill="#ffff",e.style.cursor="pointer",e.addEventListener("click",()=>{Ge.value=t+1,D.forEach((a,r)=>a.style.fill=r<=t?"#764191":"#ffff")})});const Be=document.querySelector(".feedback-modal-close"),b=document.querySelector(".feedback-backdrop");Be.addEventListener("click",()=>{b.classList.remove("is-open"),document.body.style.overflow=""});b.addEventListener("click",e=>{e.target===b&&(b.classList.remove("is-open"),document.body.style.overflow="")});const xe=document.querySelector(".leave-feedback-button");xe.addEventListener("click",()=>{b.classList.add("is-open"),document.body.style.overflow="hidden"});const $=document.querySelector(".scroll-to-top");let H=window.scrollY,y=!1,_,q;window.addEventListener("scroll",()=>{clearTimeout(_),_=setTimeout(()=>{const e=window.scrollY,t=e<H-70,r=window.innerHeight+e>=document.body.offsetHeight-10||t&&e>350;r&&!y?($.classList.add("visible"),y=!0,clearTimeout(q),q=setTimeout(()=>{$.classList.remove("visible"),y=!1},2e3)):!r&&y&&($.classList.remove("visible"),y=!1,clearTimeout(q)),H=e},70)});$.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
