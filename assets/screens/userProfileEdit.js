import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import loadValue from "../utils/loadValue";
import saveValue from "../utils/saveValue";
import { LinearGradient } from "react-native-linear-gradient";
import GoBack from "../components/common/goBackButtonWithText";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GradientButton from "../components/common/gradientButton";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const UserProfileEdit = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    loadValue("firstName").then((savedFirstName) => {
      setFirstName(savedFirstName);
    });
    loadValue("lastName").then((savedLastName) => {
      setLastName(savedLastName);
    });
    loadValue("userName").then((savedUsername) => {
      setUsername(savedUsername);
    });
    loadValue("email").then((savedEmail) => {
      setEmail(savedEmail);
    });
  }, []);

  const handleSave = () => {
    saveValue("firstName", firstName);
    saveValue("lastName", lastName);
    saveValue("userName", username);
    saveValue("email", email);
    if (password) {
      saveValue("password", password);
    }
    navigation.navigate("UserProfile");
  };

  const handleBackTo = () => {
    navigation.navigate("UserProfile");
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
          <View style={styles.profileContainer}>
            <MCIIcon name="account-circle" size={responsiveSize / 5} color="#ffffff" style={styles.profileIcon} />
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
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={{...styles.textInput, marginBottom: 10}}
                value={password}
                onChangeText={setPassword}
                placeholder="************"
                placeholderTextColor={"#ffffff"}
                secureTextEntry={true}
              />
            </View>
          </View>
          <GradientButton 
            text={"Save Changes"} 
            onPress={handleSave} 
            colors={["#1f2f34", "#3e5158"]} 
            textStyle={{fontSize: responsiveSize / 35,
                         fontFamily: "Montserrat-Bold",
                         color: "#4cbb17"}}
            buttonStyle={{marginBottom: 5}}
          />
        </LinearGradient>
      </ScrollView>
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
  },
  cardBackground: {
    minWidth: "90%",
    maxWidth: "90%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileIcon: {
    alignSelf: "center",
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
    borderBottomColor: "#ffffff",
    paddingBottom: 10,
    marginBottom: 25,
  },
});

export default UserProfileEdit;
