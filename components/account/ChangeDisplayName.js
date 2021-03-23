import React,{useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { isEmpty } from "lodash";
import { updateProfileFirebase } from "../../utils/actions";

export default function ChangeDisplayName({
  displayName,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleUpdateUserName = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const result = await updateProfileFirebase({ displayName: newDisplayName });
    setLoading(false);
    if (!result.statusResponse) {
      setError("Error al actulaziar nombre, intenta lo de nuevo.");
      return;
    }
    setReloadUser(true);
    toastRef.current.show("Name actualizado correctamente.", 3000);
    setShowModal(false);
  };
  const validateForm = () => {
    setError(null);
    console.log(newDisplayName)
    if (isEmpty(newDisplayName)) {
      setError("Debes escribir al menos un Nombre.");
      return;
    }
    if (newDisplayName === displayName) {
      setError("No deber ingresar el mismo nombre y apellido");
      return;
    }
    return true;
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Ingresa nombre y apellidos"
        containerStyle={styles.input}
        defaultValue={displayName}
        errorMessage={error}
        onChange={(e) => {
          setNewDisplayName(e.nativeEvent.text);
        }}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#ff6c6c",
        }}
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
