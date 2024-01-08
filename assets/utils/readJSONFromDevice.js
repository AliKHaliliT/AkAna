import RNFetchBlob from 'rn-fetch-blob';

/**
 * Reads a JSON file from the device.
 * @param {string} folderName - The name of the folder where the JSON file is located.
 * @param {string} fileName - The name of the JSON file (without the extension).
 * @param {boolean} [verbose=false] - Optional parameter to enable verbose logging.
 * @returns {Promise<Object|null>} - A promise that resolves to the parsed JSON object, or null if an error occurs.
 */
const readJSON = async (folderName, fileName, verbose = false) => {
  const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}/${fileName}.json`;

  try {
    const jsonData = await RNFetchBlob.fs.readFile(filePath, 'utf8');
    const jsonObject = JSON.parse(jsonData);
    if (verbose) {
      console.log(`JSON data from ${fileName}.json:`, jsonObject);
    }
    return jsonObject; // Returning the parsed JSON object
  } catch (error) {
    if (verbose) {
      console.log(`Error reading JSON file ${fileName}.json:`, error);
    }
    return null;
  }
};

export default readJSON;
