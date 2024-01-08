import React from "react";
import { Dimensions, TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Renders a gradient button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display on the button.
 * @param {function} props.onPress - The function to be called when the button is pressed.
 * @param {string[]} props.colors - The array of colors for the gradient background.
 * @param {Object} [props.buttonStyle={}] - The custom styles for the button container.
 * @param {Object} [props.backgroundStyle=styles.buttonBackground] - The custom styles for the gradient background.
 * @param {Object} [props.textStyle=styles.buttonText] - The custom styles for the button text.
 * @returns {JSX.Element} The rendered gradient button component.
 */
const GradientButton = ({ text, onPress, colors, buttonStyle={}, backgroundStyle=styles.buttonBackground, textStyle=styles.buttonText }) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <LinearGradient colors={colors} style={backgroundStyle}>
        <Text style={textStyle}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBackground: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: responsiveSize / 38,
    fontFamily: "Montserrat-Bold",
    color: "#06181d",
  }
});

export default GradientButton;
