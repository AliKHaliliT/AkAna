import axios from "axios";
import addressPrefix from "./tempServerAddress";

const instance = axios.create({
  timeout: 10000, // Timeout set to 5 seconds
});

/**
 * Sends a POST request to the specified API endpoint with the provided services data.
 * @param {Object} servicesData - The data to be sent in the request body.
 * @returns {Promise<Object>} - A Promise that resolves to the response data if the request is successful,
 * or an error object if the request fails.
 */
const services = async (servicesData) => {
  try {
    const response = await instance.post(`${addressPrefix}/data/services/`, servicesData);
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

export default services;
