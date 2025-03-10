/**
 * Scroll Animation for Gallery Entries
 * Animates projects in as they enter the viewport
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 && 
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        const galleryEntries = document.querySelectorAll('.gallery-entry');
        
        galleryEntries.forEach(entry => {
            if (isInViewport(entry) && !entry.classList.contains('animated')) {
                entry.classList.add('animated');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Run once on page load to animate elements already in view
    setTimeout(handleScrollAnimations, 100);
});