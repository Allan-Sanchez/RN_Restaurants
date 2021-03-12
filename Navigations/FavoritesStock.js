import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// components
import Favorites from '../screens/Favorites';
const Stack = createStackNavigator();
export default function FavoritesStock() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{ title: "Favoritos" }}
      />
    </Stack.Navigator>
  );
}
