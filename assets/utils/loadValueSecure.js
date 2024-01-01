import * as Keychain from "react-native-keychain";

const loadValueSecure = async (service) => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: service });
    if (credentials) {
      console.log(`Value loaded from keychain with service ${service}.`);
      return credentials;
    } else {
      console.log(`No value found in keychain for service ${service}.`);
      return null;
    }
  } catch (error) {
    console.error("Error loading value securely:", error);
    return null;
  }
};

export default loadValueSecure;
