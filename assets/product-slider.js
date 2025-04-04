if (!customElements.get('product-slider')) {
  class ProductSlider extends HTMLElement {
    constructor() {
      super();
      this.slider = this.querySelector('.product__slider-wrapper');
      this.slides = this.querySelectorAll('.product__slider-item');
      this.currentIndex = 0;
      this.totalSlides = this.slides.length;
      this.nextButton = this.querySelector('.product__slider-button--next');
      this.prevButton = this.querySelector('.product__slider-button--prev');

      this.nextButton.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.stopAutoSlide.call(this);
      });
      this.prevButton.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.stopAutoSlide.call(this);
      });
      this.nextButton.addEventListener('mouseleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.startAutoSlide.call(this);
      });
      this.prevButton.addEventListener('mouseleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.startAutoSlide.call(this);
      });

      this.dots = this.querySelector('.product__slider-dots');
      this.autoSlideInterval = null;
      this.autoSlideDelay = 1500; // Time in ms between auto slides (1.5 seconds)
      // Bind methods once to preserve references
      this.boundStartAutoSlide = this.startAutoSlide.bind(this);
      this.boundStopAutoSlide = this.stopAutoSlide.bind(this);
      // Only initialize if there are multiple slides
      if (this.totalSlides > 1) {
        this.initSlider();
      }
    }
    get autoPlay() {
      return this.dataset.autoPlay !== 'false';
    }
    initSlider() {
      // Add event listeners to the existing buttons
      this.nextButton?.addEventListener('click', this.nextSlide.bind(this));
      this.prevButton?.addEventListener('click', this.prevSlide.bind(this));
      // Set up auto-play based on current attribute
      if (this.autoPlay) {
        this.addEventListener('mouseenter', this.boundStartAutoSlide);
        this.addEventListener('mouseleave', this.boundStopAutoSlide);
      }
      // Initial slide setup
      this.updateSlides();
      // Set up click events for dots if they exist
      if (this.dots) {
        const dotButtons = this.dots.querySelectorAll('.product__slider-dot');
        dotButtons.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            this.currentIndex = index;
            this.updateSlides();
            // Reset auto-slide timer when manually changing slides
            if (this.autoSlideInterval) {
              this.stopAutoSlide();
              this.startAutoSlide();
            }
          });
        });
      }
    }
    startAutoSlide() {
      // Clear any existing interval first
      this.stopAutoSlide();
      // Set up auto-sliding interval
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoSlideDelay);
    }
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
      }
    }
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
      this.updateSlides();
    }
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
      this.updateSlides();
    }
    updateSlides() {
      // Hide all slides and show the current one
      this.slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === this.currentIndex);
      });
      // Update dots
      const dots = this.dots?.querySelectorAll('.product__slider-dot');
      dots?.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }
  }
  customElements.define('product-slider', ProductSlider);
}
