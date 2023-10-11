document.addEventListener('DOMContentLoaded', function() {
    const circleSize = 30;
    const fadeOutDuration = 1000;
    const displayDuration = 7000;
  
    let lastCreated = Date.now();
  
    document.body.addEventListener('mousemove', function(e) {
      const currentTime = Date.now();
      if (currentTime - lastCreated < 100) { // Throttle the creation so it's not too intense
        return;
      }
      lastCreated = currentTime;
  
        const mouseX = e.pageX;
        const mouseY = e.pageY;

  
      const startX = Math.floor(mouseX / circleSize) * circleSize-circleSize*2;
      const startY = Math.floor(mouseY / circleSize) * circleSize-circleSize*2;
  
      for (let x = startX; x < startX + circleSize * 5 && x < window.innerWidth; x += circleSize) {
        for (let y = startY; y < startY + circleSize * 5 && y < window.innerHeight; y += circleSize) {
          createCircle(x, y);
        }
      }
    });
  
    function createCircle(x, y) {
      const circle = document.createElement('div');
      circle.style.position = 'absolute';
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';
      circle.style.width = circleSize + 'px';
      circle.style.height = circleSize + 'px';
      circle.style.borderRadius = '50%';  // This makes the div circular
      circle.style.backgroundColor = randomColor();
      circle.style.zIndex = '-1';  // This ensures the circle is behind other content
      document.body.appendChild(circle);
  
      setTimeout(() => {
        circle.style.opacity = '0';
        setTimeout(() => circle.remove(), fadeOutDuration);
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
  