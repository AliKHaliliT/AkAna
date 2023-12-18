import React from "react";
import { Dimensions, TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

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
