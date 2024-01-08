import RNFetchBlob from 'rn-fetch-blob';

/**
 * Deletes a directory from the device.
 * @param {string} folderName - The name of the directory to be deleted.
 * @param {boolean} [verbose=false] - Optional. If set to true, logs additional information to the console.
 * @returns {Promise<void>} - A promise that resolves when the directory is deleted successfully.
 */
const deleteDirectory = async (folderName, verbose = false) => {
  const dirToDelete = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}`;

  try {
    // Check if the directory exists before attempting to delete it
    const isDirExists = await RNFetchBlob.fs.exists(dirToDelete);
    
    if (isDirExists) {
      // Delete the directory and its contents
      await RNFetchBlob.fs.unlink(dirToDelete);
      if (verbose) {
        console.log(`Directory ${folderName} deleted successfully.`);
      }
    } else {
      if (verbose) {
        console.log(`Directory ${folderName} does not exist.`);
      }
    }
  } catch (error) {
    if (verbose) {
      console.log(`Error deleting directory ${folderName}:`, error);
    }
  }
};

export default deleteDirectory;
