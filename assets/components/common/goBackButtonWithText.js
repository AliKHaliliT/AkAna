import React from "react";
import { Dimensions, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const defaultIconProps = ["arrow-left", responsiveSize / 25, "#ffffff"];

/**
 * Renders a custom GoBack button with text.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display on the button.
 * @param {function} props.handleBackTo - The function to be called when the button is pressed.
 * @param {Object} [props.containerStyle=styles.container] - The style object for the container view.
 * @param {Object} [props.iconProps=defaultIconProps] - The props for the Icon component.
 * @param {Object} [props.textStyle=styles.text] - The style object for the text component.
 * @returns {JSX.Element} The rendered GoBack button.
 */
const GoBack = ({ text, handleBackTo, containerStyle = styles.container, iconProps = defaultIconProps, textStyle = styles.text }) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={handleBackTo}>
        <Icon name={iconProps[0]} size={iconProps[1]} color={iconProps[2]} />
      </TouchableOpacity>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  text: {
    color: "#ffffff",
    fontSize: responsiveSize / 37,
    marginLeft: 10,
    fontFamily: "Montserrat-Bold",
  },
});

export default GoBack;
