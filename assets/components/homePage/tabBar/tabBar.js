import React, { useState, useRef, useEffect } from "react";
import { Dimensions, Animated, Easing, View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { line, curveBumpX } from "d3-shape";
import Svg, { Defs, LinearGradient as SVGLinearGradient, Stop, Path } from "react-native-svg";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import InputSelector from "./inputSelector";

const screenWidth = Dimensions.get("window").width;
const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;
const tabBarHeight = responsiveSize / 10;
const xMin = 0;
const yMin = 0;
const xMax = screenWidth;
const yMax = tabBarHeight;

const TabBar = ({ navigation, currentService, currentProcessingType }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [bounceValue]);

  const translateY = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -7],
  });

  const generateShapePoints = () => {
    const topMarginPoints = [
      { x: xMin, y: yMin },
      { x: xMax * 0.3, y: yMin },
      { x: xMax * 0.3 + xMax * 0.2, y: yMax * 0.8 },
      { x: xMax * 0.3 + xMax * 0.2 + xMax * 0.2, y: yMin },
      { x: xMax, y: yMin },
    ];
  
    return [
      { x: xMin, y: yMax },
      { x: xMax, y: yMax },
      ...topMarginPoints.reverse(),
      { x: xMin, y: yMax },
    ];
  };

  const shapePoints = generateShapePoints();

  const lineGenerator = line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveBumpX);

  const areaPathData = lineGenerator(shapePoints);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Svg width={"100%"} height={"100%"}>
        <Defs>
          <SVGLinearGradient id={"grad"} x1={"0%"} y1={"0%"} x2={"0%"} y2={"100%"}>
            <Stop offset={"0%"} stopColor={"#fefbea"} stopOpacity={1} />
            <Stop offset={"100%"} stopColor={"#e5e2d3"} stopOpacity={1} />
          </SVGLinearGradient>
        </Defs>
        <Path 
          d={areaPathData} 
          fill={"url(#grad)"} 
          // stroke={"#06181d"}
          // strokeWidth={3} 
          // strokeLinecap={"round"}
          // strokeLinejoin={"round"}
          // strokeOpacity={0.5}
        />
      </Svg>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{ transform: [{ translateY }] }}
          onPress={handleModalOpen}
        >
          <LinearGradient
            colors={["#fefbea", "#e5e2d3"]}
            style={styles.button} 
          >
            <View style={styles.buttonInner}>
              <Icon name={"add"} size={responsiveSize / 15} color={"#06181d"} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <InputSelector navigation={navigation} close={handleModalClose} currentService={currentService} currentProcessingType={currentProcessingType}/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: tabBarHeight,
  },
  buttonContainer: {
    position: "absolute",
    top: -30,
    left: 0,
    right: 0,
    bottom: 0,
    height: tabBarHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: responsiveSize / 8,
    height: responsiveSize / 8,
    borderRadius: responsiveSize / 16,
    // borderWidth: 1,
    // borderColor: "#06181d",
    elevation: 8,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;