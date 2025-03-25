document.addEventListener('DOMContentLoaded', () => {
    // Observer for elements that should animate on scroll
    const animateOnScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after animation is triggered
                // animateOnScrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in-on-scroll, .slide-up-on-scroll, .slide-in-left, .slide-in-right, .slide-in-up')
        .forEach(element => {
            animateOnScrollObserver.observe(element);
        });
        
    // Initial animation for hero section elements
    setTimeout(() => {
        document.querySelectorAll('.fade-in, .slide-up, .slide-up-delay, .slide-up-delay-2')
            .forEach(element => {
                element.classList.add('active');
            });
    }, 300);
    
    // Video placeholder functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            // Replace with actual video embed code when ready
            alert('Video would play here in the final implementation');
        });
    }
});