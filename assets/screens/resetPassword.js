import React, { useState } from "react";
import { Dimensions, ToastAndroid, TextInput, View, Text, StyleSheet } from "react-native";
import resetPassword from "../api/resetPassword";
import { LinearGradient } from "react-native-linear-gradient";
import WelcomeText from "../components/common/welcomeText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GradientButton from "../components/common/gradientButton";
import RenderLink from "../components/common/renderLink";
import LoadingIndicator from "../components/common/activityIndicatorModal";
import ErrorAlert from "../components/common/errorAlert";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const ResetPassword = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showFieldsAlert, setShowFieldsAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [showMultipleAlert, setShowMultipleAlert] = useState(false);
  const [showMultipleAlertText, setShowMultipleAlertText] = useState('');

  const handleNavigation = (screen) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  };

  const handleResetPassword = async () => {
    

    if (password.trim() !== '' || retypePassword.trim() !== '') {
      if (password.trim() === retypePassword.trim()) {

        setLoading(true);

        resetPassword({ token: route.params.token, new_password: password }).then((response) => {
          console.log(response);
          if (response.status === 200) {
            setLoading(false);
            handleNavigation("Login");
          } else if (response.message == "Token not found") {
            setLoading(false);
            setShowMultipleAlertText("Invalid token. Please try again.");
            setShowMultipleAlert(true);
          } else if (response.message == "New password cannot be the same as the old password") {
            setLoading(false);
            setShowMultipleAlertText("New password cannot be the same as the old password!");
            setShowMultipleAlert(true);
          } else {
            setLoading(false);
            ToastAndroid.show("Something went wrong. Please try again.", ToastAndroid.SHORT);
          }
        });
      } else {
        setLoading(false);
        setShowPasswordAlert(true);
      }
    } else {
      setShowFieldsAlert(true);
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
      <LoadingIndicator visible={loading} close={() => setLoading(false)} text={"Connecting to Server..."} />
      <ErrorAlert
        visible={showFieldsAlert}
        close={setShowFieldsAlert}
        alertTitle={"Error"}
        alertText={"Please fill in all fields."}
      />
      <ErrorAlert
        visible={showPasswordAlert}
        close={setShowPasswordAlert}
        alertTitle={"Error"}
        alertText={"Passwords do not match."}
      />
      <ErrorAlert 
        visible={showMultipleAlert} 
        close={setShowMultipleAlert} 
        alertTitle={"Error"} 
        alertText={showMultipleAlertText} 
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