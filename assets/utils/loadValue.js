import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to load a value for a specified key
const loadValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Value loaded successfully:", value);
      return value;
    } else {
      console.log("No value found for the key:", key);
      return null;
    }
  } catch (error) {
    console.error("Error loading value:", error);
    return null;
  }
};

export default loadValue;
