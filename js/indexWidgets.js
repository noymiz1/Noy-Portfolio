import { pixelate } from "./pixelate.js";

const GALLERY_DATA = [
  
  // {
  //   name: "Philips",
  //   href: "/projects/hemda.html",
  //   src: "/assets/Thumbnails/philips_thumbnail.jpg",
  //   text: "Communications design, 2021-23",
  //   tags: ["branding", "packaging","video"]
  // },
  {
    name: "A Knot",
    href: "https://www.youtube.com/watch?v=7r4n4fM5_aU",
    src: "/assets/Thumbnails/AKnot_Thumbnail.gif",
    text: "Short film, 2022",
    tags: ["animation", "production"]
  },
  {
    name: "Bounty Carsheets",
    href: "/projects/bounty.html",
    src: "/assets/Thumbnails/bounty_thumbnail2.jpg",
    text: "Rebrand, Harvard GSD, 2022",
    tags: ["branding", "packaging", "design strategy", "fabrication"]
  },
  {
    name: "New Spaces",
    href: "/projects/newspaces.html",
    src: "/assets/Thumbnails/DV_Thumbnail.jpg",
    text: "New Spaces of Justice, Harvard GSD, 2020",
    tags: ["design strategy", "data visualization", "writing"]
  },
  {
    name: "Enduring Heirlooms",
    href: "/projects/enduringheirlooms_project.html",
    src: "/assets/Thumbnails/EnduringHeirlooms_Thumbnail.jpg",
    text: "Interdisciplinary Art & Design research, Harvard GSD, 2021",
    tags: ["writing", "product design", "design strategy"]
    
  },
  {
    name: "Carestry",
    href: "/projects/carestry_project.html",
    src: "/assets/Thumbnails/Carestry_Thumbnail.png",
    text: "App development, MIT Sloan New Enterprises, 2021",
    tags: ["branding", "product design", "data visualization"]
  },
  {
    name: "Labyrinth at Scale",
    href: "/projects/labyrinth_project.html",
    src: "/assets/Thumbnails/Labyrinth_Thumbnail.gif",
    text: "Digital Media: Models, Harvard GSD, 2021",
    tags: ["animation", "simulation", "fabrication", "writing"]
  },
  {
    name: "Soul in a Box",
    href: "https://fab.cba.mit.edu/classes/863.22/Harvard/people/Noy/index.html",
    src: "assets/Thumbnails/SoulinaBox_Thumbnail.gif",
    text: "How to Make Almost Anything, MIT Media Lab, 2023",
    tags: ["animation", "fabrication"]
  },
  {
    name: "Mousetrap",
    href: "https://www.youtube.com/watch?v=XWpL1ldDlKo",
    src: "/assets/Thumbnails/Mousetrap_Thumbnail.gif",
    text: "Short film, 2022",
    tags: ["animation", "production", "fabrication"]
  },
  // {
  //   name: "Bhākti",
  //   href: "/projects/hemda.html",
  //   src: "/assets/Thumbnails/Bhākti_thumbnail.png",
  //   text: "Artist facilitation, Harvard Ed Portal, 2022",
  //   tags: ["video production", "branding", "facilitation"]
  // },
  {
    name: "Hemda Hummus",
    href: "/projects/hemda.html",
    src: "/assets/Thumbnails/hemda_top_thumbnail.png",
    text: "Brand Design, UCF, 2019",
    tags: ["branding", "packaging", "fabrication"]
    
  },
  {
    name: "More Days",
    href: "/projects/moredays.html",
    src: "/assets/Thumbnails/moredays_thumbnail.png",
    text: "Music Festival Branding, UCF, 2019",
    tags: ["branding", "product design", "design strategy"]
    
  },
  {
    name: "Audiotate",
    href: "/projects/audiotate.html",
    src:  "/assets/Thumbnails/Audiotate_Thumbnail.jpg",
    text: "Design for Desirability Lab, Harvard, 2020",
    tags: ["design strategy", "branding", "product design"]
  },
  {
    name: "Super Bloom",
    href: "/projects/superbloom.html",
    src: "/assets/Thumbnails/table_thumbnail2.jpg",
    text: "Table design and fabrication, 2023",
    tags: ["fabrication", "digital fabrication"]
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
  {
    name: "Corporate Identity and Visual Systems",
    href: "/projects/identitybrochure.html",
    src: "/assets/Thumbnails/identitybrochure_thumbnail.png",
    text: "Brochure design, 2019",
    tags: ["print", "digital design"]
  },

  // {
  //   name: "Hemda Hummus",
  //   href: "/projects/hemda.html",
  //   src: "/assets/Thumbnails/hemda_thumbnail.png",
  //   text: "Brand design, 2019",
  //   tags: ["branding", "packaging"]
  // },
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