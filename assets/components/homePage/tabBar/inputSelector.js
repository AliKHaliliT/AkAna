import React, { useState } from "react";
import {
  Dimensions,
  PermissionsAndroid,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { LinearGradient } from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import GradientImagedButton from "./gradintImageButton";
import ErrorAlert from "../../common/errorAlert";

const responsiveSize =
  (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const InputSelector = ({ close }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const launchCameraHandler = () => {
    ImagePicker.launchCamera(
      {
        mediaType: "video",
        includeBase64: false,
        maxWidth: 172,
        maxHeight: 172,
      },
      (response) => {
        setModalVisible(true);
      }
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "AkAna App Camera Permission",
          message: "AkAna App needs access to your camera",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCameraHandler();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const launchImageLibraryHandler = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "video",
        includeBase64: false,
        maxHeight: 172,
        maxWidth: 172,
      },
      (response) => {
        setModalVisible(true);
      }
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#06181d", "#02223d"]} style={styles.background}>
        <View style={styles.topHalf}>
          <TouchableOpacity onPress={() => close(false)}>
            <Icon name={"close"} size={responsiveSize / 15} color={"#ffffff"} />
          </TouchableOpacity>
          <Text style={styles.topHalfText}>Please select an option:</Text>
        </View>
        <View style={styles.bottomHalf}>
          <GradientImagedButton
            onPress={requestCameraPermission}
            iconSource={require("../../../img/cameraIcon.png")}
            buttonText={"Camera"}
          />
          <GradientImagedButton
            onPress={launchImageLibraryHandler}
            iconSource={require("../../../img/galleryIcon.png")}
            buttonText={"Gallery"}
          />
        </View>
      </LinearGradient>
      <ErrorAlert
        visible={modalVisible}
        close={setModalVisible}
        alertTitle={"Thanks!"}
        alertText={
          "Thank you for choosing this service. This feature is currently under development. Please check back later."
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  background: {
    padding: 20,
    height: "50%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  topHalf: {
    width: "100%",
    height: "30%",
    alignItems: "flex-end",
  },
  topHalfText: {
    fontSize: responsiveSize / 27,
    color: "#ffffff",
    fontFamily: "Montserrat-Medium",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  bottomHalf: {
    width: "100%",
    height: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default InputSelector;