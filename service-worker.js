// Nom du cache utilisé
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
];

// Événement d'installation : précharger les ressources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Événement d'activation : nettoyer les anciens caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Événement de récupération (fetch) : gérer les requêtes réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourner la réponse depuis le cache si disponible
        if (response) return response;

        // Sinon, récupérer depuis le réseau et la mettre en cache
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
        });
      })
  );
});