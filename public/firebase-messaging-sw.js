importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyBlZrRlWW-MfLtI8WVbuqoPxYe4SH6ylhE",
    authDomain: "fast-training-c6014.firebaseapp.com",
    projectId: "fast-training-c6014",
    storageBucket: "fast-training-c6014.firebasestorage.app",
    messagingSenderId: "897669588823",
    appId: "1:897669588823:web:84f5fc18a78a96744b8012",
    measurementId: "G-FNNXGS3L6X"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Manejar notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/images/logo-app.png',
        data: payload.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
    });

    // Manejar clics en notificaciones
    self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const data = event.notification.data;
    let url = '/';
    
    // Determinar la URL basada en el tipo de notificación
    if (data) {
        switch(data.type) {
        case 'plan_entrenamiento':
            url = `/entrenamientos/${data.id}`;
            break;
        case 'asignacion_equipo':
            url = `/equipo/${data.equipo_id || data.id}`;
            break;
        case 'estadisticas':
            url = `/estadisticas/${data.estadistica_id || data.id}`;
            break;
        case 'respuesta_queja':
            url = `/soporte/${data.solicitud_id || data.id}`;
            break;
        }
    }
    
    event.waitUntil(
        clients.openWindow(url)
    );
});