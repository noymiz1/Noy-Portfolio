const image = document.getElementById('profile-pic');
const canvas = document.getElementById('profile-canvas');
const ctx = canvas.getContext('2d');

image.addEventListener('load', function() {
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the image to the canvas
  ctx.drawImage(image, 0, 0);

  // Pixelate function
  function pixelate(v) {
    const size = 4 * (1 - v / 100); // Adjust for desired pixelation level
    const w = canvas.width * size;
    const h = canvas.height * size;

    // Draw original image in a small version
    ctx.drawImage(image, 0, 0, w, h);

    // Stretch the small image on the full canvas
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
  }

  canvas.addEventListener('mouseenter', function() {
    pixelate(100);  // Adjust the value for different pixelation levels (0 to 100)
  });

  canvas.addEventListener('mouseleave', function() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Restore original image on mouse leave
  });
});
