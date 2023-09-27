const navTags = document.querySelectorAll(".nav-tag");

navTags.forEach(tag => {
    tag.addEventListener('click', function() {
        const selectedTag = this.dataset.tag;
        
        // Reset all tags to their default appearance
        navTags.forEach(t => t.classList.remove('selected'));
        
        // If the clicked tag wasn't already selected, select it. 
        if (!this.classList.contains('selected')) {
            this.classList.add('selected');
        }
        
        // Filter gallery items
        const galleryItems = document.querySelectorAll('.gallery-entry');
        galleryItems.forEach(item => {
            const itemTags = item.querySelector('.gallery-tags').textContent.split(', ');
            if (itemTags.includes(selectedTag) || selectedTag === "all") {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});



