const FILES_TO_CACHE = [
  "/",
  "/indexedDb.js",
  "/index.js",
  "/manifest.webmanifest",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];


const STATIC_CACHE =  "static-cache-v2";              
const DYNAMIC_CACHE = "dynamic-cache-2";             

self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(STATIC_CACHE)
    .then(cache => {cache.addAll(FILES_TO_CACHE)})
    // .then(self.skipWaiting())
  );
});

// self.addEventListener("activate", event => {
//   const currentCaches = [STATIC_CACHE, ];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
//     }).then(cachesToDelete => {
//       return Promise.all(cachesToDelete.map(cacheToDelete => {
//         return caches.delete(cacheToDelete);
//       }));
//     }).then(() => self.clients.claim())
//   );
// });

self.addEventListener("fetch", function(evt) {
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches.open(DYNAMIC_CACHE).then(cache => {
        return fetch(evt.request)
          .then(response => {
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
            return response;
          })
          .catch(err => {
            return cache.match(evt.request);
          });
      }).catch(err => console.log(err))
    );
    return;
  }
  evt.respondWith(
    fetch(evt.request)
    .catch(() => {
      return caches.match(evt.request)
      .then(response => {
        if (response) {
          return response
        }
        else if (evt.request.headers.get('accept').includes('text/html'))
      {
        return caches.match('/')
      }
      })
    })
    // caches.open(STATIC_CACHE).then(cache => {
    //   return cache.match(evt.request).then(response => {
    //     return response || fetch(evt.request);
    //   });
    // })
  );
});
