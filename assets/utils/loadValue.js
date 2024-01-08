import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Loads a value from AsyncStorage based on the provided key.
 * @param {string} key - The key to retrieve the value.
 * @param {boolean} [verbose=false] - Whether to log verbose output.
 * @returns {Promise<string|null>} - The loaded value, or null if not found or an error occurred.
 */
const loadValue = async (key, verbose = false) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      if (verbose) {
        console.log("Value loaded successfully:", value);
      }
      return value;
    } else {
      if (verbose) {
        console.log("No value found for the key:", key);
      }
      return null;
    }
  } catch (error) {
    if (verbose) {
      console.error("Error loading value:", error);
    }
    return null;
  }
};

export default loadValue;
