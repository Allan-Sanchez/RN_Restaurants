import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//
import LoginForm from "../../components/account/LoginForm";

export default function Login() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../assets/restaurant-logo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.container}>
        <LoginForm/>
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
    </KeyboardAwareScrollView>
  );
}

function CreateAccount(props) {
  const navigation = useNavigation();

  return (
    <Text
      style={styles.register}
      onPress={() => {
        navigation.navigate("register");
      }}
    >
      Aun no posees una cuenta?{" "}
      <Text style={styles.btnRegister}>Registrate</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
    marginBottom: 20,
  },
  container: {
    marginHorizontal: 40,
  },
  divider: {
    margin: 40,
    backgroundColor: "#ff6c6c",
  },
  register: {
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  btnRegister: {
    color: "#ff6c6c",
    fontWeight: "bold",
  },
});
