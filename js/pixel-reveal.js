document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const squareSize = 20;
    const containerElement = document.querySelector('.hero-section'); // Update selector to match your hero section
    const contentElement = document.querySelector('.hero-content'); // Update selector to match your content container
    const instructionElement = document.createElement('div');
    
    // Set up instruction element
    instructionElement.className = 'reveal-instruction';
    instructionElement.textContent = 'Click and drag to reveal';
    instructionElement.style.position = 'absolute';
    instructionElement.style.top = '50%';
    instructionElement.style.left = '50%';
    instructionElement.style.transform = 'translate(-50%, -50%)';
    instructionElement.style.padding = '10px 20px';
    instructionElement.style.background = 'rgba(0,0,0,0.3)';
    instructionElement.style.color = 'white';
    instructionElement.style.borderRadius = '20px';
    instructionElement.style.zIndex = '20';
    instructionElement.style.pointerEvents = 'none';
    containerElement.appendChild(instructionElement);
    
    // Hide content initially
    if (contentElement) {
      contentElement.style.opacity = '0';
      contentElement.style.transition = 'opacity 1s ease';
    }
    
    // Track state
    let squares = [];
    let isDrawing = false;
    let revealed = false;
    let contentOpacity = 0;
    
    // Create initial squares
    setTimeout(() => {
      for (let i = 0; i < 100; i++) {
        const x = Math.floor(Math.random() * containerElement.offsetWidth / squareSize) * squareSize;
        const y = Math.floor(Math.random() * containerElement.offsetHeight / squareSize) * squareSize;
        createSquare(x, y);
      }
    }, 800);
    
    // Event listeners
    containerElement.addEventListener('mousedown', () => isDrawing = true);
    containerElement.addEventListener('mouseup', () => isDrawing = false);
    containerElement.addEventListener('mouseleave', () => isDrawing = false);
    
    containerElement.addEventListener('mousemove', function(e) {
      if (!isDrawing) return;
      
      const rect = containerElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const startX = Math.floor(x / squareSize) * squareSize - squareSize * 2;
      const startY = Math.floor(y / squareSize) * squareSize - squareSize * 2;
      
      for (let xPos = startX; xPos < startX + squareSize * 5; xPos += squareSize) {
        for (let yPos = startY; yPos < startY + squareSize * 5; yPos += squareSize) {
          if (xPos < 0 || yPos < 0 || xPos >= rect.width || yPos >= rect.height) continue;
          
          // Check if we already have a square at this position
          const existingSquare = squares.find(s => s.x === xPos && s.y === yPos);
          if (!existingSquare) {
            createSquare(xPos, yPos);
          }
        }
      }
    });
    
    // For touch devices
    containerElement.addEventListener('touchstart', () => isDrawing = true);
    containerElement.addEventListener('touchend', () => isDrawing = false);
    containerElement.addEventListener('touchmove', function(e) {
      if (!isDrawing) return;
      
      const rect = containerElement.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      const startX = Math.floor(x / squareSize) * squareSize - squareSize * 2;
      const startY = Math.floor(y / squareSize) * squareSize - squareSize * 2;
      
      for (let xPos = startX; xPos < startX + squareSize * 5; xPos += squareSize) {
        for (let yPos = startY; yPos < startY + squareSize * 5; yPos += squareSize) {
          if (xPos < 0 || yPos < 0 || xPos >= rect.width || yPos >= rect.height) continue;
          
          // Check if we already have a square at this position
          const existingSquare = squares.find(s => s.x === xPos && s.y === yPos);
          if (!existingSquare) {
            createSquare(xPos, yPos);
          }
        }
      }
      
      // Prevent scrolling while drawing
      e.preventDefault();
    }, { passive: false });
    
    function createSquare(x, y) {
      const square = document.createElement('div');
      square.style.position = 'absolute';
      square.style.left = x + 'px';
      square.style.top = y + 'px';
      square.style.width = squareSize + 'px';
      square.style.height = squareSize + 'px';
      square.style.backgroundColor = randomColor();
      square.style.transition = 'opacity 0.5s';
      square.style.zIndex = '1';
      containerElement.appendChild(square);
      
      // Add to tracking array
      squares.push({ x, y, element: square });
      
      // Update content opacity based on number of squares
      updateContentOpacity();
    }
    
    function randomColor() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 0.3)`;
    }
    
    function updateContentOpacity() {
      const revealThreshold = 200;
      contentOpacity = Math.min(1, squares.length / revealThreshold);
      
      if (contentElement) {
        contentElement.style.opacity = contentOpacity;
      }
      
      // Check if we've revealed enough squares
      if (squares.length >= revealThreshold && !revealed) {
        revealed = true;
        instructionElement.style.display = 'none';
        
        // Add reset button if needed
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset Canvas';
        resetBtn.className = 'reset-button';
        resetBtn.style.marginLeft = '10px';
        // Style as needed to match your design
        
        resetBtn.addEventListener('click', function() {
          // Clear all squares
          squares.forEach(square => square.element.remove());
          squares = [];
          revealed = false;
          contentOpacity = 0;
          if (contentElement) {
            contentElement.style.opacity = '0';
          }
          instructionElement.style.display = 'block';
          resetBtn.remove();
        });
        
        // Add reset button next to your main CTA
        const ctaContainer = document.querySelector('.cta-button').parentNode;
        ctaContainer.appendChild(resetBtn);
      }
    }
  });