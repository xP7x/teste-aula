const staticPwaADS = "cache_web_app_adsupf"; // Define o nome do cache estático
const assets = [ // Lista de recursos para serem armazenados em cache
  "/",
  "/index.html",
  "/main.css",
  "/panda.png",
  "/sea_turtle.jpg",
  "/main.js"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil( // Aguarda até que a instalação do service worker seja concluída
    caches.open(staticPwaADS).then(cache => { // Abre o cache definido e adiciona os recursos especificados
      cache.addAll(assets); // Adiciona os recursos ao cache
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith( // Intercepta todas as solicitações de busca
    caches.match(fetchEvent.request).then(res => { // Tenta encontrar a solicitação no cache
      return res || fetch(fetchEvent.request); // Retorna a resposta do cache se encontrada, caso contrário, busca na rede
    })
  );
});