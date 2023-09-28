import { pixelate } from "./pixelate.js";

const GALLERY_DATA = [
  
  {
    name: "Enduring Heirlooms",
    href: "/projects/enduringheirlooms_project.html",
    src: "/assets/Thumbnails/EnduringHeirlooms_Thumbnail.jpg",
    text: "Interdiscplinary Art & Design research, Harvard GSD, 2021",
    tags: ["writing", "product design", "design research"]
    
  },
  {
    name: "A Knot",
    href: "https://www.youtube.com/watch?v=7r4n4fM5_aU",
    src: "/assets/Thumbnails/AKnot_Thumbnail.gif",
    text: "Short film, 2022",
    tags: ["animation", "production"]
  },
  {
    name: "Labyrinth at Scale",
    href: "/projects/labyrinth_project.html",
    src: "/assets/Thumbnails/Labyrinth_Thumbnail.gif",
    text: "Digital Media: Models project, Harvard GSD, 2021",
    tags: ["animation", "simulation", "fabrication", "writing"]
  },
  {
    name: "Bounty Carsheets",
    href: "/projects/bounty.html",
    src: "/assets/Thumbnails/bounty_thumbnail2.jpg",
    text: "Rebrand, Harvard GSD, 2022",
    tags: ["branding", "packaging", "design research", "fabrication"]
  },
  {
    name: "Soul in a Box",
    href: "https://fab.cba.mit.edu/classes/863.22/Harvard/people/Noy/index.html",
    src: "assets/Thumbnails/SoulinaBox_Thumbnail.gif",
    text: "How to Make Almost Anything, MIT Media Lab, 2023",
    tags: ["digital fabrication", "fabrication"]
  },
  {
    name: "Mousetrap",
    href: "https://www.youtube.com/watch?v=XWpL1ldDlKo",
    src: "/assets/Thumbnails/Mousetrap_Thumbnail.gif",
    text: "Short film, 2022",
    tags: ["animation", "production", "fabrication"]
  },
  {
    name: "Carestry",
    href: "/projects/carestry_project.html",
    src: "/assets/Thumbnails/Carestry_Thumbnail.png",
    text: "App development, MIT Sloan New Enterprises, 2021",
    tags: ["branding", "product design"]
  },
  {
    name: "New Spaces",
    href: "/projects/newspaces.html",
    src: "/assets/Thumbnails/DV_Thumbnail.jpg",
    text: "New Spaces of Justice, Harvard GSD, 2020",
    tags: ["design research", "writing"]
  },
  {
    name: "Audiotate",
    href: "/projects/audiotate.html",
    src:  "/assets/Thumbnails/Audiotate_Thumbnail.jpg",
    text: "Design for Desirability Lab, Harvard, 2020",
    tags: ["design research", "branding", "product design"]
  },
  {
    name: "Design Margins",
    href: "/projects/designmargins.html",
    src: "/assets/Thumbnails/DesignMargins_Thumbnail.png",
    text: "Podcast, Radcliffe Engaged Student Grant, 2021",
    tags: ["branding", "production"]
  },
  {
    name: "Irma Boom",
    href: "/projects/irmaboom.html",
    src: "/assets/Thumbnails/IrmaBoomBooklet_Thumbnail.jpg",
    text: "Booklet design, 2019",
    tags: ["print", "digital design"]
  },
]

function createGalleryEl({ src, name, text, tags, href }) {
  const el = document.createElement("div");
  el.classList.add("gallery-entry");
  el.dataset.tags = tags.join(' '); // Sets a data attribute with all tags for filtering
  
  el.innerHTML = `
    <a class="gallery-entry-link" href="${href ?? "/"}">
      <div class="gallery-entry-img">
        <img src="${src}"/>
        <div class="gallery-text">${name}</div>
      </div>
      <div class="gallery-description">${text}</div>
      <div class="gallery-tags">${tags.join(', ')}</div>
    </a>
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