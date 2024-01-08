import RNFetchBlob from 'rn-fetch-blob';

/**
 * Reads an image file from the device and returns it as a base64 string.
 * @param {string} folderName - The name of the folder where the image file is located.
 * @param {string} fileName - The name of the image file.
 * @param {boolean} [verbose=false] - Optional. If true, logs additional information to the console.
 * @returns {Promise<string|null>} A promise that resolves to the base64 string of the image file, or null if there was an error.
 */
const readBase64Image = async (folderName, fileName, verbose = false) => {
  const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}/${fileName}`; 
  try {
    const base64String = await RNFetchBlob.fs.readFile(filePath, 'base64');
    if (verbose) {
      console.log('Image read successfully');
    }
    return base64String;
  } catch (error) {
    if (verbose) {
      console.error('Error reading image:', error);
    }
    return null;
  }
};

export default readBase64Image;
