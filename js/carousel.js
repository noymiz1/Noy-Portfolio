document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let interval;
    const intervalTime = 4000; // Time between slides (4 seconds)
    
    // Initialize carousel
    function initCarousel() {
        // Set first slide as active
        updateActiveSlide();
        
        // Start automatic cycling
        startInterval();
        
        // Add click events to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateActiveSlide();
                resetInterval();
            });
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', stopInterval);
        carousel.addEventListener('mouseleave', startInterval);
        
        // Add touch events for mobile
        let startX;
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopInterval();
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (diff > 50) { // Swipe left
                nextSlide();
            } else if (diff < -50) { // Swipe right
                prevSlide();
            }
            
            startInterval();
        }, { passive: true });
    }
    
    // Update active slide
    function updateActiveSlide() {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateActiveSlide();
    }
    
    // Previous slide function
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateActiveSlide();
    }
    
    // Start automatic cycling
    function startInterval() {
        interval = setInterval(nextSlide, intervalTime);
    }
    
    // Stop automatic cycling
    function stopInterval() {
        clearInterval(interval);
    }
    
    // Reset interval
    function resetInterval() {
        stopInterval();
        startInterval();
    }
    
    // Initialize if carousel exists
    if (carousel) {
        initCarousel();
        console.log('✅ Carousel initialized');
    }
});