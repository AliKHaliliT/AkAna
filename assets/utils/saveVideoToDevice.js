import RNFetchBlob from "rn-fetch-blob";

const saveVideo = async (folderName, fileName, videoUri, verbose = false) => {
  const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}/${fileName}.mp4`;

  try {
    const videoData = await RNFetchBlob.fs.readFile(videoUri, 'base64');
    await RNFetchBlob.fs.writeFile(path, videoData, 'base64');
    if (verbose) {
      console.log(`Video ${fileName} saved successfully.`);
    }
  } catch (error) {
    if (verbose) {
      console.error(`Error saving video ${fileName}:`, error);
    }
  }
};

export default saveVideo;
