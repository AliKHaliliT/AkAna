import React, { useState, useEffect } from "react";
import { Dimensions, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import loadValue from "../utils/loadValue";
import deleteValue from "../utils/deleteValue";
import { LinearGradient } from "react-native-linear-gradient";
import GoBack from "../components/common/goBackButtonWithText";
import Icon from "react-native-vector-icons/FontAwesome6";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DetailCard from "../components/userProfile/detailCard";

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
        <View style={styles.profileContainer}>
          <MCIIcon name="account-circle" size={responsiveSize / 5} color="#ffffff" />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.commonTextBold}>{`${firstName} ${lastName}`}</Text>
            <Text style={{ ...styles.commonTextBold, fontSize: responsiveSize / 35, fontFamily: "Montserrat-Medium" }}>{`@${username}`}</Text>
          </View>
        </View>
        <LinearGradient
          colors={["#1f2f34", "#283E45"]}
          style={styles.cardBackground}
        >
          <DetailCard iconName="email" title="Email" description={email} />
          <DetailCard iconName="money-check" title="Plan Type" description="Platinum" IconComponent={Icon} />
          <DetailCard iconName="calendar" title="Subscription" description="Active Till 12/09/2023" IconComponent={Icon} containerStyle={{}}/>
        </LinearGradient>
        <LinearGradient
          colors={["#1f2f34", "#283E45"]}
          style={styles.cardBackground}
        >
          <TouchableOpacity onPress={handleLogout}>
            <Text style={{ ...styles.commonTextBold, fontSize: responsiveSize / 30, marginLeft: 10, fontFamily: "Montserrat-Medium", color: "#ff0000" }}>Logout</Text>
          </TouchableOpacity>
        </LinearGradient>
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
    fontSize: responsiveSize / 23,
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
    marginLeft: 20,
  },
  cardBackground: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 10,
  },
});

export default UserProfile;
