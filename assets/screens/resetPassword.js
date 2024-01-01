import React, { useState } from "react";
import { Dimensions, TextInput, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import WelcomeText from "../components/common/welcomeText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GradientButton from "../components/common/gradientButton";
import RenderLink from "../components/common/renderLink";
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
      <WelcomeText text={"Reset Password"} iconProps={['lock-reset', responsiveSize / 8, '#ffffff']} containerStyle={styles.welcomeText} IconObject={Icon}/>
      <TextInput
        placeholder={"New Password"}
        placeholderTextColor={"#6a7477"}
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        placeholder={"Retype New Password"}
        placeholderTextColor={"#6a7477"}
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={setRetypePassword}
        value={retypePassword}
      />
      <GradientButton 
        text={"Reset Password"} 
        onPress={handleResetPassword} 
        colors={["#4cbb17", "#3fa23e"]} 
        buttonStyle={{marginTop: 5}}
      />
      <View style={styles.rememberArea}>
        <Text style={styles.rememberText}>Remember your password?</Text>
        <RenderLink text={"Login"} onPress={() => handleNavigation("Login")} />
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
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  welcomeText: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    color: "#06181d",
    fontFamily: "Montserrat-Medium",
    fontSize: responsiveSize / 42,
    marginBottom: 10,
    padding: 10,
  },
  rememberArea: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  rememberText: {
    color: "#ffffff",
    fontFamily: "Montserrat-Medium",
    fontSize: responsiveSize / 42,
    marginRight: 5,
  },
});

export default ResetPassword;