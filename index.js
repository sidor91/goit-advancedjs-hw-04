/* empty css                      */import{a as f,S as p,i}from"./assets/vendor-BSTwZ_tR.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const y="33349547-44f128e159fc9ba4be7374396",g="https://pixabay.com/api/",c={key:y,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0};async function h(s){await new Promise(e=>setTimeout(e,5e3)),c.q=s;const t=new URLSearchParams;for(const e in c)t.append(e,c[e]);const a=g+"?"+t.toString();return(await f.get(a)).data.hits}let b=new p(".gallery a",{captionsData:"alt",captionDelay:250});const d=document.querySelector(".gallery");function v(s){const{webformatURL:t,largeImageURL:a,tags:o,likes:e,views:r,comments:n,downloads:m}=s;return`
        <div class="photo-card">
          <a href="${a}" target="_blank">
            <img src="${t}" alt="${o}" loading="lazy" />
          </a>
          <div class="info">
            <div class="info-item"><b>${e}</b>Likes</div>
            <div class="info-item"><b>${r}</b>Views</div>
            <div class="info-item"><b>${n}</b>Comments</div>
            <div class="info-item"><b>${m}</b>Downloads</div>
          </div>
        </div>`}function w(s){const t=s.map(a=>v(a)).join("");d.innerHTML="",d.insertAdjacentHTML("beforeend",t),b.refresh()}const l=document.querySelector("#searchForm"),u=document.querySelector(".loader-container");l.addEventListener("submit",async s=>{s.preventDefault();const t=l.search.value;if(t.trim().length===0){i.info({message:"Search should not be empty!"});return}try{u.style.display="flex";const o=await h(t);if(!o.length){i.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}l.search.value="",w(o)}catch(o){i.error({message:`Oooops...Something went wrong... ${o.message}`})}finally{u.style.display="none"}});
//# sourceMappingURL=index.js.map
