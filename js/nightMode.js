document.addEventListener('DOMContentLoaded', function() {
    const nightModeSwitch = document.getElementById('nightModeSwitch');

    if(nightModeSwitch) {
        nightModeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.removeAttribute('data-theme');
                localStorage.removeItem('theme');
            }
        });

        // Check for saved preference and apply it on load
        if (localStorage.getItem('theme') === 'dark') {
            nightModeSwitch.checked = true;
            document.body.setAttribute('data-theme', 'dark');
        }
    } else {
        console.error("nightModeSwitch not found in the DOM");
    }
});


