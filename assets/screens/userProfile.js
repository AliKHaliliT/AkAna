import React, { useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import loadValue from "../utils/loadValue";
import deleteValue from "../utils/deleteValue";
import { LinearGradient } from "react-native-linear-gradient";
import GoBack from "../components/common/goBackButtonWithText";
import Icon from "react-native-vector-icons/FontAwesome6";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DetailCard from "../components/userProfile/detailCard";
import GradientButton from "../components/common/gradientButton";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const UserProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("Canis");
  const [lastName, setLastName] = useState("Lupus");
  const [username, setUsername] = useState("canislupus");
  const [email, setEmail] = useState("canislupus@akana.com");

  useEffect(() => {
    loadValue("firstName").then((savedFirstName) => {
      setFirstName(savedFirstName);
    });
    loadValue("lastName").then((savedLastName) => {
      setLastName(savedLastName);
    });
    loadValue("userName").then((savedUsername) => {
      setUsername(savedUsername);
    });
    loadValue("email").then((savedEmail) => {
      setEmail(savedEmail);
    });
  }, []);

  const handleBackTo = () => {
    navigation.navigate("Home");
  };

  const handleEditProfile = () => {
    navigation.navigate("UserProfileEdit");
  }

  const handleLogout = () => {
    deleteValue("isLoggedIn").then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    });
  };

  return (
    <LinearGradient colors={["#06181d", "#02223d"]} style={styles.container}>
      <View style={styles.header}>
        <GoBack text={"Go back to Login"} handleBackTo={handleBackTo} />
      </View>
      <View style={styles.content}>
        <LinearGradient
          colors={["#1f2f34", "#283E45"]}
          style={styles.cardBackground}
        >
          <View style={styles.profileContainer}>
            <MCIIcon name="account-circle" size={responsiveSize / 5} color="#ffffff" />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.commonTextBold} numberOfLines={1} ellipsizeMode="tail">{`${firstName}`}</Text>
              <Text style={styles.commonTextBold} numberOfLines={1} ellipsizeMode="tail">{`${lastName}`}</Text>
              <Text style={{ ...styles.commonTextBold, fontSize: responsiveSize / 35, fontFamily: "Montserrat-Medium" }}>{`@${username}`}</Text>
            </View>
          </View>
          <DetailCard iconName="email" title="Email" description={email} />
          <DetailCard iconName="money-check" title="Plan" description="Platinum" IconComponent={Icon} />
          <DetailCard iconName="credit-card" title="Credit" description="50" IconComponent={Icon} containerStyle={{}}/>
        </LinearGradient>
        <View style={styles.editAndLogoutContainer}>
          <GradientButton 
              text={"Edit Profile"} 
              onPress={handleEditProfile} 
              colors={["#1f2f34", "#3e5158"]} 
              textStyle={styles.buttonTextStyle}
              buttonStyle={{flex: 1, marginLeft: 5, marginRight: 5}}
            />
            <GradientButton 
              text={"Logout"} 
              onPress={handleLogout} 
              colors={["#1f2f34", "#3e5158"]} 
              textStyle={{...styles.buttonTextStyle, color: "#ff0000"}}
              buttonStyle={{flex: 1, marginLeft: 5, marginRight: 5}}
            />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  content: {
    paddingHorizontal: 10,
    height: "90%",
    width: "100%",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  commonTextBold: {
    fontSize: responsiveSize / 30,
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
    marginLeft: 20,
    minWidth: "70%",
    maxWidth: "70%",
  },
  cardBackground: {
    padding: 16,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  editAndLogoutContainer: {
    flexDirection: "row",
  },
  buttonTextStyle: {
    fontSize: responsiveSize / 35,
    fontFamily: "Montserrat-Bold",
    color: "#ffffff",
  },
});

export default UserProfile;
