import RNFetchBlob from 'rn-fetch-blob';

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
