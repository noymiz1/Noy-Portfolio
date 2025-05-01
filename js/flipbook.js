/**
 * Flipbook initialization and animations
 * For Enduring Heirlooms Case Study
 */

// Wait for jQuery and turn.js to be fully loaded
$(document).ready(function() {
    console.log("Document ready, checking libraries...");
    
    // Check if the required libraries are loaded
    if (typeof jQuery === 'undefined') {
        console.error("jQuery is not loaded!");
        return;
    }
    
    if (typeof $.fn.turn === 'undefined') {
        console.error("turn.js is not loaded!");
        return;
    }
    
    console.log("Libraries loaded, initializing animations...");
    
    // Initialize animations first to make elements visible
    initAnimations();
    
    // Initialize the flipbook with a slight delay to ensure DOM is ready
    setTimeout(function() {
        initFlipbook();
    }, 500); // 500ms delay to ensure everything is loaded
});

/**
 * Initialize the flipbook functionality
 */
function initFlipbook() {
    console.log("Initializing flipbook...");
    
    try {
        // Initialize the flipbook
        $("#flipbook").turn({
            width: 800,
            height: 500,
            autoCenter: true,
            elevation: 50,
            gradients: true,
            acceleration: true,
            duration: 1000,
            display: 'double', // Display two pages at once
            when: {
                turning: function(e, page, view) {
                    console.log("Turning to page: " + page);
                },
                turned: function(e, page, view) {
                    console.log("Now on page: " + page);
                }
            }
        });
        
        // Add keyboard navigation
        $(document).keydown(function(e) {
            if (e.keyCode == 37) { // left arrow
                $("#flipbook").turn("previous");
                return false; // Prevent default behavior
            } else if (e.keyCode == 39) { // right arrow
                $("#flipbook").turn("next");
                return false; // Prevent default behavior
            }
        });
        
        // Handle responsive resizing
        $(window).resize(function() {
            resizeFlipbook();
        }).resize(); // Trigger resize on load
        
        console.log("Flipbook initialized successfully");
    } catch (error) {
        console.error("Error initializing flipbook:", error);
        
        // Fallback display if turn.js fails
        fallbackDisplay();
    }
}

/**
 * Resize the flipbook based on screen size
 */
function resizeFlipbook() {
    if ($(window).width() < 768) {
        var newWidth = $(window).width() * 0.9;
        var newHeight = newWidth * 0.625; // maintain aspect ratio
        
        try {
            $("#flipbook").turn("size", newWidth, newHeight);
            console.log("Resized flipbook to:", newWidth, "x", newHeight);
        } catch (error) {
            console.error("Error resizing flipbook:", error);
        }
    } else {
        try {
            $("#flipbook").turn("size", 800, 500);
            console.log("Resized flipbook to default size");
        } catch (error) {
            console.error("Error resizing flipbook to default:", error);
        }
    }
}

/**
 * Fallback display if turn.js fails
 */
function fallbackDisplay() {
    console.log("Applying fallback display for flipbook");
    
    $("#flipbook").css({
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    });
    
    $("#flipbook div").css({
        width: "45%",
        margin: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.15)"
    });
    
    // Add helper text
    $(".flipbook-container").append(
        $("<div>").css({
            textAlign: "center",
            marginTop: "20px",
            fontSize: "0.9rem",
            color: "#ff0000"
        }).text("Note: Interactive flipbook failed to load. Showing static version instead.")
    );
}

/**
 * Handle animations for page elements
 */
function initAnimations() {
    console.log("Initializing animations");
    
    // Immediate fade-in for hero elements
    $('.fade-in').addClass('active');
    
    // Scroll-based fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Element in view:", entry.target.className);
                entry.target.classList.add('active');
                
                // Special handling for flipbook container to ensure it's visible
                if (entry.target.classList.contains('flipbook-container')) {
                    entry.target.style.opacity = "1";
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px' // Trigger a bit earlier
    });
    
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Reload flipbook if page was previously hidden and becomes visible again
document.addEventListener("visibilitychange", function() {
    if (!document.hidden) {
        console.log("Page is now visible, checking flipbook state");
        
        // Check if flipbook is already initialized and working
        try {
            if ($("#flipbook").turn("is")) {
                console.log("Flipbook is already initialized");
                resizeFlipbook(); // Just resize to ensure proper display
            } else {
                console.log("Reinitializing flipbook after visibility change");
                initFlipbook();
            }
        } catch (error) {
            console.log("Reinitializing flipbook after visibility change");
            initFlipbook();
        }
    }
});