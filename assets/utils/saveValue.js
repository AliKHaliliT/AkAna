import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Saves a value to AsyncStorage.
 *
 * @param {string} key - The key to save the value under.
 * @param {string} value - The value to be saved.
 * @param {boolean} [verbose=false] - Optional. If true, logs success or error messages to the console.
 * @returns {Promise<void>} - A promise that resolves when the value is successfully saved or rejects with an error.
 */
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
