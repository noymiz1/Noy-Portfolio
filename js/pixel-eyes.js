// Pixel Eyes Following Cursor Script with Fixed Positioning
document.addEventListener('DOMContentLoaded', function() {
    const eyesContainer = document.querySelector('.pixel-eyes-container');
    const pupils = document.querySelectorAll('.pixel-pupil');
    const aboutLink = document.querySelector('a[href*="about"]');
    const topBar = document.querySelector('.top-bar') || document.querySelector('header');
    
    if (eyesContainer && pupils.length) {
        // Position relative to top bar
        let topBarHeight = 50; // Default if no top bar found
        
        if (topBar) {
            topBarHeight = topBar.offsetHeight;
            
            // Make sure eyes are positioned correctly relative to About button
            const aboutRect = aboutLink ? aboutLink.getBoundingClientRect() : null;
            if (aboutRect) {
                eyesContainer.style.top = (aboutRect.top + aboutRect.height/2) + 'px';
                eyesContainer.style.right = (window.innerWidth - aboutRect.left + 30) + 'px';
            } else {
                eyesContainer.style.top = (topBarHeight / 2) + 'px';
                eyesContainer.style.right = '100px';
            }
        } else {
            eyesContainer.style.top = '15px';
            eyesContainer.style.right = '100px';
        }
        
        // Make sure position is fixed
        eyesContainer.style.position = 'fixed';
        
        // Make pupils follow cursor
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Update each pupil to look at cursor
            pupils.forEach(pupil => {
                const eye = pupil.parentElement;
                const eyeRect = eye.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                const eyeCenterY = eyeRect.top + eyeRect.height / 2;
                
                // Calculate distance from eye to cursor
                const distX = mouseX - eyeCenterX;
                const distY = mouseY - eyeCenterY;
                
                // Determine how far to move the pupil (limit to edge of eye)
                const angle = Math.atan2(distY, distX);
                const maxDistance = 10; // Maximum pixel movement
                
                const pupilX = Math.round(Math.cos(angle) * maxDistance);
                const pupilY = Math.round(Math.sin(angle) * maxDistance);
                
                // Apply movement with pixel-perfect snapping
                pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
            });
        });
        
        // Click interactions - eyes get wide when clicking
        document.addEventListener('mousedown', function() {
            document.querySelectorAll('.pixel-pupil').forEach(pupil => {
                pupil.style.width = "24px";
                pupil.style.height = "24px";
                pupil.style.top = "8px";
                pupil.style.left = "8px";
                pupil.style.backgroundColor = '#ff5555';
            });
        });
        
        document.addEventListener('mouseup', function() {
            document.querySelectorAll('.pixel-pupil').forEach(pupil => {
                pupil.style.width = "18px";
                pupil.style.height = "18px";
                pupil.style.top = "11px";
                pupil.style.left = "11px";
                pupil.style.backgroundColor = '';
            });
        });
        
        // About link interaction
        if (aboutLink) {
            aboutLink.addEventListener('mouseenter', function() {
                document.querySelectorAll('.pixel-pupil').forEach(pupil => {
                    pupil.style.transform = 'scale(1.5)';
                    pupil.style.backgroundColor = '#ff5555';
                    pupil.style.animation = 'none'; // Stop blinking during hover
                });
            });
            
            aboutLink.addEventListener('mouseleave', function() {
                document.querySelectorAll('.pixel-pupil').forEach(pupil => {
                    pupil.style.transform = '';
                    pupil.style.backgroundColor = '';
                    pupil.style.animation = 'blink 4s infinite'; // Resume blinking
                });
            });
        }
        
        // Adjust positioning on window resize
        window.addEventListener('resize', function() {
            if (aboutLink) {
                const aboutRect = aboutLink.getBoundingClientRect();
                eyesContainer.style.top = (aboutRect.top + aboutRect.height/2) + 'px';
                eyesContainer.style.right = (window.innerWidth - aboutRect.left + 30) + 'px';
            }
        });
    }
});