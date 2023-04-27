;
//asignar un nombre y versión al cache
const CACHE_NAME = 'Africa Cache_v1.1.1',
    urlsToCache = [
        './',
        './index.html',
        './css/estilos.css',
        './css/flickity.css',
        './css/bootstrap.min.css',
        './menu.html',
         './js/jquery-3.2.1.slim.min.js',
         './js/popper.min.js',
         './js/bootstrap.js',
         './js/flickity.pkgd.min.js',
         './js/script.js',

         './images/01.jpg',
         './images/02.jpg',
         './images/03.jpg',





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