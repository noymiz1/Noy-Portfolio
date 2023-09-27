export function pixelate(img, blocksize) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;

    // Calculate the scaled dimensions.
    var scaledWidth = Math.ceil(img.width / blocksize);
    var scaledHeight = Math.ceil(img.height / blocksize);

    // Set the canvas dimensions to the scaled dimensions.
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    // Draw the scaled-down image onto the canvas.
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

    // Create a new canvas to hold the scaled-up image.
    var pixelatedCanvas = document.createElement('canvas');
    pixelatedCanvas.width = img.width;
    pixelatedCanvas.height = img.height;

    var pixelatedCtx = pixelatedCanvas.getContext('2d');
    pixelatedCtx.imageSmoothingEnabled = false;

    // Draw the scaled-down image onto the new canvas, scaling it back up.
    pixelatedCtx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, img.width, img.height);

    const dataUrl = pixelatedCanvas.toDataURL();

    img.src = dataUrl;
}