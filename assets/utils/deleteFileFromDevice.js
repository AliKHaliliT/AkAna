import RNFetchBlob from 'rn-fetch-blob';

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
