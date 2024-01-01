import React, { useState } from 'react';
import { Dimensions, View, TextInput, Text, StyleSheet } from 'react-native';
import loadValue from '../utils/loadValue';
import { LinearGradient } from 'react-native-linear-gradient';
import WelcomeText from '../components/common/welcomeText';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import GradientButton from '../components/common/gradientButton';
import RenderLink from '../components/common/renderLink';
import ErrorAlert from '../components/common/errorAlert';

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const ForgotPassword = ({ navigation }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFieldsAlert, setShowFieldsAlert] = useState(false);
  const [noAccountAlert, setnoAccountAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const handleForgotPassword = async () => {
    try {
      if (emailOrUsername.trim() !== "") {
        const retrievedMail = await loadValue('email');
        const retrievedUserName = await loadValue('userName');
        const retrievedPassword = await loadValue('password');
  
        if (retrievedMail === emailOrUsername.trim() || retrievedUserName === emailOrUsername.trim()) {
          setPassword(retrievedPassword);
          setShowPasswordAlert(true);
        } else {
          setnoAccountAlert(true);
        }
      } else {
        setShowFieldsAlert(true);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };  

  const handlePasswordSeen = () => {
    setShowPasswordAlert(false);
    navigation.navigate('Login');
  }

  return (
    <LinearGradient colors={['#06181d', '#02223d']} style={styles.container}>
      <View style={styles.content}>
        <WelcomeText text={"Forgot Password"} iconProps={['lock-reset', responsiveSize / 8, '#ffffff']} containerStyle={styles.welcomeText} IconObject={Icon}/>
        <TextInput placeholder={"Email or Username"} placeholderTextColor={"#6a7477"} style={styles.input} onChangeText={setEmailOrUsername} value={emailOrUsername} />
        <GradientButton text={"Forgot Password"} onPress={handleForgotPassword} colors={['#4cbb17', '#3fa23e']} />
        <View style={styles.rememberArea}>
          <Text style={styles.rememberText}>Remember your password?</Text>
          <RenderLink text={"Login"} onPress={() => handleNavigation("Login")} />
        </View>
      </View>
      <ErrorAlert visible={showFieldsAlert} close={setShowFieldsAlert} alertTitle={"Error"} alertText={"Please fill all the fields."} />
      <ErrorAlert visible={noAccountAlert} close={setnoAccountAlert} alertTitle={"Error"} alertText={"No account found with that email or username."} />
      <ErrorAlert visible={showPasswordAlert} close={handlePasswordSeen} alertTitle={"Success!"} alertText={`Your password is "${password}"`} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 30,
  },
  welcomeText: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    fontSize: responsiveSize / 42,
    fontFamily: 'Montserrat-Medium',
    color: '#06181d',
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

export default ForgotPassword;
