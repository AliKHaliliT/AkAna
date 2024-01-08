import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Dot component.
 *
 * @param {string} color - The color of the dot.
 * @returns {JSX.Element} The Dot component.
 */
const Dot = ({ color }) => {
  return (
    <Svg style={styles.dot}>
      <Circle cx={responsiveSize / 120} cy={responsiveSize / 120} r={responsiveSize / 120} fill={color} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: responsiveSize / 60,
    width: responsiveSize / 60,
    marginRight: responsiveSize / 60,
  },
});

export default Dot;