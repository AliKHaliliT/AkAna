import RNFetchBlob from "rn-fetch-blob";

const saveImages = async (folderName, fileName, imageBase64) => {
  const path = `${RNFetchBlob.fs.dirs.DocumentDir}/data/${folderName}/${fileName}.jpg`;

  try {
    await RNFetchBlob.fs.writeFile(path, imageBase64, 'base64');
    console.log(`Image for ${fileName} saved successfully.`);
  } catch (error) {
    console.error(`Error saving image for ${fileName}:`, error);
  }
};

export default saveImages;