import RNFetchBlob from 'rn-fetch-blob';

const deleteDirectory = async (folderName) => {
  const dirToDelete = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}`;

  try {
    // Check if the directory exists before attempting to delete it
    const isDirExists = await RNFetchBlob.fs.exists(dirToDelete);
    
    if (isDirExists) {
      // Delete the directory and its contents
      await RNFetchBlob.fs.unlink(dirToDelete);
      console.log(`Directory ${folderName} deleted successfully.`);
    } else {
      console.log(`Directory ${folderName} does not exist.`);
    }
  } catch (error) {
    console.error(`Error deleting directory ${folderName}:`, error);
  }
};

export default deleteDirectory;