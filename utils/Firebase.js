import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBw5cCHKcdu2_Yz7ZvSRoAd7tbS5EqP89o",
  authDomain: "restaurants-f385b.firebaseapp.com",
  projectId: "restaurants-f385b",
  storageBucket: "restaurants-f385b.appspot.com",
  messagingSenderId: "751834519261",
  appId: "1:751834519261:web:bcf30a57a73eda079ead34",
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
