import { Linking } from "react-native";

/**
 * Redirects to the specified link.
 * @param {string} link - The link to redirect to.
 */
const redirectTo = (link) => {
  Linking.openURL(link);
};

export default redirectTo;