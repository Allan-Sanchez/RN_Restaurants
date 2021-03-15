import React from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Loading from "../../components/Loading";

export default function UserGuest() {
  return (
    <ScrollView centerContent style={styles.viewBody}>
      <Image
        source={require("../../assets/restaurant-logo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Consulta tu perfil de Restaurantes</Text>
      <Text style={styles.description}>
        Valora cuales te han gustado mas y comenta como ha sido tu experiencia.
      </Text>
      <Button buttonStyle={styles.button} title="Ver Perfil"  onPress={() =>{console.log("click")}}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    margin:24,
  },
  image: {
    height: 500,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 10,
  },
  description: {
    paddingHorizontal:20,
    textAlign: "justify",
    fontSize: 20,
    color: "#eaa8bb",
  },
  button: {
    marginTop:20,
    paddingVertical:22,
    color:"#7e37bc",
    fontSize:25,
    backgroundColor: "#ff6c6c",
  },
});
