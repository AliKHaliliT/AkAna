import React, { useState, useEffect } from "react";
import { Dimensions, ToastAndroid, ScrollView, Image, View, StyleSheet } from "react-native";
import getRandomPosition from "../utils/randomPositionGenerator";
import backgroundDecorations from "../utils/decorations";
import loadValueSecure from "../utils/loadValueSecure";
import services from "../api/services";
import { LinearGradient } from "react-native-linear-gradient";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import analyticsData from "../cache/data/analyticsUIData";
import HeaderHomePage from "../components/homePage/header/headerHomePage";
import ProcessingTypeCard from "../components/homePage/processingTypeCard/processingTypeCard";
import ModelCard from "../components/homePage/modelCard/modelCard";
import Analytics from "../components/homePage/analytics/analytics";
import TabBar from "../components/homePage/tabBar/tabBar";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const positions = getRandomPosition(screenHeight, screenWidth, 300, 200, backgroundDecorations.length);

// const descriptions = require("../cache/data/servicesData.json");
const images = [require("../cache/img/lamenessDetection.png")];

const HomePage = ({ navigation }) => {
  const [keyboardListener, setKeyboardListener] = useState(false);
  const [onTapCloseSuggestions, setOnTapCloseSuggestions] = useState(true);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      const { username, password } = await loadValueSecure("userPass");
      const response = await services({ username_or_email: username, password: password });
      console.log(response);
      if (response.status === 200) {
        // setDescriptions(response.data.data);
      } else {
        ToastAndroid.show("Something went wrong retrieving the services from the server.", ToastAndroid.SHORT);
      }
    };
    getServices();
  }, []);

  return (
    <LinearGradient colors={["#06181d", "#02223d"]} style={styles.container}>
      <TapGestureHandler
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            setOnTapCloseSuggestions(false);
          }
        }}
      >
        <ScrollView style={styles.scrollViewContainer}>
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
          <ModelCard images={images} descriptions={descriptions} />
          <Analytics
            data={analyticsData}
            onTextInputPress={setKeyboardListener}
            onTapCloseSuggestions={[onTapCloseSuggestions, setOnTapCloseSuggestions]}
          />
        </ScrollView>
      </TapGestureHandler>
      {!keyboardListener ? (
        <View style={styles.tabBarContainer}>
          <TabBar />
        </View>
      ) : null}
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