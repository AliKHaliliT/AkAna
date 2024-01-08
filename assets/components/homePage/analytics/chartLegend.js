import React, { useState, useRef } from "react";
import { Dimensions, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Dot from "./dot";
import Icon from "react-native-vector-icons/FontAwesome5";
import InfoAlert from "./infoAlert";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Renders a chart legend component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.firstColor - The color of the first legend item.
 * @param {string} props.firstText - The text of the first legend item.
 * @param {string} props.secondColor - The color of the second legend item.
 * @param {string} props.secondText - The text of the second legend item.
 * @param {Array} [props.furtherInformationRequired=[]] - An array of legend item texts that require further information.
 * @param {Array} [props.infoText=['', '']] - An array of information texts corresponding to the legend items.
 * @returns {JSX.Element} The rendered chart legend component.
 */
const ChartLegend = ({ firstColor, firstText, secondColor, secondText, furtherInformationRequired = [], infoText = ['', ''] }) => {
  const [showInfoAlertOne, setShowInfoAlertOne] = useState(false);
  const [showInfoAlertTwo, setShowInfoAlertTwo] = useState(false);

  
  const firstInfoSwitch = useRef(furtherInformationRequired.includes(firstText));
  const secondInfoSwitch = useRef(furtherInformationRequired.includes(secondText));

  const infoPopUpOne = () => {
    setShowInfoAlertOne(true);
  };

  const infoPopUpTwo = () => {
    setShowInfoAlertTwo(true);
  };

  return (
    <View style={styles.legendRow}>
      <View style={styles.legendItem}>
        <Dot color={firstColor} />
        <Text style={styles.legendText}>{firstText}</Text>
        {firstInfoSwitch.current && (
          <TouchableOpacity onPress={infoPopUpOne} style={styles.infoIcon}>
            <Icon name={"info-circle"} size={responsiveSize / 35} color={"#fff9eb"} />
          </TouchableOpacity>
        )}
        {showInfoAlertOne && <InfoAlert title={firstText} infoText={infoText[0]} close={setShowInfoAlertOne} />}
      </View>
      <View style={styles.legendItem}>
        <Dot color={secondColor} />
        <Text style={styles.legendText}>{secondText}</Text>
        {secondInfoSwitch.current && (
          <TouchableOpacity onPress={infoPopUpTwo} style={styles.infoIcon}>
            <Icon name={"info-circle"} size={responsiveSize / 35} color={"#fff9eb"} />
          </TouchableOpacity>
        )}
        {showInfoAlertTwo && <InfoAlert title={secondText} infoText={infoText[1]} close={setShowInfoAlertTwo} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendRow: {
    marginLeft: responsiveSize / 17,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  legendItem: {
    width: "50%",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  legendText: {
    fontSize: responsiveSize / 42,
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
  },
  infoIcon: {
    marginLeft: 8,
  },
});

export default ChartLegend;