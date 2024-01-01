import * as Keychain from "react-native-keychain";

const saveValueSecure = async (username, password, service) => {
  try {
    await Keychain.setGenericPassword(username, password, { service: service });
    console.log("Credentials stored successfully!");
  } catch (error) {
    console.error("Keychain couldn\'t be accessed!", error);
  }
};

export default saveValueSecure;