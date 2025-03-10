class ProjectSlider {
    constructor() {
        this.currentSlide = 0;
        this.wrapper = document.querySelector('.slider-wrapper');
        this.slides = this.wrapper.querySelectorAll('img');
        this.dotsContainer = document.querySelector('.slider-dots');
        
        this.createDots();
        this.addListeners();
        this.updateDots();
    }

    createDots() {
        this.slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        });
    }

    addListeners() {
        document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next').addEventListener('click', () => this.nextSlide());
    }

    goToSlide(n) {
        this.currentSlide = n;
        this.wrapper.style.transform = `translateX(-${n * 100}%)`;
        this.updateDots();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(this.currentSlide);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(this.currentSlide);
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentSlide);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectSlider();
});