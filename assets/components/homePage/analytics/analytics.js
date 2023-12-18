import React, { useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import ChartLegend from "./chartLegend";
import { LinearGradient } from "react-native-linear-gradient";
import Dropdown from "./dropdown";
import { PieChart } from "react-native-gifted-charts";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const Analytics = ({ data, onTextInputPress, onTapCloseSuggestions }) => {
  const [userSessions, setUserSessions] = useState([]);

  useEffect(() => {
    setUserSessions(require("../../../cache/data/userSessions.json").sessions);
  }, []);

  const processed = data.reduce((total, item) => total + item.value, 0);
  const healthy = data.find((item) => item.legendName === "Healthy").value;
  const percentHealthy = Math.ceil((healthy / processed) * 100);
  const qualityState = percentHealthy >= 90 ? "Excellent" : percentHealthy >= 80 ? "Good" : percentHealthy >= 70 ? "Fair" : "Poor";

  const renderChartLegend = () => {
    return data.map((blackHole, index) => {
      if (index % 2 === 0 && index + 1 !== data.length) {
        const tempItemOne = data[index];
        const tempItemTwo = data[index + 1];
        const furtherInformationRequiredArray = ["FIR", "Uncertain"];
        const infoArray = [];
        if (furtherInformationRequiredArray.includes(tempItemOne.legendName)) {
          infoArray.push(tempItemOne.infoText);
        } else {
          infoArray.push('');
        }
        if (furtherInformationRequiredArray.includes(tempItemTwo.legendName)) {
          infoArray.push(tempItemTwo.infoText);
        } else {
          infoArray.push('');
        }
        return (
          <ChartLegend
            key={index}
            firstColor={tempItemOne.color}
            firstText={tempItemOne.legendName}
            secondColor={tempItemTwo.color}
            secondText={tempItemTwo.legendName}
            furtherInformationRequired={furtherInformationRequiredArray}
            infoText={infoArray}
          />
        );
      } else if (data.length % 2 !== 0 && index + 1 === data.length) {
        const tempItem = data[index];
        const furtherInformationRequiredArray = ["FIR", "Uncertain"];
        const infoArray = [];
        if (furtherInformationRequiredArray.includes(tempItem.legendName)) {
          infoArray.push(tempItem.infoText);
          infoArray.push('');
        } else {
          infoArray.push('');
          infoArray.push('');
        }
        return (
          <ChartLegend
            key={index}
            firstColor={tempItem.color}
            firstText={tempItem.legendName}
            secondColor={"transparent"}
            secondText={''}
            furtherInformationRequired={furtherInformationRequiredArray}
            infoText={infoArray}
          />
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#1f2f34", "#283e45"]} style={styles.chartContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Analytics</Text>
          <Dropdown
            options={userSessions}
            onSelect={(option) => console.log(option)}
            onTextInputPress={onTextInputPress}
            onTapCloseSuggestions={onTapCloseSuggestions}
          />
        </View>
        <View style={styles.chartContent}>
          <PieChart
            data={data}
            donut
            showGradient
            sectionAutoFocus
            focusOnPress
            showValuesAsLabels
            showText
            textColor={"#06181d"}
            radius={responsiveSize / 6.5}
            innerRadius={responsiveSize / 13}
            innerCircleColor={"#6a7477"}
            centerLabelComponent={() => (
              <View style={styles.centerLabelContainer}>
                <Text style={styles.centerLabelText}>{percentHealthy}%</Text>
                <Text style={styles.centerLabelSubText}>{qualityState}</Text>
              </View>
            )}
          />
        </View>
        {renderChartLegend()}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 80,
  },
  chartContainer: {
    borderRadius: 20,
    margin: 20,
    padding: 16,
  },
  headerContainer: { 
    flexDirection: "row",
  },
  titleText: {
    width: "40%",
    fontSize: responsiveSize / 27,
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
  },
  chartContent: {
    alignItems: "center",
    padding: 20,
  },
  centerLabelContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerLabelText: {
    fontSize: responsiveSize / 29,
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
  },
  centerLabelSubText: {
    fontSize: responsiveSize / 40,
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
  },
});

export default Analytics;
