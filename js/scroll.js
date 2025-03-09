document.addEventListener("DOMContentLoaded", function () {
    const viewWorkButton = document.getElementById("viewWorkButton");
    const projectsSection = document.getElementById("projects");
    const offset = 70; // Adjust this value as needed

    viewWorkButton.addEventListener("click", function () {
        const projectsPosition = projectsSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: projectsPosition, behavior: "smooth" });
    });
});