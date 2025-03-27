document.addEventListener('DOMContentLoaded', function() {
    // Function to set up scroll navigation
    function setupScrollNavigation() {
        // Use more flexible selectors to find navigation links
        const featuredLink = document.querySelector('.featured-link, a[href="#featured"]');
        const workLink = document.querySelector('.work-link, a[href="#projects"], a[href="#work"]');
        const viewWorkButton = document.getElementById('viewWorkButton');
        
        // Handle Featured link click
        if (featuredLink) {
            featuredLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                const featuredSection = document.getElementById('featured');
                if (featuredSection) {
                    const offset = featuredSection.offsetTop - 80; // Adjust for top bar
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                    console.log('Scrolled to Featured section');
                }
            });
        } else {
            console.log('Featured link not found');
        }
        
        // Handle Work link click
        if (workLink) {
            workLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                const workSection = document.getElementById('projects') || document.getElementById('work');
                if (workSection) {
                    const offset = workSection.offsetTop - 80; // Adjust for top bar
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                    console.log('Scrolled to Work section');
                }
            });
        } else {
            console.log('Work link not found');
        }
        
        // Handle View Work button if it exists (on landing page)
        if (viewWorkButton) {
            viewWorkButton.addEventListener('click', function() {
                const workSection = document.getElementById('projects') || document.getElementById('work');
                if (workSection) {
                    const offset = workSection.offsetTop - 80;
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    // Initialize navigation with a slight delay to ensure DOM is ready
    setTimeout(setupScrollNavigation, 100);
});

// Re-initialize when fragments are loaded (for sites using HTML fragments)
document.addEventListener('fragmentsLoaded', function() {
    setTimeout(function() {
        setupScrollNavigation();
    }, 100);
});