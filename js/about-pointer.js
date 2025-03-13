// About Pointer JS - Position directly below the About button
document.addEventListener('DOMContentLoaded', function() {
    // Get the pointer element
    const pointerElement = document.getElementById('aboutPointer');
    
    if (pointerElement) {
        // Initially position the bubble in the upper right corner
        // This will be updated once we find the About button
        initialPosition(pointerElement);
        
        // Show the pointer with a fade-in effect
        pointerElement.style.display = 'block';
        pointerElement.style.opacity = '0';
        pointerElement.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            pointerElement.style.opacity = '1';
        }, 500);
        
        // Try to find and position relative to the About button
        findAndPositionNearAbout(pointerElement);
    }
});

// Initial position (fallback)
function initialPosition(pointer) {
    pointer.style.position = 'fixed';
    pointer.style.top = '60px'; // Default position
    pointer.style.right = '80px';
}

// Find the About button and position bubble below it
function findAndPositionNearAbout(pointer) {
    // Different ways to find the About button/link
    const possibleSelectors = [
        'a[href*="about"]',
        'a[href*="About"]',
        'a[href="#about"]',
        'a[data-section="about"]',
        '.about-link',
        '#about-link',
        'a:contains("About")',
        'a.about',
        '.nav a:nth-child(2)' // Often the second nav item is About
    ];
    
    let aboutButton = null;
    
    // Try each selector
    for (const selector of possibleSelectors) {
        const element = document.querySelector(selector);
        if (element) {
            aboutButton = element;
            break;
        }
    }
    
    // If we found the About button
    if (aboutButton) {
        positionBelowAbout(pointer, aboutButton);
        
        // Add click listener to hide bubble when About is clicked
        aboutButton.addEventListener('click', function() {
            pointer.style.opacity = '0';
            setTimeout(() => {
                pointer.style.display = 'none';
            }, 500);
        });
    } else {
        // If we couldn't find it immediately, try again when fragments might be loaded
        setTimeout(() => {
            findAndPositionNearAbout(pointer);
        }, 1000);
    }
    
    // Hide the bubble after 15 seconds regardless
    setTimeout(() => {
        pointer.style.opacity = '0';
        setTimeout(() => {
            pointer.style.display = 'none';
        }, 500);
    }, 15000);
}

// Position the bubble directly below the About button
function positionBelowAbout(pointer, aboutButton) {
    const aboutRect = aboutButton.getBoundingClientRect();
    
    // Center the bubble below the About button
    const bubbleWidth = pointer.offsetWidth || 190; // Default width if not yet rendered
    
    // Position directly below the About button
    pointer.style.top = `${aboutRect.bottom + window.scrollY + 5}px`;
    pointer.style.right = `${window.innerWidth - aboutRect.right + (aboutRect.width/2) - (bubbleWidth/2)}px`;
    
    // Check and update position on window resize
    window.addEventListener('resize', function() {
        const updatedRect = aboutButton.getBoundingClientRect();
        const updatedBubbleWidth = pointer.offsetWidth || 190;
        
        pointer.style.top = `${updatedRect.bottom + window.scrollY + 5}px`;
        pointer.style.right = `${window.innerWidth - updatedRect.right + (updatedRect.width/2) - (updatedBubbleWidth/2)}px`;
    });
}