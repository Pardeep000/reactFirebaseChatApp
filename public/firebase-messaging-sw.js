importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyB2kk7aGv3BNu3din9gD3_ZbVurNzDjFI4",
    authDomain: "reactchatapp-43ac2.firebaseapp.com",
    projectId: "reactchatapp-43ac2",
    storageBucket: "reactchatapp-43ac2.appspot.com",
    messagingSenderId: "369714464346",
    appId: "1:369714464346:web:db6a57f6ad1f82fd81ba63"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});