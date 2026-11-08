// Service worker «Личные финансы»: приложение открывается и без интернета.
// Сначала сеть (обновления приходят сразу), при её отсутствии — кэш.
// При изменении списка файлов увеличьте номер версии.
const CACHE = 'finance-v1';
const APP_FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-180-dark.png', './icon-192.png', './icon-512.png'];
const NETWORK_TIMEOUT_MS = 3000;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(networkFirst(req));
});
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await Promise.race([
      fetch(req),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), NETWORK_TIMEOUT_MS))
    ]);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (e) {
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    throw e;
  }
}
