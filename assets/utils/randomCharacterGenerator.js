const getRandomAlphabetChar = (uppercase = false) => {
  const low = uppercase ? 65 : 97;
  const high = uppercase ? 90 : 122;

  return String.fromCharCode(Math.floor(Math.random() * (high - low + 1)) + low);
};

export default getRandomAlphabetChar;