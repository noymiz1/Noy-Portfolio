document.addEventListener('DOMContentLoaded', function() {
    // Wait for HTML fragments to load
    setTimeout(() => {
        const topBar = document.querySelector('.top-bar');
        const topBarLink = document.querySelector('.top-bar a');
        
        if (!topBar || !topBarLink) {
            console.error('Top bar elements not found');
            return;
        }
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                topBar.classList.add('minimized');
            } else {
                topBar.classList.remove('minimized');
            }
        });
        
        topBarLink.addEventListener('click', function(event) {
            if (topBar.classList.contains('minimized')) {
                event.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }, 100); // Small delay to ensure fragments are loaded
});