import axios from "axios";
import addressPrefix from "./tempServerAddress";

const instance = axios.create({
  timeout: 10000, // Timeout set to 5 seconds
});

/**
 * Updates user credentials.
 * @param {Object} updateUserCredentialsData - The data for updating user credentials.
 * @returns {Promise<Object>} - The response object.
 */
const updateUserCredentials = async (updateUserCredentialsData) => {
  try {
    const response = await instance.patch(`${addressPrefix}/actions/update_user_credentials/`, updateUserCredentialsData);
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      return error.response.data;
    } else if (error.request) {
      console.log("No response received:", error.request);
      return { message: "No response received" };
    } else {
      // Something happened in setting up the request that triggered an error
      console.log("Error setting up the request:", error.message);
      return { message: "Request setup error" };
    }
  }
};

export default updateUserCredentials;
