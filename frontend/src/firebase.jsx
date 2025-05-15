import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "TU-API-KEY",
    authDomain: "TU-AUTH-DOMAIN",
    projectId: "TU-PROJECT-ID",
    storageBucket: "TU-STORAGE-BUCKET",
    messagingSenderId: "TU-MESSAGING-SENDER-ID",
    appId: "TU-APP-ID"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };