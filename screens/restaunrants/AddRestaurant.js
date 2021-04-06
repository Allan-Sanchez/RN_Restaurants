import React, { useState, useRef } from "react";
import { StyleSheet} from "react-native";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Loading from "../../components/Loading";
import AddRestaurantForm from "../../components/restaurants/AddRestaurantForm";

export default function AddRestaurant({navigation}) {
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <AddRestaurantForm setLoading={setLoading} toastRef={toastRef} navigation={navigation}/>
      <Loading isVisible={loading} text={"Crendo restaurante"} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
