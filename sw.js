const V = 'marmite-v20';
const CACHE = ['./','./index.html','./manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(CACHE))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { if(e.request.url.includes('jsonbin.io'))return; e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))); });
