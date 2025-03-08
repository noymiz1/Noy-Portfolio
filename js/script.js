// This script waits for the page to be fully loaded
window.onload = function() {
    setTimeout(function() {
      fixEverything();
    }, 500); // Small delay to ensure everything is loaded
  };
  
  function fixEverything() {
    console.log("Starting emergency fix script...");
    
    // Try to find the button by multiple methods
    const aboutBtn = document.getElementById("openModal") || 
                    document.querySelector(".about-wrapper a") ||
                    document.querySelector("a:contains('About')");
                    
    const modal = document.getElementById("aboutModal");
    
    // Night mode toggle fix
    const toggle = document.getElementById("nightModeSwitch") || 
                  document.querySelector(".night-mode input");
    
    // Set up About modal
    if (aboutBtn && modal) {
      aboutBtn.addEventListener("click", function(e) {
        e.preventDefault();
        modal.style.display = "flex";
        document.body.classList.add("modal-active");
        setTimeout(() => modal.style.opacity = "1", 10);
      });
      
      // Set up close button
      const closeBtn = modal.querySelector(".close");
      if (closeBtn) {
        closeBtn.addEventListener("click", function() {
          modal.style.opacity = "0";
          setTimeout(() => {
            modal.style.display = "none";
            document.body.classList.remove("modal-active");
          }, 300);
        });
      }
    }
    
    // Set up night mode toggle
    if (toggle) {
      // Load saved preference
      if (localStorage.getItem("nightMode") === "enabled") {
        document.body.classList.add("night-mode");
        toggle.checked = true;
      }
      
      // Set up toggle handler
      toggle.addEventListener("change", function() {
        if (this.checked) {
          document.body.classList.add("night-mode");
          localStorage.setItem("nightMode", "enabled");
        } else {
          document.body.classList.remove("night-mode");
          localStorage.setItem("nightMode", "disabled");
        }
      });
    }
    
    console.log("Emergency fix script completed");
  }