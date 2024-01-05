import RNFetchBlob from 'rn-fetch-blob';
import saveValue from './saveValue';
import loadValue from './loadValue';

// Function to save unsent data to a file and store the date in AsyncStorage
const saveDataToFile = async (data) => {
  const date = new Date().toISOString();
  const fileName = `unsent_data_${date}.json`;

  try {
    await RNFetchBlob.fs.writeFile(RNFetchBlob.fs.dirs.DocumentDir + `/${fileName}`, JSON.stringify(data), 'utf8');
    await saveValue('unsentData', JSON.stringify([...(await loadValue('unsentData')) || [], date]));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export default saveDataToFile;