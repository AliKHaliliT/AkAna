import RNFetchBlob from "rn-fetch-blob";

/**
 * Saves a video to the device.
 *
 * @param {string} folderName - The name of the folder where the video will be saved.
 * @param {string} fileName - The name of the video file.
 * @param {string} videoUri - The URI of the video to be saved.
 * @param {boolean} [verbose=false] - Optional. If true, logs verbose information to the console.
 * @returns {Promise<void>} - A promise that resolves when the video is saved successfully, or rejects with an error.
 */
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
