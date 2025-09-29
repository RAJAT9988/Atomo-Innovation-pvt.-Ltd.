const CACHE_NAME = 'atomo-cache-v2.3';
const urlsToCache = [
  '/',
  '/assets/atomoheaderlogo.png?v=1.1',
  '/smarthome.css?v=2.3',
  '/smarthomesecondsection.css?v=2.3',
  '/smarthome-ipad-responsive.css?v=2.3',
  '/airowl.css?v=2.3',
  '/about.css?v=2.3',
  '/carrier.css?v=2.3',
  '/electron.css?v=2.3',
  '/proton.css?v=2.3',
  '/neutron.css?v=2.3',
  '/atomicos.css?v=2.3',
  '/matter.css?v=2.3',
  'https://rsms.me/inter/inter.css?v=2.3',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css?v=2.3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});