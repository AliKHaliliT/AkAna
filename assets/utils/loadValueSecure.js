import * as Keychain from "react-native-keychain";

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
