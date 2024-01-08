import React, { useState, useRef, useEffect } from "react";
import { Dimensions, Animated, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Represents a processing type card component.
 * @param {Object} props - The component props.
 * @param {string} props.selectedButton - The currently selected button.
 * @param {function} props.setSelectedButton - The function to set the selected button.
 * @returns {JSX.Element} The processing type card component.
 */
const ProcessingTypeCard = ({ selectedButton, setSelectedButton }) => {
  const [blinkAnimation] = useState(new Animated.Value(0));

  const blinkRef = useRef();

  const stopBlinkAnimation = () => {
    blinkAnimation.setValue(0);
    blinkRef.current && blinkRef.current.stopAnimation();
  };

  useEffect(() => {
    if (selectedButton === "Server" || selectedButton === "Device") {
      startBlinkAnimation();
    } else {
      stopBlinkAnimation();
    }
  }, [selectedButton]);

  /**
   * Starts the blink animation for the processing type card.
   */
  const startBlinkAnimation = () => {
    blinkAnimation.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnimation, { toValue: 0.9, duration: 1000, useNativeDriver: true }),
        Animated.timing(blinkAnimation, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  };

  const iconStyle = {
    transform: [
      {
        scale: blinkAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
  };

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const isButtonSelected = (buttonName) => {
    return selectedButton === buttonName;
  };

  return (
    <View style={styles.container}>
      <View style={styles.processingTypeContainer}>
        <TouchableOpacity
          onPress={() => handleButtonPress("Server")}
          style={{
            ...styles.processingTypeButton,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <LinearGradient
            colors={isButtonSelected("Server") ? ["#4cbb17", "#3fa23e"] : ["transparent", "transparent"]}
            style={{
              ...styles.processingTypeButtonContent,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          >
            <Animated.View style={isButtonSelected("Server") ? iconStyle : null}>
              <Icon
                name={"server"}
                size={responsiveSize / 25}
                color={selectedButton === "Server" ? "#fff9eb" : "#838c8e"}
                ref={blinkRef}
              />
            </Animated.View>
            <Text style={{ ...styles.processingTypeButtonText, color: selectedButton === "Server" ? "#fff9eb" : "#838c8e" }}>Server</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleButtonPress("Device")}
          style={{
            ...styles.processingTypeButton,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <LinearGradient
            colors={isButtonSelected("Device") ? ["#4cbb17", "#3fa23e"] : ["transparent", "transparent"]}
            style={{
              ...styles.processingTypeButtonContent,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Animated.View style={isButtonSelected("Device") ? iconStyle : null}>
              <Icon
                name="cellphone"
                size={responsiveSize / 25}
                color={selectedButton === "Device" ? "#fff9eb" : "#838c8e"}
                ref={blinkRef}
              />
            </Animated.View>
            <Text style={{ ...styles.processingTypeButtonText, color: selectedButton === "Device" ? "#fff9eb" : "#838c8e" }}>Device</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  processingTypeContainer: {
    width: responsiveSize / 2.5,
    height: responsiveSize / 8,
    borderColor: "#838c8e",
    borderRadius: 22,
    borderWidth: 2,
    flexDirection: "row",
  },
  processingTypeButton: {
    flex: 1,
  },
  processingTypeButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  processingTypeButtonText: {
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
    marginTop: 5,
    fontSize: responsiveSize / 35,
  },
});

export default ProcessingTypeCard;