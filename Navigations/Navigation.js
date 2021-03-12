import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements'
// components
import RestaurantsStack from "../Navigations/RestaurantsStack";
import FavoritesStock from "../Navigations/FavoritesStock";
import TopRestaurantsStock from "../Navigations/TopRestaurantsStock";
import SearchStock from "../Navigations/SearchStock";
import AccountStack from "../Navigations/AccountStack";

const Tab = createBottomTabNavigator();
export default function Navigation() {
  const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
      case "restaurant":
        iconName = "compass-outline";
        break;
      case "favorites":
        iconName = "heart-outline";
        break;
      case "topRestaurants":
        iconName = "star-outline";
        break;
      case "search":
        iconName = "magnify";
        break;
      case "account":
        iconName = "home-outline";
        break;
    }
    return (
      <Icon type="material-community" name={iconName} size={22} color={color} />
    );
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurant"
        tabBarOptions={{
          // inactiveBackgroundColor: "#c0b6f1",
          activeTintColor: "#ff6c6c",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="restaurant"
          component={RestaurantsStack}
          options={{ title: "Restaurantes" }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesStock}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="topRestaurants"
          component={TopRestaurantsStock}
          options={{ title: "Top 5" }}
        />
        <Tab.Screen
          name="search"
          component={SearchStock}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
