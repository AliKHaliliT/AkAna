import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const DrawerItemComponent = ({ label, iconName, navigation, navigateTo, styles = defaultStyles, iconStyles = [responsiveSize / 21, "#ffffff"] }) => {
  const renderDrawerItem = () => (
    <DrawerItem
      label={label}
      labelStyle={styles.drawerLabel}
      icon={() => <Icon name={iconName} size={iconStyles[0]} color={iconStyles[1]} />}
      onPress={() => navigation.navigate(navigateTo)}
    />
  );

  return renderDrawerItem();
};

const defaultStyles = StyleSheet.create({
  drawerLabel: {
    fontFamily: "Montserrat-Bold",
    fontSize: responsiveSize / 31,
    color: "#ffffff",
  },
});

export default DrawerItemComponent;
