const formatDate = () => {
  const currentDate = new Date();
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const monthAbbreviation = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  // Adding a leading zero to the day if it's a single digit
  const formattedDay = (day < 10) ? `0${day}` : day;

  return `${monthAbbreviation} ${formattedDay} ${year}`;
};

export default formatDate;