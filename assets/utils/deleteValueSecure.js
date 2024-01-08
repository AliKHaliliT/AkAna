/**
 * Deletes a value securely from the keychain.
 * @param {string} key - The service key associated with the value to be deleted.
 * @param {boolean} [verbose=false] - Whether to log verbose output.
 * @returns {Promise<void>} - A promise that resolves when the value is deleted successfully.
 */
import * as Keychain from "react-native-keychain";

const deleteValueSecure = async (key, verbose = false) => {
  try {
    await Keychain.resetGenericPassword({ service: key });
    if (verbose) {
      console.log("Credentials deleted successfully!");
    }
  } catch (error) {
    if (verbose) {
      console.error("Keychain couldn't be accessed!", error);
    }
  }
};

export default deleteValueSecure;
