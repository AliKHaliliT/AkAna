import RNFetchBlob from "rn-fetch-blob";

const saveJSON = async (fodlerName, fileName, json) => {
  const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${fodlerName}/${fileName}.json`;

  try {
    await RNFetchBlob.fs.writeFile(path, JSON.stringify(description), 'utf8');
    console.log(`Description for ${fileName} saved successfully.`);
  } catch (error) {
    console.error(`Error saving description for ${fileName}:`, error);
  }
};

export default saveJSON;