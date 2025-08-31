import{i as O,a as u,g as c}from"./assets/vendor-CTMFRdsy.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=a(o);fetch(o.href,i)}})();const e={artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),loader:document.querySelector(".loader"),btnSearch:document.querySelector(".search-and-filters-toggle"),searchInput:document.querySelector(".search-input"),searchBtnRequest:document.querySelector(".search-btn"),iconSearch:document.querySelector(".dropdown-icon-search"),iconSort:document.querySelector(".sort-icon"),iconGenres:document.querySelector(".genres-icon"),loaderArtistsWrapper:document.querySelector(".artists-loader-container"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link")},I="https://sound-wave.b.goit.study/api",d={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},E=8;function S(t,s="center"){O.error({title:"Error",message:t,position:s})}function B(){e.loaderArtistsWrapper.classList.add("hidden")}function x(){e.loaderArtistsWrapper.classList.remove("hidden")}const D={currentPage:1};document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:t,mobileMenu:s,menuLinks:a}=e;function n(){s.classList.add("active"),t.classList.add("active")}function o(){s.classList.remove("active"),t.classList.remove("active")}t==null||t.addEventListener("click",()=>{s.classList.contains("active")?o():n()}),a==null||a.forEach(i=>i.addEventListener("click",o))});u.defaults.baseURL=I;const R=async t=>{const{data:s}=await u.get(`${d.ARTISTS}?limit=${E}&page=${t}`);return s},_=async t=>{const{data:s}=await u.get(`${d.ARTIST_BY_ID}${t}`);return s},P=async t=>{const{data:s}=await u.get(`${d.ARTIST_BY_ID}${t}${d.ARTIST_ALBUMS_BY_ID}`);return s},Y=async()=>{const{data:t}=await u.get(`${d.GENRES}`);return t},N=async({name:t,page:s=1,sorted:a=0,genre:n=""})=>{const{data:o}=await u.get(`${d.ARTISTS}?limit=${E}&page=${s}&name=${t}${a===2?"&sortName=desc":a===1?"&sortName=asc":""}${n?`&genre=${n}`:""}`);return o};async function H(){try{const{artists:t}=await R(D.currentPage);G(t)}catch{S("Failed to fetch artists")}}function G(t=[]){const s=t.map(({_id:a,strArtist:n="Unknown",strArtistThumb:o,strBiographyEN:i="",genres:l=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${a}">
                <img
                  src="${o||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${n} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(l)&&l.length?`<ul class="artist-tags">${l.map(m=>`<li class="tag">${m}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${n}</h3>
                ${i?`<p class="artist-desc text-clamp-3">${i}</p>`:""}

                <button class="artist-cta" type="button" data-artist-id="${a}" aria-label="Learn more about ${n}">
                  Learn More<svg class="artist-cta-icon" width="16" height="16" aria-hidden="true">
    <use href="./img/icons.svg#icon-arrow-1"></use>
  </svg>
                </button>
              </div>
            </li>`).join("");e.artistsList.insertAdjacentHTML("beforeend",s)}H();const r={tlOpenSearch:window.matchMedia("(min-width: 1440px)").matches?null:c.timeline({paused:!0}).to(e.iconSearch,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(e.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(e.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSearch:window.matchMedia("(min-width: 1440px)").matches?null:c.timeline({paused:!0}).to(e.iconSearch,{rotate:0,duration:.3,ease:"power2.in"},0).to(e.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenSort:c.timeline({paused:!0}).to(e.iconSort,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(e.menuSort,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(e.menuSort.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSort:c.timeline({paused:!0}).to(e.iconSort,{rotate:0,duration:.3,ease:"power2.in"},0).to(e.menuSort,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenGenres:c.timeline({paused:!0}).to(e.iconGenres,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(e.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(e.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseGenres:c.timeline({paused:!0}).to(e.iconGenres,{rotate:0,duration:.3,ease:"power2.in"},0).to(e.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0)},v={name:"",page:1,sorted:0,genre:""};U();K();j();W();F();function j(){e.searchInput.addEventListener("input",()=>{v.name=e.searchInput.value.trim()}),e.searchBtnRequest.addEventListener("click",async()=>{var t;if(x(),!((t=v.name)!=null&&t.length)){S("Silence from you");return}try{const{artists:s}=await N(v);e.artistsList.innerHTML="",G(s)}catch(s){S(`Silence due problem ${s}`)}B(),r.tlCloseSearch.play(0)})}async function U(){try{const s='<li data-value="all">All Genres</li>'+(await Y()).map(({genre:a})=>`<li data-value="${a.toLowerCase()}">${a}</li>`).join("");e.menuGenres.insertAdjacentHTML("beforeend",s)}catch(t){S(`While loading genres ${t}`)}}function W(){const t=s=>{document.querySelector(".artists-dropdown-sort").contains(s.target)||(r.tlCloseSort.restart(),e.btnSort.classList.remove("open"),e.menuSort.classList.remove("open"))};e.btnSort.addEventListener("click",s=>{s.stopPropagation(),e.menuSort.classList.contains("open")?(r.tlOpenSort.pause(0),r.tlCloseSort.restart(),e.btnSort.classList.remove("open"),e.menuSort.classList.remove("open")):(r.tlOpenGenres.pause(0),r.tlCloseGenres.restart(),e.btnGenres.classList.remove("open"),e.menuGenres.classList.remove("open"),r.tlCloseSort.pause(0),r.tlOpenSort.restart(),e.btnSort.classList.add("open"),e.menuSort.classList.add("open"),document.addEventListener("click",t,{once:!0}))}),e.menuSort.addEventListener("click",s=>{const a=s.target.closest("li");a&&(e.btnSort.querySelector(".dropdown-label").textContent=a.textContent,e.btnSort.dataset.value=a.dataset.value,r.tlOpenSort.pause(0),r.tlCloseSort.restart(),e.btnSort.classList.remove("open"),e.menuSort.classList.remove("open"))})}function F(){const t=s=>{document.querySelector(".artists-dropdown-genres").contains(s.target)||(r.tlCloseGenres.restart(),e.btnGenres.classList.remove("open"),e.menuGenres.classList.remove("open"))};e.btnGenres.addEventListener("click",s=>{s.stopPropagation(),e.menuGenres.classList.contains("open")?(r.tlOpenGenres.pause(0),r.tlCloseGenres.pause(0).play(0),e.btnGenres.classList.remove("open"),e.menuGenres.classList.remove("open")):(r.tlOpenSort.pause(0),r.tlCloseSort.pause(0).play(0),e.btnSort.classList.remove("open"),e.menuSort.classList.remove("open"),r.tlCloseGenres.pause(0),r.tlOpenGenres.pause(0).play(0),e.btnGenres.classList.add("open"),e.menuGenres.classList.add("open"),document.addEventListener("click",t,{once:!0}))}),e.menuGenres.addEventListener("click",s=>{const a=s.target.closest("li");a&&(e.btnGenres.querySelector(".dropdown-label").textContent=a.textContent,e.btnGenres.dataset.value=a.dataset.value,r.tlOpenGenres.pause(0),r.tlCloseGenres.restart(),e.btnGenres.classList.remove("open"),e.menuGenres.classList.remove("open"))})}function K(){if(window.matchMedia("(min-width: 1440px)").matches)return;const t=s=>{document.querySelector(".filters-content").contains(s.target)||(r.tlCloseSearch.play(0),document.removeEventListener("click",t))};e.btnSearch.addEventListener("click",s=>{s.stopPropagation(),c.isTweening(e.panelSearch)||e.panelSearch.style.pointerEvents==="auto"?(r.tlOpenSearch.pause(0),r.tlCloseSearch.restart(),document.removeEventListener("click",t)):(r.tlCloseSearch.pause(0),r.tlOpenSearch.restart(),document.addEventListener("click",t))})}function z(){e.artistDetailsModal.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",A),e.artistDetailsModal.addEventListener("click",k)}function f(){e.artistDetailsModal.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",A),e.artistDetailsModal.removeEventListener("click",k)}function A(t){t.key==="Escape"&&f()}function k(t){t.target===e.artistDetailsModal&&f()}function V(){var t;(t=e.loader)==null||t.classList.remove("is-hidden")}function J(){var t;(t=e.loader)==null||t.classList.add("is-hidden")}async function Q(t){try{V();const s=await _(t);let a=await P(t);Array.isArray(a)||(a=(a==null?void 0:a.albums)||[]);const{startYear:n,endYear:o,name:i,image:l,gender:g,members:m,country:T,biography:C,genres:q}=s;let p;n&&o?p=`${n} - ${s.endYear}`:n&&!o?p=`${n} - present`:p="information missing";const M=`
        <div class="artist-details-modal-content">
            <button class="artist-details-modal-close-btn" type="button">
                <svg class="modal-svg" width="14" height="14">
                    <use href="/src/img/icons.svg#icon-close"></use>
                </svg>
            </button> 

            <h2 class="artist-details-modal-main-title">${i}</h2>
            <div class="artist-details-modal-main-block">
            <img class="artist-details-modal-img" src="${l}" alt="${s.name}" />

            <ul class="artist-details-modal-list">
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Years active</h3>
                <p  class="artist-details-modal-text">${p}</p>
            </li>
            ${g?`
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Sex</h3>
                    <p class="artist-details-modal-text">${g}</p>
                </li>
                `:""}
            ${m?`
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Members</h3>
                    <p class="artist-details-modal-text">${m.length}</p>
                </li>
                `:""}
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Country</h3>
                <p class="artist-details-modal-text">${T}</p>
            </li>
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Biography</h3>
                <p class="artist-details-modal-text">${C}</p>
            </li>
            </ul>
           
            <ul class="artist-details-modal-block-genres">
            <li class="artist-details-modal-block-genres-item">
                <p class="artist-details-modal-genres">${q}</p>
            </li>
            </ul>
            </div>

            <h3 class="artist-details-modal-albums">Albums</h3>
            ${a.length>0?a.map(L=>{var w;return`
            <div class="artist-details-modal-albums-list">
                <h4 class="artist-details-modal-albums-list-title">${L.title}</h4>
                <table>
                <thead class="artist-details-modal-albums-list-table-head">
                    <tr>
                    <th class="artist-details-modal-albums-list-table col-1">Track</th>
                    <th class="artist-details-modal-albums-list-table col-2">Time</th>
                    <th class="artist-details-modal-albums-list-table col-3">Link</th>
                    </tr>
                </thead>
                <tbody class="artist-details-modal-albums-list-table-body">
                    ${((w=L.tracks)==null?void 0:w.map(h=>`
                    <tr>
                        <td class="artist-details-modal-albums-list-table-text col-1">${h.title}</td>
                        <td class="artist-details-modal-albums-list-table-text col-2">${h.duration}</td>
                        <td class= "col-3">
                            ${h.youtubeLink?`
                                <a class="modal-link-youtube" href="${h.youtubeLink}" target="_blank">
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
        `;e.artistDetailsModal.innerHTML=`
        <button class="artist-details-modal-close-btn" type="button">
            <svg class="modal-svg" width="14" height="14">
            <use href="/src/img/icons.svg#icon-close"></use>
            </svg>
        </button>
        ${M}
        `,e.artistDetailsModal.querySelector(".artist-details-modal-close-btn").addEventListener("click",f),z()}catch(s){console.log(s)}finally{J()}}e.artistsList.addEventListener("click",t=>{const s=t.target.closest(".artist-cta");if(!s)return;const a=s.dataset.artistId;a&&Q(a)});const b=document.querySelector(".scroll-to-top");let $=window.scrollY,y=!1;window.addEventListener("scroll",()=>{const t=window.scrollY,s=t<$,n=window.innerHeight+t>=document.body.offsetHeight||s&&t>300;n&&!y?(b.classList.add("visible"),y=!0):!n&&y&&(b.classList.remove("visible"),y=!1),$=t});b.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
