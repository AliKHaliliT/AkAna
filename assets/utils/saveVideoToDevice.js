import RNFetchBlob from "rn-fetch-blob";

const saveVideo = async (folderName, fileName, base64Video) => {
  const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}/${fileName}.mp4`;

  try {
    const base64Data = base64Video.split(';base64,').pop();
    await RNFetchBlob.fs.writeFile(path, base64Data, 'base64');
    console.log(`Video ${fileName} saved successfully.`);
  } catch (error) {
    console.error(`Error saving video ${fileName}:`, error);
  }
};

export default saveVideo;
