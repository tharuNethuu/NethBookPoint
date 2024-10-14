// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyCosRWxyQV45zd2dejxMA9q-B8CWDY-XXw",
  authDomain: "neth-bookpoint.firebaseapp.com",
  projectId: "neth-bookpoint",
  storageBucket: "neth-bookpoint.appspot.com",
  messagingSenderId: "1002683221621",
  appId: "1:1002683221621:web:caee54cfb8bb9b633b9a3c",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

 
export default app;