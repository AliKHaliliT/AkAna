import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import SplashScreen from "../screens/splashScreen";
import Login from "../screens/login";
import SignUp from "../screens/signUp";
import ForgotPassword from "../screens/forgotPassword";
import ResetPassword from "../screens/resetPassword";
import DrawerNavigator from "./drawerNavigator";
import UserProfile from "../screens/userProfile";
import UserProfileEdit from "../screens/userProfileEdit";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ResetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen 
        name="DrawerNavigator" 
        component={DrawerNavigator} 
        options={{
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
      />
      <Stack.Screen
        name="UserProfileEdit"
        component={UserProfileEdit}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
