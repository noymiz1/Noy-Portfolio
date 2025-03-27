/**
 * Floating Phone Animation Script
 * Handles phone mockup animations for both featured projects and case studies
 * Provides responsive behavior across desktop and mobile devices
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize both case study and featured project phones
    initCaseStudyPhones();
    initFeaturedPhones();
    
    // Handle window resize events with debouncing
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initCaseStudyPhones();
            initFeaturedPhones();
        }, 250);
    });
    
    /**
     * Initialize phone animations for case study pages
     */
    function initCaseStudyPhones() {
        const phones = document.querySelectorAll('.hero-carousel-container .carousel-phone');
        if (phones.length === 0) return;
        
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        const isTinyMobile = window.innerWidth <= 360;
        
        // Apply container scaling for very small screens
        const container = document.querySelector('.hero-carousel-container');
        if (container) {
            if (isTinyMobile) {
                container.style.transform = 'scale(0.75)';
                container.style.height = '280px';
            } else if (isSmallMobile) {
                container.style.transform = 'scale(0.85)';
                container.style.height = '320px';
            } else if (isMobile) {
                container.style.transform = 'scale(0.95)';
                container.style.height = '400px';
            } else {
                container.style.transform = '';
                container.style.height = '';
            }
        }
        
        phones.forEach((phone, index) => {
            // Set index for animation delay
            phone.style.setProperty('--phone-index', index);
            
            // Apply different settings based on screen size
            if (isTinyMobile) {
                applyTinyMobileSettings(phone, index);
            } else if (isSmallMobile) {
                applySmallMobileSettings(phone, index);
            } else if (isMobile) {
                applyMobileSettings(phone, index);
            } else {
                applyDesktopSettings(phone, index);
            }
            
            // Set animation properties
            setAnimationProperties(phone, isMobile);
        });
        
        console.log('✅ Case study phones initialized for ' + 
                   (isTinyMobile ? 'tiny mobile' : 
                    isSmallMobile ? 'small mobile' : 
                    isMobile ? 'mobile/tablet' : 'desktop'));
    }
    
    /**
     * Initialize phone animations for featured project section
     */
    function initFeaturedPhones() {
        const phones = document.querySelectorAll('.featured-project .carousel-phone');
        if (phones.length === 0) return;
        
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        const isTinyMobile = window.innerWidth <= 360;
        
        // Apply container scaling for very small screens
        const showcase = document.querySelector('.phone-showcase');
        if (showcase) {
            if (isTinyMobile) {
                showcase.style.transform = 'scale(0.7)';
            } else if (isSmallMobile) {
                showcase.style.transform = 'scale(0.8)';
            } else if (isMobile) {
                showcase.style.transform = 'scale(0.9)';
            } else {
                showcase.style.transform = '';
            }
        }
        
        phones.forEach((phone, index) => {
            // Set index for animation delay
            phone.style.setProperty('--phone-index', index);
            
            // Apply appropriate width and margin based on screen size
            if (isTinyMobile) {
                phone.style.width = '140px';
                phone.style.margin = '0 -45px';
                phone.style.padding = '8px';
            } else if (isSmallMobile) {
                phone.style.width = '160px';
                phone.style.margin = '0 -40px';
                phone.style.padding = '10px';
            } else if (isMobile) {
                phone.style.width = '200px';
                phone.style.margin = '0 -30px';
                phone.style.padding = '12px';
            } else {
                phone.style.width = '250px';
                phone.style.margin = '0 -20px';
                phone.style.padding = '15px';
            }
            
            // Apply different settings based on screen size
            if (isTinyMobile) {
                applyTinyMobileSettings(phone, index);
            } else if (isSmallMobile) {
                applySmallMobileSettings(phone, index);
            } else if (isMobile) {
                applyMobileSettings(phone, index);
            } else {
                applyDesktopSettings(phone, index);
            }
            
            // Set animation properties
            setAnimationProperties(phone, isMobile);
        });
        
        // Also add subtle floating animation to project info
        const projectInfo = document.querySelector('.project-info');
        if (projectInfo) {
            projectInfo.style.animation = 'projectFloat 3s ease-in-out infinite alternate';
            projectInfo.style.setProperty('--float-y-start', isMobile ? '3px' : '5px');
            projectInfo.style.setProperty('--float-y-end', isMobile ? '-3px' : '-5px');
            projectInfo.style.setProperty('--float-rotate-start', '0deg');
            projectInfo.style.setProperty('--float-rotate-end', '0deg');
        }
        
        console.log('✅ Featured phones initialized');
    }
    
    /**
     * Apply desktop-specific style variables
     */
    function applyDesktopSettings(phone, index) {
        switch(index) {
            case 0:
                phone.style.setProperty('--float-y-start', '10px');
                phone.style.setProperty('--float-y-end', '0px');
                phone.style.setProperty('--float-rotate-start', '-5deg');
                phone.style.setProperty('--float-rotate-end', '-3deg');
                phone.style.transform = 'translateY(10px) rotate(-5deg)';
                phone.style.zIndex = '1';
                break;
            case 1:
                phone.style.setProperty('--float-y-start', '0px');
                phone.style.setProperty('--float-y-end', '-10px');
                phone.style.setProperty('--float-rotate-start', '0deg');
                phone.style.setProperty('--float-rotate-end', '0deg');
                phone.style.transform = 'translateY(0)';
                phone.style.zIndex = '3';
                break;
            case 2:
                phone.style.setProperty('--float-y-start', '15px');
                phone.style.setProperty('--float-y-end', '5px');
                phone.style.setProperty('--float-rotate-start', '5deg');
                phone.style.setProperty('--float-rotate-end', '3deg');
                phone.style.transform = 'translateY(15px) rotate(5deg)';
                phone.style.zIndex = '2';
                break;
        }
    }
    
    /**
     * Apply tablet/mobile style variables
     */
    function applyMobileSettings(phone, index) {
        switch(index) {
            case 0:
                phone.style.setProperty('--float-y-start', '8px');
                phone.style.setProperty('--float-y-end', '0px');
                phone.style.setProperty('--float-rotate-start', '-6deg');
                phone.style.setProperty('--float-rotate-end', '-4deg');
                phone.style.transform = 'translateY(8px) rotate(-6deg)';
                phone.style.zIndex = '1';
                break;
            case 1:
                phone.style.setProperty('--float-y-start', '0px');
                phone.style.setProperty('--float-y-end', '-8px');
                phone.style.setProperty('--float-rotate-start', '0deg');
                phone.style.setProperty('--float-rotate-end', '0deg');
                phone.style.transform = 'translateY(0)';
                phone.style.zIndex = '3';
                break;
            case 2:
                phone.style.setProperty('--float-y-start', '10px');
                phone.style.setProperty('--float-y-end', '3px');
                phone.style.setProperty('--float-rotate-start', '6deg');
                phone.style.setProperty('--float-rotate-end', '4deg');
                phone.style.transform = 'translateY(10px) rotate(6deg)';
                phone.style.zIndex = '2';
                break;
        }
    }
    
    /**
     * Apply small mobile style variables
     */
    function applySmallMobileSettings(phone, index) {
        switch(index) {
            case 0:
                phone.style.setProperty('--float-y-start', '5px');
                phone.style.setProperty('--float-y-end', '0px');
                phone.style.setProperty('--float-rotate-start', '-8deg');
                phone.style.setProperty('--float-rotate-end', '-6deg');
                phone.style.transform = 'translateY(5px) rotate(-8deg) scale(0.9)';
                phone.style.zIndex = '1';
                break;
            case 1:
                phone.style.setProperty('--float-y-start', '0px');
                phone.style.setProperty('--float-y-end', '-5px');
                phone.style.setProperty('--float-rotate-start', '0deg');
                phone.style.setProperty('--float-rotate-end', '0deg');
                phone.style.transform = 'translateY(0)';
                phone.style.zIndex = '3';
                break;
            case 2:
                phone.style.setProperty('--float-y-start', '5px');
                phone.style.setProperty('--float-y-end', '0px');
                phone.style.setProperty('--float-rotate-start', '8deg');
                phone.style.setProperty('--float-rotate-end', '6deg');
                phone.style.transform = 'translateY(5px) rotate(8deg) scale(0.9)';
                phone.style.zIndex = '2';
                break;
        }
    }
    
    /**
     * Apply very small mobile settings (under 360px)
     */
    function applyTinyMobileSettings(phone, index) {
        switch(index) {
            case 0:
                phone.style.setProperty('--float-y-start', '3px');
                phone.style.setProperty('--float-y-end', '0px');
                phone.style.setProperty('--float-rotate-start', '-10deg');
                phone.style.setProperty('--float-rotate-end', '-8deg');
                phone.style.transform = 'translateY(0) rotate(-10deg) scale(0.85)';
                phone.style.zIndex = '1';
                break;
            case 1:
                phone.style.setProperty('--float-y-start', '0px');
                phone.style.setProperty('--float-y-end', '-3px');
                phone.style.setProperty('--float-rotate-start', '0deg');
                phone.style.setProperty('--float-rotate-end', '0deg');
                phone.style.transform = 'translateY(0) scale(0.95)';
                phone.style.zIndex = '3';
                break;
            case 2:
                phone.style.setProperty('--float-y-start', '3px');
                phone.style.setProperty('--float-y-end', '0px');
                phone.style.setProperty('--float-rotate-start', '10deg');
                phone.style.setProperty('--float-rotate-end', '8deg');
                phone.style.transform = 'translateY(0) rotate(10deg) scale(0.85)';
                phone.style.zIndex = '2';
                break;
        }
    }
    
    /**
     * Set animation properties based on device type
     */
    function setAnimationProperties(phone, isMobile) {
        // Set animation duration (shorter on mobile for better performance)
        const duration = isMobile ? '2s' : '2.5s';
        
        // Apply animation if not already present
        if (!phone.style.animation || phone.style.animation.indexOf('phoneFloat') === -1) {
            phone.style.animation = `phoneFloat ${duration} ease-in-out infinite alternate`;
            phone.style.animationDelay = `${phone.dataset.phoneIndex || 0 * 0.5}s`;
        }
    }
    
    /**
     * Check if device is in landscape orientation
     */
    function isLandscape() {
        return window.innerWidth > window.innerHeight && window.innerWidth < 1024;
    }
    
    // Check for orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            initCaseStudyPhones();
            initFeaturedPhones();
        }, 300);
    });
});