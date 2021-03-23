import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import { getCurrentUser, LogoutFirebase } from "../../utils/actions";
import InfoUser from "../../components/account/InfoUser";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/account/AccountOptions";

export default function UserLogged() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [reloadUser, setReloadUser] = useState(false);
  const toastRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    setUser(getCurrentUser());
    setReloadUser(false);
  }, [reloadUser]);
  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.menu}>
          <InfoUser
            user={user}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
          <AccountOptions user={user} toastRef={toastRef} setReloadUser={setReloadUser} />
        </View>
      )}
      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        title="Cerrar Sesion"
        type="outline"
        onPress={() => {
          LogoutFirebase();
          navigation.navigate("restaurant");
        }}
      />
      <Loading isVisible={loading} text={loadingText} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
    padding: 10,
  },
  menu: {
    marginVertical: 40,
  },
  button: {
    paddingVertical: 22,
    borderColor: "#ff6c6c",
    // backgroundColor: "#ff6c6c",
  },
  options: {
    marginBottom: 20,
  },
  buttonTitle: {
    color: "#ff6c6c",
    fontSize: 20,
  },
});
