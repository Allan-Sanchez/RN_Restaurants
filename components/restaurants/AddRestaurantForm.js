import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Button, Input } from "react-native-elements";

export default function AddRestaurantForm({
  setLoading,
  toastRef,
  navigation,
}) {
  const handleRestaurant = () => {
    console.log("restaurant created");
  };
  return (
    <View style={styles.viewContainer}>
      <FormAdd />
      <Button
        title="Crear Restaurante"
        onPress={handleRestaurant}
        buttonStyle={styles.btnRestaurant}
      />
    </View>
  );
}

function FormAdd() {
  const [country, setCountry] = useState("GT");
  const [callinCode, setCallinCode] = useState("502");
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.viewForm}>
      <Input placeholder="Nombre del restaurante" />
      <Input keyboardType="email-address" placeholder="Email del restaurante" />
      <Input placeholder="Direccion del restaurante" />
      <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          countryCode={country}
          onSelect={(country) => {
            setCountry(country.cca2);
            setCallinCode(country.callingCode[0]);
          }}
          containerStyle={styles.countryPicker}
        />
        <Input
          keyboardType="phone-pad"
          placeholder="WhatsApp del restaurante"
          style={styles.inputPhone}
        />
      </View>
        <Input
          multiline
          placeholder="Descripcion del restaurante"
          style={styles.textArea}
        />
    </View>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
      marginTop:20,
    height: "100%",
  },
  viewForm: {
    marginHorizontal: 20,
  },
  textArea: {
    height: 100,
    width: "100%",
  },
  phoneView: {
    width: "80%",
    flexDirection:"row"
  },
  inputPhone: {
    width: "80%",
  },
  btnRestaurant: {
    margin: 20,
    backgroundColor: "#ff6c6c",
  },
});
