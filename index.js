import{i as p,a as d,g as m}from"./assets/vendor-BAa1Uqhj.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const i={artistsList:document.querySelector("#artists-list"),artistDetailsModal:document.querySelector(".artist-details-modal"),artistDetailsModalCloseBtn:document.querySelector(".artist-details-modal-close-btn"),menuGenres:document.querySelector(".dropdown-menu-genres")},b="https://sound-wave.b.goit.study/api",c={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},v=8;function g(e,t="center"){p.error({title:"Error",message:e,position:t})}const $={currentPage:1};d.defaults.baseURL=b;const L=async e=>{const{data:t}=await d.get(`${c.ARTISTS}?limit=${v}&page=${e}`);return t},w=async e=>{const{data:t}=await d.get(`${c.ARTIST_BY_Id}${e}`);return t},E=async e=>{const{data:t}=await d.get(`${c.ARTIST_BY_Id}${e}${c.ARTIST_ALBUMS_BY_ID}`);return t},S=async()=>{const{data:e}=await d.get(`${c.GENRES}`);return e};async function A(){try{const{artists:e}=await L($.currentPage);T(e)}catch{g("Failed to fetch artists")}}function T(e=[]){const t=e.map(({_id:n,strArtist:r="Unknown",strArtistThumb:s,strBiographyEN:a="",genres:o=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${n}">
                <img
                  src="${s||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${r} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(o)&&o.length?`<ul class="artist-tags">${o.map(f=>`<li class="tag">${f}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${r}</h3>
                ${a?`<p class="artist-desc text-clamp-3">${a}</p>`:""}

                <button class="artist-cta" type="button" data-artist-id="${n}" aria-label="Learn more about ${r}">
                  Learn More
                </button>
              </div>
            </li>`).join("");i.artistsList.insertAdjacentHTML("beforeend",t)}A();const I=async()=>{try{const t='<li data-value="all">All Genres</li>'+(await S()).map(({genre:n})=>`<li data-value="${n.toLowerCase()}">${n}</li>`).join("");i.menuGenres.insertAdjacentHTML("beforeend",t)}catch(e){g(`While loading genres ${e}`)}};I();document.querySelectorAll(".artists-dropdown-genres").forEach(e=>{const t=e.querySelector(".dropdown-toggle-genres"),n=t.querySelector(".dropdown-icon"),r=m.timeline({paused:!0});r.to(n,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(i.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(i.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1);const s=m.timeline({paused:!0});s.to(n,{rotate:0,duration:.3,ease:"power2.in"},0).to(i.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0);const a=o=>{e.contains(o.target)||(s.play(0),document.removeEventListener("click",a))};t.addEventListener("click",o=>{o.stopPropagation(),m.isTweening(i.menuGenres)||i.menuGenres.style.pointerEvents==="auto"?(r.pause(0),s.restart(),document.removeEventListener("click",a)):(s.pause(0),r.restart(),document.addEventListener("click",a))}),i.menuGenres.addEventListener("click",o=>{const l=o.target.closest("li");l&&(t.querySelector(".dropdown-label").textContent=l.textContent,t.dataset.value=l.dataset.value,r.pause(0),s.restart(),document.removeEventListener("click",a))})});function k(){i.artistDetailsModal.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",y),i.artistDetailsModal.addEventListener("click",h),i.artistDetailsModalCloseBtn.addEventListener("click",u)}function u(){i.artistDetailsModal.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",y),i.artistDetailsModal.removeEventListener("click",h),i.artistDetailsModalCloseBtn.removeEventListener("click",u)}function y(e){e.key==="Escape"&&u()}function h(e){e.target===i.modal&&u()}function M(){document.querySelector(".loader").classList.remove("is-hidden")}function _(){document.querySelector(".loader").classList.add("is-hidden")}async function B(e){try{const t=await w(e),n=await E(e);let r;t.startYear&&t.endYear?r=`${t.startYear} - ${t.endYear}`:t.startYear&&!t.endYear?r=`${t.startYear} - present`:r="information missing";const s=`
      <div class="artist-details-modal-content">
        <button class="artist-details-modal-close-btn" type="button">
            <svg class="modal-svg" width="14" height="14">
                <use href="/src/img/icons.svg#icon-close"></use>
            </svg>
        </button> 

        <h2 class="artist-details-modal-main-title">${t.name}</h2>
        <img class="artist-details-modal-img" src="${t.image}" alt="${t.name}" />

        <h3 class="artist-details-modal-title">Years active</h3>
        <p  class="artist-details-modal-text">${r}</p>
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
        ${n.map(o=>`
          <div class="artist-details-modal-albums-list">
            <h4 class="artist-details-modal-albums-list-title">${o.title}</h4>
            <table>
              <thead>
                <tr>
                  <th class="artist-details-modal-albums-list-table">Track</th>
                  <th class="artist-details-modal-albums-list-table">Time</th>
                  <th class="artist-details-modal-albums-list-table">Link</th>
                </tr>
              </thead>
              <tbody>
                ${o.tracks.map(l=>`
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
    `,a=i.artistDetailsModal.querySelector(".container");a.innerHTML=`
      <button class="artist-details-modal-close-btn" type="button">
        <svg class="modal-svg" width="14" height="14">
          <use href="/src/img/icons.svg#icon-close"></use>
        </svg>
      </button>
      ${s}
    `,k(),M()}catch(t){p.error("Error loading artist:",t)}finally{_()}}i.artistsList.addEventListener("click",e=>{const t=e.target.closest(".artist-cta");if(!t)return;const n=t.dataset.artistId;n&&B(n)});
//# sourceMappingURL=index.js.map
