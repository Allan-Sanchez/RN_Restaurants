import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { updateProfileFirebase, uploadImage } from "../../utils/actions";
import { loadImageFromGallery } from "../../utils/helpers";

export default function InfoUser({ user, setLoading, setLoadingText }) {
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);
  const handleImage = async () => {
    //get local image url
    const result = await loadImageFromGallery([1, 1]);
    if (!result.status) {
      return;
    }
    setLoadingText("Actualizando Image...");
    setLoading(true);
    // upload image firebase
    const resultUploadImage = await uploadImage(
      result.image,
      "avatars",
      user.uid
    );
    if (!resultUploadImage.statusResponse) {
      setLoading(false);
      Alert.alert("Ha ocurrido un error al almacenar la foto de perfil");
      return;
    }
    // change user.photo.URL of firebase user
    const resultUpdateImage = await updateProfileFirebase({
      photoURL: resultUploadImage.url,
    });

    setLoading(false);
    if (resultUpdateImage.statusResponse) {
      setPhotoUrl(resultUploadImage.url);
    } else {
      Alert.alert("Ha ocurrido un error al cambiar la foto de perfil");
      return;
    }
  };
  return (
    <View style={styles.container}>
      <Avatar
        size="large"
        rounded
        onPress={handleImage}
        source={
          photoUrl
            ? { uri: photoUrl }
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
    color: "#ff6c6c",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  email: {
    color: "#eaa8bb",
  },
});
