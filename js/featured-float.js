document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize floating effects for featured projects
    function initFloatingProjects() {
        const projectImages = document.querySelectorAll('.project-image');
        const projectInfos = document.querySelectorAll('.project-info');
        
        // Set custom properties for more organic movement
        projectImages.forEach((image, index) => {
            // Create unique floating pattern for each project
            image.style.setProperty('--float-y-start', `${5 + (index * 3)}px`);
            image.style.setProperty('--float-y-end', `${-10 - (index * 2)}px`);
            image.style.setProperty('--float-rotate-start', `${-1 + (index)}deg`);
            image.style.setProperty('--float-rotate-end', `${1 + (index * 0.5)}deg`);
            
            // Set different animation delays for a more organic feel
            image.style.animationDelay = `${index * 0.3}s`;
            
            // Add animation class if not present
            if (!image.style.animation) {
                image.style.animation = 'projectFloat 3s ease-in-out infinite alternate';
            }
            
            // Initialize with active state for visibility
            setTimeout(() => {
                image.classList.add('active');
            }, 100 + (index * 200));
        });
        
        // Apply slightly different floating to text elements
        projectInfos.forEach((info, index) => {
            info.style.setProperty('--float-y-start', `${3 + (index * 2)}px`);
            info.style.setProperty('--float-y-end', `${-5 - (index)}px`);
            
            // Offset text animation from image animation
            info.style.animationDelay = `${0.5 + (index * 0.3)}s`;
            
            // Add animation if not present
            if (!info.style.animation) {
                info.style.animation = 'projectFloat 3.5s ease-in-out infinite alternate';
            }
            
            // Initialize with active state for visibility
            setTimeout(() => {
                info.classList.add('active');
            }, 300 + (index * 200));
        });
        
        console.log('✅ Featured projects floating animation initialized');
    }
    
    // Initialize floating effects
    setTimeout(initFloatingProjects, 1000);
    
    // Re-initialize on window resize for responsiveness
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Refresh animation properties on significant resize
            initFloatingProjects();
        }, 250);
    });
});