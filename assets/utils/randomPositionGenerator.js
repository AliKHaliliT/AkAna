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