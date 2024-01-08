import React, { useState, useRef, useEffect } from "react";
import { Dimensions, View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

const responsiveSize = (Dimensions.get("window").width + Dimensions.get("window").height) / 2;

/**
 * Dropdown component for selecting options.
 *
 * @param {Object} options - The array of options to display in the dropdown.
 * @param {Function} onSelect - The function to call when an option is selected.
 * @param {Function} onTextInputPress - The function to call when the text input is pressed.
 * @param {Function} onTapCloseSuggestions - The function to call when suggestions are closed.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
const Dropdown = ({ options, onSelect, onTextInputPress, onTapCloseSuggestions}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [textInputWidth, setTextInputWidth] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [buttonLayout, setButtonLayout] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [modalOptions, setModalOptions] = useState([]);

  const textInputProps= useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    filterOptions();
  }, [modalVisible]);

  /**
   * Handles the input change event.
   * 
   * @param {string} text - The new input text value.
   */
  const handleInputChange = (text) => {
    onTapCloseSuggestions[1](true);
    setSearchText(text);
    textInputProps.current.measure((blackHole, blackHole2, width, height, pageX, pageY) => {
      setTextInputWidth(width);
    });
    setShowSuggestions(true);
  };
  
  const maxSuggestions = 3; // Maximum number of suggestions to display

  /**
   * Filters the options based on the searchText and returns a subset of options.
   * If searchText is empty, returns the original options.
   * @returns {Array} The filtered options.
   */
  const filterOptions = () => {
    let filteredOptions = options;
    if (searchText) {
      filteredOptions = options
        .filter((option) =>
          option.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort(
          (a, b) =>
            a.toLowerCase().indexOf(searchText.toLowerCase()) -
            b.toLowerCase().indexOf(searchText.toLowerCase())
        );
    } else {
      setModalOptions(options);
    }
    return filteredOptions.slice(0, maxSuggestions);
  };

  const handleOptionSelect = (option) => {
    onSelect(option);
    setModalVisible(false);
    setSearchText(option);
    setShowSuggestions(false);
    setSelectedOption(option);
  };

  const handleDropDownButtonPress = () => {
    setModalVisible(true);
    onButtonLayout();
    setShowSuggestions(false);
    setModalOptions(filterOptions());
  };

  const windowWidth = Dimensions.get("window").width;

  const onButtonLayout = () => {
    buttonRef.current &&
      buttonRef.current.measure((blackHole, blackHole2, width, height, pageX, pageY) => {
        setButtonLayout({ x: pageX, y: pageY, width, height });
      });
  };

  const dropdownPosition = buttonLayout
    ? {
        top: buttonLayout.y + buttonLayout.height,
        right: windowWidth - buttonLayout.x - buttonLayout.width,
        opacity: 1,
      }
    : {};

  return (
    <View style={styles.container}>
      <Text style={styles.sessionText}>
        Session: {selectedOption ? selectedOption : options[0]}
      </Text>
      <View style={styles.inputContainer}>
        <LinearGradient
          colors={["#e5e2d3", "#fefbea"]}
          style={styles.input}
        >
          <TextInput
            ref={textInputProps}
            style={styles.inputText}
            placeholder={"Select or Type ..."}
            placeholderTextColor={"#6a7477"}
            cursorColor={"#6a7477"}
            value={searchText}
            onTouchStart={() => onTextInputPress(true)}
            onFocus={() => onTapCloseSuggestions[1](true)}
            onChangeText={handleInputChange}
            onBlur={() => {
              onTextInputPress(false);
              if (options.includes(searchText)) {
                onSelect(searchText);
              }
            }}
          />
        </LinearGradient>
        {showSuggestions &&
          onTapCloseSuggestions[0] &&
          searchText != '' && (
            <LinearGradient
              colors={["#e5e2d3", "#fefbea"]}
              style={styles.suggestionContainer}
            >
              <View>
                {filterOptions().map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.suggestion,
                      index === filterOptions().length - 1 && {
                        borderBottomWidth: 0,
                      },
                      {width: textInputWidth},
                    ]}
                    onPress={() => handleOptionSelect(option)}
                  >
                    <Text style={styles.selectedLogText}>{option}</Text>
                  </TouchableOpacity>
                ))}
                {filterOptions().length === 0 && (
                  <LinearGradient
                    colors={["#e5e2d3", "#fefbea"]}
                    style={{...styles.defaultSuggestion, width: textInputWidth }}
                  >
                    <Text style={styles.selectedLogText}>No Results</Text>
                  </LinearGradient>
                )}
              </View>
            </LinearGradient>
          )}
        <TouchableOpacity
          ref={buttonRef}
          onPress={handleDropDownButtonPress}
          style={styles.dropdownButton}
        >
          <LinearGradient
            colors={["#e5e2d3", "#fefbea"]}
            style={styles.dropdownButtonBackground}
          >
            <Icon name={"caret-down"} size={responsiveSize / 38} color={"#06181d"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal
        animationType={"fade"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <LinearGradient
          colors={["#e5e2d3", "#fefbea"]}
          style={[styles.modal, dropdownPosition]}
        >
          <ScrollView>
            {modalOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  index === modalOptions.length - 1 && { borderBottomWidth: 0 },
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.selectedLogText}>{option}</Text>
              </TouchableOpacity>
            ))}
            {modalOptions.length === 0 && (
              <LinearGradient
                colors={["#e5e2d3", "#fefbea"]}
                style={styles.defaultOption}
              >
                <Text style={styles.selectedLogText}>No Results</Text>
              </LinearGradient>
            )}
          </ScrollView>
        </LinearGradient>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    zIndex: 1,
  },
  sessionText: {
    fontSize: responsiveSize / 38,
    color: "#ffffff",
    fontFamily: "Montserrat-Medium",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: "#06181d",
    fontFamily: "Montserrat-Medium",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: "#06181d",
  },
  inputText: {
    fontSize: responsiveSize / 38,
    color: "#06181d",
    fontFamily: "Montserrat-Medium",
  },
  suggestionContainer: {
    position: "absolute",
    top: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#06181d",
  },
  suggestion: {
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#06181d",
  },
  selectedLogText: {
    fontSize: responsiveSize / 38,
    color: "#06181d",
    fontFamily: "Montserrat-Medium",
  },
  defaultSuggestion: {
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
  },
  dropdownButton: {
    zIndex: 1,
  },
  dropdownButtonBackground: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 5,
  },
  modal: {
    position: "absolute",
    opacity: 0,
    padding: 10,
    maxHeight: responsiveSize / 3.2,
    borderWidth: 1,
    borderColor: "#06181d",
    borderRadius: 5,
  },
  overlay: {
    flex: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#06181d",
  },
});

export default Dropdown;
