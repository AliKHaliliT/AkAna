/**
 * Deletes a value from AsyncStorage based on the provided key.
 * @param {string} key - The key of the value to be deleted.
 * @param {boolean} [verbose=false] - Optional. If set to true, logs additional information to the console.
 * @returns {Promise<void>} - A promise that resolves once the value is deleted.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const deleteValue = async (key, verbose = false) => {
  try {
    await AsyncStorage.removeItem(key);
    if (verbose) {
      console.log("Value deleted successfully for key:", key);
    }
  } catch (error) {
    if (verbose) {
      console.error("Error deleting value:", error);
    }
  }
};

export default deleteValue;
