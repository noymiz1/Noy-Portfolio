document.addEventListener('DOMContentLoaded', function() {
    const pixelSize = 20;
    const numberOfPixels = 15;
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        for (let i = 0; i < numberOfPixels; i++) {
            createPixel(mouseX, mouseY + scrollTop);
        }
    });

    function createPixel(x, y) {
        const pixel = document.createElement('div');
        pixel.style.position = 'absolute';
        pixel.style.left = x + 'px';
        pixel.style.top = y + 'px';
        pixel.style.width = pixelSize + 'px';
        pixel.style.height = pixelSize + 'px';
        pixel.style.backgroundColor = randomColor();
        pixel.style.zIndex = '-1';
        document.body.appendChild(pixel);

        // Random directions for pixels to scatter
        const angle = 2 * Math.PI * Math.random();
        const distance = 20 * Math.random();
        const targetX = x + distance * Math.cos(angle);
        const targetY = y + distance * Math.sin(angle);

        setTimeout(() => {
            pixel.style.transform = `translate(${targetX - x}px, ${targetY - y}px)`;
            pixel.style.opacity = '0';
            setTimeout(() => pixel.remove(), 500);
        }, 50);
    }

    function randomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
