if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const d=e=>n(e,c),t={module:{uri:c},exports:o,require:d};i[c]=Promise.all(s.map((e=>t[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/browser-8b13c4a4.js",revision:null},{url:"assets/index-a7c7e709.js",revision:null},{url:"assets/index-b70acf21.css",revision:null},{url:"index.html",revision:"753347c86537177ecc1746d8dc26caa6"},{url:"registerSW.js",revision:"b1cb07d689f04c8aefcbaecf1a576e4b"},{url:"./favicon/android-chrome-192x192.png",revision:"c6608bfee4ac4b786ed2a152bd909b6c"},{url:"./favicon/android-chrome-512x512.png",revision:"c691d4ab54950c481673f4d489635213"},{url:"./favicon/apple-touch-icon.png",revision:"fbc9423774dfdd2ff8d3861ac9e8b50c"},{url:"./favicon/maskable_icon.png",revision:"3cdfa316436535499ede35bf8fa96d02"},{url:"manifest.webmanifest",revision:"553de5610f689878b3fe8cd2893e6017"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
