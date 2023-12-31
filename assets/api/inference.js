import axios from "axios";
import addressPrefix from "./tempServerAddress";

const instance = axios.create({
  timeout: 10000, // Timeout set to 10 seconds
});

/**
 * Performs an inference request to the server using the provided credentials and video.
 * @param {Object} credentials - The credentials object containing the necessary authentication information.
 * @param {string} credentials.username - The username for authentication.
 * @param {string} credentials.password - The password for authentication.
 * @param {string} video - The path or URI of the video file to be used for inference.
 * @returns {Promise<Object>} - A promise that resolves to the response object from the server.
 */
const inference = async (credentials, video) => {
  try {
  const url = `${addressPrefix}/actions/inference/`;

  const formData = new FormData();

  Object.keys(credentials).forEach(key => {
    formData.append(key, credentials[key]);
  });

  formData.append('file', {
    uri: video,
    type: 'video/mp4',
    name: 'video.mp4',
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await instance.post(url, formData, config);

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

export default inference;
