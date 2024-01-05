import NetInfo from '@react-native-community/netinfo';
import RNFetchBlob from 'rn-fetch-blob';
import saveValue from './saveValue';
import loadValue from './loadValue';
import sendUserLamenessDetectionData from './sendUserLamenessDetectionData';


// Function to send unsent data if internet is available
const sendDataIfOnline = async () => {
  try {
    const unsentData = await loadValue('unsentData');
    const unsentDataArray = JSON.parse(unsentData) || [];

    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        for (const date of unsentDataArray) {
          const fileName = `unsent_data_${date}.json`;
          const filePath = RNFetchBlob.fs.dirs.DocumentDir + `/${fileName}`;

          const data = await RNFetchBlob.fs.readFile(filePath, 'utf8');
          const jsonData = JSON.parse(data);

          // Send jsonData using your send function (sendUserLamenessDetectionData)
          // Assuming sendUserLamenessDetectionData is your function to send data
          const response = await sendUserLamenessDetectionData(jsonData);
          console.log('Response:', response);

          const updatedUnsentData = unsentDataArray.filter(item => item !== date);
          await saveValue('unsentData', JSON.stringify(updatedUnsentData));
          await RNFetchBlob.fs.unlink(filePath);
        }
      }
    });
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

export default sendDataIfOnline;