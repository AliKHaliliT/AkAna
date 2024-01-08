import React from 'react';
import { Dimensions, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const responsiveSize = (Dimensions.get('window').width + Dimensions.get('window').height) / 2;
const defaultColors = ["#06181d", "#02223d"];

/**
 * Renders a button with a gradient background and an optional icon.
 *
 * @param {Object} onPress - The function to be called when the button is pressed.
 * @param {Object} iconSource - The source of the icon image.
 * @param {string} buttonText - The text to be displayed on the button.
 * @param {Array<string>} colors - The array of colors for the gradient background.
 * @param {Object} gradientStyle - The style object for the gradient background.
 * @param {Object} buttonStyle - The style object for the button.
 * @param {Object} iconStyle - The style object for the icon.
 * @param {Object} textStyle - The style object for the button text.
 * @returns {JSX.Element} - The rendered GradientImagedButton component.
 */
const GradientImagedButton = ({ onPress={}, iconSource, buttonText="Button", 
                                colors=defaultColors, gradientStyle=styles.gradient, 
                                buttonStyle=styles.button, 
                                iconStyle=styles.icon, textStyle=styles.text }) => {
  return (
    <LinearGradient colors={colors} style={gradientStyle}>
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        {iconSource ? <Image source={iconSource} style={iconStyle} /> : null}
        <Text style={textStyle}>{buttonText}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    padding: 15,
    borderRadius: 15,
    elevation: 5,
  },
  button: {
    width: responsiveSize / 5,
    height: responsiveSize / 5,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: responsiveSize / 7,
    height: responsiveSize / 7,
  },
  text: {
    fontSize: responsiveSize / 24,
    color: "#fff9eb",
    fontFamily: "Montserrat-Medium",
    marginTop: 5,
  },
});

export default GradientImagedButton;