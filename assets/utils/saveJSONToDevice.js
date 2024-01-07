import RNFetchBlob from "rn-fetch-blob";

const saveJSON = async (folderName, fileName, json, verbose = false) => {
  const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}/${fileName}.json`;

  try {
    await RNFetchBlob.fs.writeFile(path, JSON.stringify(json), 'utf8');
    if (verbose) {
      console.log(`JSON for ${fileName} saved successfully.`);
    }
  } catch (error) {
    if (verbose) {
      console.log(`Error saving JSON for ${fileName}:`, error);
    }
  }
};

export default saveJSON;