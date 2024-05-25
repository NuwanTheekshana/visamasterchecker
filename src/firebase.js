import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBNzlIe2isqqXWNvL_HnQblxYsvq9o7yw",
  authDomain: "visamasterchecker.firebaseapp.com",
  projectId: "visamasterchecker",
  storageBucket: "visamasterchecker.appspot.com",
  messagingSenderId: "489759071433",
  appId: "1:489759071433:web:9fcb8f68f426de599e4118"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);