import React from "react";
import { Dimensions, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Header = ({ navigation, headerTitle }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="menu" size={screenWidth / 12} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight / 15,
    justifyContent: "flex-end",
    marginBottom: 20,
    width: screenWidth
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20
  },
  headerText: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: screenWidth / 19,
    marginLeft: 20
  }
});

export default Header;