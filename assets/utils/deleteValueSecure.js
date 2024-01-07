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
