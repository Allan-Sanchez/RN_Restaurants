import { firebaseApp } from "./Firebase";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export const isUserLogged = () => {
  let isLogged = false;

  firebase.auth().onAuthStateChanged((user) => {
    user !== null && (isLogged = true);
  });
  return isLogged;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const registerUserFirebase = async (data) => {
  const {email, password} = data;
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    result.error("El usuario ya existe");
  }
  return result;
};

export const LogoutFirebase = () => {
  return firebase.auth().signOut();
};
