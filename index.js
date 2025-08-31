import{i as H,a as u,g as c,S as Y,P as F,N as j}from"./assets/vendor-s-MrW2xm.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const s={feedbacksContainer:document.querySelector(".feedbacks-container"),artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),loader:document.querySelector(".loader"),btnSearch:document.querySelector(".search-and-filters-toggle"),searchInput:document.querySelector(".search-input"),searchBtnRequest:document.querySelector(".search-btn"),iconSearch:document.querySelector(".dropdown-icon-search"),iconSort:document.querySelector(".sort-icon"),iconGenres:document.querySelector(".genres-icon"),loaderArtistsWrapper:document.querySelector(".artists-loader-container"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link"),heroBtn:document.querySelector(".hero-btn"),resetBtn:document.querySelector(".filters-reset-btn")},U="https://sound-wave.b.goit.study/api",d={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},T=8,K=10;function h(e,t="center"){H.error({message:e,position:t})}function B(){s.loaderArtistsWrapper.classList.add("hidden")}function M(){s.loaderArtistsWrapper.classList.remove("hidden")}const W={currentPage:1};document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:e,mobileMenu:t,menuLinks:a}=s;function o(){t.classList.add("active"),e.classList.add("active")}function n(){t.classList.remove("active"),e.classList.remove("active")}e==null||e.addEventListener("click",()=>{t.classList.contains("active")?n():o()}),a==null||a.forEach(i=>i.addEventListener("click",n))});u.defaults.baseURL=U;const z=async e=>{const{data:t}=await u.get(`${d.ARTISTS}?limit=${T}&page=${e}`);return t},V=async e=>{const{data:t}=await u.get(`${d.ARTIST_BY_ID}${e}`);return t},Q=async e=>{const{data:t}=await u.get(`${d.ARTIST_BY_ID}${e}${d.ARTIST_ALBUMS_BY_ID}`);return t},J=async(e=1)=>{const{data:t}=await u.get(`${d.FEEDBACKS}?limit=${K}&page=${e}`);return t},X=async()=>{const{data:e}=await u.get(`${d.GENRES}`);return e},Z=async({name:e,page:t=1,sorted:a=0,genre:o=""})=>{const{data:n}=await u.get(`${d.ARTISTS}?limit=${T}&page=${t}&name=${e}${a===2?"&sortName=desc":a===1?"&sortName=asc":""}${o?`&genre=${o}`:""}`);return n};async function I(){try{const{artists:e}=await z(W.currentPage);x(e)}catch{h("Failed to fetch artists")}}function x(e=[]){const t=e.map(({_id:a,strArtist:o="Unknown",strArtistThumb:n,strBiographyEN:i="",genres:l=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${a}">
                <img
                  src="${n||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${o} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(l)&&l.length?`<ul class="artist-tags">${l.map(f=>`<li class="tag">${f}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${o}</h3>
                ${i?`<p class="artist-desc text-clamp-3">${i}</p>`:""}

                <button class="artist-cta" type="button" data-artist-id="${a}" aria-label="Learn more about ${o}">
                  Learn More<svg class="artist-cta-icon" width="16" height="16" aria-hidden="true">
    <use href="./img/icons.svg#icon-arrow-1"></use>
  </svg>
                </button>
              </div>
            </li>`).join("");s.artistsList.insertAdjacentHTML("beforeend",t)}I();const r={tlOpenSearch:window.matchMedia("(min-width: 1440px)").matches?null:c.timeline({paused:!0}).to(s.iconSearch,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSearch:window.matchMedia("(min-width: 1440px)").matches?null:c.timeline({paused:!0}).to(s.iconSearch,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenSort:c.timeline({paused:!0}).to(s.iconSort,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuSort,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuSort.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSort:c.timeline({paused:!0}).to(s.iconSort,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuSort,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenGenres:c.timeline({paused:!0}).to(s.iconGenres,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(s.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(s.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseGenres:c.timeline({paused:!0}).to(s.iconGenres,{rotate:0,duration:.3,ease:"power2.in"},0).to(s.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0)};r.tlOpenSort.eventCallback("onStart",()=>{var e;(e=r.tlCloseSort)==null||e.pause(0).progress(0)});r.tlCloseSort.eventCallback("onStart",()=>{var e;(e=r.tlOpenSort)==null||e.pause(0).progress(0)});let y={name:"",page:1,sorted:0,genre:""};te();ne();ee();se();ae();re();oe();function ee(){s.searchInput.addEventListener("input",()=>{y.name=s.searchInput.value.trim()});const e=async()=>{var t;if(!((t=y.name)!=null&&t.length)){h("Silence from you");return}M();try{const{artists:a}=await Z(y);s.artistsList.innerHTML="",x(a)}catch(a){h(`Silence due problem ${a}`)}B(),r.tlCloseSearch.play(0)};s.searchBtnRequest.addEventListener("click",e),s.searchInput.addEventListener("keydown",t=>{t.key==="Enter"&&e()})}async function te(){try{const t='<li data-value="all">All Genres</li>'+(await X()).map(({genre:a})=>`<li data-value="${a.toLowerCase()}">${a}</li>`).join("");s.menuGenres.insertAdjacentHTML("beforeend",t)}catch(e){h(`While loading genres ${e}`)}}function se(){const e=t=>{document.querySelector(".artists-dropdown-sort").contains(t.target)||(r.tlCloseSort.restart(),r.tlCloseGenres.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"))};s.btnSort.addEventListener("click",t=>{t.stopPropagation(),s.menuSort.classList.contains("open")?(r.tlOpenSort.pause(0),r.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open")):(r.tlOpenGenres.pause(0),r.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"),r.tlCloseSort.pause(0),r.tlOpenSort.restart(),s.btnSort.classList.add("open"),s.menuSort.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuSort.addEventListener("click",t=>{const a=t.target.closest("li");a&&(s.btnSort.querySelector(".dropdown-label").textContent=a.textContent,s.btnSort.dataset.value=a.dataset.value,r.tlOpenSort.pause(0),r.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"))})}function ae(){const e=t=>{document.querySelector(".artists-dropdown-genres").contains(t.target)||(r.tlCloseGenres.restart(),r.tlCloseSort.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"))};s.btnGenres.addEventListener("click",t=>{t.stopPropagation(),s.menuGenres.classList.contains("open")?(r.tlOpenGenres.pause(0),r.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open")):(r.tlOpenSort.pause(0),r.tlCloseSort.restart(),s.btnSort.classList.remove("open"),s.menuSort.classList.remove("open"),r.tlCloseGenres.pause(0),r.tlOpenGenres.restart(),s.btnGenres.classList.add("open"),s.menuGenres.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),s.menuGenres.addEventListener("click",t=>{const a=t.target.closest("li");a&&(s.btnGenres.querySelector(".dropdown-label").textContent=a.textContent,s.btnGenres.dataset.value=a.dataset.value,r.tlOpenGenres.pause(0),r.tlCloseGenres.restart(),s.btnGenres.classList.remove("open"),s.menuGenres.classList.remove("open"))})}function ne(){if(window.matchMedia("(min-width: 1440px)").matches)return;const e=t=>{document.querySelector(".filters-content").contains(t.target)||(r.tlCloseSearch.play(0),document.removeEventListener("click",e))};s.btnSearch.addEventListener("click",t=>{t.stopPropagation(),c.isTweening(s.panelSearch)||s.panelSearch.style.pointerEvents==="auto"?(r.tlOpenSearch.pause(0),r.tlCloseSearch.restart(),document.removeEventListener("click",e)):(r.tlCloseSearch.pause(0),r.tlOpenSearch.restart(),document.addEventListener("click",e))})}function re(){const e=()=>{y={name:"",page:1,sorted:0,genre:""},s.btnGenres.querySelector(".dropdown-label").textContent="Genre",s.btnSort.querySelector(".dropdown-label").textContent="Sorting",s.searchInput.value="",M();try{s.artistsList.innerHTML="",I()}catch(t){h(`Silence due problem ${t}`)}B()};s.resetBtn.addEventListener("click",e)}function oe(){s.heroBtn.addEventListener("click",e=>{e.preventDefault(),document.querySelector("#artists").scrollIntoView({behavior:"smooth"})})}function ie(e){const t=de(e),{full:a,frac:o}=ue(t),n=me(a,o,5),i=he(n);return`
    <div class="rating" role="img" aria-label="Rating ${fe(t,o)}">
      ${i}
    </div>`}function le({descr:e,name:t,rating:a}){return`
    <div class="swiper-slide feedback-card">
      ${ie(a)}
      <p class="feedback-text">"${e}"</p>
      <p class="feedback-author">${t}</p>
    </div>`}function ce(e){const t=e.map(le).join("");s.feedbacksContainer.insertAdjacentHTML("beforeend",t)}function de(e){const t=Number(e);return Number.isNaN(t)?0:Math.min(5,Math.max(0,t))}function ue(e){const t=Math.floor(e),a=e-t;return{full:t,frac:a}}function me(e,t,a=5){return Array.from({length:a},(o,n)=>n<e?100:n===e?Math.round(t*100):0)}function pe(e){return`
    <span class="star" style="--p:${e}%">
      <svg class="star-base" width="20" height="20" aria-hidden="true">
        <use href="img/icons.svg#icon-star"></use>
      </svg>
      <svg class="star-fill" width="20" height="20" aria-hidden="true">
        <use href="img/icons.svg#icon-star"></use>
      </svg>
    </span>`}function he(e){return e.map(pe).join("")}function fe(e,t){return t===0?`${Math.floor(e)} out of 5`:`${e.toFixed(1)} out of 5`}let v=null;async function ge(){var e;try{if(v)return;const t=((e=document.fonts)==null?void 0:e.ready)??Promise.resolve(),a=await J(1);await t;const o=Array.isArray(a==null?void 0:a.data)?a.data:[];ce(o),v=new Y(".swiper",{modules:[F,j],slidesPerView:1,spaceBetween:30,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination",clickable:!1,renderBullet:be},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:C}}),C(v),v.update();const n=document.querySelector("#reviews");n==null||n.classList.add("is-ready"),n==null||n.setAttribute("role","region"),n==null||n.setAttribute("aria-label","User feedback carousel")}catch(t){console.error(t)}}ge();function be(e,t){return e<3?`<span class="${t}"></span>`:""}function C(e){ve(e),ye(e)}function ve(e){const t=document.querySelector(".swiper-button-prev"),a=document.querySelector(".swiper-button-next");t.classList.toggle("swiper-button-disabled",e.activeIndex===0),a.classList.toggle("swiper-button-disabled",e.activeIndex===e.slides.length-1)}function ye(e){const t=document.querySelectorAll(".swiper-pagination span");if(!t.length)return;if(t.forEach(n=>n.classList.remove("swiper-pagination-bullet-active")),t.length===1){t[0].classList.add("swiper-pagination-bullet-active");return}const a=e.activeIndex===0,o=e.activeIndex===e.slides.length-1;t.length>=3?(a?t[0]:o?t[2]:t[1]).classList.add("swiper-pagination-bullet-active"):(a?t[0]:t[1]).classList.add("swiper-pagination-bullet-active")}function Se(){s.artistDetailsModal.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",O),s.artistDetailsModal.addEventListener("click",R)}function E(){s.artistDetailsModal.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",O),s.artistDetailsModal.removeEventListener("click",R)}function O(e){e.key==="Escape"&&E()}function R(e){e.target===s.artistDetailsModal&&E()}function Le(){var e;(e=s.loader)==null||e.classList.remove("is-hidden")}function we(){var e;(e=s.loader)==null||e.classList.add("is-hidden")}async function Ee(e){try{Le();const t=await V(e);let a=await Q(e);Array.isArray(a)||(a=(a==null?void 0:a.albums)||[]);const{startYear:o,endYear:n,name:i,image:l,gender:L,members:f,country:D,biography:P,genres:_}=t;let g;o&&n?g=`${o} - ${t.endYear}`:o&&!n?g=`${o} - present`:g="information missing";const N=`
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
                <p  class="artist-details-modal-text">${g}</p>
            </li>
            ${L?`
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Sex</h3>
                    <p class="artist-details-modal-text">${L}</p>
                </li>
                `:""}
            ${f?`
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Members</h3>
                    <p class="artist-details-modal-text">${f.length}</p>
                </li>
                `:""}
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Country</h3>
                <p class="artist-details-modal-text">${D}</p>
            </li>
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Biography</h3>
                <p class="artist-details-modal-text">${P}</p>
            </li>
            </ul>
           
            <ul class="artist-details-modal-block-genres">
            <li class="artist-details-modal-block-genres-item">
                <p class="artist-details-modal-genres">${_}</p>
            </li>
            </ul>
            </div>

            <h3 class="artist-details-modal-albums">Albums</h3>
            ${a.length>0?a.map($=>{var k;return`
            <div class="artist-details-modal-albums-list">
                <h4 class="artist-details-modal-albums-list-title">${$.title}</h4>
                <table>
                <thead class="artist-details-modal-albums-list-table-head">
                    <tr>
                    <th class="artist-details-modal-albums-list-table col-1">Track</th>
                    <th class="artist-details-modal-albums-list-table col-2">Time</th>
                    <th class="artist-details-modal-albums-list-table col-3">Link</th>
                    </tr>
                </thead>
                <tbody class="artist-details-modal-albums-list-table-body">
                    ${((k=$.tracks)==null?void 0:k.map(b=>`
                    <tr>
                        <td class="artist-details-modal-albums-list-table-text col-1">${b.title}</td>
                        <td class="artist-details-modal-albums-list-table-text col-2">${b.duration}</td>
                        <td class= "col-3">
                            ${b.youtubeLink?`
                                <a class="modal-link-youtube" href="${b.youtubeLink}" target="_blank">
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
        ${N}
        `,s.artistDetailsModal.querySelector(".artist-details-modal-close-btn").addEventListener("click",E),Se()}catch(t){console.log(t)}finally{we()}}s.artistsList.addEventListener("click",e=>{const t=e.target.closest(".artist-cta");if(!t)return;const a=t.dataset.artistId;a&&Ee(a)});const A=document.querySelectorAll("#myRating svg"),$e=document.getElementById("ratingValue");A.forEach((e,t)=>{e.innerHTML=`<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
  1.402 8.173L12 18.897l-7.336 3.86 
  1.402-8.173L.132 9.21l8.2-1.192z"/>`,e.style.fill="#ffff",e.style.cursor="pointer",e.addEventListener("click",()=>{$e.value=t+1,A.forEach((a,o)=>a.style.fill=o<=t?"#764191":"#ffff")})});const ke=document.querySelector(".feedback-modal-close"),p=document.querySelector(".feedback-backdrop");ke.addEventListener("click",()=>{p.classList.remove("is-open"),document.body.style.overflow=""});p.addEventListener("click",e=>{e.target===p&&(p.classList.remove("is-open"),document.body.style.overflow="")});const Ce=document.querySelector(".leave-feedback-button");Ce.addEventListener("click",()=>{p.classList.add("is-open"),document.body.style.overflow="hidden"});const S=document.querySelector(".scroll-to-top");let q=window.scrollY,m=!1,G,w;window.addEventListener("scroll",()=>{clearTimeout(G),G=setTimeout(()=>{const e=window.scrollY,t=e<q-70,o=window.innerHeight+e>=document.body.offsetHeight-10||t&&e>350;o&&!m?(S.classList.add("visible"),m=!0,clearTimeout(w),w=setTimeout(()=>{S.classList.remove("visible"),m=!1},2e3)):!o&&m&&(S.classList.remove("visible"),m=!1,clearTimeout(w)),q=e},70)});S.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
