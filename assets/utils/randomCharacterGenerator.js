/**
 * Generates a random alphabet character.
 * @param {boolean} [uppercase=false] - Whether to generate an uppercase character.
 * @returns {string} The randomly generated alphabet character.
 */
const getRandomAlphabetChar = (uppercase = false) => {
  const low = uppercase ? 65 : 97;
  const high = uppercase ? 90 : 122;

  return String.fromCharCode(Math.floor(Math.random() * (high - low + 1)) + low);
};

export default getRandomAlphabetChar;