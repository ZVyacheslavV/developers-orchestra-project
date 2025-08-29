import{i as c,a as i}from"./assets/vendor-Cl-WcV8j.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const l={artistsList:document.querySelector("#artists-list"),menuGenres:document.querySelector(".dropdown-menu-genres")},m="https://sound-wave.b.goit.study/api",u={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},g=8;function f(e,s="center"){c.error({title:"Error",message:e,position:s})}const p={currentPage:1};i.defaults.baseURL=m;const y=async e=>{const{data:s}=await i.get(`${u.ARTISTS}?limit=${g}&page=${e}`);return s},L=async()=>{const{data:e}=await i.get(`${u.GENRES}`);return e};function E(e){c.error({title:"Error",message:e})}async function S(){try{const{artists:e}=await y(p.currentPage);h(e)}catch{E("Failed to fetch artists")}}function h(e=[]){const s=e.map(({_id:o,strArtist:n="Unknown",strArtistThumb:t,strBiographyEN:r="",genres:a=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${o}">
                <img
                  src="${t||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${n} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(a)&&a.length?`<ul class="artist-tags">${a.map(d=>`<li class="tag">${d}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${n}</h3>
                ${r?`<p class="artist-desc text-clamp-3">${r}</p>`:""}

                <button class="artist-cta" type="button" aria-label="Learn more about ${n}">
                  Learn More
                </button>
              </div>
            </li>`).join("");l.artistsList.insertAdjacentHTML("beforeend",s)}S();const v=async()=>{try{const s='<li data-value="all">All Genres</li>'+(await L()).map(({genre:o})=>`<li data-value="${o.toLowerCase()}">${o}</li>`).join("");l.menuGenres.insertAdjacentHTML("beforeend",s)}catch(e){f(`While loading genres ${e}`)}};v();document.querySelectorAll(".artists-dropdown-genres").forEach(e=>{const s=e.querySelector(".dropdown-toggle-genres"),o=e.querySelector(".dropdown-menu-genres"),n=t=>{e.contains(t.target)||(e.classList.remove("open"),document.removeEventListener("click",n))};s.addEventListener("click",t=>{t.stopPropagation();const r=e.classList.contains("open");e.classList.toggle("open"),r?document.removeEventListener("click",n):document.addEventListener("click",n)}),o.addEventListener("click",t=>{const r=t.target.closest("li");r&&(s.querySelector(".dropdown-label").textContent=r.textContent,s.dataset.value=r.dataset.value,e.classList.remove("open"),document.removeEventListener("click",n))})});
//# sourceMappingURL=index.js.map
