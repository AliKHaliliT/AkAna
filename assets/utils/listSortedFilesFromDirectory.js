import RNFetchBlob from 'rn-fetch-blob';

/**
 * Lists the files in a directory and sorts them based on their file names.
 * @param {string} folderName - The name of the folder.
 * @param {boolean} [verbose=false] - Whether to log additional information.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of sorted file names.
 */
const listDir = async (folderName, verbose = false) => {
  const dirPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${folderName}`;

  try {
    const files = await RNFetchBlob.fs.ls(dirPath);
    if (verbose) {
      console.log(`The full path to the directory ${folderName} is:`, dirPath);
      console.log(`Files in directory ${folderName}:`, files);

      /**
       * Sorts an array of file names based on their date in ascending order.
       *
       * @param {string[]} files - The array of file names to be sorted.
       * @returns {string[]} - The sorted array of file names.
       */
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
      /**
       * Extracts the date from a given file name.
       * @param {string} fileName - The name of the file.
       * @returns {Date} The date extracted from the file name.
       */
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
