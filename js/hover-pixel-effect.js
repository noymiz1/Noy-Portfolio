/**
 * Hover-activated Pixel Effect for Landing Page
 * Creates colored pixel squares behind text on hover
 */
document.addEventListener('DOMContentLoaded', function() {
  // Configuration - keeping original size
  const squareSize = 20; // Original size maintained
  const fadeOutDuration = 1000;
  const displayDuration = 4000;  // Shorter duration than original
  
  // Get the landing page element
  const landingPage = document.querySelector('.landing-page');
  if (!landingPage) return;
  
  // Create container for squares so they stay behind text
  const squaresContainer = document.createElement('div');
  squaresContainer.className = 'pixels-container';
  squaresContainer.style.position = 'absolute';
  squaresContainer.style.top = '0';
  squaresContainer.style.left = '0';
  squaresContainer.style.width = '100%';
  squaresContainer.style.height = '100%';
  squaresContainer.style.zIndex = '0'; // Above the ::before but below content
  squaresContainer.style.pointerEvents = 'none'; // Let events pass through
  squaresContainer.style.overflow = 'hidden';
  landingPage.prepend(squaresContainer); // Add as first child

  // Add blurred container for text
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-blur-container';
  contentContainer.style.position = 'relative';
  contentContainer.style.zIndex = '2';
  contentContainer.style.maxWidth = '600px';
  contentContainer.style.backdropFilter = 'blur(10px)';
  contentContainer.style.backgroundColor = 'rgba(245, 245, 245, 0.7)';
  contentContainer.style.padding = '30px';
  contentContainer.style.borderRadius = '10px';
  contentContainer.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
  contentContainer.style.transition = 'all 0.3s ease';
  
  // Move landing page content inside the blurred container
  while (landingPage.children.length > 1) { // Skip the squares container
    contentContainer.appendChild(landingPage.children[1]);
  }
  landingPage.appendChild(contentContainer);
  
  // Variables for tracking
  let isHovering = false;
  let animationFrame = null;
  let lastCreated = Date.now();
  let activeSquares = [];
  
  // Start creating squares when hovering
  landingPage.addEventListener('mouseenter', function() {
    isHovering = true;
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(createSquaresOnHover);
    }
  });
  
  // Stop creating new squares when not hovering
  landingPage.addEventListener('mouseleave', function() {
    isHovering = false;
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  });
  
  // Track mouse position
  let mouseX = 0;
  let mouseY = 0;
  
  landingPage.addEventListener('mousemove', function(e) {
    const rect = landingPage.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  
  // Function to continuously create squares while hovering - UPDATED FOR 3x3 GRID
  function createSquaresOnHover() {
    const currentTime = Date.now();
    
    // Create new squares if enough time has passed
    if (currentTime - lastCreated > 100) { // Throttle creation
      lastCreated = currentTime;
      
      // Get landing page dimensions
      const rect = landingPage.getBoundingClientRect();
      
      // Create squares in a 3x3 grid pattern around mouse (CHANGED FROM 5x5)
      const startX = Math.floor(mouseX / squareSize) * squareSize - squareSize;
      const startY = Math.floor(mouseY / squareSize) * squareSize - squareSize;
      
      for (let x = startX; x < startX + squareSize * 3 && x < rect.width; x += squareSize) {
        for (let y = startY; y < startY + squareSize * 3 && y < rect.height; y += squareSize) {
          if (x >= 0 && y >= 0) {
            createSquare(x, y);
          }
        }
      }
      
      // Also create some random squares elsewhere for visual interest
      for (let i = 0; i < 2; i++) { // Reduced from 3 to 2
        const randX = Math.floor(Math.random() * rect.width);
        const randY = Math.floor(Math.random() * rect.height);
        createSquare(randX, randY);
      }
    }
    
    // Continue animation if still hovering
    if (isHovering) {
      animationFrame = requestAnimationFrame(createSquaresOnHover);
    }
  }
  
  // Create a single colored square - unchanged
  function createSquare(x, y) {
    const square = document.createElement('div');
    square.style.position = 'absolute';
    square.style.left = x + 'px';
    square.style.top = y + 'px';
    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';
    square.style.backgroundColor = randomColor(0.7); // Semi-transparent
    square.style.transition = `opacity ${fadeOutDuration}ms ease`;
    square.style.opacity = '1';
    
    // Add to DOM
    squaresContainer.appendChild(square);
    
    // Track active squares
    activeSquares.push(square);
    
    // Set fade out and removal
    setTimeout(() => {
      square.style.opacity = '0';
      setTimeout(() => {
        square.remove();
        // Remove from tracking array
        const index = activeSquares.indexOf(square);
        if (index > -1) {
          activeSquares.splice(index, 1);
        }
      }, fadeOutDuration);
    }, displayDuration - fadeOutDuration);
  }
  
  // Generate a random color with controlled opacity - unchanged
  function randomColor(alpha = 0.8) {
    const letters = '0123456789ABCDEF';
    let hex = '#';
    for (let i = 0; i < 6; i++) {
      hex += letters[Math.floor(Math.random() * 16)];
    }
    
    // Convert hex to rgba to add transparency
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Pre-create some squares on page load for visual interest
  setTimeout(() => {
    const rect = landingPage.getBoundingClientRect();
    for (let i = 0; i < 20; i++) { // Reduced from 30 to 20
      const x = Math.floor(Math.random() * rect.width);
      const y = Math.floor(Math.random() * rect.height);
      createSquare(x, y);
    }
  }, 500);
});