import * as Keychain from "react-native-keychain";

/**
 * Loads a value securely from the keychain.
 * @param {string} service - The service name used to store the value in the keychain.
 * @param {boolean} [verbose=false] - Whether to log verbose output.
 * @returns {Promise<object|null>} - The credentials object if found, otherwise null.
 */
const loadValueSecure = async (service, verbose = false) => {
  try {
    const credentials = await Keychain.getGenericPassword({ service });
    if (credentials) {
      if (verbose) {
        console.log(`Value loaded from keychain with service ${service}.`);
      }
      return credentials;
    } else {
      if (verbose) {
        console.log(`No value found in keychain for service ${service}.`);
      }
      return null;
    }
  } catch (error) {
    if (verbose) {
      console.error("Error loading value securely:", error);
    }
    return null;
  }
};

export default loadValueSecure;
