import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// components
import Search from '../screens/Search';
const Stack = createStackNavigator();
export default function SearchStock() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={Search}
        options={{ title: "Buscar" }}
      />
    </Stack.Navigator>
  );
}
