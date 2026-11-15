// Network-first: always fetch the live game, fall back to cache when offline.
const C='ludo-v4';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['/','/index.html','/manifest.json','/icons/icon-192.png','/img/logo.jpg','/img/front.jpg','/img/run.jpg','/img/welcome.jpg','/img/throne.jpg'])))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin||r.url.includes('/__/'))return;
 e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('/'))))});
