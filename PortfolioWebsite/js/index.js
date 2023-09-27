import { pixelate } from "./pixelate.js";

const GALLERY_DATA = [
  
  {
    name: "rico",
    src: "/assets/Carestry_Thumbnail.png",
  },
  {
    name: "A Knot",
    src: "/assets/AKnot_Thumbnail.gif",
  },
  {
    name: "Irma Boom Booklet",
    src: "/assets/IrmaBoomBooklet_Thumbnail.jpg",
  },
  {
    name: "Design Margins",
    src: "/assets/DesignMargins_Thumbnail.png",
  },
  {
    name: "Mousetrap",
    src: "/assets/Mousetrap_Thumbnail.gif",
  },
  {
    name: "Soul in a Box",
    src: "assets/SoulinaBox_Thumbnail.gif",
  },
  {
    name: "mochi",
    src: "/assets/chihuahua.jpeg"
  },
  {
    name: "yoshiko",
    src: "/assets/Bounty_Thumbnail.png",
  }
]

function createGalleryEl({ src, name }) {
  const el = document.createElement("div");
  el.classList.add("gallery-entry");

  el.innerHTML = `
    <img src="${src}"/>
    <div class="gallery-text">${name}</div>
  `;

  el.img = el.querySelector("img");
  el.reset = () => {
    el.img.src = src;
  }

  return el;
}

const imageGalleryEl = document.querySelector(".image-gallery");
GALLERY_DATA.forEach(data => {
  const el = createGalleryEl(data);

  el.timer = 1;

  el.addEventListener("mouseenter", e => {
    if (el.intervalId) clearInterval(el.intervalId);

    el.intervalId = setInterval(() => {
      // set number of iterations here
      if (el.timer > 10) {
        clearInterval(el.intervalId);
        return
      }

      pixelate(el.img, 2 ** el.timer);
      el.timer++;
    }, 80);

  });

  el.addEventListener("mouseleave", e => {
    if (el.intervalId) clearInterval(el.intervalId);

    el.reset();
    el.timer = 0;
  })

  imageGalleryEl.appendChild(el);
})