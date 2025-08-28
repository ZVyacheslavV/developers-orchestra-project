import{a as i,i as c}from"./assets/vendor-Cl-WcV8j.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const u={artistsList:document.querySelector("#artists-list")},f="https://sound-wave.b.goit.study/api",l={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},p=8,m={currentPage:1};i.defaults.baseURL=f;const y=async t=>{const{data:a}=await i.get(`${l.ARTISTS}?limit=${p}&page=${t}`);return a},g=async()=>{const{data:t}=await i.get(`${l.GENRES}`);return t};function S(t){c.error({title:"Error",message:t})}async function h(){try{const{artists:t}=await y(m.currentPage);A(t)}catch{S("Failed to fetch artists")}}function A(t=[]){const a=t.map(({_id:o,strArtist:r="Unknown",strArtistThumb:e,strBiographyEN:s="",genres:n=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${o}">
                <img
                  src="${e||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${r} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(n)&&n.length?`<ul class="artist-tags">${n.map(d=>`<li class="tag">${d}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${r}</h3>
                ${s?`<p class="artist-desc text-clamp-3">${s}</p>`:""}

                <button class="artist-cta" type="button" aria-label="Learn more about ${r}">
                  Learn More
                </button>
              </div>
            </li>`).join("");u.artistsList.insertAdjacentHTML("beforeend",a)}h();const E=async()=>{try{const t=await g(),a=document.querySelector(".dropdown-menu"),o='<li data-value="all">All Genres</li>'+t.map(({genre:r})=>`<li data-value="${r.toLowerCase()}">${r}</li>`).join("");a.insertAdjacentHTML("beforeend",o)}catch(t){c.error({message:`Error while loading genres ${t}`})}};E();document.querySelectorAll(".dropdown").forEach(t=>{const a=t.querySelector(".dropdown-toggle"),o=t.querySelector(".dropdown-menu");a.addEventListener("click",()=>{o.style.display=o.style.display==="block"?"none":"block"}),o.querySelectorAll("li").forEach(r=>{r.addEventListener("click",()=>{a.textContent=r.textContent,a.dataset.value=r.dataset.value,o.style.display="none"})}),document.addEventListener("click",r=>{t.contains(r.target)||(o.style.display="none")})});
//# sourceMappingURL=index.js.map
