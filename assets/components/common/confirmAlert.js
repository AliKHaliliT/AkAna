import React from "react";
import { Dimensions, Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * ConfirmAlert component displays a modal with a confirmation message and buttons.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.visible - Determines whether the modal is visible or not.
 * @param {function} props.close - Function to close the modal.
 * @param {function} props.confirm - Function to handle the confirmation action.
 * @param {string} props.alertTitle - The title of the confirmation alert.
 * @param {string} props.alertText - The text of the confirmation alert.
 * @param {string} [props.animationType="fade"] - The animation type for the modal.
 * @param {Object} [props.containerStyle=styles.container] - The style object for the container view.
 * @param {Object} [props.contentStyle=styles.content] - The style object for the content view.
 * @param {Object} [props.titleStyle=styles.title] - The style object for the title text.
 * @param {Object} [props.textStyle=styles.text] - The style object for the alert text.
 * @param {string[]} [props.backgroundColors=["#4cbb17", "#3fa23e"]] - The background colors for the buttons.
 * @param {Object} [props.buttonContainerStyle=styles.buttonContainer] - The style object for the button container view.
 * @param {Object} [props.buttonStyle=styles.button] - The style object for the buttons.
 * @param {Object} [props.buttonTextStyle=styles.buttonText] - The style object for the button text.
 * @param {string} [props.buttonText0="Cancel"] - The text for the cancel button.
 * @param {string} [props.buttonText1="Yes"] - The text for the confirm button.
 * @returns {JSX.Element} The ConfirmAlert component.
 */
const ConfirmAlert = ({ visible, close, confirm, alertTitle, alertText, 
                        animationType = "fade", containerStyle = styles.container, 
                        contentStyle = styles.content, titleStyle = styles.title, 
                        textStyle = styles.text, backgroundColors = ["#4cbb17", "#3fa23e"], 
                        buttonContainerStyle = styles.buttonContainer, buttonStyle = styles.button, 
                        buttonTextStyle = styles.buttonText, buttonText0 = "Cancel", buttonText1 = "Yes" }) => {
  return (
    <Modal 
      animationType={animationType} 
      transparent={true} visible={visible} 
      onRequestClose={() => close(false)}
    >
      <View style={containerStyle}>
        <View style={contentStyle}>
          <Text style={titleStyle}>{alertTitle}</Text>
          <Text style={textStyle}>{alertText}</Text>
          <View style={buttonContainerStyle}>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 20,
    padding: 10,
    minWidth: "30%",
  },
  buttonText: {
    color: "#06181d",
    fontFamily: "Montserrat-Bold",
  },
});

export default ConfirmAlert;
