import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import Header from "../components/common/header";
import LinearGradient from "react-native-linear-gradient";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Renders the About screen.
 * @param {object} navigation - The navigation object.
 * @returns {JSX.Element} The rendered About screen.
 */
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
        I developed this application as a component of my master's thesis, with a primary focus on serving as a user interface for a lameness detection system that I designed. My objective was to create an expandable design that would allow others to integrate additional systems and augment its capabilities. Essentially, I established the foundation for an agricultural farmer companion application. The application is accompanied by a backend server called "EtugenEke" that is seamlessly integrated. Every aspect of the application is harmoniously aligned with the backend and functions effectively, except for the detection system, which is currently in a placeholder state. Regarding its name, I selected "AkAna," which, in my native language, translates to "The White Mother." AkAna symbolizes the primordial creator-goddess in Turkic culture, revered as the deity of water and the elder sister of Earth.
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
