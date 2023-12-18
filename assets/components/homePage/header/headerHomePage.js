import React from "react";
import { Dimensions, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "react-native-linear-gradient";
import ADIcon from "react-native-vector-icons/AntDesign";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const HeaderHomePage = ({ navigation, headerTitle }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  const openUserProfile = () => {
    navigation.navigate("UserProfile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Icon name={"menu"} size={responsiveSize / 19} color={"#ffffff"} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{headerTitle}</Text>
        <View style={styles.userIconContainer}>
          <TouchableOpacity onPress={openUserProfile}>
            <LinearGradient
              colors={["#38464a", "#6a7477"]}
              style={styles.userIconBackground}
            >
              <ADIcon name={"user"} size={responsiveSize / 19} color={"#ffffff"} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
    fontSize: responsiveSize / 28,
    marginLeft: 20,
  },
  userIconContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: 10,
  },
  userIconBackground: {
    width: responsiveSize / 12,
    height: responsiveSize / 12,
    borderRadius: responsiveSize / 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeaderHomePage;
