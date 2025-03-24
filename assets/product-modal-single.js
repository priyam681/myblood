if (!customElements.get('product-modal-single')) {
    class ProductModalSingle extends ModalDialog {
      constructor() {
        super();
        this.productMedia = null;
        this.zoomSingle = true;
        this.mediaToggle = this.querySelector('.product-media-modal__toggle');
        this.thumbnails = this.querySelectorAll('.product-modal-thumbnail');
        this.modalContent = this.querySelector('.product-media-modal__content');
        this.modalDialog = this.querySelector('.product-media-modal__dialog');
  
        // Override the default hide behavior to prevent closing when clicking outside
        this.addEventListener('click', (event) => {
          // Stop the event from propagating to prevent the modal from closing
          event.stopPropagation();
        });
  
        // Only allow closing via the close button
        this.mediaToggle.addEventListener('click', (event) => {
          event.preventDefault();
          super.hide();
          console.log('Hello');
        });
  
        // Prevent closing when clicking inside the modal dialog
        if (this.modalDialog) {
          this.modalDialog.addEventListener('click', (event) => {
            // Only stop propagation if clicking inside the dialog but not on the close button
            if (!event.target.closest('.product-media-modal__toggle')) {
              event.stopPropagation();
              event.preventDefault();
            }
          });
        }
  
        // Add a specific listener to handle clicks outside the modal
        this.documentClickHandler = this.handleDocumentClick.bind(this);
        document.addEventListener('click', this.documentClickHandler);
  
        this.thumbnails.forEach((thumbnail) => {
          // Handle both click and touch events
          thumbnail.addEventListener('click', this.handleThumbnailClick.bind(this));
          thumbnail.addEventListener('touchend', (event) => {
            event.preventDefault(); // Prevent default touch behavior
            this.handleThumbnailClick(event);
          });
        });
  
        // Add navigation arrow event listeners
        const prevButton = this.querySelector('.product-modal-prev');
        const nextButton = this.querySelector('.product-modal-next');
  
        if (prevButton) {
          prevButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.showPreviousMedia();
          });
        }
  
        if (nextButton) {
          nextButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.showNextMedia();
          });
        }
  
        // Handle swipe gestures for mobile
        this.setupSwipeHandling();
      }
  
      disconnectedCallback() {
        // Just clean up our own event listeners
        document.removeEventListener('click', this.documentClickHandler);
      }
  
      // Override the hide method to prevent closing except through the close button
      hide() {
        // Only allow hide to be called from the close button click handler
        // which uses super.hide() directly
        return;
      }
  
      handleDocumentClick(event) {
        // We're overriding this to do nothing, as we want the modal to stay open
        // regardless of clicks outside
        return;
      }
  
      setupSwipeHandling() {
        let startX, startY;
        let distX, distY;
        const threshold = 50; // Minimum distance for swipe
  
        this.modalContent.addEventListener(
          'touchstart',
          (event) => {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
          },
          { passive: true }
        );
  
        this.modalContent.addEventListener('touchend', (event) => {
          if (!startX || !startY) return;
  
          distX = event.changedTouches[0].clientX - startX;
          distY = event.changedTouches[0].clientY - startY;
  
          // If horizontal swipe is greater than vertical and exceeds threshold
          if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
            if (distX > 0) {
              // Swipe right - show previous image
              this.showPreviousMedia();
            } else {
              // Swipe left - show next image
              this.showNextMedia();
            }
          }
  
          startX = null;
          startY = null;
        });
      }
  
      showPreviousMedia() {
        const activeThumb = this.querySelector('.product-modal-thumbnail.active');
        if (!activeThumb) return;
  
        const prevThumb = activeThumb.previousElementSibling;
        if (prevThumb && prevThumb.classList.contains('product-modal-thumbnail')) {
          this.handleThumbnailClick({ currentTarget: prevThumb, stopPropagation: () => {} });
        } else {
          // Loop to the last thumbnail if at the beginning
          const lastThumb = this.thumbnails[this.thumbnails.length - 1];
          if (lastThumb) {
            this.handleThumbnailClick({ currentTarget: lastThumb, stopPropagation: () => {} });
          }
        }
      }
  
      showNextMedia() {
        const activeThumb = this.querySelector('.product-modal-thumbnail.active');
        if (!activeThumb) return;
  
        const nextThumb = activeThumb.nextElementSibling;
        if (nextThumb && nextThumb.classList.contains('product-modal-thumbnail')) {
          this.handleThumbnailClick({ currentTarget: nextThumb, stopPropagation: () => {} });
        } else {
          // Loop to the first thumbnail if at the end
          const firstThumb = this.thumbnails[0];
          if (firstThumb) {
            this.handleThumbnailClick({ currentTarget: firstThumb, stopPropagation: () => {} });
          }
        }
      }
  
      handleThumbnailClick(event) {
        // Stop propagation to prevent the modal from closing
        event.stopPropagation();
  
        const mediaId = event.currentTarget.dataset.mediaId;
        this.showMedia(mediaId);
  
        // Update active state on thumbnails
        this.thumbnails.forEach((thumb) => {
          thumb.classList.toggle('active', thumb.dataset.mediaId === mediaId);
        });
      }
  
      showMedia(mediaId) {
        // Hide all media
        this.querySelectorAll('.product-modal-media-container').forEach((el) => {
          el.classList.add('hidden');
        });
  
        // Show selected media
        const mediaElement = this.querySelector(`.product-modal-media-container[data-media-id="${mediaId}"]`);
        if (mediaElement) {
          mediaElement.classList.remove('hidden');
  
          // Handle video content if needed
          const deferredMedia = mediaElement.querySelector('deferred-media');
          if (deferredMedia && deferredMedia.getAttribute('loaded') !== 'true') {
            deferredMedia.loadContent();
          }
        }
      }
  
      show(opener) {
        super.show(opener);
        this.showActiveMedia();
      }
  
      showActiveMedia() {
        if (!this.openedBy) return;
  
        const mediaId = this.openedBy.getAttribute('data-media-id');
  
        // Set initial active thumbnail
        this.thumbnails.forEach((thumb) => {
          thumb.classList.toggle('active', thumb.dataset.mediaId === mediaId);
        });
  
        this.showMedia(mediaId);
      }
    }
  
    customElements.define('product-modal-single', ProductModalSingle);
  }