import RNFetchBlob from 'rn-fetch-blob';

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
