import axios from "axios";
import addressPrefix from "./tempServerAddress";

const instance = axios.create({
  timeout: 10000, // Timeout set to 5 seconds
});

/**
 * Deletes an account.
 * @param {Object} deleteAccountData - The data required to delete the account.
 * @returns {Promise<Object>} - A promise that resolves to the response from the server or an error object.
 */
const deleteAccount = async (deleteAccountData) => {
  try {
    const response = await instance.delete(`${addressPrefix}/actions/delete_account/`, { data: deleteAccountData });
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

export default deleteAccount;
