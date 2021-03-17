import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
//
import { validateEmail } from "../../utils/helpers";
import { registerUserFirebase } from "../../utils/actions";
import Loading from "../Loading";

const defaultValuesForm = () => {
  return {
    email: "",
    password: "",
    confirmPassword: "",
  };
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formRegister, setFormRegister] = useState(defaultValuesForm());
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handelChange = (e, type) => {
    setFormRegister({ ...formRegister, [type]: e.nativeEvent.text });
  };

  const registerUser = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const result = await registerUserFirebase(formRegister);
    setLoading(false);

    if (!result.statusResponse) {
      setErrorEmail(result.error);
      return;
    }
    navigation.navigate("account");
  };

  const validateForm = () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    let isValidated = true;
    if (!validateEmail(formRegister.email)) {
      setErrorEmail("Debes ingresar un email valido");
      isValidated = false;
    }
    if (size(formRegister.password) < 6) {
      setErrorPassword("La contraseña debe ser de al menos 6 digitos");
      isValidated = false;
    }
    if (formRegister.password !== formRegister.confirmPassword) {
      setErrorConfirmPassword("Verifica que coinsida la contraseña");
      isValidated = false;
    }
    return isValidated;
  };

  return (
    <View style={styles.registerContainter}>
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
      <Input
        containerStyle={styles.input}
        placeholder="Confirma tu contraseña"
        password={true}
        onChange={(e) => handelChange(e, "confirmPassword")}
        secureTextEntry={!showPassword}
        defaultValue={formRegister.confirmPassword}
        errorMessage={errorConfirmPassword}
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
        containerStyle={styles.btnContainer}
        onPress={() => registerUser()}
        title="Registrar Nuevo Usuario"
      />
      <Loading isVisible={loading} text="Creando Cuenta..."/>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainter: {
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
});
