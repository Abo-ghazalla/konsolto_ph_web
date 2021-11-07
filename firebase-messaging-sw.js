importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js");
firebase.initializeApp({
    apiKey: "AIzaSyCERs7NXYBGism9c2OrbuZ0OfUJQI4JZ5I",
    authDomain: "konsolto-patient.firebaseapp.com",
    databaseURL: "https://konsolto-patient.firebaseio.com",
    projectId: "konsolto-patient",
    storageBucket: "konsolto-patient.appspot.com",
    messagingSenderId: "368802847848",
    appId: "1:368802847848:web:8211dc7e7e757073966fdd",
    measurementId: "G-F9HP64433B"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});
