import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import firebase from "firebase/app";
//
import Loading from "../../components/Loading";

export default function Restaurants({ navigation }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setUser(true) : setUser(false);
    });
  }, []);

  if (user === null) {
    return <Loading isVisible={true} text="cargando" />;
  }
  return (
    <View style={styles.containter}>
      <Text>Restaurants</Text>
      {user && (
        <Icon
          type="material-community"
          name="plus"
          color="#ff6c6c"
          reverse
          containerStyle={styles.floatBtn}
          onPress={() => navigation.navigate("add-restaurant")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
  floatBtn: {
    position: "absolute",
    bottom: 15,
    right: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
