import React from "react";
import { Dimensions, Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const ConfirmAlert = ({ visible, close, confirm, alertTitle, alertText, animationType = "fade", containerStyle = styles.container, 
                      contentStyle = styles.content, titleStyle = styles.title, textStyle = styles.text, backgroundColors = ["#4cbb17", "#3fa23e"], 
                      buttonStyle = styles.button, buttonTextStyle = styles.buttonText, buttonText0 = "Cancel", buttonText1 = "Yes" }) => {
  return (
    <Modal animationType={animationType} transparent={true} visible={visible} onRequestClose={() => close(false)}>
      <View style={containerStyle}>
        <View style={contentStyle}>
          <Text style={titleStyle}>{alertTitle}</Text>
          <Text style={textStyle}>{alertText}</Text>
          <TouchableOpacity onPress={() => close(false)}>
            <LinearGradient colors={backgroundColors} style={buttonStyle}>
              <Text style={buttonTextStyle}>{buttonText0}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirm}>
            <LinearGradient colors={backgroundColors} style={buttonStyle}>
              <Text style={buttonTextStyle}>{buttonText1}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#ffffff",
    elevation: 25,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  title: {
    color: "#06181d",
    fontFamily: "Montserrat-Bold",
    fontSize: responsiveSize / 25,
    textAlign: "justify",
    alignSelf: "flex-start",
  },
  text: {
    color: "#06181d",
    fontFamily: "Montserrat-Medium",
    fontSize: responsiveSize / 32,
    textAlign: "justify",
    alignSelf: "flex-start",
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 20,
    padding: 10,
    width: "30%",
  },
  buttonText: {
    color: "#06181d",
    fontFamily: "Montserrat-Bold",
  },
});

export default ConfirmAlert;
