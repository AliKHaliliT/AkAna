import React, { useState, useRef } from "react";
import { Dimensions, ToastAndroid, RefreshControl, ScrollView, Image, View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import getRandomPosition from "../utils/randomPositionGenerator";
import backgroundDecorations from "../utils/decorations";
import loadValueSecure from "../utils/loadValueSecure";
import listDir from "../utils/listSortedFilesFromDirectory";
import sendUserLamenessDetectionData from "../api/sendLamenessDetectionData";
import deleteFile from "../utils/deleteFileFromDevice";
import uploadVideo from "../api/uploadVideo";
import RNFetchBlob from "rn-fetch-blob";
import deleteDirectory from "../utils/deleteDirectoryFromDevice";
import userLamnessDetectionData from "../api/userLamenessDetectionData";
import formatDate from "../utils/getDate";
import lamenessDetectionDataTemplate from "../data/lamenessDetectionDataTemplate";
import services from "../api/services";
import saveBase64Image from "../utils/saveImageToDevice";
import saveJSON from "../utils/saveJSONToDevice";
import readJSON from "../utils/readJSONFromDevice";
import readBase64Image from "../utils/readImageFromDevice";
import { LinearGradient } from "react-native-linear-gradient";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import HeaderHomePage from "../components/homePage/header/headerHomePage";
import ProcessingTypeCard from "../components/homePage/processingTypeCard/processingTypeCard";
import ModelCard from "../components/homePage/modelCard/modelCard";
import lamenessDetectionTemplate from "../data/lamenessDetectionAnalyticsUITemplate";
import Analytics from "../components/homePage/analytics/analytics";
import TabBar from "../components/homePage/tabBar/tabBar";
import LoadingIndicator from "../components/common/activityIndicatorModal";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const imagesTemplate = [require("../img/lamenessDetection.png")];
const descriptionsTemplate = require("../data/servicesData.json");

const templates = {"Lameness Detection": lamenessDetectionTemplate};

const positionsTemp = getRandomPosition(screenHeight, screenWidth, 300, 200, backgroundDecorations.length);

const HomePage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [currentProcessingType, setCurrentProcessingType] = useState("Server");
  const [analyticsData, setAnalyticsData] = useState({});
  const [images, setImages] = useState(imagesTemplate);
  const [descriptions, setDescriptions] = useState(descriptionsTemplate);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [onTapCloseSuggestions, setOnTapCloseSuggestions] = useState(true);
  const [keyboardListener, setKeyboardListener] = useState(false);

  const positions = useRef(getRandomPosition(screenHeight, screenWidth, 300, 200, backgroundDecorations.length));
  const rotatations = useRef([...Array(positionsTemp.length)].map(() => `${Math.random() * 360}deg`));

  const syncWithServer = async () => {
    console.log("-----------------------------------------")
    console.log("syncWithServer")
    const { username, password } = await loadValueSecure("userPass");
    const lsDir = await listDir("unsent");

    if (lsDir !== null) {
      if (lsDir.length !== 0) {
        for (const folder of lsDir) {
          if (folder === "Lameness Detection") {
            const lsDir2 = await listDir(`unsent/${folder}`);
            if (lsDir2 !== null) {
              if (lsDir2.length !== 0) {
                for (const file of lsDir2) {
                  const latestData = await readJSON(`unsent/${folder}`, file.split(".")[0]);
                  const sendLamenessDetectionDataPayload = {
                    credentials: {
                      username_or_email: username,
                      password: password
                    },
                    lameness_detection_data: {
                      username: username,
                      date: file.split(".")[0],
                      healthy: latestData.healthy,
                      lame: latestData.lame,
                      fir: latestData.fir,
                      uncertain: latestData.uncertain,
                    },
                  };
                  const response = await sendUserLamenessDetectionData(sendLamenessDetectionDataPayload);
                  if (response.status === 200) {
                    await deleteFile(`unsent/${folder}/${file}`);
                  } else if (response.message === "Data already exists for the given user and date.") {
                    await deleteFile(`unsent/${folder}/${file}`);
                  } else {
                    ToastAndroid.show("Something went wrong syncing the data with the server.", ToastAndroid.SHORT);
                  }
                }
              }
            }
          } else if (folder === "videos") {
            const lsDir2 = await listDir(`unsent/${folder}`);
            if (lsDir2 !== null) {
              if (lsDir2.length !== 0) {
                for (const file of lsDir2) {
                  const fileProps = file.split("_");
                  if (fileProps[0] === "Lameness Detection") {
                    const response = await uploadVideo({ username_or_email: username, health_status: fileProps[1] },
                                                      `${RNFetchBlob.fs.dirs.DocumentDir}/unsent/videos/${file}`);
                    if (response.status === 200) {
                      await deleteFile(`unsent/${folder}/${file}`);
                    } else {
                      ToastAndroid.show("Something went wrong syncing the data with the server.", ToastAndroid.SHORT);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const syncDeviceStorage = async () => {
    console.log("-----------------------------------------")
    console.log("syncDeviceStorage")
    const lsDir = await listDir("unsent");
    if (lsDir !== null) {
      if (lsDir.length === 0) {
        await deleteDirectory("unsent");
      } else {
        let watcher = true
        for (const folder of lsDir) {
          const lsDir2 = await listDir(`unsent/${folder}`);
          if (lsDir2.length !== 0) {
            watcher = false
          }
        }
        if (watcher) {
          await deleteDirectory("unsent");
        }
      }
    }
  };

  const sendLamenessDetectionDataDefault = async () => {
    console.log("-----------------------------------------")
    console.log("sendLamenessDetectionDataDefault")

    const { username, password } = await loadValueSecure("userPass");

    const sendLamenessDetectionDataPayload = {
      credentials: {
        username_or_email: username,
        password: password
      },
      lameness_detection_data: {
        username: username,
        date: Object.keys(lamenessDetectionDataTemplate)[0],
        healthy: lamenessDetectionDataTemplate[Object.keys(lamenessDetectionDataTemplate)[0]].healthy,
        lame: lamenessDetectionDataTemplate[Object.keys(lamenessDetectionDataTemplate)[0]].lame,
        fir: lamenessDetectionDataTemplate[Object.keys(lamenessDetectionDataTemplate)[0]].fir,
        uncertain: lamenessDetectionDataTemplate[Object.keys(lamenessDetectionDataTemplate)[0]].uncertain,
      },
    };
    const response = await sendUserLamenessDetectionData(sendLamenessDetectionDataPayload);
    if (response.status === 200) {
      const responseNew = await userLamnessDetectionData({ username_or_email: username, password: password });
      if (responseNew.status === 200) {
        setAnalyticsData(responseNew.data.data);
        saveJSON("Lameness Detection", "Lameness Detection", responseNew.data.data);
      }
      const temp = {...analyticsData};
      ToastAndroid.show("Data synced successfully.", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Something went wrong sending the data to the server.", ToastAndroid.SHORT);
      saveJSON("unsent/Lameness Detection", formatDate(), lamenessDetectionDataTemplate[formatDate()]);
    }
  };
  

  const getUserLamnessDetectionData = async () => {
    console.log("-----------------------------------------")
    console.log("getUserLamnessDetectionData")
    const { username, password } = await loadValueSecure("userPass");
    const response = await userLamnessDetectionData({ username_or_email: username, password: password });
    if (response.status === 200) {
      setAnalyticsData(response.data.data);
      saveJSON("Lameness Detection", "Lameness Detection", response.data.data);
      if (Object.keys(response.data.data).length > 0) {
        Object.keys(response.data.data).forEach(async () => {
          if (!Object.keys(response.data.data).includes(formatDate())) {
            setAnalyticsData({ ...response.data.data, [formatDate()]: lamenessDetectionDataTemplate[formatDate()] });
            await sendLamenessDetectionDataDefault();
          }
        });
      }
    } else if (response.message === "No data found") {
      setAnalyticsData(lamenessDetectionDataTemplate);
      ToastAndroid.show("No data found to display for today. Showing a default template.", ToastAndroid.SHORT);
      await sendLamenessDetectionDataDefault();
    } else {
      const lsDir = await listDir("Lameness Detection");
      if (lsDir !== null) {
        for (const file of lsDir) {
          const data = await readJSON("Lameness Detection", file.split(".")[0]);
          let temp = {...analyticsData};
          temp = {...data}
          setAnalyticsData(temp);
        }
      }
      console.log(analyticsData)
      const lsDir2 = await listDir(`unsent/${Object.keys(descriptions)[currentIndex]}`);
      if (lsDir2 !== null) {
        for (const file of lsDir2) {
          const data = await readJSON(`unsent/${Object.keys(descriptions)[currentIndex]}`, file.split(".")[0]);
          const temp = {...analyticsData};
          temp[file.split(".")[0]] = data;
          setAnalyticsData(temp);
        }
        if (lsDir2.includes(`${formatDate()}.json`)) {
          const latestData = await readJSON(`unsent/${Object.keys(descriptions)[currentIndex]}`, formatDate());
          const temp = {...analyticsData};
          temp[formatDate()] = latestData;
          setAnalyticsData(temp);
        } else {
          setAnalyticsData(lamenessDetectionDataTemplate);
          await saveJSON("unsent/Lameness Detection", formatDate(), lamenessDetectionDataTemplate[formatDate()]);
        }
      } else {
        setAnalyticsData(lamenessDetectionDataTemplate);
        await saveJSON("unsent/Lameness Detection", formatDate(), lamenessDetectionDataTemplate[formatDate()]);
      }
      ToastAndroid.show("Something went wrong retrieving the data from the server.", ToastAndroid.SHORT);
    }
  }

  const getData = async () => {
    console.log("-----------------------------------------")
    console.log("getData")
    const { username, password } = await loadValueSecure("userPass");
  
    try {
      const response = await services({ username_or_email: username, password: password });

      if (response.status === 200) {
        for (const key of Object.keys(response.data.data)) {  
          const imageBase64 = response.data.data[key].image;
          const description = response.data.data[key].description;

          await saveBase64Image("servicesData", key, imageBase64);
          await saveJSON("servicesData", key, description);

          setImages([{ uri: `data:image/jpg;base64,${imageBase64}` }]);
          setDescriptions({ ...descriptions, [key]: description });
        }

        if (Object.keys(response.data.data)[currentIndex] === "Lameness Detection") {
          await getUserLamnessDetectionData();
        }

      } else {
        const lsDir = await listDir("servicesData");
        if (lsDir !== null) {
          lsDir.forEach(async (file) => {
            if (!file.endsWith(".json")) {
              setImages([{ uri: `data:image/jpg;base64,${await readBase64Image(`servicesData`, file)}` }]);
            } else {
              setDescriptions({ ...descriptions, [file.split(".")[0]]: await readJSON(`servicesData`, file.split(".")[0]) });
            }
          });
        }
        await getUserLamnessDetectionData();
        ToastAndroid.show("Something went wrong retrieving the services from the server.", ToastAndroid.SHORT);
      }

    } catch (error) {
      console.error(error);
      ToastAndroid.show("Something went wrong retrieving the services from the server.", ToastAndroid.SHORT);
    }
  };

  useFocusEffect(React.useCallback(() => {
    setLoading(true);
    syncWithServer()
      .then(() => syncDeviceStorage())
      .then(() => getData())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []));
  
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await syncWithServer();
      await syncDeviceStorage();
      await getData();
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <LinearGradient colors={["#06181d", "#02223d"]} style={styles.container}>
      <TapGestureHandler
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            if (!keyboardListener) {
              setOnTapCloseSuggestions(false);
            }
          }
        }}
      >
        <ScrollView 
          style={styles.scrollViewContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Image source={require("../img/corner.png")} resizeMode="contain" style={styles.cornerImageStyle} />
          {backgroundDecorations.map((image, index) => (
            <React.Fragment key={index}>
              {[...Array(positions.current.length / backgroundDecorations.length)].map((blackHole, indexInner) => (
                <Image
                  key={`${index}-${indexInner}`}
                  source={image}
                  style={{
                    ...styles.backgroundDecorationsStyle,
                    top: positions.current[index * positions.current.length / backgroundDecorations.length + indexInner].top,
                    left: positions.current[index * positions.current.length / backgroundDecorations.length + indexInner].left,
                    transform: [{ rotate: rotatations.current[index * positions.current.length / backgroundDecorations.length + indexInner] }],
                  }}
                />
              ))}
            </React.Fragment>
          ))}
          <View style={{ zIndex: 2 }}>
            <HeaderHomePage navigation={navigation} headerTitle="AkAna" />
          </View>
          <View style={{ zIndex: 3 }}>
            <ProcessingTypeCard 
              selectedButton={currentProcessingType}
              setSelectedButton={setCurrentProcessingType}
            />
          </View>
          <ModelCard images={images} descriptions={descriptions} currentIndexState={[currentIndex, setCurrentIndex]}/>
          {Object.keys(descriptions).length > 0 && Object.keys(analyticsData).length > 0 && analyticsData !== templates[Object.keys(descriptions)[currentIndex]] &&
          <Analytics
            data={analyticsData}
            template={templates[Object.keys(descriptions)[currentIndex]]}
            onTextInputPress={setKeyboardListener}
            onTapCloseSuggestions={[onTapCloseSuggestions, setOnTapCloseSuggestions]}
          />
          }
        </ScrollView>
      </TapGestureHandler>
      {!keyboardListener ? (
        <View style={styles.tabBarContainer}>
          <TabBar 
            navigation={navigation} 
            currentService={Object.keys(descriptions)[currentIndex]} 
            currentProcessingType={currentProcessingType} 
            analyticsData={analyticsData}
            setAnalyticsData={setAnalyticsData}
          />
        </View>
      ) : null}
      <LoadingIndicator visible={loading} close={() => setLoading(false)} text={"Loading..."} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    zIndex: 1,
    backgroundColor: "transparent",
  },
  cornerImageStyle: {
    position: "absolute",
    zIndex: 0,
    width: responsiveSize / 3,
    height: responsiveSize / 3,
    resizeMode: "contain",
  },
  backgroundDecorationsStyle: {
    position: "absolute",
    resizeMode: "contain",
    width: responsiveSize / 12,
    height: responsiveSize / 15,
    maxWidth: 100,
    maxHeight: 100,
  },
  tabBarContainer: {
    position: "absolute",
    zIndex: 4,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
});

export default HomePage;