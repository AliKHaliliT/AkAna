import React, { useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import ChartLegend from "./chartLegend";
import { LinearGradient } from "react-native-linear-gradient";
import Dropdown from "./dropdown";
import { PieChart } from "react-native-gifted-charts";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Analytics component displays data in a chart format and provides various analytics features.
 *
 * @param {Object} data - The data used to populate the chart.
 * @param {Array} template - The template used to define the chart structure.
 * @param {Function} onTextInputPress - The callback function triggered when the text input is pressed.
 * @param {Function} onTapCloseSuggestions - The callback function triggered when the close suggestions button is tapped.
 * @returns {JSX.Element} The rendered Analytics component.
 */
const Analytics = ({ data, template, onTextInputPress, onTapCloseSuggestions }) => {
  const [userSessions, setUserSessions] = useState([]);
  const [chartData, setChartData] = useState(template);
  const [currentSession, setCurrentSession] = useState('');

  useEffect(() => {
    let tempObject = {};
  
    setUserSessions(Object.keys(data));
  
    Object.keys(data).forEach((key) => {
      let tempTemplate = JSON.parse(JSON.stringify(template));
      tempTemplate.forEach((item) => {
        item.value = data[key][item.legendName.toLowerCase()];
      });
  
      // Filter out entries with zero values
      // For demo purposes, the zero values are not filtered out
      // And the template contains at least a value of one so that the chart is displayed completely
      // Later on, the template should be zeroed out and the zero values should be filtered out
      // tempTemplate = tempTemplate.filter((item) => item.value !== 0);
  
      tempObject[key] = tempTemplate;
    });
  
    setChartData(tempObject);
    setCurrentSession(Object.keys(data)[0]);
  }, [data]);  

  const processed = chartData[currentSession] ? chartData[currentSession].reduce((total, item) => total + item.value, 0) : 0;
  const healthy = chartData[currentSession] ? chartData[currentSession].find((item) => item.legendName === "Healthy").value : 0;
  const percentHealthy = processed !== 0 ? Math.ceil((healthy / processed) * 100) : 0;
  const qualityState = percentHealthy >= 90 ? "Excellent" : percentHealthy >= 80 ? "Good" : percentHealthy >= 70 ? "Fair" : "Poor";
  

  /**
   * Renders the chart legend based on the current session's chart data.
   * @returns {JSX.Element[] | null} The rendered chart legend components or null if there is no chart data.
   */
  const renderChartLegend = () => {

    if (!chartData[currentSession] || !Array.isArray(chartData[currentSession])) {
      return null;
    }

    return chartData[currentSession].map((blackHole, index) => {
      if (index % 2 === 0 && index + 1 !== chartData[currentSession].length) {
        const tempItemOne = chartData[currentSession][index]
        const tempItemTwo = chartData[currentSession][index + 1]
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
      } else if (chartData[currentSession].length % 2 !== 0 && index + 1 === chartData[currentSession].length) {
        const tempItem = chartData[currentSession][index];
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
            onSelect={setCurrentSession}
            onTextInputPress={onTextInputPress}
            onTapCloseSuggestions={onTapCloseSuggestions}
          />
        </View>
        <View style={styles.chartContent}>
          <PieChart
            data={chartData[currentSession] ? chartData[currentSession] : template}
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
