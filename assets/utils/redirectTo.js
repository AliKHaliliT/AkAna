import { Linking } from "react-native";

const redirectTo = (link) => {
  Linking.openURL(link);
};

export default redirectTo;