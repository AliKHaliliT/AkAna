import React from "react";
import { Dimensions, Modal, View, TouchableOpacity, ScrollView, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Renders an information alert modal.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the information alert.
 * @param {string} props.infoText - The text content of the information alert.
 * @param {Function} props.close - The function to close the information alert.
 * @returns {JSX.Element} The rendered information alert modal.
 */
const InfoAlert = ({ title, infoText, close }) => {
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={true}
    >
      <View style={styles.infoContainer}>
        <View style={styles.infoContentContainer}>
          <View style={styles.infoButtonContainer}>
            <TouchableOpacity onPress={() => close(false)}>
              <Icon name={"times"} size={responsiveSize / 27} color={"#06181d"} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.infoTextContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.infoText}>{infoText}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  infoContentContainer: {
    width: "100%",
    minHeight: "30%",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 25,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  infoButtonContainer: {
    alignItems: "flex-end",
  },
  infoTextContainer: {
    alignSelf: "justify",
  },
  titleText: {
    fontSize: responsiveSize / 27,
    color: "#06181d",
    fontFamily: "Montserrat-Bold",
  },
  infoText: {
    fontSize: responsiveSize / 35,
    color: "#06181d",
    fontFamily: "Montserrat-Medium",
  },
});

export default InfoAlert;