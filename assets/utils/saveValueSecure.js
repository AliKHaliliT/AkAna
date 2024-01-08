import * as Keychain from "react-native-keychain";

/**
 * Saves a value securely using Keychain.
 *
 * @param {string} username - The username to be saved.
 * @param {string} password - The password to be saved.
 * @param {string} service - The service identifier for the saved value.
 * @param {boolean} [verbose=false] - Optional flag to enable verbose logging.
 * @returns {Promise<void>} - A promise that resolves when the value is saved successfully.
 */
const saveValueSecure = async (username, password, service, verbose = false) => {
  try {
    await Keychain.setGenericPassword(username, password, { service });
    if (verbose) {
      console.log("Credentials stored successfully!");
    }
  } catch (error) {
    if (verbose) {
      console.error("Keychain couldn't be accessed!", error);
    }
  }
};

export default saveValueSecure;
