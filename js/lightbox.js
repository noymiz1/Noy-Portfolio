const lightbox = document.querySelector(".lightbox");
const lightboxContent = document.querySelector(".lightbox-content");
const close = document.querySelector(".close");
const zoomIn = document.querySelector(".zoom-in");

let zoomed = false;  // State to track zoom

document.querySelectorAll(".project-image").forEach(img => {
    img.addEventListener("click", function() {
        lightbox.style.display = "block";
        lightboxContent.src = this.src;
        zoomed = false;
    });
});

close.addEventListener("click", function() {
    lightbox.style.display = "none";
});

zoomIn.addEventListener("click", function() {
    if (zoomed) {
        lightboxContent.style.transform = "scale(1)";
    } else {
        lightboxContent.style.transform = "scale(2)";  // or any desired scale
    }
    zoomed = !zoomed;  // toggle the state
});

