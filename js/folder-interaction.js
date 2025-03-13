// Folder Interaction Script - Enhanced positioning
document.addEventListener('DOMContentLoaded', function() {
    const folderEmoji = document.getElementById('folderEmoji');
    const previewImages = document.querySelectorAll('.preview-image-item');
    let folderOpen = false;
    
    // Create overlay for closing
    const overlay = document.createElement('div');
    overlay.className = 'folder-overlay';
    document.body.appendChild(overlay);
    
    // Toggle folder open/closed
    function toggleFolder() {
        folderOpen = !folderOpen;
        
        // Toggle the folder emoji state
        if (folderOpen) {
            folderEmoji.textContent = '📂'; // Open folder emoji
            folderEmoji.classList.add('active');
            overlay.classList.add('active');
        } else {
            folderEmoji.textContent = '📁'; // Closed folder emoji
            folderEmoji.classList.remove('active');
            overlay.classList.remove('active');
        }
        
        // Toggle preview images visibility with carefully timed staggered animations
        previewImages.forEach((image, index) => {
            if (folderOpen) {
                // Stagger the animations when opening
                setTimeout(() => {
                    image.classList.add('active');
                }, index * 120); // Slightly longer stagger for better visual effect
            } else {
                // Reverse stagger the animations when closing
                setTimeout(() => {
                    image.classList.remove('active');
                }, (previewImages.length - 1 - index) * 80);
            }
        });
    }
    
    // Initial folder state (closed)
    folderEmoji.textContent = '📁';
    
    // Click event for folder
    folderEmoji.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleFolder();
    });
    
    // Click event for overlay (to close folder)
    overlay.addEventListener('click', function() {
        if (folderOpen) {
            toggleFolder();
        }
    });
    
    // Click event for preview images
    previewImages.forEach(image => {
        image.addEventListener('click', function(e) {
            e.stopPropagation();
            // You can add functionality here to view the full project
            console.log('Preview image clicked:', this.id);
            
            // Add a simple bounce animation when clicked
            this.style.transform = this.style.transform + ' scale(0.95)';
            setTimeout(() => {
                this.style.transform = this.style.transform.replace(' scale(0.95)', '');
            }, 200);
        });
    });
});