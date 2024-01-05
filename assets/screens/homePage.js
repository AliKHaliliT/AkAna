import React, { useState, useRef } from "react";
import { Dimensions, ToastAndroid, RefreshControl, ScrollView, Image, View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import getRandomPosition from "../utils/randomPositionGenerator";
import backgroundDecorations from "../utils/decorations";
import loadValueSecure from "../utils/loadValueSecure";
import sendUserLamenessDetectionData from "../api/sendLamenessDetectionData";
import userLamnessDetectionData from "../api/userLamenessDetectionData";
import saveValue from "../utils/saveValue";
import lamenessDetectionDataTemplate from "../data/lamenessDetectionDataTemplate";
import services from "../api/services";
import saveImages from "../utils/saveImagesToDevice"
import saveJSON from "../utils/saveJSONToDevice";
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

// ModelCard default values - Only used for presentation purposes
const imagesTemplate = [require("../img/lamenessDetection.png")];
const descriptionsTemplate = require("../data/servicesData.json");


// Analytics default values - Only used for presentation purposes
const templates = {"Lameness Detection": lamenessDetectionTemplate};

// Background decorations - Consistent across renders
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

  // Background decorations - Consistent across renders
  const positions = useRef(getRandomPosition(screenHeight, screenWidth, 300, 200, backgroundDecorations.length));
  const rotatations = useRef([...Array(positionsTemp.length)].map(() => `${Math.random() * 360}deg`));

  const getUserLamnessDetectionData = async () => {
    const { username, password } = await loadValueSecure("userPass");
    const response = await userLamnessDetectionData({ username_or_email: username, password: password });
    if (response.status === 200) {
      setAnalyticsData(response.data.data);
    } else {
      setAnalyticsData(lamenessDetectionDataTemplate);
      saveValue(`${lamenessDetectionDataTemplate} - lameness`, "0");
      ToastAndroid.show("Something went wrong retrieving the data from the server.", ToastAndroid.SHORT);
    }
  }

  const getData = async () => {
    const { username, password } = await loadValueSecure("userPass");
  
    try {
      const response = await services({ username_or_email: username, password: password });

      if (response.status === 200) {
        for (const key of Object.keys(response.data.data)) {
          if (Object.keys(descriptions).includes(key)) {
            continue;
          }

          const imageBase64 = response.data.data[key].image;
          const description = response.data.data[key].description;

          await saveImages("servicesData", key, imageBase64);
          await saveJSON("servicesData", key, description);

          setImages([{ uri: `data:image/jpg;base64,${imageBase64}` }]);
          setDescriptions({ ...descriptions, [key]: description });
        }

        if (Object.keys(response.data.data)[currentIndex] === "Lameness Detection") {
          await getUserLamnessDetectionData();
        }

        await saveJSON("lamenessDetection", "lamenessDetectionData", analyticsData);

      } else {
        setAnalyticsData(lamenessDetectionDataTemplate);
        saveValue(`${lamenessDetectionDataTemplate} - lameness`, "0");
        ToastAndroid.show("Something went wrong retrieving the services from the server.", ToastAndroid.SHORT);
      }

    } catch (error) {
      console.error(error);
      ToastAndroid.show("Something went wrong retrieving the services from the server.", ToastAndroid.SHORT);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getData().then((response) => {
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      });
    }, [])
  );
  

  const onRefresh = () => {
    setRefreshing(true);
    getData().then((response) => {
      setRefreshing(false);
    }).catch((error) => {
      setRefreshing(false);
    });
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
          {Object.keys(descriptions).length > 0 &&
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
          <TabBar currentService={Object.keys(descriptions)[currentIndex]} currentProcessingType={currentProcessingType}/>
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