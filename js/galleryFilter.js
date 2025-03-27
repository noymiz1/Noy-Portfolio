document.addEventListener('DOMContentLoaded', () => {
    console.log("🖼️ Gallery filter script loaded");
    
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
            console.log(`Filtering ${galleryItems.length} gallery items by tag: ${selectedTag}`);
            
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

    // Add this to ensure "all" is selected by default
    const allTagButton = document.querySelector('.nav-tag[data-tag="all"]');
    if (allTagButton && !allTagButton.classList.contains('selected')) {
        allTagButton.classList.add('selected');
    }
});