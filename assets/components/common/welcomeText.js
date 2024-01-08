import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"; 

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Renders a welcome text component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be displayed.
 * @param {Array} props.iconProps - The properties of the icon.
 * @param {Object} [props.containerStyle=styles.container] - The style object for the container view.
 * @param {Object} [props.textStyle=styles.text] - The style object for the text component.
 * @param {React.Component} [props.IconObject=Icon] - The icon component to be used.
 * @returns {React.Component} The rendered welcome text component.
 */
const WelcomeText = ({ text, iconProps, containerStyle=styles.container, textStyle=styles.text, IconObject=Icon}) => {
  return (
    <View style={containerStyle}>
      <IconObject name={iconProps[0]} size={iconProps[1]} color={iconProps[2]} />
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: responsiveSize / 25,
    color: "#ffffff",
    marginLeft: 5,
    fontFamily: "Montserrat-Bold",
  },
});

export default WelcomeText;
