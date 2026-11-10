const V='hx-v6';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
/* réseau d'abord (toujours la dernière version), cache en secours hors connexion */
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname==='api.anthropic.com'||u.hostname==='intervals.icu')return;
 e.respondWith(fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque')){const c=x.clone();caches.open(V).then(ch=>ch.put(r,c));}return x;}).catch(()=>caches.match(r).then(h=>h||(r.mode==='navigate'?caches.match('index.html'):undefined))));});
