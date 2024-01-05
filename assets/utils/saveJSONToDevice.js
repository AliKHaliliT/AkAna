import RNFetchBlob from "rn-fetch-blob";

const saveJSON = async (fodlerName, fileName, json) => {
  const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${fodlerName}/${fileName}.json`;

  try {
    await RNFetchBlob.fs.writeFile(path, JSON.stringify(json), 'utf8');
    console.log(`JSON for ${fileName} saved successfully.`);
  } catch (error) {
    console.error(`Error saving JSON for ${fileName}:`, error);
  }
};

export default saveJSON;