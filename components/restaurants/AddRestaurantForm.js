import React, { useState } from "react";
import { map, size } from "lodash";
import { StyleSheet, View, ScrollView } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Avatar, Button, Icon, Input } from "react-native-elements";
import { loadImageFromGallery } from "../../utils/helpers";

export default function AddRestaurantForm({
  setLoading,
  toastRef,
  navigation,
}) {
  const [formData, setFormData] = useState({
    // name: "",
    // email: "",
    // address: "",
    // phone: "",
    // description: "",
    country: "GT",
    callinCode: "502",
  });
  const [errorData, setErrorData] = useState({
    name: "",
    country: "",
    callinCode: "",
    email: "",
    address: "",
    phone: "",
    description: "",
  });
  const [imageSelected, setImageSelected] = useState([]);
  const handleRestaurant = () => {
    console.log(formData);
    console.log("restaurant created");
  };
  return (
    <View style={styles.viewContainer}>
      <FormAdd
        setFormData={setFormData}
        formData={formData}
        setErrorData={setErrorData}
        errorData={errorData}
      />
      <UploadImageForm
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
        toastRef={toastRef}
      />
      <Button
        title="Crear Restaurante"
        onPress={handleRestaurant}
        buttonStyle={styles.btn}
        titleStyle={styles.buttonTitle}
        containerStyle={styles.btnContainer}
      />
    </View>
  );
}

function FormAdd({setFormData, formData, errorData }) {
  const [country, setCountry] = useState("GT");
  const [callinCode, setCallinCode] = useState("502");
  const [phone, setPhone] = useState("");

  const handleForm = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        defaultValue={formData.name}
        errorMessage={errorData.name}
        onChange={(e) => {
          handleForm(e, "name");
        }}
      />
      <Input
        keyboardType="email-address"
        placeholder="Email del restaurante"
        defaultValue={formData.email}
        errorMessage={errorData.email}
        onChange={(e) => {
          handleForm(e, "email");
        }}
      />
      <Input
        placeholder="Direccion del restaurante"
        defaultValue={formData.address}
        errorMessage={errorData.address}
        onChange={(e) => {
          handleForm(e, "address");
        }}
      />
      <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          countryCode={country}
          onSelect={(country) => {
            setFormData({
              ...formData,
              country: country.cca2,
              callinCode: country.callingCode[0],
            });
            setCountry(country.cca2);
            setCallinCode(country.callingCode[0]);
          }}
          containerStyle={styles.countryPicker}
        />
        <Input
          keyboardType="phone-pad"
          placeholder="WhatsApp del restaurante"
          style={styles.inputPhone}
          defaultValue={formData.phone}
          errorMessage={errorData.phone}
          onChange={(e) => {
            handleForm(e, "phone");
          }}
        />
      </View>
      <Input
        multiline
        placeholder="Descripcion del restaurante"
        style={styles.textArea}
        defaultValue={formData.description}
        errorMessage={errorData.description}
        onChange={(e) => {
          handleForm(e, "description");
        }}
      />
    </View>
  );
}
function UploadImageForm({ toastRef,imageSelected, setImageSelected }) {
  const handleUploadImage = async() =>{
    const response = await loadImageFromGallery([4,3]);
    if (!response.status) {
      toastRef.current.show("No has seleccionado ninguna imagen")
    }
    console.log(imageSelected)
    setImageSelected([...imageSelected,response.image])
  }
  return (
    <ScrollView horizontal style={styles.containerImage}>
      {size(imageSelected) < 10 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={handleUploadImage}
        />
      )}
      {
        map(imageSelected,(image,index) => (
          <Avatar key={index} source={{uri:image}} style={styles.miniatureImage}/>
        ))
      }
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 20,
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
    flexDirection: "row",
  },
  inputPhone: {
    width: "80%",
  },
  btnContainer: {
    height: 140,
    width: "85%",
    alignSelf: "center",
  },
  btn: {
    paddingVertical: 20,
    backgroundColor: "#ff6c6c",
  },
  buttonTitle: {
    fontSize: 20,
  },
  containerImage: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 79,
    height: 70,
    marginRight: 10,
    backgroundColor: "#e3e3e3",
  },
  miniatureImage:{
    width:70,
    height:70,
    marginRight:10
  }
});
