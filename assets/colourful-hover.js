if (!customElements.get('colourful-hover')) {
  class ColourfulHover extends HTMLElement {
    constructor() {
      super();
      this.timer = null;
      this.productImages = null;
      this.currentIndex = 0;
      this.hoverState = false; // Fixed typo from 'hoveState' to 'hoverState'
    }

    connectedCallback() {
      this.container = this.querySelector('.product-images-container');
      if (!this.container) return;

      this.productImages = this.querySelectorAll('.collection-image');
      this.productwrapper = this.querySelectorAll('.product-image-wrapper-sec');
      if (this.productImages.length === 0) return;

      this.hideTimeout = null;

      // Set up event listeners on the entire product image wrapper instead of just container
      this.productImageWrapper = this.querySelector('.product-image-wrapper');
      if (this.productImageWrapper) {
        this.productImageWrapper.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.productImageWrapper.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      }

      // Initialize images and start interval
      this.initialProductImages();
      this.startTimer();
    }

    disconnectedCallback() {
      // Clean up event listeners and timer when element is removed
      if (this.productImageWrapper) {
        this.productImageWrapper.removeEventListener('mouseenter', this.handleMouseEnter);
        this.productImageWrapper.removeEventListener('mouseleave', this.handleMouseLeave);
      }

      // Clear any pending timeout
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }

      this.clearTimer();
    }

    handleMouseEnter(e) {
      e.preventDefault();
      e.stopPropagation();
      this.onHover();
    }

    handleMouseLeave(e) {
      e.preventDefault();
      this.onLeave();
    }

    onLeave() {
      // Use a timeout to allow user to move to popup
      this.hideTimeout = setTimeout(() => {
        this.hoverState = false;
        this.hideModal();
        this.startTimer();
      }, 300); // 300ms delay for better UX
    }

    onHover() {
      // Clear any pending hide timeout
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }

      // Only process if not already in hover state
      if (!this.hoverState) {
        this.hoverState = true;
        this.clearTimer();
        this.showModal();
      }
    }

    showModal() {
      const currentProductImageId = parseInt(this.productImages[this.currentIndex].getAttribute('data-product-id'));

      Array.from(this.querySelectorAll('.product-image-info')).forEach(item => {

        if (currentProductImageId === parseInt(item.getAttribute('data-product-id'))) {


          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    hideModal() {
      Array.from(this.querySelectorAll('.product-image-info')).forEach(item => {
        item.style.display = 'none';
      });
    }

    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    startTimer() {
      this.clearTimer();
      const interval = parseInt(this.getAttribute('data-interval')) || 3000; // Default to 3 seconds
      if (interval > 0 && this.productImages && this.productImages.length > 1) {
        this.timer = setInterval(() => this.startInterval(), interval);
      }
    }

    initialProductImages() {

      // No need to pass productImages as parameter since it's a class property
      this.productwrapper.forEach((image, i) => {
        image.style.display = i === this.currentIndex ? 'block' : 'none';
      });
    }

    startInterval() {
      if (this.hoverState || this.productImages.length <= 1) return;

      this.currentIndex = (this.currentIndex + 1) % this.productImages.length;
      this.updateImagesDisplay();
    }

    updateImagesDisplay() {
      this.productwrapper.forEach((image, i) => {
        image.style.display = i === this.currentIndex ? 'block' : 'none';
      });
    }

    static get observedAttributes() {
      return ['data-interval'];
    }


    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'data-interval' && oldValue !== newValue && !this.hoverState && this.productImages) {
        this.startTimer();
      }
    }
  }

  customElements.define('colourful-hover', ColourfulHover);
}
