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
