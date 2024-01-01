import * as Keychain from "react-native-keychain";

const deleteValueSecure = async (key) => {
  try {
    await Keychain.resetGenericPassword({ service: key });
    console.log("Credentials deleted successfully!");
  } catch (error) {
    console.error("Keychain couldn\'t be accessed!", error);
  }
};

export default deleteValueSecure;