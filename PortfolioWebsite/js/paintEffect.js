document.addEventListener('DOMContentLoaded', function() {
  const squareSize = 20;
  const fadeOutDuration = 1000;
  const displayDuration = 7000;

  let lastCreated = Date.now();

  document.body.addEventListener('mousemove', function(e) {
    const currentTime = Date.now();
    if (currentTime - lastCreated < 100) { // Throttle the creation so it's not too intense
      return;
    }
    lastCreated = currentTime;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const startX = Math.floor(mouseX / squareSize) * squareSize;
    const startY = Math.floor(mouseY / squareSize) * squareSize;

    for (let x = startX; x < startX + squareSize * 5 && x < window.innerWidth; x += squareSize) {
      for (let y = startY; y < startY + squareSize * 5 && y < window.innerHeight; y += squareSize) {
        createSquare(x, y);
      }
    }
  });

  function createSquare(x, y) {
    const square = document.createElement('div');
    square.style.position = 'absolute';
    square.style.left = x + 'px';
    square.style.top = y + 'px';
    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';
    square.style.backgroundColor = randomColor();
    square.style.zIndex = '-1';  // This ensures the square is behind other content
    document.body.appendChild(square);

    setTimeout(() => {
      square.style.opacity = '0';
      setTimeout(() => square.remove(), fadeOutDuration);
    }, displayDuration - fadeOutDuration);
  }
});

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
