import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// components
import TopRestaurants from '../screens/TopRestaurants';
const Stack = createStackNavigator();
export default function TopRestaurantsStock() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="topRestaurant"
        component={TopRestaurants}
        options={{ title: "Los Mejores Restaurantes" }}
      />
    </Stack.Navigator>
  );
}
