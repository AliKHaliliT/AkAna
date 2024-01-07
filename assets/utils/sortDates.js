const sortFilesByDate = (files) => {
  const getDateFromFileName = (fileName) => {
    const [month, day, year] = fileName.split(' ');
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month);
    return new Date(year, monthIndex, day);
  };

  return files.sort((a, b) => {
    const dateA = getDateFromFileName(a);
    const dateB = getDateFromFileName(b);
    return dateA - dateB;
  });
};

export default sortFilesByDate;