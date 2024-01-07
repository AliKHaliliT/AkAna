import React, { useState } from "react";
import { Dimensions, ToastAndroid, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import loadValue from "../utils/loadValue";
import loadValueSecure from "../utils/loadValueSecure";
import updateCredit from "../api/updateCredit";
import userInfo from "../api/userInfo";
import saveValue from "../utils/saveValue";
import updateRecharged from "../api/updateRecharged";
import deleteValue from "../utils/deleteValue";
import listDir from "../utils/listSortedFilesFromDirectory";
import deleteDirectory from "../utils/deleteDirectoryFromDevice";
import { LinearGradient } from "react-native-linear-gradient";
import GoBack from "../components/common/goBackButtonWithText";
import Icon from "react-native-vector-icons/FontAwesome6";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DetailCard from "../components/userProfile/detailCard";
import GradientButton from "../components/common/gradientButton";
import LoadingIndicator from "../components/common/activityIndicatorModal";
import ConfirmAlert from "../components/common/confirmAlert";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const UserProfile = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("Canis");
  const [lastName, setLastName] = useState("Lupus");
  const [username, setUsername] = useState("canislupus");
  const [email, setEmail] = useState("canislupus@akana.com");
  const [plan, setPlan] = useState("Platinum");
  const [credit, setCredit] = useState("999");
  const [showSyncStatusAlert, setShowSyncStatusAlert] = useState(false);
  const [showMultipleConfirmText, setShowMultipleConfirmText] = useState('');

  const getUserInfoFromAsyncStorage = async () => {
    const [
      asyncStorageFirstName,
      asyncStorageLastName,
      asyncStorageUsername,
      asyncStorageEmail,
      asyncStoragePlan,
      asyncStorageCredit
    ] = await Promise.all([
      loadValue("firstName"),
      loadValue("lastName"),
      loadValue("username"),
      loadValue("email"),
      loadValue("plan"),
      loadValue("credit")
    ]);
  
    if (asyncStorageFirstName) setFirstName(asyncStorageFirstName);
    if (asyncStorageLastName) setLastName(asyncStorageLastName);
    if (asyncStorageUsername) setUsername(asyncStorageUsername);
    if (asyncStorageEmail) setEmail(asyncStorageEmail);
    if (asyncStoragePlan) setPlan(asyncStoragePlan);
    if (asyncStorageCredit) setCredit(asyncStorageCredit);
  };
  
  const updateUserInfo = async () => {
    const userPass = await loadValueSecure("userPass");
  
    try {
      
      if (await loadValue("credit") === null) {
        const responseGetCredit = await userInfo({ username_or_email: userPass.username, password: userPass.password });
        if (responseGetCredit.status === 200) {
          await saveValue("credit", String(responseGetCredit.data.data.credit));
        }
      }

      const responseGetCredit = await userInfo({ username_or_email: userPass.username, password: userPass.password });

      try {
        if (responseGetCredit.data.data.recharged === true) {
          await updateRecharged({ username_or_email: userPass.username })
          await saveValue("credit", String(responseGetCredit.data.data.credit));
        } 
      } catch (error) {
        ToastAndroid.show("Something went wrong retrieving the info from the server.", ToastAndroid.SHORT);
      }

      if (responseGetCredit.status === 200) {
        const updateCreditPayload = {
          user: {
            username_or_email: userPass.username,
            password: userPass.password,
          },
          credit: {
            credit: responseGetCredit.data.data.credit > parseInt(await loadValue("credit")) ? parseInt(await loadValue("credit")) : responseGetCredit.data.data.credit,
          },
        };

        await updateCredit(updateCreditPayload);
      } else {
        ToastAndroid.show("Something went wrong retrieving the info from the server.", ToastAndroid.SHORT);
      }
      
      const response = await userInfo({ username_or_email: userPass.username, password: userPass.password });
  
      if (response.status === 200) {
        if (response.data.data.first_name !== firstName) {
          setFirstName(response.data.data.first_name);
          saveValue("firstName", response.data.data.first_name);
        }
        if (response.data.data.last_name !== lastName) {
          setLastName(response.data.data.last_name);
          saveValue("lastName", response.data.data.last_name);
        }
        if (response.data.data.username !== username) {
          setUsername(response.data.data.username);
          saveValue("username", response.data.data.username);
        }
        if (response.data.data.email !== email) {
          setEmail(response.data.data.email);
          saveValue("email", response.data.data.email);
        }
        if (response.data.data.plan !== plan) {
          setPlan(response.data.data.plan);
          saveValue("plan", response.data.data.plan);
        }
        if (String(response.data.data.credit) !== credit) {
          setCredit(String(response.data.data.credit));
          saveValue("credit", String(response.data.data.credit));
        }
      } else {
        ToastAndroid.show("Something went wrong retrieving the info from the server.", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Something went wrong retrieving the info from the server.", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
  
      getUserInfoFromAsyncStorage().then(() => {
        updateUserInfo();
      });
  
    }, [])
  );  

  const handleBackTo = () => {
    navigation.navigate("DrawerNavigator");
  };

  const handleEditProfile = () => {
    navigation.navigate("UserProfileEdit");
  }

  const handleSyncStatus = async () => {
    const lsDir = await listDir("unsent");
    if (lsDir !== null) {
      if (lsDir.length > 0) {
        setShowSyncStatusAlert(true);
        setShowMultipleConfirmText(`You have unsynced files. If you logout, they will be deleted. Are you sure you want to logout?`);
      } else {
        setShowSyncStatusAlert(true);
        setShowMultipleConfirmText(`Are you sure you want to logout?`);
      }
    } else {
      setShowSyncStatusAlert(true);
      setShowMultipleConfirmText(`Are you sure you want to logout?`);
    }
  };

  const handleLogout = async () => {
    await deleteDirectory("unsent");
    Promise.all([deleteValue("isLoggedIn"), deleteValue("firstName"), deleteValue("lastName"), deleteValue("username"),
                 deleteValue("email"), deleteValue("plan"), deleteValue("credit")]).then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
    );
  };

  return (
    <LinearGradient colors={["#06181d", "#02223d"]} style={styles.container}>
      <View style={styles.header}>
        <GoBack text={"Go back to Home"} handleBackTo={handleBackTo} />
      </View>
      <View style={styles.content}>
        <LinearGradient
          colors={["#1f2f34", "#283E45"]}
          style={styles.cardBackground}
        >
          <View style={styles.profileContainer}>
            <MCIIcon name="account-circle" size={responsiveSize / 5} color="#ffffff" />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.commonTextBold} numberOfLines={1} ellipsizeMode="tail">{`${firstName}`}</Text>
              <Text style={styles.commonTextBold} numberOfLines={1} ellipsizeMode="tail">{`${lastName}`}</Text>
              <Text style={{ ...styles.commonTextBold, fontSize: responsiveSize / 35, fontFamily: "Montserrat-Medium" }}>{`@${username}`}</Text>
            </View>
          </View>
          <DetailCard iconName="email" title="Email" description={email} />
          <DetailCard iconName="money-check" title="Plan" description={plan} IconComponent={Icon} />
          <DetailCard iconName="credit-card" title="Credit" description={credit} IconComponent={Icon} containerStyle={{}}/>
        </LinearGradient>
        {/* Unfinished feature - A placeholder for generating api token*/}
        {/* <LinearGradient 
          colors={["#1f2f34", "#283E45"]}
          style={styles.apiTokenContainer}
        >
          <TouchableOpacity>
            <LinearGradient
              colors={["red", "#283E45"]}
              style={styles.apiTitle}
            >
              <Text style={styles.apiText}>{"Token >>"}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.apiText} numberOfLines={1} ellipsizeMode="tail">bkbahbfabbfbabdsdsdsadasdasfb</Text>
          </View>
          <TouchableOpacity>
            <LinearGradient
              colors={["orange", "#283E45"]}
              style={styles.apiTitle}
            >
              <Text style={styles.apiText}>Generate</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient> */}
        <View style={styles.editAndLogoutContainer}>
          <GradientButton 
            text={"Edit Profile"} 
            onPress={handleEditProfile} 
            colors={["#1f2f34", "#3e5158"]}
            textStyle={styles.buttonTextStyle}
            buttonStyle={{flex: 1, marginLeft: 5, marginRight: 5}}
          />
          <GradientButton 
            text={"Logout"} 
            onPress={handleSyncStatus} 
            colors={["#1f2f34", "#3e5158"]} 
            textStyle={{...styles.buttonTextStyle, color: "#ff0000"}}
            buttonStyle={{flex: 1, marginLeft: 5, marginRight: 5}}
          />
        </View>
      </View>
      <LoadingIndicator visible={loading} onClose={() => setLoading(false)} text={"Loading..."} />
      <ConfirmAlert visible={showSyncStatusAlert} close={setShowSyncStatusAlert} confirm={handleLogout} alertTitle={"Confirm"} alertText={showMultipleConfirmText} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  commonTextBold: {
    fontSize: responsiveSize / 30,
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
    marginLeft: 20,
    minWidth: "70%",
    maxWidth: "70%",
  },
  cardBackground: {
    padding: 16,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  apiTokenContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 20
  },
  apiTitle: {
    minWidth: "20%", 
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  apiText: {
    fontSize: responsiveSize / 40,
    fontFamily: "Montserrat-Medium",
    color: "#ffffff",
    marginLeft: 10,
    marginRight: 10,
  },
  editAndLogoutContainer: {
    flexDirection: "row",
  },
  buttonTextStyle: {
    fontSize: responsiveSize / 35,
    fontFamily: "Montserrat-Bold",
    color: "#ffffff",
  },
});

export default UserProfile;