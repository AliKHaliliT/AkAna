import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import linking from "../utils/deepLink";
import StackNavigator from "./stackNavigator";

const MainNavigator = () => {
  return (
    // Decided to not add any fallback UI for now.
    <NavigationContainer linking={linking}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;