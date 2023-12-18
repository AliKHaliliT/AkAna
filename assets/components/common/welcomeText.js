import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"; 

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

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
