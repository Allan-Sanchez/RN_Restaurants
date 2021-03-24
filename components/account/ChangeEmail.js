import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { isEmpty } from "lodash";
import {
  reauthenticateFirebase,
    updateEmailFirebase,
} from "../../utils/actions";
import { validateEmail } from "../../utils/helpers";

export default function ChangeEmail({
  email,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newEmail, setNewEmail] = useState(email);
  const [password, setPassword] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleUpdateUserName = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const result = await reauthenticateFirebase(password);
    if (!result.statusResponse) {
        setLoading(false);
        setErrorPassword("contraseña incorrecta, escribe de nuevo tu contraseña actual.");
        return;
    }
    const resultUpdateEmail = await updateEmailFirebase(newEmail);
    setLoading(false);
    if(!resultUpdateEmail.statusResponse){
        setErrorEmail("El email ya existe.")
        return
    }
   
    setReloadUser(true);
    toastRef.current.show("Email actualizado correctamente.", 3000);
    setShowModal(false);
  };
  const validateForm = () => {
    setErrorEmail(null);
    setErrorPassword(null);
    isValidate = true;
    if (isEmpty(newEmail)) {
      setErrorEmail("Debes escribir el nuevo email");
      return (isValidate = false);
    }
    if (isEmpty(password)) {
      setErrorPassword("Debes escribir una contraseña valida.");
      return (isValidate = false);
    }
    if (newEmail === email) {
      setErrorEmail("No debes ingresar el mismo email");
      return (isValidate = false);
    }
    if (!validateEmail(newEmail)) {
      setErrorEmail("Debes ingresar un email valido");
      return (isValidate = false);
    }
    return isValidate;
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Ingresa tu email"
        containerStyle={styles.input}
        defaultValue={email}
        errorMessage={errorEmail}
        keyboardType="email-address"
        onChange={(e) => {
          setNewEmail(e.nativeEvent.text);
        }}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#ff6c6c",
        }}
      />
      <Input
        placeholder="Escribe tu contraseña actual."
        containerStyle={styles.input}
        defaultValue={password}
        password={true}
        secureTextEntry={!showPassword}
        errorMessage={errorPassword}
        onChange={(e) => {
          setPassword(e.nativeEvent.text);
        }}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={{ color: "#ff6c6c" }}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Actualizar"
        loading={loading}
        buttonStyle={styles.btn}
        titleStyle={styles.btnTitle}
        onPress={handleUpdateUserName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
  },
  btn: {
    paddingVertical: 22,
    fontSize: 25,
    backgroundColor: "#ff6c6c",
  },
  btnTitle: {
    paddingHorizontal: 20,
    fontSize: 20,
  },
});
