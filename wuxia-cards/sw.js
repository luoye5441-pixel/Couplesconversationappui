const CACHE_NAME = 'wuxia-cards-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './game.js',
  './manifest.json',
  './assets/images/jiansheng.jpg',
  './assets/images/cike.jpg',
  './assets/images/duyi.jpg',
  './assets/images/hufa.jpg',
  './assets/images/xiake.jpg',
  './assets/images/zhuifeng.jpg',
  './assets/images/huanshi.jpg',
  './assets/images/daxia.jpg',
  './assets/images/bg-menu.jpg',
  './assets/images/bg-battle.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
