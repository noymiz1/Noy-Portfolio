class FetchReplaceElement extends HTMLElement {
    constructor() {
        super();
        const src = this.getAttribute('src');

        if (src) {
            fetch(src)
                .then(response => response.text())
                .then(data => {
                    this.outerHTML = data;
                })
                .catch(error => {
                    console.error('There was an error fetching the content:', error);
                });
        }
    }

    connectedCallback() { }
}

customElements.define('html-fragment', FetchReplaceElement);