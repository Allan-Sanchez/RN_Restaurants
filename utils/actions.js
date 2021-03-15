import { firebaseApp } from "./Firebase";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export const isUserLogged = () => {
  let isLogged = false;

  firebase.auth().onAuthStateChanged((user) => {
    user !== null ? "test" : "test2";
    // return user !== null ? isLogged = true : isLogged = false;
  });
};

export const getCurrentUser = () =>{
  return firebase.auth().currentUser
}