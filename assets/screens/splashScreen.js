import React, { useState, useRef, useEffect } from "react";
import { Dimensions, View, Animated, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import loadValue from "../utils/loadValue";
import getRandomChar from "../utils/randomCharacterGenerator";
import Video from "react-native-video";
import { LinearGradient } from "react-native-linear-gradient";
import { AnimatedText } from "../components/splashScreen/fadeInAnimatedText";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Renders the splash screen component.
 *
 * @returns {JSX.Element} The rendered splash screen component.
 */
const SplashScreen = () => {
  const [splashScreenVisible, setSplashScreenVisible] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadValue("isLoggedIn").then((value) => {
      setIsLoggedIn(value);
    });
  }, []);

  const navigation = useNavigation();
  
  const textContainerBackgroundOpacity = new Animated.Value(0);

  const initialString = "akana";
  const finalString = "AkAna".split('');
  const initialCharacterStates = initialString.split('').reduce((acc, char, index) => {
    acc[char + index] = useState(char);
    return acc;
  }, {});
  const dynamicStyles = initialString.split('').reduce((acc, _, index) => {
    acc[index] = useState({ ...styles.nameText });
    return acc;
  }, {});

  const intervalRef = useRef(null);
  const indexRef = useRef(0);
  const rollCountRef = useRef(0);

  /**
   * Updates the character states based on the given parameters.
   * @param {Array} states - The array of states.
   * @param {string} finalString - The final string.
   * @param {Array} dynamicStyles - The array of dynamic styles.
   */
  const updateCharacterStates = (states, finalString, dynamicStyles) => {
    const [, setState] = states[indexRef.current][1];
    const finalChar = finalString[indexRef.current];
    const [style, setStyle] = dynamicStyles[indexRef.current];

    if (rollCountRef.current < 5) {
      setState(getRandomChar());
      rollCountRef.current++;
    } else {
      setState(finalChar);
      setStyle({ ...style, fontFamily: "serif", fontSize: responsiveSize / 12.2 });
      indexRef.current++;

      if (indexRef.current < states.length) {
        rollCountRef.current = 0;
      } else {
        clearInterval(intervalRef.current);
        setSplashScreenVisible(false);
      }
    }
  };

  useEffect(() => {
    if (videoLoaded) {
      Animated.timing(textContainerBackgroundOpacity, {
        toValue: 8,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  }, [videoLoaded]);

  useEffect(() => {
    if (animationCompleted) {
      indexRef.current = 0;
      rollCountRef.current = 0;
      intervalRef.current = setInterval(() => {
        updateCharacterStates(Object.entries(initialCharacterStates), finalString, dynamicStyles);
      }, 100);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [animationCompleted]);

  const handleVideoLoad = () => {
    setTimeout(() => {
      setVideoLoaded(true);
    }, 1000);
  };

  const handleAnimationComplete = () => {
    setAnimationCompleted(true);
  };

  useEffect(() => {
    if (!splashScreenVisible) {
      if (isLoggedIn) {
        navigation.reset({
          index: 0,
          routes: [{ name: "DrawerNavigator" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    }
  }, [splashScreenVisible]);

  return (
    <View style={styles.container}>
      <Video
        source={require("../video/splash.mp4")}
        rate={1.0}
        volume={1.0}
        muted={false}
        resizeMode="cover"
        repeat={false}
        style={styles.video}
        onLoad={handleVideoLoad}
      />
      {videoLoaded && (
        <Animated.View
          style={[
            styles.nameTextContainerBase,
            {
              opacity: textContainerBackgroundOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.nameTextContainer}
          >
            {Object.entries(initialCharacterStates).map(([char, [state]], index) => (
              <AnimatedText
                textStyle={dynamicStyles[index][0]}
                key={char}
                char={state}
                delay={200 * index + 1}
                onCompleteDelay={2000}
                onComplete={handleAnimationComplete}
              />
            ))}
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nameText: {
    fontSize: responsiveSize / 9,
    fontFamily: "Gokturkunicodefont-o3nA",
    color: "#ffffff",
    textShadowColor: "rgba(255, 255, 0, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  nameTextContainerBase: {
    width: "100%"
  },
  nameTextContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 230,
    justifyContent: "center"
  }
});

export default SplashScreen;