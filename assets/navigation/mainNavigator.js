import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./stackNavigator";

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;