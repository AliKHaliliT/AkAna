import axios from "axios";
import addressPrefix from "./tempServerAddress";

const instance = axios.create({
  timeout: 10000, // Timeout set to 5 seconds
});

/**
 * Sends user lameness detection data to the server.
 * @param {Object} sendUserLamenessDetectionDataData - The data to be sent.
 * @returns {Promise<Object>} - The response from the server.
 */
const sendUserLamenessDetectionData = async (sendUserLamenessDetectionDataData) => {
  try {
    const response = await instance.post(`${addressPrefix}/actions/send_user_lameness_detection_data/`, sendUserLamenessDetectionDataData);
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

export default sendUserLamenessDetectionData;
