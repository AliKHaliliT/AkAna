import React from "react"
import { Dimensions, View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

const DetailCard = ({ iconName, title, description, 
                      IconComponent=Icon, containerStyle=styles.container,
                      iconContainerStyle=styles.iconContainer,
                      iconStyle=styles.iconStyle,
                      commonTextBoldStyle=styles.commonTextBold,
                    }) => {
  return (
  <View style={containerStyle}>
    <View style={iconContainerStyle}>
      <IconComponent name={iconName} size={responsiveSize / 22} color="white" style={iconStyle} />
      <Text style={{...commonTextBoldStyle}}>{title}</Text>
    </View>
    <Text style={{...commonTextBoldStyle, fontFamily: "Montserrat-Medium"}}>{description}</Text>
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
    fontSize: responsiveSize / 30,
    color: '#ffffff',
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold',
  },
});

export default DetailCard
