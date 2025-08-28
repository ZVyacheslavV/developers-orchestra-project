import{a as n,i as l}from"./assets/vendor-Cl-WcV8j.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();const d={artistsList:document.querySelector("#artists-list")},u="https://sound-wave.b.goit.study/api",f={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},p=8,y={currentPage:1};n.defaults.baseURL=u;const m=async s=>{const{data:o}=await n.get(`${f.ARTISTS}?limit=${p}&page=${s}`);return o};function g(s){l.error({title:"Error",message:s})}async function S(){try{const{artists:s}=await m(y.currentPage);h(s)}catch{g("Failed to fetch artists")}}function h(s=[]){const o=s.map(({_id:a,strArtist:r="Unknown",strArtistThumb:t,strBiographyEN:e="",genres:i=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${a}">
                <img
                  src="${t||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${r} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(i)&&i.length?`<ul class="artist-tags">${i.map(c=>`<li class="tag">${c}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${r}</h3>
                ${e?`<p class="artist-desc text-clamp-3">${e}</p>`:""}

                <button class="artist-cta" type="button" aria-label="Learn more about ${r}">
                  Learn More
                </button>
              </div>
            </li>`).join("");d.artistsList.insertAdjacentHTML("beforeend",o)}S();document.querySelectorAll(".dropdown").forEach(s=>{const o=s.querySelector(".dropdown-toggle"),a=s.querySelector(".dropdown-menu");o.addEventListener("click",()=>{a.style.display=a.style.display==="block"?"none":"block"}),a.querySelectorAll("li").forEach(r=>{r.addEventListener("click",()=>{o.textContent=r.textContent,o.dataset.value=r.dataset.value,a.style.display="none"})}),document.addEventListener("click",r=>{s.contains(r.target)||(a.style.display="none")})});
//# sourceMappingURL=index.js.map
