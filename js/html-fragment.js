class HTMLFragment extends HTMLElement {
    constructor() {
        super();
        this.loadContent();
    }

    loadContent() {
        fetch(this.getAttribute('src'))
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                document.dispatchEvent(new CustomEvent('fragmentsLoaded'));
            })
            .catch(error => console.error('Error loading fragment:', error));
    }
}

customElements.define('html-fragment', HTMLFragment);