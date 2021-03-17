import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import Loading from "../../components/Loading";
import { getCurrentUser, isUserLogged } from "../../utils/actions";
//
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

export default function Account() {
  const [login, setLogin] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const user = getCurrentUser();
      user ? setLogin(true) : setLogin(false);
      // setLogin(isUserLogged());
    }, [])
  );

  if (login == null) {
    return <Loading isVisible={true} text="cargando...!" />;
  }
  return login ? <UserLogged /> : <UserGuest />;
}

const styles = StyleSheet.create({});
