// خدمة عاملة بسيطة (Service Worker) — تخزّن واجهة التطبيق فقط للعمل شبه-دون اتصال
// لا تُخزّن أي بيانات من /api/ — البيانات دائمًا تُجلب من الخادم مباشرة لضمان دقتها
const CACHE_NAME = 'alwan-alhayat-shell-v3';
const SHELL_FILES = ['/', '/index.html', '/app.js', '/styles.css', '/logo.webp', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // لا تتدخل أبدًا في طلبات API — يجب أن تصل دائمًا للخادم مباشرة
  if (url.pathname.startsWith('/api/')) return;
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((res) => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
