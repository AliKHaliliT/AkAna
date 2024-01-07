import React, { useState, useEffect } from "react";
import { Dimensions, ToastAndroid, ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import loadValue from "../utils/loadValue";
import loadValueSecure from "../utils/loadValueSecure";
import deleteAccount from "../api/deleteAccount";
import deleteValue from "../utils/deleteValue";
import deleteValueSecure from "../utils/deleteValueSecure";
import listDir from "../utils/listSortedFilesFromDirectory";
import RNFetchBlob from "rn-fetch-blob";
import deleteDirectory from "../utils/deleteDirectoryFromDevice";
import updateUserCredentials from "../api/updateUserCredentials";
import saveValueSecure from "../utils/saveValueSecure";
import { LinearGradient } from "react-native-linear-gradient";
import GoBack from "../components/common/goBackButtonWithText";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GradientButton from "../components/common/gradientButton";
import LoadingIndicator from "../components/common/activityIndicatorModal";
import ErrorAlert from "../components/common/errorAlert";
import ConfirmAlert from "../components/common/confirmAlert";
import saveValue from "../utils/saveValue";


const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const UserProfileEdit = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("Canis");
  const [firstNameLoaded, setFirstNameLoaded] = useState('');
  const [lastName, setLastName] = useState("Lupus");
  const [lastNameLoaded , setLastNameLoaded] = useState('');
  const [usernameTyped, setUsernameTyped] = useState("canislupus");
  const [usernameLoaded, setUsernameLoaded] = useState('');
  const [emailTyped, setEmailTyped] = useState("canislupus@akana.com");
  const [emailLoaded, setEmailLoaded] = useState('');
  const [showAccountAlert, setShowAccountAlert] = useState(false);
  const [passwordTyped, setPasswordTyped] = useState('');
  const [retypePasswordTyped, setRetypePasswordTyped] = useState('');
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);

  const getUserInfoFromAsyncStorage = async () => {
    try {
      const [
        asyncStorageFirstName,
        asyncStorageLastName,
        asyncStorageUsername,
        asyncStorageEmail
      ] = await Promise.all([
        loadValue("firstName"),
        loadValue("lastName"),
        loadValue("username"),
        loadValue("email")
      ]);
  
      if (asyncStorageFirstName) {
        setFirstName(asyncStorageFirstName);
        setFirstNameLoaded(asyncStorageFirstName);
      }
      if (asyncStorageLastName) {
        setLastName(asyncStorageLastName);
        setLastNameLoaded(asyncStorageLastName);
      }
      if (asyncStorageUsername) {
        setUsernameTyped(asyncStorageUsername);
        setUsernameLoaded(asyncStorageUsername);
      }
      if (asyncStorageEmail) {
        setEmailTyped(asyncStorageEmail);
        setEmailLoaded(asyncStorageEmail);
      }
  
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error loading user info from AsyncStorage.", error);
    }
  };
  
  useEffect(() => {
    setLoading(true);
    getUserInfoFromAsyncStorage();
  }, []);
  

  const handleBackTo = () => {
    navigation.navigate("UserProfile");
  };

  const handleDelete = async () => {
    try {
      setShowAccountAlert(false);
      setLoading(true);
  
      const { username, password } = await loadValueSecure("userPass");
  
      const response = await deleteAccount({ username_or_email: username, password: password });
  
      if (response.status === 200) {
        const lsDir = await listDir(RNFetchBlob.fs.dirs.DocumentDir);
        if (lsDir !== null && lsDir.length > 0) {
          await Promise.all(lsDir.map(async (file) => {
            await deleteDirectory(file);
          }));
        }
        await Promise.all([
          deleteValue("firstName"),
          deleteValue("lastName"),
          deleteValue("username"),
          deleteValue("email"),
          deleteValue("isLoggedIn"),
          deleteValueSecure("userPass")
        ]);
  
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        ToastAndroid.show("Something went wrong deleting the account on the server.", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      ToastAndroid.show("Something went wrong during account deletion.", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };  

  const handleSave = async () => {
    try {
      setLoading(true);
  
      const userPass = await loadValueSecure("userPass");
      const user = { username_or_email: userPass.username, password: userPass.password };
      const actions = {};
  
      if (firstName.trim() !== firstNameLoaded) {
        actions.update_first_name = firstName.trim();
        saveValue("firstName", firstName.trim());
      }
      if (lastName.trim() !== lastNameLoaded) {
        actions.update_last_name = lastName.trim();
        saveValue("lastName", lastName.trim());
      }
      if (usernameTyped.trim() !== usernameLoaded) {
        actions.update_username = usernameTyped.trim();
        await Promise.all([
          saveValueSecure(usernameTyped.trim(), userPass.password, "userPass"),
          saveValue("username", usernameTyped.trim())
        ]);
      }
      if (emailTyped.trim() !== emailLoaded) {
        actions.update_email = emailTyped.trim();
        saveValue("email", emailTyped.trim());
      }
      if (passwordTyped.trim() !== '') {
        if (passwordTyped.trim() !== retypePasswordTyped.trim()) {
          setLoading(false);
          setShowPasswordAlert(true);
          return;
        }
        if (passwordTyped.trim() !== userPass.password) {
          actions.update_password = passwordTyped.trim();
          if (usernameTyped.trim() !== usernameLoaded) {
            await Promise.all([
              saveValueSecure(usernameTyped.trim(), passwordTyped.trim(), "userPass"),
              saveValue("password", passwordTyped.trim())
            ]);
          } else {
            await Promise.all([
              saveValueSecure(userPass.username, passwordTyped.trim(), "userPass"),
              saveValue("password", passwordTyped.trim())
            ]);
          }
        }
      }
  
      const response = await updateUserCredentials({ user: user, actions: actions });
  
      if (response.status === 200) {
        if (actions.hasOwnProperty("username") || actions.hasOwnProperty("password")) {
          await saveValueSecure(userPass.username, passwordTyped.trim(), "userPass");
        }
        navigation.navigate("UserProfile");
      } else {
        ToastAndroid.show("Something went wrong updating the info on the server.", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      ToastAndroid.show("Something went wrong during the update.", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  

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
                value={usernameTyped}
                onChangeText={setUsernameTyped}
                placeholder="Enter Username"
                placeholderTextColor={"#6a7477"}
              />
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={emailTyped}
                onChangeText={setEmailTyped}
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