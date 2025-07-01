
const CACHE_NAME = 'delaware-golf-carts-v1.0.0';
const STATIC_CACHE = 'delaware-golf-carts-static-v1.0.0';
const DYNAMIC_CACHE = 'delaware-golf-carts-dynamic-v1.0.0';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/vehicles.html',
  '/denago.html',
  '/evolution.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/manifest.json'
];

// Images to cache
const IMAGES = [
  '/assets/images/DelawareGolfCarts.png',
  '/assets/images/DENAGONEVCITY.jpg',
  '/assets/images/DENAGONEVNOMAD.jpg',
  '/assets/images/DENAGONEVNOMADXL.jpg',
  '/assets/images/DENAGONEVROVERXL.jpg',
  '/assets/images/DENAGONEVROVERXL6.jpg',
  '/assets/images/DENAGONEVROVERXXL.jpg',
  '/assets/images/EVOLUTIONCARRIER6PLUS.jpg',
  '/assets/images/EVOLUTIONCARRIER8PLUS.jpg',
  '/assets/images/EVOLUTIONCLASSIC2PLUS.jpg',
  '/assets/images/EVOLUTIONCLASSIC2PRO.jpg',
  '/assets/images/EVOLUTIONCLASSIC4PLUS.jpg',
  '/assets/images/EVOLUTIONCLASSIC4PRO.jpg',
  '/assets/images/EVOLUTIOND5MAVERICK2+2.jpg',
  '/assets/images/EVOLUTIOND5MAVERICK2+2PLUS.jpg',
  '/assets/images/EVOLUTIOND5MAVERICK4.jpg',
  '/assets/images/EVOLUTIOND5MAVERICK4PLUS.jpg',
  '/assets/images/EVOLUTIOND5MAVERICK4+2PLUS.jpg',
  '/assets/images/EVOLUTIOND5MAVERICK6.jpg',
  '/assets/images/EVOLUTIOND5MAVERICK6PLUS.jpg',
  '/assets/images/EVOLUTIOND5RANGER2+2.jpg',
  '/assets/images/EVOLUTIOND5RANGER2+2PLUS.jpg',
  '/assets/images/EVOLUTIOND5RANGER4.jpg',
  '/assets/images/EVOLUTIOND5RANGER4+2PLUS(9).jpg',
  '/assets/images/EVOLUTIOND5RANGER4PLUS.jpg',
  '/assets/images/EVOLUTIOND5RANGER6.jpg',
  '/assets/images/EVOLUTIOND5RANGER6PLUS.jpg',
  '/assets/images/EVOLUTIOND6MAXGT4.jpg',
  '/assets/images/EVOLUTIOND6MAXGT6.jpg',
  '/assets/images/EVOLUTIOND6MAXXT4.jpg',
  '/assets/images/EVOLUTIOND6MAXXT6.jpg',
  '/assets/images/EVOLUTIONFORESTER4PLUS.jpg',
  '/assets/images/EVOLUTIONFORESTER6PLUS.jpg',
  '/assets/images/EVOLUTIONTURFMAN1000.jpg',
  '/assets/images/EVOLUTIONTURFMAN200.jpg',
  '/assets/images/EVOLUTIONTURFMAN800.jpg'
];

// Vehicle pages to cache
const VEHICLE_PAGES = [
  '/vehicles/denago-ev-city.html',
  '/vehicles/denago-ev-nomad.html',
  '/vehicles/denago-ev-nomad-xl.html',
  '/vehicles/denago-ev-rover-xl.html',
  '/vehicles/denago-ev-rover-xl6.html',
  '/vehicles/denago-ev-rover-xxl.html',
  '/vehicles/evolution-carrier-6-plus.html',
  '/vehicles/evolution-carrier-8-plus.html',
  '/vehicles/evolution-classic-2-plus.html',
  '/vehicles/evolution-classic-2-pro.html',
  '/vehicles/evolution-classic-4-plus.html',
  '/vehicles/evolution-classic-4-pro.html',
  '/vehicles/evolution-d3-lifted.html',
  '/vehicles/evolution-d3-standard.html',
  '/vehicles/evolution-d5-maverick-22.html',
  '/vehicles/evolution-d5-maverick-22-plus.html',
  '/vehicles/evolution-d5-maverick-4.html',
  '/vehicles/evolution-d5-maverick-4-plus.html',
  '/vehicles/evolution-d5-maverick-42-plus.html',
  '/vehicles/evolution-d5-maverick-6.html',
  '/vehicles/evolution-d5-maverick-6-plus.html',
  '/vehicles/evolution-d5-ranger-22.html',
  '/vehicles/evolution-d5-ranger-22-plus.html',
  '/vehicles/evolution-d5-ranger-4.html',
  '/vehicles/evolution-d5-ranger-4-2-plus.html',
  '/vehicles/evolution-d5-ranger-4-plus.html',
  '/vehicles/evolution-d5-ranger-6.html',
  '/vehicles/evolution-d5-ranger-6-plus.html',
  '/vehicles/evolution-d6-max-gt4.html',
  '/vehicles/evolution-d6-max-gt6.html',
  '/vehicles/evolution-d6-max-xt4.html',
  '/vehicles/evolution-d6-max-xt6.html',
  '/vehicles/evolution-forester-4-plus.html',
  '/vehicles/evolution-forester-6-plus.html',
  '/vehicles/evolution-turfman-1000.html',
  '/vehicles/evolution-turfman-200.html',
  '/vehicles/evolution-turfman-800.html'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache images
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Service Worker: Caching images');
        return cache.addAll(IMAGES);
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      // Force activation
      return self.skipWaiting();
    }).catch((error) => {
      console.error('Service Worker: Installation failed', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== STATIC_CACHE && 
              cacheName !== CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      // Take control of all pages
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    cacheFirst(request)
  );
});

// Cache-first strategy with network fallback
async function cacheFirst(request) {
  try {
    // Try to get from cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('Service Worker: Serving from cache', request.url);
      return cachedResponse;
    }
    
    // If not in cache, fetch from network
    console.log('Service Worker: Fetching from network', request.url);
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const responseClone = networkResponse.clone();
      
      // Determine which cache to use
      let cacheName = DYNAMIC_CACHE;
      if (STATIC_ASSETS.includes(new URL(request.url).pathname)) {
        cacheName = STATIC_CACHE;
      } else if (IMAGES.includes(new URL(request.url).pathname)) {
        cacheName = CACHE_NAME;
      }
      
      // Cache the response
      caches.open(cacheName).then((cache) => {
        cache.put(request, responseClone);
      });
    }
    
    return networkResponse;
    
  } catch (error) {
    console.error('Service Worker: Fetch failed', error);
    
    // Return offline fallback for HTML pages
    if (request.headers.get('accept').includes('text/html')) {
      const offlinePage = await caches.match('/index.html');
      return offlinePage || new Response('Offline - Please check your connection', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    }
    
    // Return error for other requests
    return new Response('Network error', {
      status: 408,
      statusText: 'Request Timeout'
    });
  }
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    // Get pending form submissions from IndexedDB
    const submissions = await getPendingSubmissions();
    
    for (const submission of submissions) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submission.data)
        });
        
        if (response.ok) {
          await removePendingSubmission(submission.id);
          console.log('Service Worker: Form submission synced');
        }
      } catch (error) {
        console.error('Service Worker: Form sync failed', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Push notification handler
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/images/DelawareGolfCarts.png',
    badge: '/assets/images/DelawareGolfCarts.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey
    },
    actions: [
      {
        action: 'explore',
        title: 'View Vehicles',
        icon: '/assets/images/DelawareGolfCarts.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/images/DelawareGolfCarts.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/vehicles.html')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Utility functions for IndexedDB operations
async function getPendingSubmissions() {
  // Placeholder for IndexedDB implementation
  return [];
}

async function removePendingSubmission(id) {
  // Placeholder for IndexedDB implementation
  return true;
}

// Cache management
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    name.startsWith('delaware-golf-carts-') && 
    name !== STATIC_CACHE && 
    name !== CACHE_NAME && 
    name !== DYNAMIC_CACHE
  );
  
  return Promise.all(oldCaches.map(name => caches.delete(name)));
}

// Periodic cache cleanup
setInterval(cleanupOldCaches, 24 * 60 * 60 * 1000); // Daily cleanup


