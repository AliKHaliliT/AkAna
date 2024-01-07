import RNFetchBlob from 'rn-fetch-blob';

const listDir = async (folderName, verbose = false) => {
  const dirPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}`;

  try {
    const files = await RNFetchBlob.fs.ls(dirPath);
    if (verbose) {
      console.log(`The full path to the directory ${folderName} is:`, dirPath);
      console.log(`Files in directory ${folderName}:`, files);

      const sortedFiles = files.sort((a, b) => {
        const getDateFromFileName = (fileName) => {
          const dateStr = fileName.split('.json')[0]; // Remove .json extension
          const [month, day, year] = dateStr.split(' ');
          const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month);
          return new Date(year, monthIndex, day);
        };

        const dateA = getDateFromFileName(a);
        const dateB = getDateFromFileName(b);
        return dateA - dateB;
      });

      console.log('Sorted files:', sortedFiles);
    }
    return files.sort((a, b) => {
      const getDateFromFileName = (fileName) => {
        const dateStr = fileName.split('.json')[0]; // Remove .json extension
        const [month, day, year] = dateStr.split(' ');
        const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month);
        return new Date(year, monthIndex, day);
      };

      const dateA = getDateFromFileName(a);
      const dateB = getDateFromFileName(b);
      return dateA - dateB;
    });
  } catch (error) {
    if (verbose) {
      console.log(`Error listing files in directory ${folderName}:`, error);
    }
    return null;
  }
};

export default listDir;
