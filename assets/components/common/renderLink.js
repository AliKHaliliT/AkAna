import React from "react";
import { Dimensions, TouchableOpacity, Text, StyleSheet } from "react-native";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const RenderLink = ({ text, onPress, textStyle = styles.text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: responsiveSize / 42,
    color: "#ffffff",
    textDecorationLine: "underline",
    fontFamily: "Montserrat-Bold",
  },
});

export default RenderLink;