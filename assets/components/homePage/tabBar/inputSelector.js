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
import deleteValue from "../../../utils/deleteValue";
import loadValue from "../../../utils/loadValue";
import saveValue from "../../../utils/saveValue";
import formatDate from "../../../utils/getDate";
import sortFilesByDate from "../../../utils/sortDates";
import readJSON from "../../../utils/readJSONFromDevice";
import saveJSON from "../../../utils/saveJSONToDevice";
import saveVideo from "../../../utils/saveVideoToDevice";
import { LinearGradient } from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import GradientImagedButton from "./gradintImageButton";
import LoadingIndicator from "../../common/activityIndicatorModal";
import ErrorAlert from "../../common/errorAlert";
import listDir from "../../../utils/listSortedFilesFromDirectory";
import deleteDirectory from "../../../utils/deleteDirectoryFromDevice";

const responsiveSize =
  (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const InputSelector = ({ navigation, close, currentService, 
                        currentProcessingType, analyticsData={analyticsData}, 
                        setAnalyticsData={setAnalyticsData}}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const [showCreditAlert, setShowCreditAlert] = useState(false);

  // For testing purposes
  React.useEffect(() => {
    // deleteDirectory("unsent");
    // console.log(readJSON(`unsent/${currentService}`, formatDate()));
    // console.log(analyticsData);
  }, []);

  const handleInference = async (video) => {

    setLoading(true);

    const { username, password } = await loadValueSecure("userPass");

    return await inference({ username_or_email: username, password: password, service_type: currentService }, video);
  };

  const handleLogout = async () => {
    setShowCreditAlert(false);
    Promise.all([deleteValue("isLoggedIn"), deleteValue("firstName"), deleteValue("lastName"), deleteValue("username"),
                 deleteValue("email"), deleteValue("plan"), deleteValue("credit")]).then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
    );
  };

  const handleNewData = async (response) => {
    const lsDir = await listDir(`unsent/${currentService}`);
    if (lsDir !== null) {
      if (lsDir.includes(`${formatDate()}.json`)) {
        const latestData = await readJSON(`unsent/${currentService}`, formatDate());
        latestData[response.data.result.toLowerCase()] += 1;
        console.log("Exists")
        await saveJSON(`unsent/${currentService}`, formatDate(), latestData);
        const temp = {...analyticsData};
        temp[formatDate()] = latestData;
        setAnalyticsData(temp);
        console.log(analyticsData)
      }
    } else {
      sortedDataDates = sortFilesByDate(Object.keys(analyticsData));
      const latestData = analyticsData[sortedDataDates[sortedDataDates.length - 1]];
      console.log("Doesn't exist")
      console.log(latestData)
      latestData[response.data.result.toLowerCase()] += 1;
      await saveJSON(`unsent/${currentService}`, formatDate(), latestData);
      const temp = {...analyticsData};
      temp[formatDate()] = latestData;
      setAnalyticsData(temp);
      console.log(analyticsData)
    }
  }

  const handleCredit = async (video) => {
    if (await loadValue("credit") === null) {
      const { username, password } = await loadValueSecure("userPass");
      const response = await userInfo({ username_or_email: username, password: password });
      if (response.status === 200) {
        if (response.data.data.credit === 0) {
          setShowCreditAlert(true);
          return;
        }
        await saveValue("credit", String(response.data.data.credit - 1));
        setResult("Healthy");
        setAlertVisible(true);
        const lsDir = await listDir(`unsent/${currentService}`);
        if (lsDir !== null) {
          if (lsDir.includes(`${formatDate()}.json`)) {
            const latestData = await readJSON(`unsent/${currentService}`, formatDate());
            latestData["healthy"] += 1;
            console.log("Exists")
            await saveJSON(`unsent/${currentService}`, formatDate(), latestData);
            const temp = {...analyticsData};
            temp[formatDate()] = latestData;
            setAnalyticsData(temp);
            console.log(analyticsData)
          }
        } else {
          sortedDataDates = sortFilesByDate(Object.keys(analyticsData));
          const latestData = analyticsData[sortedDataDates[sortedDataDates.length - 1]];
          console.log("Doesn't exist")
          console.log(latestData)
          latestData["healthy"] += 1;
          await saveJSON(`unsent/${currentService}`, formatDate(), latestData);
          const temp = {...analyticsData};
          temp[formatDate()] = latestData;
          setAnalyticsData(temp);
          console.log(analyticsData)
        }
        ToastAndroid.show("This option is not available yet. Showing a dummy result.", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Something went wrong getting the credit. You must connect to the internet for the initial configurations", ToastAndroid.SHORT);
      }
    } else {
      const creditLoaded = parseInt(await loadValue("credit"));
      if (creditLoaded !== 0) {
        setResult("Healthy");
        setAlertVisible(true);
        await saveValue("credit", String(creditLoaded - 1));
        const lsDir = await listDir(`unsent/${currentService}`);
        if (lsDir !== null) {
          if (lsDir.includes(`${formatDate()}.json`)) {
            const latestData = await readJSON(`unsent/${currentService}`, formatDate());
            latestData["healthy"] += 1;
            console.log("Exists")
            await saveJSON(`unsent/${currentService}`, formatDate(), latestData);
            const temp = {...analyticsData};
            temp[formatDate()] = latestData;
            setAnalyticsData(temp);
            console.log(analyticsData)
          }
        } else {
          sortedDataDates = sortFilesByDate(Object.keys(analyticsData));
          const latestData = analyticsData[sortedDataDates[sortedDataDates.length - 1]];
          console.log("Doesn't exist")
          console.log(latestData)
          latestData["healthy"] += 1;
          await saveJSON(`unsent/${currentService}`, formatDate(), latestData);
          const temp = {...analyticsData};
          temp[formatDate()] = latestData;
          setAnalyticsData(temp);
          console.log(analyticsData)
        }
        ToastAndroid.show("This option is not available yet. Showing a dummy result.", ToastAndroid.SHORT);
      } else {
        setShowCreditAlert(true);
      }
    }
  
    // if (currentProcessingType === "Device" && result) {
    //   const folderName = "unsent/videos";
    //   const fileName = `${currentService}_${result}_${new Date().getTime()}_${Math.random()}`;

    //   await saveVideo(folderName, fileName, video);
    // }
  };


  const handleVideoSave = async (video) => {
    const folderName = "unsent/videos";
    const fileName = `${currentService}_${result}_${new Date().getTime()}_${Math.random()}`;

    await saveVideo(folderName, fileName, video, verbose=true);
  };


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
              handleNewData(response);
            } else if (response.message == "No credits left") {
              setShowCreditAlert(true);
            } else {
              ToastAndroid.show("Something went wrong uploading the video. Please check your connection", ToastAndroid.SHORT);
            }
          });
        } else if (currentProcessingType === "Device") {
          handleCredit(response.assets[0].uri).then(() => {
            handleVideoSave(response.assets[0].uri);
          });
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
              handleNewData(response);
            } else if (response.message == "No credits left") {
              setShowCreditAlert(true);
            } else {
              ToastAndroid.show("Something went wrong uploading the video. Please check your connection", ToastAndroid.SHORT);
            }
          });
        } else if (currentProcessingType === "Device") {
          handleCredit(response.assets[0].uri).then(() => {
            handleVideoSave(response.assets[0].uri);
          });
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
      <ErrorAlert
        visible={showCreditAlert}
        close={handleLogout}
        alertTitle={"No credits left!"}
        alertText={
          `You have no credits left. Please buy more credits. Logging Out!`
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