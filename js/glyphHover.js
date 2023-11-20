document.addEventListener('DOMContentLoaded', () => {
    const grid = createGrid();
    document.body.appendChild(grid);
  
    document.body.addEventListener('mousemove', (e) => {
      revealGlyphAt(e.clientX, e.clientY, grid);
    });
  });
  
  function createGrid() {
    const grid = document.createElement('div');
    grid.classList.add('glyph-grid');
    for (let y = 0; y < window.innerHeight; y += 50) {
      for (let x = 0; x < window.innerWidth; x += 50) {
        const glyph = createGlyph(x, y);
        grid.appendChild(glyph);
      }
    }
    return grid;
  }
  
  function createGlyph(x, y) {
    const glyph = document.createElement('div');
    glyph.textContent = getRandomGlyph();
    glyph.style.left = `${x}px`;
    glyph.style.top = `${y}px`;
    glyph.classList.add('glyph-style');
    return glyph;
  }
  
  function revealGlyphAt(x, y, grid) {
    const radius = 100;
    Array.from(grid.childNodes).forEach(glyph => {
      const glyphX = glyph.offsetLeft + glyph.offsetWidth / 2;
      const glyphY = glyph.offsetTop + glyph.offsetHeight / 2;
      const distance = Math.sqrt(Math.pow(x - glyphX, 2) + Math.pow(y - glyphY, 2));
      if (distance < radius) {
        glyph.style.opacity = 1;
      } else {
        glyph.style.opacity = 0;
      }
    });
  }
  
  function getRandomGlyph() {
    const glyphs = ['⛅', '☕', '✨', '☔', '♥', '⛈', '☃', '♪'];
    return glyphs[Math.floor(Math.random() * glyphs.length)];
  }
  