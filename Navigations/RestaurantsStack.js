import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// components
import Restaurants from '../screens/restaunrants/Restaurants';
import AddRestaurant from "../screens/restaunrants/AddRestaurant";
const Stack = createStackNavigator();
export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurant"
        component={Restaurants}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
        name="add-restaurant"
        component={AddRestaurant}
        options={{ title: "Crear Restaurante" }}
      />
    </Stack.Navigator>
  );
}
