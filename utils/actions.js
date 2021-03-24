import { firebaseApp } from "./Firebase";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { fileToBlob } from "./helpers";

const db = firebase.firestore(firebaseApp);

//validated if user is logged
export const isUserLogged = () => {
  let isLogged = false;

  firebase.auth().onAuthStateChanged((user) => {
    user !== null && (isLogged = true);
  });
  return isLogged;
};

//get current user
export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

//register one user firebase
export const registerUserFirebase = async (data) => {
  const { email, password } = data;
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "El usuario ya existe";
  }
  return result;
};
//login firebase with password and email
export const loginWithEmailFirebase = async (data) => {
  const { email, password } = data;
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Usuario o contraseña no valido";
  }
  console.log("result firebase", result);
  return result;
};

//close session in firebase
export const LogoutFirebase = () => {
  return firebase.auth().signOut();
};

//upload one image firebase using uid how name
export const uploadImage = async (image, path, name) => {
  const result = { statusResponse: false, error: null, url: null };
  const ref = firebase.storage().ref(path).child(name);
  const blob = await fileToBlob(image);
  try {
    await ref.put(blob);
    const url = await firebase
      .storage()
      .ref(`${path}/${name}`)
      .getDownloadURL();
    result.statusResponse = true;
    result.url = url;
  } catch (error) {
    result.error = error;
  }
  return result;
};

//update user name
export const updateProfileFirebase = async (data) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updateProfile(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};
//reauthenticate user with password
export const reauthenticateFirebase = async (password) => {
  const result = { statusResponse: true, error: null };
  const user = getCurrentUser();
  const credentials = await firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  try {
    await user.reauthenticateWithCredential(credentials);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};
//update email firebase//
export const updateEmailFirebase = async (email) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updateEmail(email);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};
//update password firebase//
export const updatePasswordFirebase = async (password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updatePassword(password);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};