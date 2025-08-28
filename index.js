import{a as n}from"./assets/vendor-CY2gPpww.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();const c="https://sound-wave.b.goit.study/api",l={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},u=8;n.defaults.baseURL=c;const d=async s=>{const{data:r}=await n.get(`${l.ARTISTS}?limit=${u}&page=${s}`);return r},f=document.getElementById("artists-list");let p=1;async function m(){try{const s=await d(p);g(s.artists)}catch(s){console.error("Failed to fetch artists:",s)}}function g(s){const r=s.map(i=>`
      <li class="artists-item">
        <div class="artist-card">
          <img src="${i.strArtistThumb}" alt="${i.strArtist}" class="artist-img" loading="lazy">
          <ul class="artist-tags">
            ${i.genres.map(o=>`<li class="tag">${o}</li>`).join("")}
          </ul>
          <h3 class="artist-name">${i.strArtist}</h3>
          <p class="artist-desc">${i.strBiographyEN.slice(0,120)}...</p>
          <button class="artist-cta" type="button">Learn More</button>
        </div>
      </li>`).join("");f.insertAdjacentHTML("beforeend",r)}m();
//# sourceMappingURL=index.js.map
