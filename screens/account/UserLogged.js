import React from "react";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LogoutFirebase } from "../../utils/actions";
export default function UserLogged() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>UserLogged</Text>
      <Button
        title="Cerrar Sesion"
        onPress={() => {
          LogoutFirebase();
          navigation.navigate("restaurant");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
