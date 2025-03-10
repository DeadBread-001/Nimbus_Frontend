const CACHE_NAME = "Nimbus";
const CACHE_NAME_DYNAMIC = "Nimbus-dynamic";
const CACHE_URLS = ["/"];
const CACHE_FIRST_AND_UPDATE_REGEX =
  /.webp|.svg|.jpg|.jpeg|.gif|.png|.css|.js|.ttf|.woff2/;

const deleteOldCaches = async () => {
  const keys = await caches.keys();
  await Promise.all(
    keys.map((key) => {
      if (key !== CACHE_NAME && key !== CACHE_NAME_DYNAMIC) {
        return caches.delete(key);
      }
    }),
  );
};

const fromCache = async (key, cacheName) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(key);
  return cachedResponse || Promise.reject("no response in cache");
};

const update = async (request) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch(request);
    cache.put(request, response);
  } catch (error) {
    console.error(error);
  }
};

const cacheFirstAndUpdate = (event) => {
  event.respondWith(
    (async () => {
      try {
        const cachedResponse = await fromCache(event.request, CACHE_NAME);
        update(event.request);
        return cachedResponse;
      } catch (e) {
        const cache = await caches.open(CACHE_NAME);
        const response = await fetch(event.request);
        cache.put(event.request, response.clone());
        return response;
      }
    })(),
  );
};

const networkFirst = (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(event.request);
        cache.put(event.request, response.clone());
        return response;
      } catch (e) {
        return fromCache(event.request, CACHE_NAME);
      }
    })(),
  );
};

const nonGetRequestNetworkFirst = (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME_DYNAMIC);
      try {
        const response = await fetch(event.request);
        cache.put(event.request.url, response.clone());
        return response;
      } catch (e) {
        return fromCache(event.request.url, CACHE_NAME_DYNAMIC);
      }
    })(),
  );
};

self.addEventListener("install", (e) => {
  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_URLS)),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") {
    nonGetRequestNetworkFirst(e);
    return;
  }

  if (CACHE_FIRST_AND_UPDATE_REGEX.test(e.request.url)) {
    cacheFirstAndUpdate(e);
  } else {
    networkFirst(e);
  }
});
