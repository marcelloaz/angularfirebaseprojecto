// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
  apiKey: "AIzaSyB-hC7sLmz1Ix4fOCKWzIW1tBWCVw1IzLg",
  authDomain: "vendafacil-2d9db.firebaseapp.com",
  databaseURL: "https://vendafacil-2d9db.firebaseio.com",
  projectId: "vendafacil-2d9db",
  storageBucket: "vendafacil-2d9db.appspot.com",
  messagingSenderId: "866052965084",
  appId: "1:866052965084:web:fa109cafff53e1609baa19",
  measurementId: "G-7T83JPGM3G"
});


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.usePublicVapidKey("getToken(messaging, { vapidKey: 'AAAAyaTHgtw:APA91bFOxRvmuYRAp9pV3VD97Mf1zArrFYcqiwRECcXpMx24OYkmDJDTsF7xxnZj9exKtEcf24qoi8_PuEgHyCgRYhye6qFb_tJNEbDuT9xS6Ui7y2isf45bQdqfnB6RzriNvqxwbiw4");
