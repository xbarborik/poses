if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let o={};const c=e=>s(e,a),f={module:{uri:a},exports:o,require:c};i[a]=Promise.all(n.map((e=>f[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";importScripts("/poses/serviceWorker.js"),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/ang-abeb6378.svg",revision:null},{url:"assets/belly-d4f2f2d8.png",revision:null},{url:"assets/browser-004e7e41.js",revision:null},{url:"assets/eyebrows-f3937fea.png",revision:null},{url:"assets/fr-5b278a0f.svg",revision:null},{url:"assets/frar-6f073bf5.svg",revision:null},{url:"assets/hand-ba490a05.png",revision:null},{url:"assets/index-254a2088.js",revision:null},{url:"assets/index-859ba0ed.css",revision:null},{url:"assets/none-0e399a73.png",revision:null},{url:"assets/nose-e9dd0e74.png",revision:null},{url:"assets/thumb-b9a2a620.png",revision:null},{url:"assets/toes-4280f0dd.png",revision:null},{url:"assets/up-696b90aa.png",revision:null},{url:"favicon/android-chrome-192x192.png",revision:"c6608bfee4ac4b786ed2a152bd909b6c"},{url:"favicon/android-chrome-512x512.png",revision:"c691d4ab54950c481673f4d489635213"},{url:"favicon/apple-touch-icon.png",revision:"fbc9423774dfdd2ff8d3861ac9e8b50c"},{url:"favicon/favicon-16x16.png",revision:"df35e224dab419064ed5fa35c66ff7aa"},{url:"favicon/favicon-32x32.png",revision:"c0613310a141a9a2974dbe6dbfb96735"},{url:"favicon/favicon.ico",revision:"d793c4beb93512190520d361f29280ba"},{url:"favicon/maskable_icon.png",revision:"3cdfa316436535499ede35bf8fa96d02"},{url:"icons/double-arrow.svg",revision:"3a4b7bef3c7ca4e2182b590807c53089"},{url:"index.html",revision:"7ce302ae0e387e342d2b3a93f5d4ae5d"},{url:"registerSW.js",revision:"b1cb07d689f04c8aefcbaecf1a576e4b"},{url:"serviceWorker.js",revision:"013780950e63e76aba74ee5908485e3f"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"images.json",revision:"c1a531f66a38d46aaed56907b7c583fd"},{url:"serviceWorker.js",revision:"013780950e63e76aba74ee5908485e3f"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"icons/double-arrow.svg",revision:"3a4b7bef3c7ca4e2182b590807c53089"},{url:"favicon/android-chrome-192x192.png",revision:"c6608bfee4ac4b786ed2a152bd909b6c"},{url:"favicon/android-chrome-512x512.png",revision:"c691d4ab54950c481673f4d489635213"},{url:"favicon/apple-touch-icon.png",revision:"fbc9423774dfdd2ff8d3861ac9e8b50c"},{url:"favicon/favicon-16x16.png",revision:"df35e224dab419064ed5fa35c66ff7aa"},{url:"favicon/favicon-32x32.png",revision:"c0613310a141a9a2974dbe6dbfb96735"},{url:"favicon/favicon.ico",revision:"d793c4beb93512190520d361f29280ba"},{url:"favicon/maskable_icon.png",revision:"3cdfa316436535499ede35bf8fa96d02"},{url:"favicon/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"manifest.webmanifest",revision:"6b1d53d3155f2dfc8046d474687b7373"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
