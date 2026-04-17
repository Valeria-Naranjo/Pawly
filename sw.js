const CACHE_NAME = 'pawly-v1';
const ASSETS = [
  './index.html',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

const addButton = document.querySelector(".pay-btn");

addButton.addEventListener("click", async () => {

    const response = await fetch("https://diseno-app.onrender.com/create-checkout-session", {
        method: "POST"
    });

    const data = await response.json();

    window.location.href = data.url;

});