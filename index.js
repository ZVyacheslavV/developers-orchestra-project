import{i as l,a as c}from"./assets/vendor-Cl-WcV8j.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const i={artistsList:document.querySelector("#artists-list"),menuGenres:document.querySelector(".dropdown-menu-genres")},m="https://sound-wave.b.goit.study/api",d={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},p=8;function f(t,r="center"){l.error({title:"Error",message:t,position:r})}const g={currentPage:1};c.defaults.baseURL=m;const y=async t=>{const{data:r}=await c.get(`${d.ARTISTS}?limit=${p}&page=${t}`);return r},E=async()=>{const{data:t}=await c.get(`${d.GENRES}`);return t};function L(t){l.error({title:"Error",message:t})}async function h(){try{const{artists:t}=await y(g.currentPage);A(t)}catch{L("Failed to fetch artists")}}function A(t=[]){const r=t.map(({_id:o,strArtist:n="Unknown",strArtistThumb:e,strBiographyEN:s="",genres:a=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${o}">
                <img
                  src="${e||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${n} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(a)&&a.length?`<ul class="artist-tags">${a.map(u=>`<li class="tag">${u}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${n}</h3>
                ${s?`<p class="artist-desc text-clamp-3">${s}</p>`:""}

                <button class="artist-cta" type="button" aria-label="Learn more about ${n}">
                  Learn More
                </button>
              </div>
            </li>`).join("");i.artistsList.insertAdjacentHTML("beforeend",r)}h();const S=async()=>{try{const r='<li data-value="all">All Genres</li>'+(await E()).map(({genre:o})=>`<li data-value="${o.toLowerCase()}">${o}</li>`).join("");i.menuGenres.insertAdjacentHTML("beforeend",r)}catch(t){f(`While loading genres ${t}`)}};S();document.querySelectorAll(".artists-dropdown-genres").forEach(t=>{const r=t.querySelector(".dropdown-toggle-genres"),o=n=>{t.contains(n.target)||(i.menuGenres.style.display="none",document.removeEventListener("click",o))};r.addEventListener("click",n=>{n.stopPropagation();const e=i.menuGenres.style.display==="block";i.menuGenres.style.display=e?"none":"block",e?document.removeEventListener("click",o):document.addEventListener("click",o)}),i.menuGenres.addEventListener("click",n=>{const e=n.target.closest("li");e&&(r.textContent=e.textContent,r.dataset.value=e.dataset.value,i.menuGenres.style.display="none",document.removeEventListener("click",o))})});
//# sourceMappingURL=index.js.map
