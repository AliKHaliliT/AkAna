import axios from "axios";
import addressPrefix from "./tempServerAddress";

const instance = axios.create({
  timeout: 10000, // Timeout set to 5 seconds
});

/**
 * Sends user information data to the server.
 * @param {Object} userInfoData - The user information data to be sent.
 * @returns {Promise<Object>} - A promise that resolves to the server response or an error object.
 */
const userInfo = async (userInfoData) => {
  try {
    const response = await instance.post(`${addressPrefix}/data/user_info/`, userInfoData);
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

export default userInfo;
