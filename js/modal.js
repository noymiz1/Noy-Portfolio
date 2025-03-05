document.addEventListener("DOMContentLoaded", function () {
    function setupModal() {
        const modal = document.getElementById("aboutModal");
        const openBtn = document.getElementById("openModal");
        const closeBtn = modal.querySelector(".close");
        const pixelEffectContainer = document.getElementById("pixelEffectContainer");
        const aboutText = modal.querySelector(".hover-trigger"); // "About Me" text

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
                modal.style.display = "flex";
                document.body.classList.add("modal-active");

                // Activate pixel effect inside the modal only
                pixelEffectContainer.addEventListener("mousemove", pixelEffect);
            });

            closeBtn.addEventListener("click", () => {
                modal.style.opacity = "0";
                setTimeout(() => {
                    modal.style.display = "none";
                    document.body.classList.remove("modal-active");

                    // Remove pixel effect when closing the modal
                    pixelEffectContainer.removeEventListener("mousemove", pixelEffect);
                    pixelEffectContainer.innerHTML = ""; // Clears any remaining squares
                    profileImg.style.opacity = "0"; // Hide profile image
                }, 300);
            });

            window.addEventListener("click", (event) => {
                if (event.target === modal) {
                    modal.style.opacity = "0";
                    setTimeout(() => {
                        modal.style.display = "none";
                        document.body.classList.remove("modal-active");

                        // Remove pixel effect when clicking outside modal
                        pixelEffectContainer.removeEventListener("mousemove", pixelEffect);
                        pixelEffectContainer.innerHTML = ""; // Clears any remaining squares
                        profileImg.style.opacity = "0"; // Hide profile image
                    }, 300);
                }
            });

            // Show and move floating profile image on hover
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
    }

    function pixelEffect(e) {
        const squareSize = 20;
        const fadeOutDuration = 1000;
        const displayDuration = 7000;

        const pixelEffectContainer = document.getElementById("pixelEffectContainer");
        if (!pixelEffectContainer) return;

        let lastCreated = Date.now();
        const currentTime = Date.now();
        if (currentTime - lastCreated < 100) return; // Throttle effect
        lastCreated = currentTime;

        const rect = pixelEffectContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const startX = Math.floor(mouseX / squareSize) * squareSize - squareSize * 2;
        const startY = Math.floor(mouseY / squareSize) * squareSize - squareSize * 2;

        for (let x = startX; x < startX + squareSize * 5 && x < rect.width; x += squareSize) {
            for (let y = startY; y < startY + squareSize * 5 && y < rect.height; y += squareSize) {
                createSquare(x, y);
            }
        }
    }

    function createSquare(x, y) {
        const square = document.createElement("div");
        square.style.position = "absolute";
        square.style.left = `${x}px`;
        square.style.top = `${y}px`;
        square.style.width = "20px";
        square.style.height = "20px";
        square.style.backgroundColor = randomColor();
        square.style.zIndex = "1"; // Ensure it's behind modal content
        square.style.opacity = "1";
        square.style.transition = "opacity 1s ease-out";

        document.getElementById("pixelEffectContainer").appendChild(square);

        setTimeout(() => {
            square.style.opacity = "0";
            setTimeout(() => square.remove(), 1000);
        }, 6000);
    }

    function randomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Wait for `top-bar.html` to load dynamically
    const observer = new MutationObserver(() => {
        if (document.getElementById("openModal")) {
            setupModal();
            observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
