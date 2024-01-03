import React, { useState, useEffect } from "react";
import { Dimensions, ToastAndroid, ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import loadValue from "../utils/loadValue";
import loadValueSecure from "../utils/loadValueSecure";
import deleteValue from "../utils/deleteValue";
import updateUserCredentials from "../api/updateUserCredentials";
import saveValueSecure from "../utils/saveValueSecure";
import { LinearGradient } from "react-native-linear-gradient";
import GoBack from "../components/common/goBackButtonWithText";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GradientButton from "../components/common/gradientButton";
import LoadingIndicator from "../components/common/activityIndicatorModal";
import ErrorAlert from "../components/common/errorAlert";
import ConfirmAlert from "../components/common/confirmAlert";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const UserProfileEdit = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("Canis");
  const [firstNameLoaded, setFirstNameLoaded] = useState('');
  const [lastName, setLastName] = useState("Lupus");
  const [lastNameLoaded , setLastNameLoaded] = useState('');
  const [username, setUsername] = useState("canislupus");
  const [usernameLoaded, setUsernameLoaded] = useState('');
  const [email, setEmail] = useState("canislupus@akana.com");
  const [emailLoaded, setEmailLoaded] = useState('');
  const [showAccountAlert, setShowAccountAlert] = useState(false);
  const [passwordTyped, setPasswordTyped] = useState('');
  const [retypePasswordTyped, setRetypePasswordTyped] = useState('');
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);

  useEffect(() => {

    setLoading(true);

    const getUserInfo = async () => {

      if (Promise.all([loadValue("firstName"), loadValue("lastName"), loadValue("username"), loadValue("email")])) {

        const [asyncStorageFirstName, 
               asyncStorageLastName, 
               asyncStorageUsername, 
               asyncStorageEmail
              ] = await Promise.all(
                                    [loadValue("firstName"),
                                      loadValue("lastName"), 
                                      loadValue("username"), 
                                      loadValue("email")]
                                      );
        setFirstName(asyncStorageFirstName);
        setFirstNameLoaded(asyncStorageFirstName);
        setLastName(asyncStorageLastName);
        setLastNameLoaded(asyncStorageLastName);
        setUsername(asyncStorageUsername);
        setUsernameLoaded(asyncStorageUsername);
        setEmail(asyncStorageEmail);
        setEmailLoaded(asyncStorageEmail);

        setLoading(false);

      } else {
        setLoading(false);
        console.log("Error loading user info from AsyncStorage.");
      }
    };
  
    getUserInfo();
  }, []);

  const handleBackTo = () => {
    navigation.navigate("UserProfile");
  };

  const handleDelete = () => {
    setShowAccountAlert(false);
    deleteValue("isLoggedIn").then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    });
  }

  const handleSave = async () => {

    setLoading(true);

    const { username, password } = await loadValueSecure("userPass");
    const user = { username_or_email: username, password: password };
    const actions = {};
    if (firstName !== firstNameLoaded) {
      actions.update_first_name = firstName;
    }
    if (lastName !== lastNameLoaded) {
      actions.update_last_name = lastName;
    }
    if (username !== usernameLoaded) {
      actions.update_username = username;
    }
    if (email !== emailLoaded) {
      actions.update_email = email;
    }
    if (passwordTyped !== '') {
      if (passwordTyped !== retypePasswordTyped) {
        setShowPasswordAlert(true);
        return;
      }
      if (passwordTyped !== password) {
        actions.update_password = password;
      }
    
    }
    updateUserCredentials({ user: user, actions: actions }).then(async (response) => {

      if (response.status === 200) {
        if (actions.hasOwnProperty("username") || actions.hasOwnProperty("password")) {
          await saveValueSecure(username, passwordTyped, "userPass");
        }
        navigation.navigate("UserProfile");
      } else {
        ToastAndroid.show("Something went wrong updating the info on the server.", ToastAndroid.SHORT);
      }

      setLoading(false);
    });
  }

  return (
    <LinearGradient colors={["#06181d", "#02223d"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <GoBack text={"Go back to Profile"} handleBackTo={handleBackTo} />
        </View>
        <LinearGradient
          colors={["#1f2f34", "#283E45"]}
          style={styles.cardBackground}
        >
          <View style={styles.content}>
            <View style={styles.profileContainer}>
              <MCIIcon name="account-circle" size={responsiveSize / 5} color="#ffffff" style={styles.profileIcon} />
              <GradientButton 
                text={"Delete Account"}
                onPress={() => setShowAccountAlert(true)}
                colors={["#1f2f34", "#3e5158"]}
                textStyle={styles.buttonTextStyle}
                buttonStyle={{marginRight: 5}}
              />
            </View>
            <View>
              <Text style={styles.title}>First Name</Text>
              <TextInput
                style={styles.textInput}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter First Name"
                placeholderTextColor={"#6a7477"}
              />
              <Text style={styles.title}>Last Name</Text>
              <TextInput
                style={styles.textInput}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter Last Name"
                placeholderTextColor={"#6a7477"}
              />
              <Text style={styles.title}>Username</Text>
              <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter Username"
                placeholderTextColor={"#6a7477"}
              />
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email"
                placeholderTextColor={"#6a7477"}
              />
              <View style={styles.passwordContainer} >
                <View style={styles.passwordContent}>
                <Text style={styles.title}>Password</Text>
                <TextInput
                  style={{...styles.textInput, marginBottom: 10}}
                  value={passwordTyped}
                  onChangeText={setPasswordTyped}
                  placeholder="************"
                  placeholderTextColor={"#ffffff"}
                  secureTextEntry={true}
                />
                </View>
                <View style={{...styles.passwordContent, width: "55%", marginLeft: 10}}>
                <Text style={styles.title}>Retype Password</Text>
                <TextInput
                  style={{...styles.textInput, marginBottom: 10}}
                  value={retypePasswordTyped}
                  onChangeText={setRetypePasswordTyped}
                  placeholder="************"
                  placeholderTextColor={"#ffffff"}
                  secureTextEntry={true}
                />
                </View>
              </View>
            </View>
          </View>
          <GradientButton 
            text={"Save Changes"} 
            onPress={handleSave} 
            colors={["#1f2f34", "#3e5158"]} 
            textStyle={{...styles.buttonTextStyle, color: "#ffffff"}}
            buttonStyle={{marginBottom: 5}}
          />
        </LinearGradient>
      </ScrollView>
      <LoadingIndicator visible={loading} onClose={() => setLoading(false)} text={"Loading..."} />
      <ErrorAlert visible={showPasswordAlert} close={setShowPasswordAlert} alertTitle={"Error"} alertText={"Passwords do not match."} />
      <ConfirmAlert visible={showAccountAlert} close={setShowAccountAlert} confirm={handleDelete} alertTitle={"Confirm"} alertText={"Are you sure you want to delete your account?"} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    alignItems: "center",
    flexGrow: 1,
  },
  header: {
    width: "100%",
    marginTop: 5,
  },
  cardBackground: {
    minWidth: "92%",
    maxWidth: "92%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileIcon: {
    alignSelf: "center",
  },
  buttonTextStyle: {
    fontSize: responsiveSize / 35,
    fontFamily: "Montserrat-Bold",
    color: "#ff0000",
  },
  title: {
    fontSize: responsiveSize / 35,
    fontFamily: "Montserrat-Bold",
    color: "#d6e4ff",
  },
  textInput: {
    color: "#ffffff",
    fontSize: responsiveSize / 35,
    fontFamily: "Montserrat-Medium",
    borderBottomWidth: 1,
    borderBottomColor: "#999999",
    paddingBottom: 10,
    marginBottom: 25,
  },
  passwordContainer: {
    flexDirection: "row",
  },
  passwordContent: {
    flexDirection: "column",
    width: "45%",
  },
});

export default UserProfileEdit;