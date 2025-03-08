document.addEventListener("DOMContentLoaded", function () {
    function setupModal() {
        const modal = document.getElementById("aboutModal");
        const openBtn = document.getElementById("openModal");
        const closeBtn = modal?.querySelector(".close");
        const aboutText = modal?.querySelector(".hover-trigger"); // "About Me" text

        // Log what we found for debugging
        console.log("Modal found:", !!modal);
        console.log("Open button found:", !!openBtn);
        console.log("Close button found:", !!closeBtn);

        // Create floating profile image
        let profileImg = document.createElement("img");
        profileImg.src = "/assets/noybiopic.png"; // Ensure correct path
        profileImg.id = "floating-profile-pic";
        profileImg.style.position = "absolute";
        profileImg.style.width = "250px"; // Adjust size
        profileImg.style.height = "250px";
        profileImg.style.borderRadius = "50%";
        profileImg.style.pointerEvents = "none"; // Prevents interference with mouse events
        profileImg.style.opacity = "0"; // Initially hidden
        profileImg.style.transition = "opacity 0.2s ease-out, transform 0.1s linear";
        profileImg.style.zIndex = "1000";
        profileImg.style.transform = "translate(-50%, -50%)"; // Center on cursor
        document.body.appendChild(profileImg);

        if (modal && openBtn && closeBtn) {
            openBtn.addEventListener("click", () => {
                console.log("Modal button clicked");
                modal.style.display = "flex";
                // Force reflow before changing opacity for animation
                void modal.offsetWidth;
                modal.style.opacity = "1"; // Add this line to make it visible
                document.body.classList.add("modal-active");
            });

            closeBtn.addEventListener("click", () => {
                console.log("Close button clicked");
                modal.style.opacity = "0";
                setTimeout(() => {
                    modal.style.display = "none";
                    document.body.classList.remove("modal-active");
                    profileImg.style.opacity = "0"; // Hide profile image
                }, 300);
            });

            window.addEventListener("click", (event) => {
                if (event.target === modal) {
                    console.log("Outside modal clicked");
                    modal.style.opacity = "0";
                    setTimeout(() => {
                        modal.style.display = "none";
                        document.body.classList.remove("modal-active");
                        profileImg.style.opacity = "0"; // Hide profile image
                    }, 300);
                }
            });

            // Show and move floating profile image on hover
            if (aboutText) {
                aboutText.addEventListener("mousemove", function (e) {
                    profileImg.style.opacity = "1";
                    profileImg.style.left = `${e.pageX}px`;
                    profileImg.style.top = `${e.pageY}px`;
                });

                // Hide profile image when leaving "About Me"
                aboutText.addEventListener("mouseleave", function () {
                    profileImg.style.opacity = "0";
                });
            }
        } else {
            console.error("Missing modal elements");
        }
    }

    // First try direct setup if elements already exist
    if (document.getElementById("openModal")) {
        console.log("Elements found on page load, setting up modal");
        setupModal();
    } else {
        console.log("Elements not found, watching for changes");
        // Watch for changes if not immediately available
        const observer = new MutationObserver(() => {
            if (document.getElementById("openModal")) {
                console.log("Elements found after DOM change, setting up modal");
                setupModal();
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
});