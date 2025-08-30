import{i as g,a as u,g as l}from"./assets/vendor-BAa1Uqhj.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const i={artistsList:document.querySelector("#artists-list"),menuGenres:document.querySelector(".dropdown-menu-genres")},f="https://sound-wave.b.goit.study/api",d={ARTISTS:"/artists",ARTIST_BY_ID:"/artists/",ARTIST_ALBUMS_BY_ID:"/albums",GENRES:"/genres",FEEDBACKS:"/feedbacks",PRODUCTS_BY_CATEGORY:"/products/category/"},y=8;function p(r,s="center"){g.error({title:"Error",message:r,position:s})}const E={currentPage:1};u.defaults.baseURL=f;const S=async r=>{const{data:s}=await u.get(`${d.ARTISTS}?limit=${y}&page=${r}`);return s},h=async()=>{const{data:r}=await u.get(`${d.GENRES}`);return r};async function v(){try{const{artists:r}=await S(E.currentPage);L(r)}catch{p("Failed to fetch artists")}}function L(r=[]){const s=r.map(({_id:a,strArtist:o="Unknown",strArtistThumb:e,strBiographyEN:t="",genres:n=[]})=>`
            <li class="artists-item">
              <div class="artist-card" data-id="${a}">
                <img
                  src="${e||"https://placehold.co/736x414?text=No+Image"}"
                  alt="${o} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${Array.isArray(n)&&n.length?`<ul class="artist-tags">${n.map(m=>`<li class="tag">${m}</li>`).join("")}</ul>`:""}

                <h3 class="artist-name">${o}</h3>
                ${t?`<p class="artist-desc text-clamp-3">${t}</p>`:""}

                <button class="artist-cta" type="button" data-artist-id="${a}" aria-label="Learn more about ${o}">
                  Learn More
                </button>
              </div>
            </li>`).join("");i.artistsList.insertAdjacentHTML("beforeend",s)}v();const A=async()=>{try{const s='<li data-value="all">All Genres</li>'+(await h()).map(({genre:a})=>`<li data-value="${a.toLowerCase()}">${a}</li>`).join("");i.menuGenres.insertAdjacentHTML("beforeend",s)}catch(r){p(`While loading genres ${r}`)}};A();document.querySelectorAll(".artists-dropdown-genres").forEach(r=>{const s=r.querySelector(".dropdown-toggle-genres"),a=s.querySelector(".dropdown-icon"),o=l.timeline({paused:!0});o.to(a,{rotate:180,duration:.35,ease:"power2.out"},0).fromTo(i.menuGenres,{opacity:0,y:-10,pointerEvents:"none"},{opacity:1,y:0,duration:.4,pointerEvents:"auto",ease:"power3.out"},0).from(i.menuGenres.children,{opacity:0,y:-6,stagger:.05,duration:.25,ease:"power2.out"},.1);const e=l.timeline({paused:!0});e.to(a,{rotate:0,duration:.3,ease:"power2.in"},0).to(i.menuGenres,{opacity:0,y:-10,duration:.3,pointerEvents:"none",ease:"power2.in"},0);const t=n=>{r.contains(n.target)||(e.play(0),document.removeEventListener("click",t))};s.addEventListener("click",n=>{n.stopPropagation(),l.isTweening(i.menuGenres)||i.menuGenres.style.pointerEvents==="auto"?(o.pause(0),e.restart(),document.removeEventListener("click",t)):(e.pause(0),o.restart(),document.addEventListener("click",t))}),i.menuGenres.addEventListener("click",n=>{const c=n.target.closest("li");c&&(s.querySelector(".dropdown-label").textContent=c.textContent,s.dataset.value=c.dataset.value,o.pause(0),e.restart(),document.removeEventListener("click",t))})});
//# sourceMappingURL=index.js.map
