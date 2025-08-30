import{i as h,a as m,g}from"./assets/vendor-BAa1Uqhj.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const o={artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres"),menuSort:document.querySelector(".dropdown-menu-sort"),btnGenres:document.querySelector(".dropdown-toggle-genres"),btnSort:document.querySelector(".dropdown-toggle-sort")},$="https://sound-wave.b.goit.study/api",u={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},w=8;function f(e,t="center"){h.error({title:"Error",message:e,position:t})}const S={currentPage:1};m.defaults.baseURL=$;const E=async e=>{const{data:t}=await m.get(`${u.ARTISTS}?limit=${w}&page=${e}`);return t},A=async e=>{const{data:t}=await m.get(`${u.ARTIST_BY_Id}${e}`);return t},T=async e=>{const{data:t}=await m.get(`${u.ARTIST_BY_Id}${e}${u.ARTIST_ALBUMS_BY_ID}`);return t},I=async()=>{const{data:e}=await m.get(`${u.GENRES}`);return e};async function M(){try{const{artists:e}=await E(S.currentPage);k(e)}catch{f("Failed to fetch artists")}}function k(e=[]){const t=e.map(({_id:r,strArtist:i="Unknown",strArtistThumb:s,strBiographyEN:a="",genres:n=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${r}">
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

                <button class="artist-cta" type="button" data-artist-id="${r}" aria-label="Learn more about ${i}">
                  Learn More
                </button>
              </div>
            </li>`).join("");o.artistsList.insertAdjacentHTML("beforeend",t)}M();const y=[];D();b({btn:o.btnGenres,menu:o.menuGenres,wrapperSelector:".artists-dropdown-genres"});b({btn:o.btnSort,menu:o.menuSort,wrapperSelector:".artists-dropdown-sort"});async function D(){try{const t='<li data-value="all">All Genres</li>'+(await I()).map(({genre:r})=>`<li data-value="${r.toLowerCase()}">${r}</li>`).join("");o.menuGenres.insertAdjacentHTML("beforeend",t)}catch(e){f(`While loading genres ${e}`)}}function b({btn:e,menu:t,wrapperSelector:r}){const i=e.querySelector(".dropdown-icon"),s=g.timeline({paused:!0}),a=g.timeline({paused:!0}),n=l=>{document.querySelector(r).contains(l.target)||(a.restart(),e.classList.remove("open"),t.classList.remove("open"))};s.to(i,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(t,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(t.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1),a.to(i,{rotate:0,duration:.3,ease:"power2.in"},0).to(t,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0),e.addEventListener("click",l=>{l.stopPropagation(),t.classList.contains("open")?(s.pause(0),a.restart(),e.classList.remove("open"),t.classList.remove("open")):(y.forEach(d=>{d.menu!==t&&(d.tlOpen.pause(0),d.tlClose.restart(),d.btn.classList.remove("open"),d.menu.classList.remove("open"))}),a.pause(0),s.restart(),e.classList.add("open"),t.classList.add("open"),document.addEventListener("click",n,{once:!0}))}),t.addEventListener("click",l=>{const c=l.target.closest("li");c&&(e.querySelector(".dropdown-label").textContent=c.textContent,e.dataset.value=c.dataset.value,s.pause(0),a.restart(),e.classList.remove("open"),t.classList.remove("open"))}),y.push({btn:e,menu:t,tlOpen:s,tlClose:a})}function _(){o.artistDetailsModal.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",v),o.artistDetailsModal.addEventListener("click",L),o.artistDetailsModalCloseBtn.addEventListener("click",p)}function p(){o.artistDetailsModal.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",v),o.artistDetailsModal.removeEventListener("click",L),o.artistDetailsModalCloseBtn.removeEventListener("click",p)}function v(e){e.key==="Escape"&&p()}function L(e){e.target===o.modal&&p()}function B(){document.querySelector(".loader").classList.remove("is-hidden")}function C(){document.querySelector(".loader").classList.add("is-hidden")}async function R(e){try{const t=await A(e),r=await T(e);let i;t.startYear&&t.endYear?i=`${t.startYear} - ${t.endYear}`:t.startYear&&!t.endYear?i=`${t.startYear} - present`:i="information missing";const s=`
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
        ${r.map(n=>`
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
    `,a=o.artistDetailsModal.querySelector(".container");a.innerHTML=`
      <button class="artist-details-modal-close-btn" type="button">
        <svg class="modal-svg" width="14" height="14">
          <use href="/src/img/icons.svg#icon-close"></use>
        </svg>
      </button>
      ${s}
    `,_(),B()}catch(t){h.error("Error loading artist:",t)}finally{C()}}o.artistsList.addEventListener("click",e=>{const t=e.target.closest(".artist-cta");if(!t)return;const r=t.dataset.artistId;r&&R(r)});
//# sourceMappingURL=index.js.map
