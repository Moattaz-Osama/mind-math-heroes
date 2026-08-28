/* Mind Math Heroes — offline service worker.
   Cache-first (stale-while-revalidate) so the game loads instantly and works on a flaky or
   absent connection. BUMP `CACHE` on every deploy so returning players pick up the new build. */

const CACHE = 'mmh-2026-08-28a';
const CORE = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Quicksand:wght@500;600;700&family=Baloo+Bhaijaan+2:wght@500;600;700;800&family=Tajawal:wght@500;600;700&display=swap'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE).catch(() => {})));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then((res) => {
          if (res && (res.ok || res.type === 'opaque')) {
            cache.put(req, res.clone()).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      // serve cache immediately when we have it, refresh in the background
      return cached || network;
    })
  );
});
