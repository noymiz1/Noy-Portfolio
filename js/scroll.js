document.addEventListener("DOMContentLoaded", function () {
    // View Work button functionality
    const viewWorkButton = document.getElementById("viewWorkButton");
    const projectsSection = document.getElementById("projects");
    const offset = 70; // Adjust this value as needed

    if (viewWorkButton && projectsSection) {
        viewWorkButton.addEventListener("click", function () {
            const projectsPosition = projectsSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: projectsPosition, behavior: "smooth" });
        });
    }
    
    // Navigation links functionality
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        });
    });
});