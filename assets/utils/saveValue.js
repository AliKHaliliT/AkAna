import AsyncStorage from "@react-native-async-storage/async-storage";

const saveValue = async (key, value, verbose = false) => {
  try {
    await AsyncStorage.setItem(key, value);
    if (verbose) {
      console.log("Value saved successfully!");
    }
  } catch (error) {
    if (verbose) {
      console.error("Error saving value:", error);
    }
  }
};

export default saveValue;
