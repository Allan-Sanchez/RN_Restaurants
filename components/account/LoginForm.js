import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";

import Loading from "../Loading";
import { validateEmail } from "../../utils/helpers";
import { loginWithEmailFirebase } from "../../utils/actions";

const defaultValuesForm = () => {
  return {
    email: "",
    password: "",
  };
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formRegister, setFormRegister] = useState(defaultValuesForm());
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handelChange = (e, type) => {
    setFormRegister({ ...formRegister, [type]: e.nativeEvent.text });
  };

  const loginUser = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const result = await loginWithEmailFirebase(formRegister);
    setLoading(false);

    if (!result.statusResponse) {
      setErrorEmail(result.error);
      setErrorPassword(result.error);
      return;
    }
    navigation.navigate("account");
  };

  const validateForm = () => {
    setErrorEmail("");
    setErrorPassword("");
    let isValidated = true;
    if (!validateEmail(formRegister.email)) {
      setErrorEmail("Debes ingresar un email valido");
      isValidated = false;
    }
    if (isEmpty(formRegister.password)) {
      setErrorPassword("Debes ingresar una contraseña valida");
      isValidated = false;
    }
    return isValidated;
  };

  return (
    <View style={styles.containter}>
      <Input
        containerStyle={styles.input}
        onChange={(e) => handelChange(e, "email")}
        placeholder="Ingresa tu email"
        keyboardType="email-address"
        defaultValue={formRegister.email}
        errorMessage={errorEmail}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu contraseña"
        onChange={(e) => handelChange(e, "password")}
        password={true}
        secureTextEntry={!showPassword}
        defaultValue={formRegister.password}
        errorMessage={errorPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        buttonStyle={styles.btn}
        titleStyle={styles.buttonTitle}
        containerStyle={styles.btnContainer}
        onPress={() => loginUser()}
        title="Iniciar Sesion"
      />

      <Loading isVisible={Loading} text="Iniciando Sesion" />
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  input: {
    width: "100%",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
  },
  btn: {
    paddingVertical: 20,
    backgroundColor: "#ff6c6c",
  },
  icon: {
    color: "#ff6c6c",
  },
  buttonTitle:{
    fontSize: 20,
  }
});
