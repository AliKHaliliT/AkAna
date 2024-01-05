import React, { useState } from "react";
import {
  Dimensions,
  ToastAndroid,
  PermissionsAndroid,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import loadValueSecure from "../../../utils/loadValueSecure";
import inference from "../../../api/inference";
import userInfo from "../../../api/userInfo";
import loadValue from "../../../utils/loadValue";
import saveValue from "../../../utils/saveValue";
import { LinearGradient } from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import GradientImagedButton from "./gradintImageButton";
import LoadingIndicator from "../../common/activityIndicatorModal";
import ErrorAlert from "../../common/errorAlert";

const responsiveSize =
  (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const InputSelector = ({ close, currentService, currentProcessingType }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [alertVisible, setAlertVisible] = useState(false);

  const handleInference = async (video) => {

    setLoading(true);

    const { username, password } = await loadValueSecure("userPass");

    return await inference({ username_or_email: username, password: password, service_type: currentService }, video);
  };

  handleCredit = async () => {
      if (await loadValue("credit") === null) {
      const { username, password } = await loadValueSecure("userPass");
      const response = await userInfo({ username_or_email: username, password: password });
      if (response.status === 200) {
        await saveValue("credit", String(response.data.data.credit - 1));
        setResult("Healthy");
        setAlertVisible(true);
        ToastAndroid.show("This option is not available yet. Showing a dummy result.", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Something went wrong getting the credit. You must connect to the internet for the intial configurations", ToastAndroid.SHORT);
      }
    } else {
      setResult("Healthy");
      setAlertVisible(true);
      await saveValue("credit", String(parseInt(await loadValue("credit")) - 1));
      ToastAndroid.show("This option is not available yet. Showing a dummy result.", ToastAndroid.SHORT);
    }
  }


  const launchCameraHandler = async () => {

    ImagePicker.launchCamera(
      {
        mediaType: "video",
        includeBase64: false,
        maxWidth: 172,
        maxHeight: 172,
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else if (currentProcessingType === "Server"){
          handleInference(response.assets[0].uri).then((response) => {
            setLoading(false);
            if (response.status === 200) {
              console.log(response.data);
              setResult(response.data.result);
              setAlertVisible(true);
            } else {
              ToastAndroid.show("Something went wrong uploading the video. Please check your connection", ToastAndroid.SHORT);
            }
          });
        } else if (currentProcessingType === "Device") {
          handleCredit();
        }
      }
    );
  };

  const requestCameraPermission = async () => {
    try {
      const grantedCamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      const grantedStorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED && grantedStorage === PermissionsAndroid.RESULTS.GRANTED) {
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
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else if (currentProcessingType === "Server") {
          handleInference(response.assets[0].uri).then((response) => {
            setLoading(false);
            if (response.status === 200) {
              console.log(response.data);
              setResult(response.data.result);
              setAlertVisible(true);
            } else {
              ToastAndroid.show("Something went wrong uploading the video. Please check your connection", ToastAndroid.SHORT);
            }
          });
        } else if (currentProcessingType === "Device") {
          handleCredit();
        }
      }
    );
  };

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchImageLibraryHandler();
      } else {
        console.log("Storage permission denied");
      }
    }
    catch (err) {
      console.warn(err);
    }
  }

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
            onPress={requestGalleryPermission}
            iconSource={require("../../../img/galleryIcon.png")}
            buttonText={"Gallery"}
          />
        </View>
      </LinearGradient>
      <LoadingIndicator visible={loading} onClose={() => setLoading(false)} text={"Uploading..."} />
      <ErrorAlert
        visible={alertVisible}
        close={setAlertVisible}
        alertTitle={"Upload was successfull!"}
        alertText={
          `Your video has been uploaded successfully. The result you for your video using ${currentService} model was ${result}. You can view all of the results in the analytics tab. `
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