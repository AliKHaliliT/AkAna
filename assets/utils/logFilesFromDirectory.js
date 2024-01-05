import RNFetchBlob from 'rn-fetch-blob';

const listFilesInDirectory = async (folderName) => {
  const dirPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}`;

  try {
    const files = await RNFetchBlob.fs.ls(dirPath);
    console.log(`Files in directory ${folderName}:`, files);
    
    // If you want to log details of each file
    // files.forEach(async (file) => {
    //   const stats = await RNFetchBlob.fs.stat(`${dirPath}/${file}`);
    //   console.log(`File: ${file}, Size: ${stats.size} bytes`);
    // });
  } catch (error) {
    console.error(`Error listing files in directory ${folderName}:`, error);
  }
};

export default listFilesInDirectory;