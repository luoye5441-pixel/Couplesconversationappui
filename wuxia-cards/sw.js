const CACHE_NAME = 'wuxia-cards-v3';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './game.js',
  './manifest.json',
  './assets/images/jiansheng.png',
  './assets/images/cike.png',
  './assets/images/duyi.png',
  './assets/images/hufa.png',
  './assets/images/xiake.png',
  './assets/images/zhuifeng.png',
  './assets/images/huanshi.png',
  './assets/images/daxia.png',
  './assets/images/bg-menu.png',
  './assets/images/bg-battle.png',
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
