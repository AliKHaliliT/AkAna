import * as Keychain from "react-native-keychain";

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
