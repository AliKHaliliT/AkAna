import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Renders a drawer item component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the drawer item.
 * @param {string} props.iconName - The name of the icon for the drawer item.
 * @param {Object} props.navigation - The navigation object.
 * @param {string} props.navigateTo - The screen to navigate to when the drawer item is pressed.
 * @param {Object} [props.styles=defaultStyles] - The styles for the drawer item.
 * @param {Array} [props.iconStyles=[responsiveSize / 21, "#ffffff"]] - The styles for the icon.
 * @returns {React.Element} The rendered drawer item component.
 */
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
