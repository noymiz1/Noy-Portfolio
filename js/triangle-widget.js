// Triangle Widget JS with Slider Integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize landing preview effect
    initLandingPreview();
    
    // Add reveal animation to widgets when scrolled into view
    initWidgetReveal();
    
    // Connect view work button to triangle section
    connectViewButton();
    
    // Initialize slider for recent project if needed
    initProjectSlider();
});

function initLandingPreview() {
    const previewElement = document.getElementById('landing-transition-preview');
    if (!previewElement) return;
    
    // Check if your hover-pixel-effect.js exposes functions we can use
    if (window.createPixelEffect) {
        // If your existing pixel creation function exists, use it
        window.createPixelEffect(previewElement, {
            scale: 0.5,  // Smaller scale for the preview
            density: 0.7 // Less dense pixel pattern
        });
    } else {
        // Fallback to a simplified version of your effect
        createSimplePixelEffect(previewElement);
    }
}

function createSimplePixelEffect(container) {
    // Create canvas for pixel effect
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);
    
    // Pixel properties
    const pixelSize = 8;
    const cols = Math.floor(canvas.width / pixelSize);
    const rows = Math.floor(canvas.height / pixelSize);
    
    // Create pixels array with random properties
    const pixels = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // Only create pixels at random positions for a sparse effect
            if (Math.random() < 0.4) {
                pixels.push({
                    x: i * pixelSize,
                    y: j * pixelSize,
                    size: pixelSize,
                    color: getRandomColor(),
                    alpha: Math.random() * 0.5 + 0.2,
                    scale: Math.random() * 0.8 + 0.2,
                    targetScale: Math.random() * 0.8 + 0.2,
                    speed: Math.random() * 0.02 + 0.005
                });
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        pixels.forEach(pixel => {
            // Update scale with easing
            pixel.scale += (pixel.targetScale - pixel.scale) * pixel.speed;
            
            // Occasionally change target scale
            if (Math.random() < 0.01) {
                pixel.targetScale = Math.random() * 0.8 + 0.2;
            }
            
            // Draw pixel
            ctx.globalAlpha = pixel.alpha;
            ctx.fillStyle = pixel.color;
            const size = pixel.size * pixel.scale;
            const x = pixel.x + (pixel.size - size) / 2;
            const y = pixel.y + (pixel.size - size) / 2;
            ctx.fillRect(x, y, size, size);
        });
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}

function getRandomColor() {
    // Color palette that matches your site's aesthetic
    const colors = [
        '#333333', // Dark gray
        '#555555', // Medium gray
        '#777777', // Light gray
        '#999999', // Lighter gray
        '#4d5151'  // The color from your h1 tag
    ];
    
    // Dark mode detection
    if (document.body.classList.contains('dark-mode')) {
        // Lighter colors for dark mode
        return colors[Math.floor(Math.random() * 3) + 2]; // Use lighter grays
    }
    
    return colors[Math.floor(Math.random() * colors.length)];
}

function initWidgetReveal() {
    // Add reveal classes to widgets
    const widgets = document.querySelectorAll('.widget');
    
    // Add initial classes for animation
    widgets.forEach((widget, index) => {
        widget.classList.add('reveal-widget');
        widget.style.animationDelay = `${index * 0.2}s`;
        
        // Initially set to invisible until scrolled into view
        widget.style.opacity = '0';
        widget.style.animationPlayState = 'paused';
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll and reveal widgets
    function revealOnScroll() {
        widgets.forEach(widget => {
            if (isInViewport(widget) && widget.style.opacity === '0') {
                widget.style.animationPlayState = 'running';
            }
        });
    }
    
    // Initial check on load
    revealOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
}

function connectViewButton() {
    // Get the view work button from your landing page
    const viewWorkButton = document.getElementById('viewWorkButton');
    
    if (viewWorkButton) {
        // Add click handler to smooth scroll to triangle section
        viewWorkButton.addEventListener('click', function() {
            const triangleSection = document.querySelector('.triangle-section');
            
            if (triangleSection) {
                triangleSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }
}

// New function to initialize the slider for the recent project
function initProjectSlider() {
    // Check if we should use a slider instead of a single image
    const recentWidget = document.querySelector('.recent-widget .widget-content');
    if (!recentWidget) return;
    
    // Option to replace the single thumbnail with a slider
    const useSlider = true; // Set to true to use slider, false to keep single image
    
    if (useSlider) {
        // Find and remove the existing thumbnail if it exists
        const existingThumbnail = recentWidget.querySelector('.project-thumbnail');
        if (existingThumbnail) {
            existingThumbnail.remove();
        }
        
        // Create and add the slider
        const sliderHTML = `
            <div class="slider-container">
                <div class="slider-wrapper">
                    <img src="/images/projects/recent-project-1.jpg" alt="Recent Project Slide 1">
                    <img src="/images/projects/recent-project-2.jpg" alt="Recent Project Slide 2">
                    <img src="/images/projects/recent-project-3.jpg" alt="Recent Project Slide 3">
                </div>
                <button class="slider-arrow prev">&lt;</button>
                <button class="slider-arrow next">&gt;</button>
                <div class="slider-dots">
                    <div class="dot active"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;
        
        // Insert at the beginning of widget content
        recentWidget.insertAdjacentHTML('afterbegin', sliderHTML);
        
        // Initialize slider functionality
        const slider = recentWidget.querySelector('.slider-wrapper');
        const slides = slider.querySelectorAll('img');
        const dots = recentWidget.querySelectorAll('.dot');
        const prevBtn = recentWidget.querySelector('.slider-arrow.prev');
        const nextBtn = recentWidget.querySelector('.slider-arrow.next');
        
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // Set initial position
        updateSlider();
        
        // Add event listeners for navigation
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        });
        
        // Add click events for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
        
        // Function to update slider position and dots
        function updateSlider() {
            // Update slider position
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Auto slide (optional)
        let autoSlideInterval;
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            }, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Start auto sliding
        startAutoSlide();
        
        // Pause auto sliding when user interacts with the slider
        slider.addEventListener('mouseenter', stopAutoSlide);
        prevBtn.addEventListener('mouseenter', stopAutoSlide);
        nextBtn.addEventListener('mouseenter', stopAutoSlide);
        
        // Resume auto sliding when user leaves
        slider.addEventListener('mouseleave', startAutoSlide);
        prevBtn.addEventListener('mouseleave', startAutoSlide);
        nextBtn.addEventListener('mouseleave', startAutoSlide);
    }
}