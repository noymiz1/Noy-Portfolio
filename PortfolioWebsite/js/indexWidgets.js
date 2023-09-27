import { pixelate } from "./pixelate.js";

const GALLERY_DATA = [
  
  {
    name: "Carestry",
    src: "/assets/Carestry_Thumbnail.png",
    text: "App development, 2021",
    tags: ["branding", "product design"]
  },
  {
    name: "A Knot",
    src: "/assets/AKnot_Thumbnail.gif",
    text: "Short film, 2022",
    tags: ["animation", "production"]
  },
  {
    name: "Irma Boom",
    src: "/assets/IrmaBoomBooklet_Thumbnail.jpg",
    text: "Booklet design, 2019",
    tags: ["print", "digital design"]
  },
  {
    name: "Design Margins",
    src: "/assets/DesignMargins_Thumbnail.png",
    text: "Podcast, 2021",
    tags: ["branding", "production"]
  },
  {
    name: "Mousetrap",
    src: "/assets/Mousetrap_Thumbnail.gif",
    text: "Short film, 2022",
    tags: ["animation", "production", "fabrication"]
  },
  {
    name: "Soul in a Box",
    src: "assets/SoulinaBox_Thumbnail.gif",
    text: "Conceptual digital fabrication project, 2023",
    tags: ["digital fabrication", "fabrication"]
  },
  {
    name: "Bounty Carsheets",
    src: "/assets/Bounty_Thumbnail.png",
    text: "Rebrand, 2022",
    tags: ["branding", "packaging", "fabrication"]
  },
]

function createGalleryEl({ src, name, text, tags }) {
  const el = document.createElement("div");
  el.classList.add("gallery-entry");
  el.dataset.tags = tags.join(' '); // Sets a data attribute with all tags for filtering
  
  el.innerHTML = `
    <img src="${src}"/>
    <div class="gallery-text">${name}</div>
    <div class="gallery-description">${text}</div>
    <div class="gallery-tags">${tags.join(', ')}</div>
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
        return;
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

// Filtering mechanism
document.addEventListener("DOMContentLoaded", function() {
  const galleryItems = document.querySelectorAll('.gallery-entry');
  const navTags = document.querySelectorAll('.nav-tag');

  navTags.forEach(tag => {
    tag.addEventListener('click', function() {
      const selectedTag = this.dataset.tag;

      galleryItems.forEach(item => {
        if (item.dataset.tags.includes(selectedTag) || selectedTag === 'all') {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});