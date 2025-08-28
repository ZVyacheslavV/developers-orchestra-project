import{a as c,i as l}from"./assets/vendor-Cl-WcV8j.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const u={artistsList:document.querySelector("#artists-list")},d="https://sound-wave.b.goit.study/api",f={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},p=8,m={currentPage:1};c.defaults.baseURL=d;const g=async s=>{const{data:r}=await c.get(`${f.ARTISTS}?limit=${p}&page=${s}`);return r};function y(s){l.error({title:"Error",message:s})}async function h(){try{const{artists:s}=await g(m.currentPage);A(s)}catch{y("Failed to fetch artists")}}function A(s=[]){const r=s.map(({_id:o,strArtist:i="Unknown",strArtistThumb:t,strBiographyEN:e="",genres:a=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${o}">
                <img
                  src="${t||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${i} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(a)&&a.length?`<ul class="artist-tags">${a.map(n=>`<li class="tag">${n}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${i}</h3>
                ${e?`<p class="artist-desc text-clamp-3">${e}</p>`:""}

                <button class="artist-cta" type="button" aria-label="Learn more about ${i}">
                  Learn More
                </button>
              </div>
            </li>`).join("");u.artistsList.insertAdjacentHTML("beforeend",r)}h();
//# sourceMappingURL=index.js.map
