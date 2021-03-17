import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";

export default function InfoUser({ user }) {
  return (
    <View style={styles.container}>
      <Avatar
        size="large"
        rounded
        source={
          user.photoURL
            ? { uri: photoURL }
            : require("../../assets/avatar-default.jpg")
        }
      />
      <View style={styles.infoUser}>
        <Text style={styles.displayName}>
          {user.displayName ? user.displayName : "Anonimo"}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 30,
  },
  infoUser: {
    marginLeft: 20,
  },
  displayName: {
    fontSize: 20,
    color:"#ff6c6c",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  email:{
    color: "#eaa8bb",
  }
});
