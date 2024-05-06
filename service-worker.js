self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("simple-pwa-cache").then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/icon.png",
        // Add other resources you want to cache for offline use
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return (
        response ||
        fetch(event.request).catch(function () {
          return caches.match("/");
        })
      );
    })
  );
});
