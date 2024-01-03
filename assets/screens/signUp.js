import React, { useState, useEffect } from "react";
import { Dimensions, ToastAndroid, ScrollView, KeyboardAvoidingView, View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import plans from "../api/plans";
import signUp from "../api/signUp";
import { LinearGradient } from "react-native-linear-gradient";
import WelcomeText from "../components/common/welcomeText";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "../components/common/checkbox";
import RenderLink from "../components/common/renderLink";
import GradientButton from "../components/common/gradientButton";
import LoadingIndicator from "../components/common/activityIndicatorModal";
import ErrorAlert from "../components/common/errorAlert";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState({});
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPlanDescription, setSelectedPlanDescription] = useState('');
  const [showPlanInfoAlert, setShowPlanInfoAlert] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showFieldsAlert, setShowFieldsAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [showTermsAlert, setShowTermsAlert] = useState(false);
  const [showMultipleAlert, setShowMultipleAlert] = useState(false);
  const [showMultipleAlertText, setShowMultipleAlertText] = useState('');

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const handleTermsAgreed = (agreed) => {
    agreed ? setTermsAgreed(true) : setTermsAgreed(false);
  };

  useEffect(() => {

    setLoading(true);
    plans().then((response) => {
      if (response.status === 200) {
        setSubscriptionPlans(response.data.data);
      } else {
        ToastAndroid.show("Something went wrong retrieving the plans from the server.", ToastAndroid.SHORT);
      }
    }
    );
    setLoading(false);
  }, []);

  const handleInfoPress = () => {
    setShowPlanInfoAlert(true);
    setSelectedPlanDescription(`${subscriptionPlans[selectedPlan.split(" - ")[0]].description}`);
  };

  const handleTermsPress = () => {
    // Linking.openURL("your-terms-and-conditions-link");
  };

  const handleSignUp = async () => {

    setLoading(true);

    const fieldsFilled =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      userName.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      retypePassword.trim() !== '';

    if (fieldsFilled) {
      if (password === retypePassword) {
        if (termsAgreed) {
          signUp({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            username: userName.trim(),
            email: email.trim(),
            password: password.trim(),
            plan: selectedPlan.split(" - ")[0],
          }).then((response) => {
            if (response.status === 200) {
              ToastAndroid.show("Account created successfully.", ToastAndroid.SHORT);
              handleNavigation("Login");
            } else {
              if (response.message === "User already exists") {
                setShowMultipleAlertText("There is already an account with this email address or username.");
                setShowMultipleAlert(true);
              } else if (response.message === "Invalid email") {
                setShowMultipleAlertText("Please enter a valid email address.");
                setShowMultipleAlert(true);
              } else {
                setShowMultipleAlertText("Something went wrong. Please try again later.");
                setShowMultipleAlert(true);
              }
            }
            setLoading(false);
          }
          );
        } else {
          setLoading(false);
          setShowTermsAlert(true);
        }
      } else {
        setLoading(false);
        setShowPasswordAlert(true);
      }
    } else {
      setLoading(false);
      setShowFieldsAlert(true);
    }
  };

  return (
    <LinearGradient colors={["#06181d", "#02223d"]} style={styles.container}>
      <ScrollView style={styles.content}>
        <KeyboardAvoidingView behavior={"padding"}>
          <WelcomeText text={"Sign Up"} iconProps={["form", responsiveSize / 15, "#ffffff"]} containerStyle={styles.welcomeText} />
          <React.Fragment>
            <View style={styles.nameFields}>
              <TextInput placeholder={"First Name"} placeholderTextColor={"#6a7477"} style={[styles.input, styles.halfInput]} onChangeText={setFirstName} value={firstName} />
              <TextInput placeholder={"Last Name"} placeholderTextColor={"#6a7477"} style={[styles.input, styles.halfInput]} onChangeText={setLastName} value={lastName} />
            </View>
            <TextInput placeholder={"Username"} placeholderTextColor={"#6a7477"} style={styles.input} onChangeText={setUserName} value={userName} />
            <TextInput placeholder={"Email"} placeholderTextColor={"#6a7477"} style={styles.input} onChangeText={setEmail} value={email} />
            <TextInput placeholder={"Password"} placeholderTextColor={"#6a7477"} secureTextEntry={true} style={styles.input} onChangeText={setPassword} value={password} />
            <TextInput placeholder={"Retype Password"} placeholderTextColor={"#6a7477"} secureTextEntry={true} style={styles.input} onChangeText={setRetypePassword} value={retypePassword} />
            <View style={[ styles.input, styles.pickerContainer ]}>
              <TouchableOpacity style={styles.infoButton} onPress={handleInfoPress}>
                <Icon name={"info-circle"} size={responsiveSize / 25} color={"#06181d"} />
              </TouchableOpacity>
              <View style={styles.pickerConetent}>
                <Picker
                  style={{ color: "#06181d" }}
                  selectedValue={selectedPlan}
                  dropdownIconColor={"#06181d"}
                  mode={"dropdown"}
                  onValueChange={(itemValue, blackHole) =>
                    setSelectedPlan(itemValue)
                  }>
                  {Object.keys(subscriptionPlans).map((plan, index) => (
                    <Picker.Item 
                      key={index} 
                      label={`${Object.keys(subscriptionPlans)[index]} - ${Object.values(subscriptionPlans)[index].price}`}
                      value={`${Object.keys(subscriptionPlans)[index]} - ${Object.values(subscriptionPlans)[index].price}`}
                    />
                  ))}
                </Picker>
              </View>

            </View>
            <View style={styles.checkboxArea}>
              <CheckBox onChange={handleTermsAgreed} checked={termsAgreed} />
              <Text style={styles.termsText}>I agree to the</Text>
              <RenderLink text={"Terms of Service"} onPress={handleTermsPress} />
            </View>
            <GradientButton text={"Sign Up"} onPress={handleSignUp} colors={["#4cbb17", "#3fa23e"]} />
            <View style={styles.haveAccountArea}>
              <Text style={styles.haveAccountText}>Already have an account?</Text>
              <RenderLink text={"Login"} onPress={() => handleNavigation("Login")} />
            </View>
          </React.Fragment>
        </KeyboardAvoidingView>
      </ScrollView>
      <LoadingIndicator visible={loading} close={() => setLoading(false)} text={"Loading..."} />
      <ErrorAlert visible={showFieldsAlert} close={setShowFieldsAlert} alertTitle={"Error"} alertText={"Please fill all the fields."} />
      <ErrorAlert visible={showPasswordAlert} close={setShowPasswordAlert} alertTitle={"Error"} alertText={"Passwords do not match."} />
      <ErrorAlert visible={showTermsAlert} close={setShowTermsAlert} alertTitle={"Error"} alertText={"Please agree to the terms of service"} />
      <ErrorAlert visible={showPlanInfoAlert} close={setShowPlanInfoAlert} alertTitle={selectedPlan} alertText={selectedPlanDescription} />
      <ErrorAlert visible={showMultipleAlert} close={setShowMultipleAlert} alertTitle={"Error"} alertText={showMultipleAlertText} />
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
  pickerContainer: {
    flexDirection: "row", 
    padding: 0, 
    paddingVertical: 0, 
    backgroundColor: "transparent",
  },
  infoButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginRight: 5,
    minWidth: "10%", 
  },
  pickerConetent: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  checkboxArea: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  termsText: {
    color: "#ffffff",
    marginLeft: 10,
    marginRight: 5,
    fontFamily: "Montserrat-Medium",
    fontSize: responsiveSize / 42,
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