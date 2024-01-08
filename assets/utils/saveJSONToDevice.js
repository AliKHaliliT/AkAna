import RNFetchBlob from "rn-fetch-blob";

/**
 * Saves a JSON object to a file on the device.
 *
 * @param {string} folderName - The name of the folder where the file will be saved.
 * @param {string} fileName - The name of the file (without extension) to be saved.
 * @param {object} json - The JSON object to be saved.
 * @param {boolean} [verbose=false] - Optional. If true, logs success or error messages to the console.
 * @returns {Promise<void>} - A promise that resolves when the JSON is successfully saved, or rejects with an error.
 */
const saveJSON = async (folderName, fileName, json, verbose = false) => {
  const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}/${fileName}.json`;

  try {
    await RNFetchBlob.fs.writeFile(path, JSON.stringify(json), 'utf8');
    if (verbose) {
      console.log(`JSON for ${fileName} saved successfully.`);
    }
  } catch (error) {
    if (verbose) {
      console.log(`Error saving JSON for ${fileName}:`, error);
    }
  }
};

export default saveJSON;