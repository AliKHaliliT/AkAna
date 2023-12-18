import React, { useRef, useCallback, useEffect } from "react";
import { Dimensions, Animated, Easing, StyleSheet } from "react-native";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;
const { timing, Value } = Animated;

export const AnimatedText = ({ char, delay, onComplete, textStyle = styles.textStyle, onCompleteDelay = 0, animationDuration = 1000 }) => {
  const fadeAnim = useRef(new Value(0)).current;
  const timeoutIdRef = useRef(null);

  const fadeIn = useCallback(() => {
    timing(fadeAnim, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, animationDuration]);

  useEffect(() => {
    timeoutIdRef.current = setTimeout(() => {
      fadeIn();
    }, delay);

    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [fadeIn, delay]);

  useEffect(() => {
    timeoutIdRef.current = setTimeout(() => {
      onComplete();
    }, delay + onCompleteDelay);

    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [onComplete, delay, onCompleteDelay]);

  const animatedStyle = { opacity: fadeAnim };

  return <Animated.Text style={[textStyle, animatedStyle]}>{char}</Animated.Text>;
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#ffffff",
    fontFamily: "serif",
    fontSize: responsiveSize / 9,
  }
});