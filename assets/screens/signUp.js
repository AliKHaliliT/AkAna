import React, { useState } from "react";
import { Dimensions, ScrollView, KeyboardAvoidingView, View, TextInput, Text, StyleSheet } from "react-native";
import isValidEmail from "../utils/validateEmail";
import saveValue from "../utils/saveValue";
import { LinearGradient } from "react-native-linear-gradient";
import WelcomeText from "../components/common/welcomeText";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "../components/common/checkbox";
import RenderLink from "../components/common/renderLink";
import GradientButton from "../components/common/gradientButton";
import ErrorAlert from "../components/common/errorAlert";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const SignUp = ({ navigation }) => {

  const [termsAgreed, setTermsAgreed] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showFieldsAlert, setShowFieldsAlert] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [showTermsAlert, setShowTermsAlert] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(''); 

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const handleTermsAgreed = (agreed) => {
    agreed ? setTermsAgreed(true) : setTermsAgreed(false);
  };

  const handleTermsPress = () => {
    // Linking.openURL("your-terms-and-conditions-link");
  };

  const handleSignUp = async () => {
    const fieldsFilled =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      userName.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      retypePassword.trim() !== '';
  
    if (fieldsFilled) {
      if (isValidEmail(email.trim())) {
        // isValidDomain should be handled on the backend
        if (password === retypePassword) {
          if (termsAgreed) {
            try {
              await Promise.all([
                saveValue("firstName", firstName.trim()),
                saveValue("lastName", lastName.trim()),
                saveValue("userName", userName.trim()),
                saveValue("email", email.trim()),
                saveValue("password", password.trim()),
                saveValue("termsAgreed", termsAgreed.toString()),
              ]);
              navigation.navigate("Login");
            } catch (error) {
              console.error("Error saving values:", error);
            }
          }
          else {
            setShowTermsAlert(true);
          }
        }
        else {
          setShowPasswordAlert(true);
        }
      }
      else {
        setShowEmailAlert(true);
      }
    }
    else {
      setShowFieldsAlert(true);
    }
  };

  return (
    <LinearGradient colors={["#06181d", "#02223d"]} style={styles.container}>
    <ScrollView style={styles.content}>
      <KeyboardAvoidingView behavior={"padding"}>
        <WelcomeText text={"Sign Up"} iconProps={["form", responsiveSize / 15, "#ffffff"]} containerStyle={styles.welcomeText}/>
        <React.Fragment>
          <View style={styles.nameFields}>
            <TextInput placeholder={"First Name"} placeholderTextColor={"#6a7477"} style={[styles.input, styles.halfInput]} onChangeText={setFirstName} value={firstName}/>
            <TextInput placeholder={"Last Name"} placeholderTextColor={"#6a7477"} style={[styles.input, styles.halfInput]} onChangeText={setLastName} value={lastName}/>
          </View>
          <TextInput placeholder={"Username"} placeholderTextColor={"#6a7477"} style={styles.input} onChangeText={setUserName} value={userName}/>
          <TextInput placeholder={"Email"} placeholderTextColor={"#6a7477"} style={styles.input} onChangeText={setEmail} value={email}/>
          <TextInput placeholder={"Password"} placeholderTextColor={"#6a7477"} secureTextEntry={true} style={styles.input} onChangeText={setPassword} value={password}/>
          <TextInput placeholder={"Retype Password"} placeholderTextColor={"#6a7477"} secureTextEntry={true} style={styles.input} onChangeText={setRetypePassword} value={retypePassword}/>
          <View style={{...styles.input, padding: 0, paddingVertical: 0}}>
            <Picker
              selectedValue={selectedPlan}
              dropdownIconColor={"#6a7477"}
              mode={"dropdown"}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPlan(itemValue)
              }>
              <Picker.Item label="Basic" value="basic" />
              <Picker.Item label="Standard" value="standard" />
              <Picker.Item label="Premium" value="premium" />
            </Picker>
          </View>
          <View style={styles.checkboxArea}>
            <CheckBox onChange={handleTermsAgreed} checked={termsAgreed} />
            <Text style={styles.termsText}>I agree to the</Text>
            <RenderLink text={"Terms of Service"} onPress={handleTermsPress}/>
          </View>
          <GradientButton text={"Sign Up"} onPress={handleSignUp} colors={["#4cbb17", "#3fa23e"]} />
          <View style={styles.haveAccountArea}>
            <Text style={styles.haveAccountText}>Already have an account?</Text>
            <RenderLink text={"Login"} onPress={() => handleNavigation("Login")} />
          </View>
        </React.Fragment>
      </KeyboardAvoidingView>
    </ScrollView>
    <ErrorAlert visible={showFieldsAlert} close={setShowFieldsAlert} alertTitle={"Error"} alertText={"Please fill all the fields."} />
    <ErrorAlert visible={showEmailAlert} close={setShowEmailAlert} alertTitle={"Error"} alertText={"Please enter a valid email address."} />
    <ErrorAlert visible={showPasswordAlert} close={setShowPasswordAlert} alertTitle={"Error"} alertText={"Passwords do not match."} />
    <ErrorAlert visible={showTermsAlert} close={setShowTermsAlert} alertTitle={"Error"} alertText={"Please agree to the terms of service"} />
  </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  welcomeText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
  nameFields: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    fontSize: responsiveSize / 42,
    fontFamily: "Montserrat-Medium",
    color: "#06181d"
  },
  halfInput: {
    width: "48%",
  },
  termsText: {
    color: "#ffffff",
    marginLeft: 10,
    marginRight: 5,
    fontFamily: "Montserrat-Medium",
    fontSize: responsiveSize / 42,
  },
  checkboxArea: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  haveAccountArea: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  haveAccountText: {
    color: "#ffffff",
    fontFamily: "Montserrat-Medium",
    fontSize: responsiveSize / 42,
    marginRight: 5,
  },
});

export default SignUp;