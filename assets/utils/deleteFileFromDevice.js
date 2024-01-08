import RNFetchBlob from 'rn-fetch-blob';

/**
 * Deletes a file from the device.
 * @param {string} fileName - The name of the file to be deleted.
 * @param {boolean} [verbose=false] - Optional. If set to true, logs additional information to the console.
 * @returns {Promise<void>} - A promise that resolves when the file is deleted successfully or rejects with an error.
 */
const deleteFile = async (fileName, verbose = false) => {
  const fileToDelete = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`;

  try {
    // Check if the file exists before attempting to delete it
    const isFileExists = await RNFetchBlob.fs.exists(fileToDelete);
    
    if (isFileExists) {
      // Delete the file
      await RNFetchBlob.fs.unlink(fileToDelete);
      if (verbose) {
        console.log(`File ${fileName} deleted successfully.`);
      }
    } else {
      if (verbose) {
        console.log(`File ${fileName} does not exist.`);
      }
    }
  } catch (error) {
    if (verbose) {
      console.error(`Error deleting file ${fileName}:`, error);
    }
  }
};

export default deleteFile;
