import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { isEmpty, size } from "lodash";
import {
  reauthenticateFirebase,
  updatePasswordFirebase,
} from "../../utils/actions";

export default function ChangePassword({ setShowModal, toastRef }) {
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errorCurrentPassword, setErrorCurrentPassword] = useState(null);
  const [errorNewPassword, setErrorNewPassword] = useState(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleUpdateUserName = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const result = await reauthenticateFirebase(currentPassword);
    if (!result.statusResponse) {
      setLoading(false);
      setErrorCurrentPassword(
        "contraseña incorrecta, escribe de nuevo tu contraseña actual."
      );
      return;
    }
    const resultUpdatePassword = await updatePasswordFirebase(newPassword);
    setLoading(false);
    if (!resultUpdatePassword.statusResponse) {
      setErrorCurrentPassword(
        "ocurrio un error al actualizar la contraseña, intenta de nuevo."
      );
      setErrorNewPassword(
        "ocurrio un error al actualizar la contraseña, intenta de nuevo."
      );
      setErrorConfirmPassword(
        "ocurrio un error al actualizar la contraseña, intenta de nuevo."
      );
      return;
    }

    toastRef.current.show("contraseña actualizada correctamente.", 3000);
    setShowModal(false);
  };
  const validateForm = () => {
    setErrorCurrentPassword(null);
    setErrorNewPassword(null);
    setErrorConfirmPassword(null);
    isValidate = true;

    if (isEmpty(currentPassword)) {
      setErrorCurrentPassword("Debes escribir tu contraseña actual");
      isValidate = false;
    }
    if (isEmpty(newPassword)) {
      setErrorNewPassword("La contraseña debe tener al menos 6 caracteres.");
      isValidate = false;
    }
    if (size(newPassword) < 6 && size(confirmPassword) < 6) {
      setErrorNewPassword(
        "La nueva contraseña debe tener al menos 6 caracteres."
      );
      setErrorConfirmPassword(
        "La nueva contraseña debe tener al menos 6 caracteres."
      );
      isValidate = false;
    }

    if (currentPassword === newPassword) {
      setErrorNewPassword(
        "La contraseña actual no debe ser la misma que la nueva contraseña."
      );
      setErrorCurrentPassword(
        "La contraseña actual no debe ser la misma que la nueva contraseña."
      );
      isValidate = false;
    }
    if (newPassword !== confirmPassword) {
      setErrorNewPassword(
        "La nueva contraseña y confirmacion de contraseña deber ser iguales."
      );
      setErrorConfirmPassword(
        "La nueva contraseña y confirmacion de contraseña deben ser iguales."
      );
      isValidate = false;
    }
    return isValidate;
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Escribe tu contraseña actual."
        containerStyle={styles.input}
        defaultValue={currentPassword}
        password={true}
        secureTextEntry={!showPassword}
        errorMessage={errorCurrentPassword}
        onChange={(e) => {
          setCurrentPassword(e.nativeEvent.text);
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
      <Input
        placeholder="Escribe tu nueva contraseña."
        containerStyle={styles.input}
        defaultValue={newPassword}
        password={true}
        secureTextEntry={!showPassword}
        errorMessage={errorNewPassword}
        onChange={(e) => {
          setNewPassword(e.nativeEvent.text);
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
      <Input
        placeholder="confirmar la nueva contraseña."
        containerStyle={styles.input}
        defaultValue={confirmPassword}
        password={true}
        secureTextEntry={!showPassword}
        errorMessage={errorConfirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.nativeEvent.text);
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
