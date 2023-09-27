class FetchReplaceElement extends HTMLElement {
    constructor() {
        super();

      this.style.visibility = "hidden";

        const src = this.getAttribute('src');
        const oldInner = this.innerHTML;
      
        if (src) {
            fetch(src)
                .then(response => response.text())
                .then(data => {
                  data = data.replaceAll(/<slot\s*>[^<]*<\/slot\s*>/g, oldInner);
                  this.innerHTML = data;
                })
                .catch(error => {
                    console.error('There was an error fetching the content:', error);
                });
        }
    }

    connectedCallback() {
      // this.style.visiblity = "visible";
    }
}

customElements.define('html-fragment', FetchReplaceElement);

function swapHtmlWithElement(htmlString, targetEl) {
    const tempWrapper = document.createElement('div');
    tempWrapper.innerHTML = htmlString;

    // Append each child node before the target element.
    while (tempWrapper.firstChild) {
        targetEl.parentNode.insertBefore(tempWrapper.firstChild, targetEl);
    }

    // Using requestAnimationFrame to ensure styling.
    requestAnimationFrame(() => {
        targetEl.parentNode.removeChild(targetEl);
    });
}