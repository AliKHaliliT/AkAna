/**
 * Generates random positions within a given height and width, based on the dimensions of a rectangle.
 * @param {number} height - The total height of the area.
 * @param {number} width - The total width of the area.
 * @param {number} [rectangleHeight=300] - The height of each rectangle.
 * @param {number} [rectangleWidth=200] - The width of each rectangle.
 * @param {number} [pointsPerRectangle=1] - The number of random points to generate within each rectangle.
 * @returns {Array} An array of objects representing the randomly generated positions, each with 'top' and 'left' properties.
 */
const getRandomPosition = (height, width, rectangleHeight = 300, rectangleWidth = 200, pointsPerRectangle = 1) => {
  const maxDivisionsHeight = Math.floor(height / rectangleHeight) + 1;
  const maxDivisionsWidth = Math.floor(width / rectangleWidth) + 1;

  let positions = [];
  for (let row = 0; row < maxDivisionsHeight; row++) {
    for (let col = 0; col < maxDivisionsWidth; col++) {
      for (let point = 0; point < pointsPerRectangle; point++) {
        const randomTop = Math.random() * rectangleHeight + (row * rectangleHeight);
        const randomLeft = Math.random() * rectangleWidth + (col * rectangleWidth);
        positions.push({ top: randomTop, left: randomLeft });
      }
    }
  }

  // Shuffle the list
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  return positions;
}

export default getRandomPosition;