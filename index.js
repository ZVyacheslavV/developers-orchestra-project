import{i as y,a as p,g as u}from"./assets/vendor-CTMFRdsy.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const r={artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),panelSearch:document.querySelector(".filters-content"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort"),btnSearch:document.querySelector(".search-and-filters-toggle"),toggleBtn:document.querySelector(".header-toggle"),mobileMenu:document.querySelector(".header-mobile-menu"),menuLinks:document.querySelectorAll(".header-mob-nav-link")},L="https://sound-wave.b.goit.study/api",m={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},w=8;function f(e,t="center"){y.error({title:"Error",message:e,position:t})}const $={currentPage:1};document.addEventListener("DOMContentLoaded",()=>{const{toggleBtn:e,mobileMenu:t,menuLinks:o}=r;function i(){t.classList.add("active"),e.classList.add("active")}function s(){t.classList.remove("active"),e.classList.remove("active")}e==null||e.addEventListener("click",()=>{t.classList.contains("active")?s():i()}),o==null||o.forEach(a=>a.addEventListener("click",s))});p.defaults.baseURL=L;const E=async e=>{const{data:t}=await p.get(`${m.ARTISTS}?limit=${w}&page=${e}`);return t},A=async e=>{const{data:t}=await p.get(`${m.ARTIST_BY_Id}${e}`);return t},T=async e=>{const{data:t}=await p.get(`${m.ARTIST_BY_Id}${e}${m.ARTIST_ALBUMS_BY_ID}`);return t},k=async()=>{const{data:e}=await p.get(`${m.GENRES}`);return e};async function M(){try{const{artists:e}=await E($.currentPage);q(e)}catch{f("Failed to fetch artists")}}function q(e=[]){const t=e.map(({_id:o,strArtist:i="Unknown",strArtistThumb:s,strBiographyEN:a="",genres:n=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${o}">
                <img
                  src="${s||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${i} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(n)&&n.length?`<ul class="artist-tags">${n.map(c=>`<li class="tag">${c}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${i}</h3>
                ${a?`<p class="artist-desc text-clamp-3">${a}</p>`:""}

                <button class="artist-cta" type="button" data-artist-id="${o}" aria-label="Learn more about ${i}">
                  Learn More<svg class="artist-cta-icon" width="16" height="16" aria-hidden="true">
    <use href="./img/icons.svg#icon-arrow-1"></use>
  </svg>
                </button>
              </div>
            </li>`).join("");r.artistsList.insertAdjacentHTML("beforeend",t)}M();const g=[];I();C();v({btn:r.btnGenres,menu:r.menuGenres,wrapperSelector:".artists-dropdown-genres"});v({btn:r.btnSort,menu:r.menuSort,wrapperSelector:".artists-dropdown-sort"});async function I(){try{const t='<li data-value="all">All Genres</li>'+(await k()).map(({genre:o})=>`<li data-value="${o.toLowerCase()}">${o}</li>`).join("");r.menuGenres.insertAdjacentHTML("beforeend",t)}catch(e){f(`While loading genres ${e}`)}}function v({btn:e,menu:t,wrapperSelector:o}){const i=e.querySelector(".dropdown-icon"),s=u.timeline({paused:!0}),a=u.timeline({paused:!0}),n=l=>{document.querySelector(o).contains(l.target)||(a.restart(),e.classList.remove("open"),t.classList.remove("open"))};s.to(i,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(t,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(t.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),a.to(i,{rotate:0,duration:.3,ease:"power2.in"},0).to(t,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),e.addEventListener("click",l=>{l.stopPropagation(),t.classList.contains("open")?(s.pause(0),a.pause(0).play(0),e.classList.remove("open"),t.classList.remove("open")):(g.forEach(d=>{d.menu!==t&&(d.tlOpen.pause(0),d.tlClose.pause(0).play(0),d.btn.classList.remove("open"),d.menu.classList.remove("open"))}),a.pause(0),s.pause(0).play(0),e.classList.add("open"),t.classList.add("open"),document.addEventListener("click",n,{once:!0}))}),t.addEventListener("click",l=>{const c=l.target.closest("li");c&&(e.querySelector(".dropdown-label").textContent=c.textContent,e.dataset.value=c.dataset.value,s.pause(0),a.restart(),e.classList.remove("open"),t.classList.remove("open"))}),g.push({btn:e,menu:t,tlOpen:s,tlClose:a})}function C(){if(window.matchMedia("(min-width: 1440px)").matches)return;const e=r.btnSearch.querySelector(".dropdown-icon"),t=u.timeline({paused:!0});t.to(e,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(r.panelSearch,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(r.panelSearch.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1);const o=u.timeline({paused:!0});o.to(e,{rotate:0,duration:.3,ease:"power2.in"},0).to(r.panelSearch,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0);const i=s=>{document.querySelector(".filters-content").contains(s.target)||(o.play(0),document.removeEventListener("click",i))};r.btnSearch.addEventListener("click",s=>{s.stopPropagation(),u.isTweening(r.panelSearch)||r.panelSearch.style.pointerEvents==="auto"?(t.pause(0),o.restart(),document.removeEventListener("click",i)):(o.pause(0),t.restart(),document.addEventListener("click",i))})}function D(){r.artistDetailsModal.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",S),r.artistDetailsModal.addEventListener("click",b),r.artistDetailsModalCloseBtn.addEventListener("click",h)}function h(){r.artistDetailsModal.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",S),r.artistDetailsModal.removeEventListener("click",b),r.artistDetailsModalCloseBtn.removeEventListener("click",h)}function S(e){e.key==="Escape"&&h()}function b(e){e.target===r.modal&&h()}function _(){document.querySelector(".loader").classList.remove("is-hidden")}function O(){document.querySelector(".loader").classList.add("is-hidden")}async function B(e){try{const t=await A(e),o=await T(e);let i;t.startYear&&t.endYear?i=`${t.startYear} - ${t.endYear}`:t.startYear&&!t.endYear?i=`${t.startYear} - present`:i="information missing";const s=`
      <div class="artist-details-modal-content">
        <button class="artist-details-modal-close-btn" type="button">
            <svg class="modal-svg" width="14" height="14">
                <use href="/src/img/icons.svg#icon-close"></use>
            </svg>
        </button> 

        <h2 class="artist-details-modal-main-title">${t.name}</h2>
        <img class="artist-details-modal-img" src="${t.image}" alt="${t.name}" />

        <h3 class="artist-details-modal-title">Years active</h3>
        <p  class="artist-details-modal-text">${i}</p>
        ${t.gender?`
            <h3 class="artist-details-modal-title">Sex</h3> 
            <p class="artist-details-modal-text">${t.gender}</p>
            `:""}
        ${t.members?`
            <h3 class="artist-details-modal-title">Members</h3>
            <p class="artist-details-modal-text">${t.members.length}</p>
            `:""}
        <h3 class="artist-details-modal-title">Country</h3>
        <p class="artist-details-modal-text">${t.country}</p>
        <h3 class="artist-details-modal-title">Biography</h3>
        <p class="artist-details-modal-text">${t.biography}</p>
        <p class="artist-details-modal-genres">${t.genres.join(" ")}</p>

        <h3 class="artist-details-modal-albums">Albums</h3>
        ${o.map(n=>`
          <div class="artist-details-modal-albums-list">
            <h4 class="artist-details-modal-albums-list-title">${n.title}</h4>
            <table>
              <thead>
                <tr>
                  <th class="artist-details-modal-albums-list-table">Track</th>
                  <th class="artist-details-modal-albums-list-table">Time</th>
                  <th class="artist-details-modal-albums-list-table">Link</th>
                </tr>
              </thead>
              <tbody>
                ${n.tracks.map(l=>`
                  <tr>
                    <td class="artist-details-modal-albums-list-table-text">${l.title}</td>
                    <td class="artist-details-modal-albums-list-table-text">${l.duration}</td>
                    <td>
                        ${l.youtubeLink?`
                            <a href="${l.youtubeLink}" target="_blank">
                                <svg class="modal-youtube" width="20" height="14">
                                    <use href="/src/img/icons.svg#icon-youtube"></use>
                                </svg>
                            </a>
                        `:""}
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `).join("")}
      </div>
    `,a=r.artistDetailsModal.querySelector(".container");a.innerHTML=`
      <button class="artist-details-modal-close-btn" type="button">
        <svg class="modal-svg" width="14" height="14">
          <use href="/src/img/icons.svg#icon-close"></use>
        </svg>
      </button>
      ${s}
    `,D(),_()}catch(t){y.error("Error loading artist:",t)}finally{O()}}r.artistsList.addEventListener("click",e=>{const t=e.target.closest(".artist-cta");if(!t)return;const o=t.dataset.artistId;o&&B(o)});
//# sourceMappingURL=index.js.map
