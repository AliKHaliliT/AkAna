import React, { useState, useRef, useEffect } from "react";
import { Dimensions, Animated, Easing, View, ScrollView, Image, TouchableOpacity, Text, Modal, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import GradientButton from "../../common/gradientButton";

const screenWidth = Dimensions.get("window").width;
const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const ModelCard = ({ images, descriptions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [bounceLeftRight] = useState(new Animated.Value(1));
  const [bounceInOut] = useState(new Animated.Value(1));

  const scrollViewRef = useRef(null);

  const startBouncingLeftRight = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceLeftRight, {
          toValue: 5,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(bounceLeftRight, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  const startBouncingInOut = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceInOut, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(bounceInOut, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  useEffect(() => {
    startBouncingLeftRight();
    startBouncingInOut();
  }, []);

  const scroll = (offset) => {
    const newIndex = currentIndex + offset;
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex);
      scrollViewRef.current.scrollTo({ x: newIndex * screenWidth, animated: true });
    }
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const ModelDescriptionText = descriptions[Object.keys(descriptions)[currentIndex]] || "No Info";

  return (
    <React.Fragment>
      <View style={styles.modelSelectionContainer}>
        <View style={styles.galleryContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerStyle={styles.imageContainer}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
          >
            {images.map((image, index) => (
              <Image
                source={image}
                key={index}
                resizeMode={"contain"}
                style={{ ...styles.image, width: responsiveSize / 2.2 }}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.modelTypeContainer}>
          <TouchableOpacity
            onPress={() => scroll(-1)}
            style={[styles.scrollButton, { transform: [{ translateX: Animated.multiply(bounceLeftRight, -1) }, { scale: bounceInOut }] }]}
          >
            <Animated.View>
              <Icon name={"keyboard-arrow-left"} size={responsiveSize / 18} color={"#ffffff"} />
            </Animated.View>
          </TouchableOpacity>
          <Text style={styles.modelTypeText}>
            {Object.keys(descriptions)[currentIndex] || "No Info"}
          </Text>
          <TouchableOpacity
            onPress={() => scroll(1)}
            style={[styles.scrollButton, { transform: [{ translateX: bounceLeftRight }, { scale: bounceInOut }] }]}
          >
            <Animated.View>
              <Icon name={"keyboard-arrow-right"} size={responsiveSize / 18} color={"#ffffff"} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
      <LinearGradient
        colors={["#1f2f34", "#283E45"]}
        style={styles.modelDescriptionContainer}
      >
        <View>
          {ModelDescriptionText === "No Info" ? (
            <Text style={{ ...styles.modelDescriptionText, marginBottom: 0 }} numberOfLines={3}>
              {ModelDescriptionText}
            </Text>
          ) : (
            <Text style={styles.modelDescriptionText} numberOfLines={3}>
              {ModelDescriptionText}
            </Text>
          )}
        </View>
        {ModelDescriptionText.length > 100 && (
          <TouchableOpacity onPress={toggleDescription} style={styles.modelDescriptionButton}>
            <LinearGradient
              colors={["#4cbb17", "#3fa23e"]}
              style={styles.gradientBackground}
            >
              <Text style={styles.modelDescriptionButtonText}>
                {expanded ? "Collapse" : "Learn More"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </LinearGradient>
      <Modal visible={expanded} transparent={true} animationType={"fade"}>
        <View style={styles.moreModalContainer}>
          <View style={styles.moreModalContent}>
            <ScrollView>
              <Text style={styles.alertModalText}>
                Intelligent Lameness Detection System
              </Text>
              <Text style={{ ...styles.modelDescriptionText, color: "#06181d", marginBottom: 5 }}>
                {ModelDescriptionText}
              </Text>
            </ScrollView>
              <GradientButton text={"Close"} onPress={toggleDescription} colors={["#4cbb17", "#3fa23e"]} buttonStyle={styles.moreModalCloseButton}/>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  modelSelectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: "column",
    height: responsiveSize / 2.5,
  },
  galleryContainer: {
    width: "100%",
    height: "85%",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
  },
  image: {
    resizeMode: "contain",
    height: "100%",
  },
  modelTypeContainer: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "center",
  },
  scrollButton: {
    width: responsiveSize / 10,
    height: responsiveSize / 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  modelTypeText: {
    fontSize: responsiveSize / 28,
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
    alignSelf: "center",
    marginHorizontal: 10,
  },
  modelDescriptionContainer: {
    flex: 1,
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  modelDescriptionText: {
    fontSize: responsiveSize / 35,
    color: "#ffffff",
    fontFamily: "Montserrat-Medium",
    textAlign: "justify",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  modelDescriptionButton: {
    width: responsiveSize / 5.5,
    height: responsiveSize / 16,
    alignSelf: "flex-end",
    alignItems: "center",
    borderRadius: 8,
  },
  gradientBackground: {
    width: "100%",
    height: "100%",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  modelDescriptionButtonText: {
    fontSize: responsiveSize / 45,
    color: "#06181d",
    fontFamily: "Montserrat-Bold",
  },
  moreModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  moreModalContent: {
    width: "100%",
    height: "55%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#ffffff",
    elevation: 25,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  moreModalCloseButton: {
    width: "100%",
    height: "12%",
  },
  alertModalText: {
    fontSize: responsiveSize / 22,
    color: "#06181d",
    fontFamily: "Montserrat-Bold",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
});

export default ModelCard;