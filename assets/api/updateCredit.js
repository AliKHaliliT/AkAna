import axios from "axios";
import addressPrefix from "./tempServerAddress";

const instance = axios.create({
  timeout: 10000, // Timeout set to 5 seconds
});

/**
 * Updates the credit using the provided data.
 * @param {Object} updateCreditData - The data to update the credit.
 * @returns {Promise<Object>} - The response from the server or an error message.
 */
const updateCredit = async (updateCreditData) => {
  try {
    const response = await instance.patch(`${addressPrefix}/actions/update_credit/`, updateCreditData);
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

export default updateCredit;
