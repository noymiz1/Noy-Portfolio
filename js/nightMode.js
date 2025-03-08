document.addEventListener("DOMContentLoaded", function () {
    const nightModeSwitch = document.getElementById("nightModeSwitch");

    if (!nightModeSwitch) {
        console.warn("⚠️ Night mode switch not found in the DOM.");
        return;
    }

    // Function to enable night mode
    function enableNightMode() {
        document.body.classList.add("night-mode");
        localStorage.setItem("nightMode", "enabled");
    }

    // Function to disable night mode
    function disableNightMode() {
        document.body.classList.remove("night-mode");
        localStorage.setItem("nightMode", "disabled");
    }

    // Check local storage for saved mode
    if (localStorage.getItem("nightMode") === "enabled") {
        enableNightMode();
        nightModeSwitch.checked = true;
    }

    // Toggle Night Mode on switch change
    nightModeSwitch.addEventListener("change", function () {
        if (this.checked) {
            enableNightMode();
        } else {
            disableNightMode();
        }
    });
});
