// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Importar getStorage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6qeVMi0suglBmJU8xCQbxnW4erQBE_ao",
  authDomain: "madres-2d8e4.firebaseapp.com",
  projectId: "madres-2d8e4",
  storageBucket: "madres-2d8e4.appspot.com",
  messagingSenderId: "133110787699",
  appId: "1:133110787699:web:581583a4b4cefad4970406",
  measurementId: "G-9Q3VR4QK3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app); // Inicializa Firebase Storage

export { firestore, storage, app };