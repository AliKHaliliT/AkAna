import axios from "axios";
import addressPrefix from "./tempServerAddress";

const instance = axios.create({
  timeout: 10000, // Timeout set to 5 seconds
});

/**
 * Sends a request to reset the password.
 * @param {Object} forgotPasswordData - The data required for the password reset.
 * @returns {Promise<Object>} - The response object containing the result of the request.
 */
const forgotPassword = async (forgotPasswordData) => {
  try {
    const response = await instance.post(`${addressPrefix}/actions/forgot_password/`, forgotPasswordData);
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

export default forgotPassword;
