;
//asignar un nombre y versión al cache
const CACHE_NAME = 'Africa Cache_v0.12',
    urlsToCache = [
        './',
        './index.html',
        './css/estilo.css',
        './css/bootstrap.min.css',
        './js/jquery-3.2.1.slim.min.js',
        './js/popper.min.js',
        './js/bootstrap.js',
        './img/01.jpg',
        './img/02.jpg',
        './img/03.jpg',
        'https://kit.fontawesome.com/85e4ce9b67.js',
        './menu.html',
        './img/agua.png',
        './img/baile.png',
        './img/black.png',
        './img/bones.png',
        './img/bucha.png',
        './img/coca.png',
        './img/dama.png',
        './img/jarra.png',
        './img/julio.png',
        './img/lagger.png',
        './img/red.png',
        './img/tkt.png',
        './img/vodka.png',
        './img/will.png',
        './img/m1.png',
        './img/m2.png',
        './img/m3.png',
        './contacto.html',
        './img/nos.jpg',
         './img/tubo.jpg',
        './img/tubo2.jpg',
       
        './nosotros.html'







    ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recuperar del cache
                return res
            }
            //recuperar de la petición a la url
            return fetch(e.request)
        })
    )
})