import React, { useState } from "react";
import { Dimensions, TextInput, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import GradientButton from "../components/common/gradientButton";
import ErrorAlert from "../components/common/errorAlert";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const handleResetPassword = async () => {
    try {
      // Password reset logic goes here
      if (password === retypePassword) {
        // Passwords match, perform password reset logic (save new password, etc.)
        // You might want to add your logic here to save the new password

        // For example:
        // await saveValue("password", password);

        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }], // Navigate back to login after password reset
        });
      } else {
        setShowErrorAlert(true); // Show error if passwords don't match
      }
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };  

  return (
    <LinearGradient colors={["#06181d", "#02223d"]} style={styles.container}>
      <TextInput
        placeholder={"New Password"}
        placeholderTextColor={"#6a7477"}
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        placeholder={"Retype New Password"}
        placeholderTextColor={"#6a7477"}
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setRetypePassword}
        value={retypePassword}
      />
      <GradientButton text={"Reset Password"} onPress={handleResetPassword} colors={["#4cbb17", "#3fa23e"]} />
      <View style={styles.signupArea}>
        <Text style={styles.noAccountText}>Remember your password?</Text>
        <Text style={styles.signupLink} onPress={() => handleNavigation("Login")}>Login</Text>
      </View>
      <ErrorAlert
        visible={showErrorAlert}
        close={setShowErrorAlert}
        alertTitle={"Error"}
        alertText={"Passwords do not match."}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  input: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    fontSize: responsiveSize / 42,
    fontFamily: "Montserrat-Medium",
    color: "#06181d",
  },
  signupArea: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  noAccountText: {
    color: "#ffffff",
    marginRight: 5,
    fontFamily: "Montserrat-Medium",
    fontSize: responsiveSize / 42,
  },
  signupLink: {
    color: "#4cbb17",
    fontFamily: "Montserrat-Medium",
    fontSize: responsiveSize / 42,
  },
});

export default ResetPassword;