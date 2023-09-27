const navTags = document.querySelectorAll(".nav-tag");
navTags.forEach(tag => {
    tag.addEventListener('click', function() {
        const selectedTag = this.dataset.tag;
        
        // Filter gallery items
        const galleryItems = document.querySelectorAll('.gallery-entry');
        galleryItems.forEach(item => {
            const itemTags = item.querySelector('.gallery-tags').textContent.split(', ');
            if (itemTags.includes(selectedTag)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
