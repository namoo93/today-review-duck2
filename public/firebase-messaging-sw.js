importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
	apiKey: "AIzaSyBHSOq9f1mHdSaw52RRt0HNgDiEyGnIXyQ",
	authDomain: "mylittlereviewduck.firebaseapp.com",
	projectId: "mylittlereviewduck",
	storageBucket: "mylittlereviewduck.firebasestorage.app",
	messagingSenderId: "818192105007",
	appId: "1:818192105007:web:50054c8836e289b4f010da",
	measurementId: "G-LWP7DCF0B4"
});

const messaging = firebase.messaging();