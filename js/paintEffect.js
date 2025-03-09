document.addEventListener("DOMContentLoaded", function () {
    const landingPage = document.querySelector('.landing-page');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
        width = landingPage.offsetWidth;
        height = landingPage.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function drawPixels() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3;
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.random()})`;
            ctx.fillRect(x, y, size, size);
        }
    }

    function showPixels() {
        canvas.style.opacity = '1';
    }

    function hidePixels() {
        canvas.style.opacity = '0';
    }

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.transition = 'opacity 0.5s ease-in-out';
    canvas.style.opacity = '0';

    landingPage.appendChild(canvas);
    resizeCanvas();
    drawPixels();

    window.addEventListener('resize', () => {
        resizeCanvas();
        drawPixels();
    });

    landingPage.addEventListener('mouseover', showPixels);
    landingPage.addEventListener('mouseout', hidePixels);
});