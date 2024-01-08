import RNFetchBlob from 'rn-fetch-blob';

/**
 * Saves a base64 image to the device.
 * @param {string} folderName - The name of the folder where the image will be saved.
 * @param {string} fileName - The name of the file.
 * @param {string} base64String - The base64 encoded image string.
 * @param {boolean} [verbose=false] - Optional. If true, logs additional information.
 * @returns {Promise<string>} - A promise that resolves to the file path where the image is saved.
 * @throws {Error} - If there is an error saving the image.
 */
const saveBase64Image = async (folderName, fileName, base64String, verbose = false) => {
  const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}/${fileName}`;
  try {
    const response = await RNFetchBlob.fs.writeFile(filePath, base64String, 'base64');
    if (verbose) {
      console.log('Image saved successfully at:', response);
    }
    return response;
  } catch (error) {
    if (verbose) {
      console.error('Error saving image:', error);
    }
    throw error;
  }
};

export default saveBase64Image;
