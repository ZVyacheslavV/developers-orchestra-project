import{i as q,a as u,g as c}from"./assets/vendor-CTMFRdsy.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=a(o);fetch(o.href,i)}})();const t={artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),loader:document.querySelector(".loader"),btnSearch:document.querySelector(".search-and-filters-toggle"),searchInput:document.querySelector(".search-input"),searchBtnRequest:document.querySelector(".search-btn"),iconSearch:document.querySelector(".dropdown-icon-search"),iconSort:document.querySelector(".sort-icon"),iconSort:document.querySelector(".genres-icon"),loaderArtistsWrapper:document.querySelector(".artists-loader-container"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link")},C="https://sound-wave.b.goit.study/api",d={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},L=8;function y(e,s="center"){q.error({title:"Error",message:e,position:s})}function I(){t.loaderArtistsWrapper.classList.add("hidden")}function O(){t.loaderArtistsWrapper.classList.remove("hidden")}const G={currentPage:1};document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:e,mobileMenu:s,menuLinks:a}=t;function r(){s.classList.add("active"),e.classList.add("active")}function o(){s.classList.remove("active"),e.classList.remove("active")}e==null||e.addEventListener("click",()=>{s.classList.contains("active")?o():r()}),a==null||a.forEach(i=>i.addEventListener("click",o))});u.defaults.baseURL=C;const D=async e=>{const{data:s}=await u.get(`${d.ARTISTS}?limit=${L}&page=${e}`);return s},R=async e=>{const{data:s}=await u.get(`${d.ARTIST_BY_ID}${e}`);return s},B=async e=>{const{data:s}=await u.get(`${d.ARTIST_BY_ID}${e}${d.ARTIST_ALBUMS_BY_ID}`);return s},_=async()=>{const{data:e}=await u.get(`${d.GENRES}`);return e},x=async({name:e,page:s=1,sorted:a=0,genre:r=""})=>{const{data:o}=await u.get(`${d.ARTISTS}?limit=${L}&page=${s}&name=${e}${a===2?"&sortName=desc":a===1?"&sortName=asc":""}${r?`&genre=${r}`:""}`);return o};async function P(){try{const{artists:e}=await D(G.currentPage);w(e)}catch{y("Failed to fetch artists")}}function w(e=[]){const s=e.map(({_id:a,strArtist:r="Unknown",strArtistThumb:o,strBiographyEN:i="",genres:l=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${a}">
                <img
                  src="${o||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${r} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(l)&&l.length?`<ul class="artist-tags">${l.map(m=>`<li class="tag">${m}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${r}</h3>
                ${i?`<p class="artist-desc text-clamp-3">${i}</p>`:""}

                <button class="artist-cta" type="button" data-artist-id="${a}" aria-label="Learn more about ${r}">
                  Learn More<svg class="artist-cta-icon" width="16" height="16" aria-hidden="true">
    <use href="./img/icons.svg#icon-arrow-1"></use>
  </svg>
                </button>
              </div>
            </li>`).join("");t.artistsList.insertAdjacentHTML("beforeend",s)}P();const n={tlOpenSearch:window.matchMedia("(min-width: 1440px)").matches?null:c.timeline({paused:!0}).to(t.iconSearch,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(t.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(t.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSearch:window.matchMedia("(min-width: 1440px)").matches?null:c.timeline({paused:!0}).to(t.iconSearch,{rotate:0,duration:.3,ease:"power2.in"},0).to(t.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenSort:c.timeline({paused:!0}).to(t.iconSort,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(t.menuSort,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(t.menuSort.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseSort:c.timeline({paused:!0}).to(t.iconSort,{rotate:0,duration:.3,ease:"power2.in"},0).to(t.menuSort,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),tlOpenGenres:c.timeline({paused:!0}).to(t.iconGenres,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(t.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(t.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),tlCloseGenres:c.timeline({paused:!0}).to(t.iconGenres,{rotate:0,duration:.3,ease:"power2.in"},0).to(t.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0)},g={name:"",page:1,sorted:0,genre:""};N();H();Y();j();function Y(){t.searchInput.addEventListener("input",()=>{g.name=t.searchInput.value.trim()}),t.searchBtnRequest.addEventListener("click",async()=>{var e;if(O(),!((e=g.name)!=null&&e.length)){y("Silence from you");return}try{const{artists:s}=await x(g);t.artistsList.innerHTML="",w(s)}catch(s){y(`Silence due problem ${s}`)}I(),n.tlCloseSearch.play(0)})}async function N(){try{const s='<li data-value="all">All Genres</li>'+(await _()).map(({genre:a})=>`<li data-value="${a.toLowerCase()}">${a}</li>`).join("");t.menuGenres.insertAdjacentHTML("beforeend",s)}catch(e){y(`While loading genres ${e}`)}}function j(){const e=s=>{document.querySelector(".artists-dropdown-sort").contains(s.target)||(n.tlCloseSort.restart(),t.btnSort.classList.remove("open"),t.menuSort.classList.remove("open"))};t.btnSort.addEventListener("click",s=>{s.stopPropagation(),t.menuSort.classList.contains("open")?(n.tlOpenSort.pause(0),n.tlCloseSort.pause(0).play(0),t.btnSort.classList.remove("open"),t.menuSort.classList.remove("open")):(n.tlOpenGenres.pause(0),n.tlCloseGenres.pause(0).play(0),t.btnGenres.classList.remove("open"),t.menuGenres.classList.remove("open"),n.tlCloseSort.pause(0),n.tlOpenSort.pause(0).play(0),t.btnSort.classList.add("open"),t.menuSort.classList.add("open"),document.addEventListener("click",e,{once:!0}))}),t.menuSort.addEventListener("click",s=>{const a=s.target.closest("li");a&&(t.btnSort.querySelector(".dropdown-label").textContent=a.textContent,t.btnSort.dataset.value=a.dataset.value,n.tlOpenSort.pause(0),n.tlCloseSort.restart(),t.btnSort.classList.remove("open"),t.menuSort.classList.remove("open"))})}function H(){if(window.matchMedia("(min-width: 1440px)").matches)return;const e=s=>{document.querySelector(".filters-content").contains(s.target)||(n.tlCloseSearch.play(0),document.removeEventListener("click",e))};t.btnSearch.addEventListener("click",s=>{s.stopPropagation(),c.isTweening(t.panelSearch)||t.panelSearch.style.pointerEvents==="auto"?(n.tlOpenSearch.pause(0),n.tlCloseSearch.restart(),document.removeEventListener("click",e)):(n.tlCloseSearch.pause(0),n.tlOpenSearch.restart(),document.addEventListener("click",e))})}function U(){t.artistDetailsModal.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",$),t.artistDetailsModal.addEventListener("click",E)}function f(){t.artistDetailsModal.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",$),t.artistDetailsModal.removeEventListener("click",E)}function $(e){e.key==="Escape"&&f()}function E(e){e.target===t.artistDetailsModal&&f()}function W(){var e;(e=t.loader)==null||e.classList.remove("is-hidden")}function F(){var e;(e=t.loader)==null||e.classList.add("is-hidden")}async function K(e){try{W();const s=await R(e);let a=await B(e);Array.isArray(a)||(a=(a==null?void 0:a.albums)||[]);const{startYear:r,endYear:o,name:i,image:l,gender:S,members:m,country:A,biography:T,genres:k}=s;let p;r&&o?p=`${r} - ${s.endYear}`:r&&!o?p=`${r} - present`:p="information missing";const M=`
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
            ${S?`
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Sex</h3>
                    <p class="artist-details-modal-text">${S}</p>
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
                <p class="artist-details-modal-text">${A}</p>
            </li>
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Biography</h3>
                <p class="artist-details-modal-text">${T}</p>
            </li>
            </ul>
           
            <ul class="artist-details-modal-block-genres">
            <li class="artist-details-modal-block-genres-item">
                <p class="artist-details-modal-genres">${k}</p>
            </li>
            </ul>
            </div>

            <h3 class="artist-details-modal-albums">Albums</h3>
            ${a.length>0?a.map(v=>{var b;return`
            <div class="artist-details-modal-albums-list">
                <h4 class="artist-details-modal-albums-list-title">${v.title}</h4>
                <table>
                <thead class="artist-details-modal-albums-list-table-head">
                    <tr>
                    <th class="artist-details-modal-albums-list-table col-1">Track</th>
                    <th class="artist-details-modal-albums-list-table col-2">Time</th>
                    <th class="artist-details-modal-albums-list-table col-3">Link</th>
                    </tr>
                </thead>
                <tbody class="artist-details-modal-albums-list-table-body">
                    ${((b=v.tracks)==null?void 0:b.map(h=>`
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
        `;t.artistDetailsModal.innerHTML=`
        <button class="artist-details-modal-close-btn" type="button">
            <svg class="modal-svg" width="14" height="14">
            <use href="/src/img/icons.svg#icon-close"></use>
            </svg>
        </button>
        ${M}
        `,t.artistDetailsModal.querySelector(".artist-details-modal-close-btn").addEventListener("click",f),U()}catch(s){console.log(s)}finally{F()}}t.artistsList.addEventListener("click",e=>{const s=e.target.closest(".artist-cta");if(!s)return;const a=s.dataset.artistId;a&&K(a)});
//# sourceMappingURL=index.js.map
