import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import RegisterForm from "../../components/account/RegisterForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Register() {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Image
        source={require("../../assets/restaurant-logo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <RegisterForm />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 20,
  },
});
