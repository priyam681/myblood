if (typeof ProductMediaLoadMore === 'undefined') {
  if (!customElements.get('product-media-load-more')) {
    class ProductMediaLoadMore extends HTMLElement {
      constructor() {
        super();
        // Get the configured values from data attributes

        this.currentlyLoaded = null;
        this.itemsPerLoad = null;

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
          this.init();
        }
      }

      connectedCallback() {
        this.currentlyLoaded = parseInt(this.dataset.initialCount || 4);
        this.itemsPerLoad = parseInt(this.dataset.loadMoreCount || 4);
      }

      init() {
        this.loadMoreButton = this.querySelector('button[id^="LoadMoreMedia-"]');

        if (this.loadMoreButton) {
          console.log(`Load more button found. Will load ${this.itemsPerLoad} more images each time.`);
          this.loadMoreButton.addEventListener('click', () => this.handleLoadMore());
        }
      }

      handleLoadMore() {
        console.log(`Loading ${this.itemsPerLoad} more media items`);
        const spinner = this.loadMoreButton.querySelector('.loading-overlay__spinner');

        if (spinner) spinner.classList.remove('hidden');

        // Find all hidden media elements
        const allHiddenMedia = Array.from(document.querySelectorAll('.hidden-media'));
        const totalHidden = allHiddenMedia.length;

        // Determine which ones to show this time (next batch)
        const mediaToShow = allHiddenMedia.slice(0, this.itemsPerLoad);

        // Show only the next batch
        mediaToShow.forEach((media) => {
          media.classList.remove('hidden-media');
        });

        // Update currently loaded count
        this.currentlyLoaded += mediaToShow.length;

        // Hide spinner
        if (spinner) spinner.classList.add('hidden');

        // Check if we have more to load
        if (allHiddenMedia.length <= this.itemsPerLoad) {
          // No more to load, hide the button
          this.style.display = 'none';
        } else {
          // Update button text to show progress (optional)
          const remaining = totalHidden - mediaToShow.length;
          const loadMoreText = this.loadMoreButton.querySelector('.load-more-text');
          if (loadMoreText) {
            loadMoreText.textContent = `Load More (${remaining} remaining)`;
          }
        }

        // Reinitialize sliders if needed
        if (typeof window.refreshSliders === 'function') {
          window.refreshSliders();
        }

        return false; // Prevent default behavior
      }
    }
  }
}
