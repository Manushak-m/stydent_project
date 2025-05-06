const CACHE_NAME = 'xo-game-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Service Worker-ի տեղադրում
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Քեշը բացված է');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ցանցային հարցումների մշակում
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Վերադարձնել քեշից, եթե այնտեղ կա
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});