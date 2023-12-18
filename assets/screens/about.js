import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import Header from "../components/common/header";
import LinearGradient from "react-native-linear-gradient";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const About = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#06181d", "#02223d"]}
      style={styles.container}
    >
      <Header navigation={navigation} headerTitle="About" />
      <View style={styles.content}>
        <Text style={styles.mainTitle}>About AkAna</Text>
        <Text style={styles.mainDescription}>
          I developed this app as part of my master's thesis, primarily focusing on serving as a user interface for a lameness detection system I created. My aim was to design it to be expandable, allowing others to integrate additional systems and enhance its capabilities. Essentially, I laid the groundwork for an agricultural farmer companion app. Please note, this is merely a demo and the functionalities are not linked yet; it solely serves as a UI. As for the name, I chose "AkAna," which in my mother tongue translates to "The White Mother." AkAna represents the primordial creator-goddess in Turkic culture, revered as the goddess of water and the elder sister of Earth.
        </Text>
        <Text style={styles.footerText}>©2023 AkAna</Text>
      </View>
    </LinearGradient>
  );
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: responsiveSize / 25,
    fontFamily: "Montserrat-Bold",
    marginBottom: 20,
    color: "#ffffff",
  },
  mainDescription: {
    fontSize: responsiveSize / 38,
    fontFamily: "Montserrat-Medium",
    color: "#ffffff",
    marginBottom: 40,
    textAlign: "justify",
  },
  footerText: {
    position: "absolute",
    bottom: 20,
    fontSize: responsiveSize / 38,
    fontFamily: "Montserrat-Bold",
    color: "#ffffff",
  },
});  

export default About;
