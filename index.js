import{i as T,a as p,g as u}from"./assets/vendor-CTMFRdsy.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const o={artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),loader:document.querySelector(".loader"),btnSearch:document.querySelector(".search-and-filters-toggle"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link")},M="https://sound-wave.b.goit.study/api",m={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},D=8;function S(t,e="center"){T.error({title:"Error",message:t,position:e})}const q={currentPage:1};document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:t,mobileMenu:e,menuLinks:a}=o;function r(){e.classList.add("active"),t.classList.add("active")}function s(){e.classList.remove("active"),t.classList.remove("active")}t==null||t.addEventListener("click",()=>{e.classList.contains("active")?s():r()}),a==null||a.forEach(i=>i.addEventListener("click",s))});p.defaults.baseURL=M;const I=async t=>{const{data:e}=await p.get(`${m.ARTISTS}?limit=${D}&page=${t}`);return e},_=async t=>{const{data:e}=await p.get(`${m.ARTIST_BY_ID}${t}`);return e},O=async t=>{const{data:e}=await p.get(`${m.ARTIST_BY_ID}${t}${m.ARTIST_ALBUMS_BY_ID}`);return e},B=async()=>{const{data:t}=await p.get(`${m.GENRES}`);return t};async function C(){try{const{artists:t}=await I(q.currentPage);x(t)}catch{S("Failed to fetch artists")}}function x(t=[]){const e=t.map(({_id:a,strArtist:r="Unknown",strArtistThumb:s,strBiographyEN:i="",genres:l=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${a}">
                <img
                  src="${s||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${r} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(l)&&l.length?`<ul class="artist-tags">${l.map(c=>`<li class="tag">${c}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${r}</h3>
                ${i?`<p class="artist-desc text-clamp-3">${i}</p>`:""}

                <button class="artist-cta" type="button" data-artist-id="${a}" aria-label="Learn more about ${r}">
                  Learn More<svg class="artist-cta-icon" width="16" height="16" aria-hidden="true">
    <use href="./img/icons.svg#icon-arrow-1"></use>
  </svg>
                </button>
              </div>
            </li>`).join("");o.artistsList.insertAdjacentHTML("beforeend",e)}C();const b=[];R();P();L({btn:o.btnGenres,menu:o.menuGenres,wrapperSelector:".artists-dropdown-genres"});L({btn:o.btnSort,menu:o.menuSort,wrapperSelector:".artists-dropdown-sort"});async function R(){try{const e='<li data-value="all">All Genres</li>'+(await B()).map(({genre:a})=>`<li data-value="${a.toLowerCase()}">${a}</li>`).join("");o.menuGenres.insertAdjacentHTML("beforeend",e)}catch(t){S(`While loading genres ${t}`)}}function L({btn:t,menu:e,wrapperSelector:a}){const r=t.querySelector(".dropdown-icon"),s=u.timeline({paused:!0}),i=u.timeline({paused:!0}),l=n=>{document.querySelector(a).contains(n.target)||(i.restart(),t.classList.remove("open"),e.classList.remove("open"))};s.to(r,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(e,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(e.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),i.to(r,{rotate:0,duration:.3,ease:"power2.in"},0).to(e,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),t.addEventListener("click",n=>{n.stopPropagation(),e.classList.contains("open")?(s.pause(0),i.pause(0).play(0),t.classList.remove("open"),e.classList.remove("open")):(b.forEach(d=>{d.menu!==e&&(d.tlOpen.pause(0),d.tlClose.pause(0).play(0),d.btn.classList.remove("open"),d.menu.classList.remove("open"))}),i.pause(0),s.pause(0).play(0),t.classList.add("open"),e.classList.add("open"),document.addEventListener("click",l,{once:!0}))}),e.addEventListener("click",n=>{const c=n.target.closest("li");c&&(t.querySelector(".dropdown-label").textContent=c.textContent,t.dataset.value=c.dataset.value,s.pause(0),i.restart(),t.classList.remove("open"),e.classList.remove("open"))}),b.push({btn:t,menu:e,tlOpen:s,tlClose:i})}function P(){if(window.matchMedia("(min-width: 1440px)").matches)return;const t=o.btnSearch.querySelector(".dropdown-icon"),e=u.timeline({paused:!0});e.to(t,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(o.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(o.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1);const a=u.timeline({paused:!0});a.to(t,{rotate:0,duration:.3,ease:"power2.in"},0).to(o.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0);const r=s=>{document.querySelector(".filters-content").contains(s.target)||(a.play(0),document.removeEventListener("click",r))};o.btnSearch.addEventListener("click",s=>{s.stopPropagation(),u.isTweening(o.panelSearch)||o.panelSearch.style.pointerEvents==="auto"?(e.pause(0),a.restart(),document.removeEventListener("click",r)):(a.pause(0),e.restart(),document.addEventListener("click",r))})}function G(){o.artistDetailsModal.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",w),o.artistDetailsModal.addEventListener("click",$)}function y(){o.artistDetailsModal.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",w),o.artistDetailsModal.removeEventListener("click",$)}function w(t){t.key==="Escape"&&y()}function $(t){t.target===o.artistDetailsModal&&y()}function Y(){var t;(t=o.loader)==null||t.classList.remove("is-hidden")}function N(){var t;(t=o.loader)==null||t.classList.add("is-hidden")}async function j(t){try{Y();const e=await _(t);let a=await O(t);Array.isArray(a)||(a=(a==null?void 0:a.albums)||[]);const{startYear:r,endYear:s,name:i,image:l,gender:n,members:c,country:d,biography:E,genres:A}=e;let h;r&&s?h=`${r} - ${e.endYear}`:r&&!s?h=`${r} - present`:h="information missing";const k=`
        <div class="artist-details-modal-content">
            <button class="artist-details-modal-close-btn" type="button">
                <svg class="modal-svg" width="14" height="14">
                    <use href="/src/img/icons.svg#icon-close"></use>
                </svg>
            </button> 

            <h2 class="artist-details-modal-main-title">${i}</h2>
            <div class="artist-details-modal-main-block">
            <img class="artist-details-modal-img" src="${l}" alt="${e.name}" />

            <ul class="artist-details-modal-list">
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Years active</h3>
                <p  class="artist-details-modal-text">${h}</p>
            </li>
            ${n?`
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Sex</h3>
                    <p class="artist-details-modal-text">${n}</p>
                </li>
                `:""}
            ${c?`
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Members</h3>
                    <p class="artist-details-modal-text">${c.length}</p>
                </li>
                `:""}
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Country</h3>
                <p class="artist-details-modal-text">${d}</p>
            </li>
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Biography</h3>
                <p class="artist-details-modal-text">${E}</p>
            </li>
            </ul>
           
            <ul class="artist-details-modal-block-genres">
            <li class="artist-details-modal-block-genres-item">
                <p class="artist-details-modal-genres">${A}</p>
            </li>
            </ul>
            </div>

            <h3 class="artist-details-modal-albums">Albums</h3>
            ${a.length>0?a.map(f=>{var v;return`
            <div class="artist-details-modal-albums-list">
                <h4 class="artist-details-modal-albums-list-title">${f.title}</h4>
                <table>
                <thead class="artist-details-modal-albums-list-table-head">
                    <tr>
                    <th class="artist-details-modal-albums-list-table col-1">Track</th>
                    <th class="artist-details-modal-albums-list-table col-2">Time</th>
                    <th class="artist-details-modal-albums-list-table col-3">Link</th>
                    </tr>
                </thead>
                <tbody class="artist-details-modal-albums-list-table-body">
                    ${((v=f.tracks)==null?void 0:v.map(g=>`
                    <tr>
                        <td class="artist-details-modal-albums-list-table-text col-1">${g.title}</td>
                        <td class="artist-details-modal-albums-list-table-text col-2">${g.duration}</td>
                        <td class= "col-3">
                            ${g.youtubeLink?`
                                <a class="modal-link-youtube" href="${g.youtubeLink}" target="_blank">
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
        `;o.artistDetailsModal.innerHTML=`
        <button class="artist-details-modal-close-btn" type="button">
            <svg class="modal-svg" width="14" height="14">
            <use href="/src/img/icons.svg#icon-close"></use>
            </svg>
        </button>
        ${k}
        `,o.artistDetailsModal.querySelector(".artist-details-modal-close-btn").addEventListener("click",y),G()}catch(e){console.log(e)}finally{N()}}o.artistsList.addEventListener("click",t=>{const e=t.target.closest(".artist-cta");if(!e)return;const a=e.dataset.artistId;a&&j(a)});
//# sourceMappingURL=index.js.map
