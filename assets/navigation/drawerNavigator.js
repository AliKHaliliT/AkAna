import React from "react";
import { Dimensions, View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { LinearGradient } from "react-native-linear-gradient";
import DrawerItemComponent from "../components/navigation/renderDrawerItem";
import HomePage from "../screens/homePage";
import About from "../screens/about";
import redirectTo from "../utils/redirectTo";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const Drawer = createDrawerNavigator();

/**
 * CustomDrawerContent component.
 * @param {object} props - The props object.
 * @returns {JSX.Element} The rendered CustomDrawerContent component.
 */
const CustomDrawerContent = (props) => {
  return (
    <LinearGradient
      colors={["#06181d", "#02223d"]}
      style={styles.container}
    >
      <Image source={require("../img/drawerCorner.png")} resizeMode="contain" style={styles.cornerImageStyle} />
      <View style={styles.drawerHeader}>
        <Image
          source={require("../img/logo.png")}
          style={styles.drawerHeaderImage}
          resizeMode="contain"
        />
        <Text style={styles.drawerHeaderText}>akana</Text>
      </View>
      <DrawerContentScrollView {...props} style={styles.drawerScrollContainer}>
        <DrawerItemComponent label="Home" iconName="home" navigation={props.navigation} navigateTo="Home" />
        <DrawerItemComponent label="About" iconName="info" navigation={props.navigation} navigateTo="About" />
      </DrawerContentScrollView>
      <View style={styles.watermarkContainer}>
        <TouchableOpacity
          style={styles.watermarkButton}
          onPress={() => redirectTo("https://github.com/AliKHaliliT")}
        >
          <Text style={styles.watermarkButtonText}>Ali Khalili Tazehkandgheshlagh</Text>
          <Text style={styles.watermarkButtonText}>Aka Canis Lupus</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

/**
 * Renders a drawer navigator component.
 *
 * @returns {React.Component} The drawer navigator component.
 */
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
  drawerHeaderImage: {
    height: responsiveSize / 4.5,
    width: responsiveSize / 4.5,
  },
  drawerHeaderText: {
    color: "#ffffff",
    fontFamily: "Gokturkunicodefont-o3nA",
    fontSize: responsiveSize / 15,
    marginRight: 10,
  },
  drawerScrollContainer: {
    flex: 1,
  },
  cornerImageStyle: {
    position: "absolute",
    bottom: -100,
    left: 0,
    width: responsiveSize / 3.2,
    height: responsiveSize / 1.5,
    zIndex: 0,
  },
  watermarkContainer: {
    padding: 10,
  },
  watermarkButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  watermarkButtonText: {
    color: "#ffffff",
    fontFamily: "Montserrat-Medium",
    fontSize: responsiveSize / 45,
  },
});

export default DrawerNavigator;
