import React from "react";
import { Dimensions, TouchableOpacity, Text, StyleSheet } from "react-native";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Renders a link component with the specified text and onPress event handler.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be displayed in the link.
 * @param {function} props.onPress - The event handler to be called when the link is pressed.
 * @param {Object} [props.textStyle=styles.text] - The style object for the link text.
 * @returns {JSX.Element} The rendered link component.
 */
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