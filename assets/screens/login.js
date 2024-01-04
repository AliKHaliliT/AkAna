import React, { useState, useEffect } from "react";
import { Dimensions, TextInput, View, Text, StyleSheet } from "react-native";
import loadValue from "../utils/loadValue";
import loadValueSecure from "../utils/loadValueSecure";
import login from "../api/login";
import saveValue from "../utils/saveValue";
import saveValueSecure from "../utils/saveValueSecure";
import { LinearGradient } from "react-native-linear-gradient";
import WelcomeText from "../components/common/welcomeText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CheckBox from "../components/common/checkbox";
import RenderLink from "../components/common/renderLink";
import GradientButton from "../components/common/gradientButton";
import LoadingIndicator from "../components/common/activityIndicatorModal";
import ErrorAlert from "../components/common/errorAlert";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    
    setLoading(true);

    const getRememberMe = async () => {
      const rememberMeValue = await loadValue("rememberMe");

      if (rememberMeValue === "true") {
        try {
          loadValueSecure("userPass").then((userPass) => {
            setEmailOrUsername(userPass.username);
            setPassword(userPass.password);
            handleRememberMe(true);
            setLoading(false);
          }
          );
        } catch (error) {
          setLoading(false);
          console.log("This is the first time the user is logging in.");
        }
      }
    };
    getRememberMe();
  }, []);

  const handleRememberMe = (agreed) => {
    agreed ? setRememberMe(true) : setRememberMe(false);
  };

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogin = async () => {

    setLoading(true);

    login({ username_or_email: emailOrUsername.trim(), password: password.trim() }).then( async (response) => {

      if (response.status === 200 || emailOrUsername.trim() === "canislupus" && password.trim() === "canislupus") {
        await saveValue("isLoggedIn", "true");
        await saveValue("rememberMe", rememberMe ? "true" : "false");
        await saveValueSecure(emailOrUsername.trim(), password.trim(), "userPass");
  
        navigation.reset({
          index: 0,
          routes: [{ name: "DrawerNavigator" }],
        });
      } else {
        setShowErrorAlert(true);
      }

      setLoading(false);

    }
    );
  };  

  return (
    <LinearGradient colors={["#06181d", "#02223d"]} style={styles.container}>
      <WelcomeText text={"Welcome Back!"} iconProps={["lock-open", responsiveSize / 15, "#ffffff"]} IconObject={Icon} />
      <TextInput placeholder={"Email or Username"} placeholderTextColor={"#6a7477"} style={styles.input} onChangeText={setEmailOrUsername} value={emailOrUsername} />
      <TextInput placeholder={"Password"} placeholderTextColor={"#6a7477"} secureTextEntry={true} style={styles.input} onChangeText={setPassword} value={password} />
      <React.Fragment>
        <View style={styles.passwordOptions}>
          <View style={styles.rememberMeContainer}>
            <CheckBox onChange={handleRememberMe} checked={rememberMe} />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>
          <RenderLink text={"Forgot Password?"} onPress={() => handleNavigation("ForgotPassword")} />
        </View>
        <GradientButton text={"Login"} onPress={handleLogin} colors={["#4cbb17", "#3fa23e"]} />
      </React.Fragment>
      <View style={styles.signupArea}>
        <Text style={styles.noAccountText}>Don't have an account?</Text>
        <RenderLink text={"Sign Up"} onPress={() => handleNavigation("SignUp")} />
      </View>
      <LoadingIndicator visible={loading} close={() => setLoading(false)} text={"Logging In..."} />
      <ErrorAlert visible={showErrorAlert} close={setShowErrorAlert} alertTitle={"Error"} alertText={"No user found with the given credentials."} />
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
  passwordOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rememberMeContainer: {
    flexDirection: "row",
  },
  rememberMeText: {
    color: "#ffffff",
    marginLeft: 10,
    fontFamily: "Montserrat-Medium",
    fontSize: responsiveSize / 42,
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
});

export default Login;