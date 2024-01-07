import RNFetchBlob from 'rn-fetch-blob';

const readJSON = async (folderName, fileName, verbose = false) => {
  const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}/${fileName}.json`;

  try {
    const jsonData = await RNFetchBlob.fs.readFile(filePath, 'utf8');
    const jsonObject = JSON.parse(jsonData);
    if (verbose) {
      console.log(`JSON data from ${fileName}.json:`, jsonObject);
    }
    return jsonObject; // Returning the parsed JSON object
  } catch (error) {
    if (verbose) {
      console.log(`Error reading JSON file ${fileName}.json:`, error);
    }
    return null;
  }
};

export default readJSON;
