import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to delete a value for a specified key
const deleteValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Value deleted successfully for key:", key);
  } catch (error) {
    console.error("Error deleting value:", error);
  }
};

export default deleteValue;