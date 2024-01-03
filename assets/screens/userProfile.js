import React, { useState, useEffect } from "react";
import { Dimensions, ToastAndroid, View, Text, StyleSheet } from "react-native";
import loadValueSecure from "../utils/loadValueSecure";
import loadValue from "../utils/loadValue";
import userInfo from "../api/userInfo";
import saveValue from "../utils/saveValue";
import deleteValue from "../utils/deleteValue";
import { LinearGradient } from "react-native-linear-gradient";
import GoBack from "../components/common/goBackButtonWithText";
import Icon from "react-native-vector-icons/FontAwesome6";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DetailCard from "../components/userProfile/detailCard";
import GradientButton from "../components/common/gradientButton";
import LoadingIndicator from "../components/common/activityIndicatorModal";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const UserProfile = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("Canis");
  const [lastName, setLastName] = useState("Lupus");
  const [username, setUsername] = useState("canislupus");
  const [email, setEmail] = useState("canislupus@akana.com");
  const [plan, setPlan] = useState("Platinum");
  const [credit, setCredit] = useState("999");

    // In order to trigger a re-render when the screen gains focus (navigated to) again. 
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        console.log('Screen UserProfile gained focus again');
      });
      return unsubscribe;
    }, [navigation]);

  useEffect(() => {

    setLoading(true);

    const getUserInfo = async () => {

      if (Promise.all([loadValue("firstName"), loadValue("lastName"), loadValue("username"), 
                      loadValue("email"), loadValue("plan"), loadValue("credit")])) {
        var [asyncStorageFirstName, asyncStorageLastName, asyncStorageUsername, 
              asyncStorageEmail, asyncStoragePlan, asyncStorageCredit] = await Promise.all(
                                                                                          [loadValue("firstName"), loadValue("lastName"), 
                                                                                          loadValue("username"), loadValue("email"), 
                                                                                          loadValue("plan"), loadValue("credit")]
                                                                                          );
        setFirstName(asyncStorageFirstName);
        setLastName(asyncStorageLastName);
        setUsername(asyncStorageUsername);
        setEmail(asyncStorageEmail);
        setPlan(asyncStoragePlan);
        setCredit(asyncStorageCredit);
      } else {
        var asyncStorageFirstName, asyncStorageLastName, asyncStorageUsername,
            asyncStorageEmail, asyncStoragePlan, asyncStorageCredit
      }

      const { username, password } = await loadValueSecure("userPass");
      userInfo({ username_or_email: username, password: password }).then((response) => {
      
        if (response.status === 200) {

          if (response.data.data.first_name !== asyncStorageFirstName) {
            setFirstName(response.data.data.first_name);
            saveValue("firstName", response.data.data.first_name)
          }
          if (response.data.data.last_name !== asyncStorageLastName) {
            setLastName(response.data.data.last_name);
            saveValue("lastName", response.data.data.last_name);
          }
          if (response.data.data.username !== asyncStorageUsername) {
            setUsername(response.data.data.username);
            saveValue("username", response.data.data.username);
          }
          if (response.data.data.email !== asyncStorageEmail) {
            setEmail(response.data.data.email);
            saveValue("email", response.data.data.email);
          }
          if (response.data.data.plan !== asyncStoragePlan) {
            setPlan(response.data.data.plan);
            saveValue("plan", response.data.data.plan);
          }
          if (String(response.data.data.credit) !== asyncStorageCredit) {
            setCredit(String(response.data.data.credit));
            saveValue("credit", String(response.data.data.credit));
          }

        } else {
          ToastAndroid.show("Something went wrong retrieving the info from the server.", ToastAndroid.SHORT);
        }

        setLoading(false);
      });
    }
    getUserInfo();
  }, []);

  const handleBackTo = () => {
    navigation.navigate("Home");
  };

  const handleEditProfile = () => {
    navigation.navigate("UserProfileEdit");
  }

  const handleLogout = () => {
    deleteValue("isLoggedIn").then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    });
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
              onPress={handleLogout} 
              colors={["#1f2f34", "#3e5158"]} 
              textStyle={{...styles.buttonTextStyle, color: "#ff0000"}}
              buttonStyle={{flex: 1, marginLeft: 5, marginRight: 5}}
            />
        </View>
      </View>
      <LoadingIndicator visible={loading} onClose={() => setLoading(false)} text={"Loading..."} />
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
    paddingHorizontal: 10,
    height: "90%",
    width: "100%",
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