import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to save a value with a specified key
const saveValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Value saved successfully!");
  } catch (error) {
    console.error("Error saving value:", error);
  }
};

export default saveValue;