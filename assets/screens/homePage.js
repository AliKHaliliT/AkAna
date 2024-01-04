import React, { useState, useEffect } from "react";
import { Dimensions, ToastAndroid, RefreshControl, ScrollView, Image, View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import getRandomPosition from "../utils/randomPositionGenerator";
import backgroundDecorations from "../utils/decorations";
import loadValueSecure from "../utils/loadValueSecure";
import services from "../api/services";
import userLamnessDetectionData from "../api/userLamenessDetectionData";
import { LinearGradient } from "react-native-linear-gradient";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import lamenessDetectionTemplate from "../cache/data/lamenessDetectionAnalyticsUITemplate"
import HeaderHomePage from "../components/homePage/header/headerHomePage";
import ProcessingTypeCard from "../components/homePage/processingTypeCard/processingTypeCard";
import ModelCard from "../components/homePage/modelCard/modelCard";
import Analytics from "../components/homePage/analytics/analytics";
import TabBar from "../components/homePage/tabBar/tabBar";
import LoadingIndicator from "../components/common/activityIndicatorModal";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const positions = getRandomPosition(screenHeight, screenWidth, 300, 200, backgroundDecorations.length);

// const images = [require("../cache/img/lamenessDetection.png")];
// const descriptions = require("../cache/data/servicesData.json");


const HomePage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(lamenessDetectionTemplate);
  const [descriptions, setDescriptions] = useState({});
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [onTapCloseSuggestions, setOnTapCloseSuggestions] = useState(true);
  const [keyboardListener, setKeyboardListener] = useState(false);


  // console.log(lamenessDetectionTemplate);

  const getUserLamnessDetectionData = async () => {
    const { username, password } = await loadValueSecure("userPass");
    const response = await userLamnessDetectionData({ username_or_email: username, password: password });
    if (response.status === 200) {
      console.log(Object.values(response.data.data));
      // setAnalyticsData(response.data.data);
    } else if (response.message === "No data found") {
      ToastAndroid.show("You have no data to display.", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Something went wrong retrieving the data from the server.", ToastAndroid.SHORT);
    }
  }

  const getServices = async () => {
    const { username, password } = await loadValueSecure("userPass");
  
    try {
      const response = await services({ username_or_email: username, password: password });
  
      if (response.status === 200) {
        for (const key of Object.keys(response.data.data)) {
          if (Object.keys(descriptions).includes(key)) {
            continue;
          }
  
          setDescriptions({ [key]: response.data.data[key].description });
          setImages([{ uri: `data:image/jpg;base64,${response.data.data[key].image}` }]);
  
          if (Object.keys(response.data.data)[currentIndex] === "Lameness Detection") {
            await getUserLamnessDetectionData(); // Await here to ensure completion before moving forward
          }
        }
      } else {
        ToastAndroid.show("Something went wrong retrieving the services from the server.", ToastAndroid.SHORT);
      }

    } catch (error) {
      console.error(error);
      ToastAndroid.show("Something went wrong retrieving the services from the server.", ToastAndroid.SHORT);
      return null;
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getServices().then((response) => {
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      });
    }, [])
  );
  

  const onRefresh = () => {
    setRefreshing(true);
    getServices().then((response) => {
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
            setOnTapCloseSuggestions(false);
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
              {[...Array(positions.length / backgroundDecorations.length)].map((blackHole, indexInner) => (
                <Image
                  key={`${index}-${indexInner}`}
                  source={image}
                  style={{
                    ...styles.backgroundDecorationsStyle,
                    top: positions[index * positions.length / backgroundDecorations.length + indexInner].top,
                    left: positions[index * positions.length / backgroundDecorations.length + indexInner].left,
                    transform: [{ rotate: `${Math.random() * 360}deg` }],
                  }}
                />
              ))}
            </React.Fragment>
          ))}
          <View style={{ zIndex: 2 }}>
            <HeaderHomePage navigation={navigation} headerTitle="AkAna" />
          </View>
          <View style={{ zIndex: 3 }}>
            <ProcessingTypeCard />
          </View>
          <ModelCard images={images} descriptions={descriptions} currentIndexState={[currentIndex, setCurrentIndex]}/>
          <Analytics
            data={analyticsData}
            onTextInputPress={setKeyboardListener}
            onTapCloseSuggestions={[onTapCloseSuggestions, setOnTapCloseSuggestions]}
          />
        </ScrollView>
      </TapGestureHandler>
      {!keyboardListener ? (
        <View style={styles.tabBarContainer}>
          <TabBar currentService={Object.keys(descriptions)[currentIndex]}/>
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