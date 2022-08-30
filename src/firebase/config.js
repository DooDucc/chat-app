import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyA1ZyS4U-xcl1QroQmmk26RuXQKssjI9lA',
    authDomain: 'chat-app-cd7ff.firebaseapp.com',
    projectId: 'chat-app-cd7ff',
    storageBucket: 'chat-app-cd7ff.appspot.com',
    messagingSenderId: '956870994772',
    appId: '1:956870994772:web:94aa38a8a9e3c952e536c1',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
