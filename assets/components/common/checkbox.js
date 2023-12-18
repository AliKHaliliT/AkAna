import React from "react";
import { Dimensions, TouchableOpacity, View, StyleSheet } from "react-native";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const CheckBox = ({ onChange, checked, checkBoxStyle = styles.checkBox, checkedStatusStyle = styles.checked }) => {

  const handleToggle = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <TouchableOpacity onPress={handleToggle}>
      <View style={[styles.checkBox, checked ? styles.checked : null]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: responsiveSize / 30,
    height: responsiveSize / 30,
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 4,
  },
  checked: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CheckBox;
