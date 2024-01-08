import React from "react"
import { Dimensions, View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Renders a detail card component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.iconName - The name of the icon.
 * @param {string} props.title - The title of the detail card.
 * @param {string} props.description - The description of the detail card.
 * @param {React.Component} [props.IconComponent=Icon] - The component used for rendering the icon.
 * @param {Object} [props.containerStyle=styles.container] - The style object for the container view.
 * @param {Object} [props.iconContainerStyle=styles.iconContainer] - The style object for the icon container view.
 * @param {Object} [props.iconStyle=styles.iconStyle] - The style object for the icon.
 * @param {Object} [props.commonTextBoldStyle=styles.commonTextBold] - The style object for the common text bold style.
 * @returns {React.Component} The rendered detail card component.
 */
const DetailCard = ({ iconName, title, description, 
                      IconComponent=Icon, containerStyle=styles.container,
                      iconContainerStyle=styles.iconContainer,
                      iconStyle=styles.iconStyle,
                      commonTextBoldStyle=styles.commonTextBold,
                    }) => {
  return (
  <View style={containerStyle}>
    <View style={iconContainerStyle}>
      <IconComponent name={iconName} size={responsiveSize / 22} color="#d6e4ff" style={iconStyle} />
      <Text style={{...commonTextBoldStyle}}>{title}</Text>
    </View>
    <Text style={{...commonTextBoldStyle, fontFamily: "Montserrat-Medium", color: "#ffffff"}}>{description}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: { 
    marginLeft: 10, 
    marginBottom: 5 
  },
  commonTextBold: {
    fontSize: responsiveSize / 35,
    color: '#d6e4ff',
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold',
  },
});

export default DetailCard
