if (!customElements.get('product-modal-single')) {
  class ProductModalSingle extends ModalDialog {
    constructor() {
      super();
      this.mediaToggle = this.querySelector('.product-media-modal__toggle');
      this.thumbnails = this.querySelectorAll('.product-modal-thumbnail');
      this.modalContent = this.querySelector('.product-media-modal__content');
      this.modalDialog = this.querySelector('.product-media-modal__dialog');
      this.thumbnailContainer = this.querySelector('.product-modal-thumbnails');
      this.drag = false;
      this.dragStartTime = 0;
      this.dragStartX = null;
      this.scrollStartX = null;
      this.mouseUp = false;
      this.isDragging = false;


      // click and drag

      this.boundStartDrag = this.startDrag.bind(this);
      this.boundMovePointer = this.movePointer.bind(this);
      this.boundEndDrag = this.endDrag.bind(this);


      this.thumbnailContainer.addEventListener('mouseup', this.boundEndDrag.bind(this), false);

      this.thumbnailContainer.addEventListener('mousedown', this.boundStartDrag.bind(this), false);

      this.thumbnailContainer.addEventListener('mousemove', this.boundMovePointer.bind(this));

      this.thumbnailContainer.addEventListener('mouseleave', this.cancelDrag.bind(this));

      this.isMobile = window.innerWidth < 750;

      // Update isMobile value on resize
      this.resizeHandler = () => {
        this.handleResize.call(this);
      };

      window.addEventListener('resize', this.resizeHandler.bind(window));

      // Override the default hide behavior to prevent closing when clicking outside
      this.addEventListener('click', (event) => {
        // Stop the event from propagating to prevent the modal from closing
        event.stopPropagation();
      });

      // Only allow closing via the close button
      this.mediaToggle.addEventListener('click', (event) => {
        event.preventDefault();
        super.hide();
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

      // Setup initial thumbnail event listeners
      this.setupThumbnailEventListeners();

      // Setup initial arrow event listeners
      this.setupArrowEventListeners();

      // Setup swipe handling for mobile
      this.setupSwipeHandling();
    }

    connectedCallback() {
      if (this.moved) return;
      this.moved = true;
      // Safely get the section ID with null checking
      const shopifySection = this.closest('.shopify-section');
      if (shopifySection && shopifySection.id) {
        this.dataset.section = shopifySection.id.replace('shopify-section-', '');
      }
      // Move the modal to the body for proper stacking
      document.body.appendChild(this);
    }

    startDrag(event) {

      this.drag = true;
      this.dragStartTime = Date.now();
      this.dragStartX = event.clientX;
      this.scrollStartX = this.thumbnailContainer.scrollLeft;

      document.addEventListener('mousemove', this.boundMovePointer);
      document.addEventListener('mouseup', this.boundEndDrag);

      const buttonThumbnail = this.thumbnailContainer.querySelectorAll('.product-modal-thumbnail img');
      buttonThumbnail.forEach(item => {
        item.style.cursor = 'grabbing';
        item.setAttribute('draggable', 'false');
      });
      this.thumbnailContainer.style.cursor = 'grabbing';
      event.preventDefault();
    }

    endDrag(event) {
      if (event.cancelable) {
        event.preventDefault();
      }

      this.drag = false;

      // remove document-level event listeners
      document.removeEventListener('mousemove', this.boundMovePointer);
      document.removeEventListener('mouseup', this.boundEndDrag);

      const buttonThumbnail = this.thumbnailContainer.querySelectorAll('.product-modal-thumbnail img');
      buttonThumbnail.forEach(item => {
        item.style.cursor = 'pointer';
        item.setAttribute('draggable', 'true');
      });
      this.thumbnailContainer.style.cursor = 'pointer';

      setTimeout(() => {
        this.isDragging = false;
      }, 500);
    }

    cancelDrag(event) {
      if (this.drag) {
        this.drag = false;
        this.resetDragStyles();
      }
    }

    resetDragStyles() {

      const buttonThumbnail = this.thumbnailContainer.querySelectorAll('.product-modal-thumbnail img');
      buttonThumbnail.forEach(item => {
        item.style.cursor = 'pointer';
        item.setAttribute('draggable', 'true');
      });
      this.thumbnailContainer.style.cursor = 'pointer';
    }

    movePointer(event) {
      if (this.drag) {
        // if mouse has moved, and we have been dragging for more than 100ms
        if (Date.now() - this.dragStartTime > 100) {
          this.isDragging = true;
        }

        // how far we moved
        const dx = event.clientX - this.dragStartX;
        // scroll the container
        this.thumbnailContainer.scrollLeft = this.scrollStartX - dx;

        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }


    debounceResize(func, wait) {
      let timeout;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    }

    handleResize() {
      const mainImageContainer = this.querySelector('.product-modal-main-image');

      if (mainImageContainer) {
        const mediaContainers = mainImageContainer.querySelectorAll('.product-modal-media-container:not(.hidden)');

        mediaContainers.forEach((container) => {
          this.adjustMediaToViewport(container);
        });
      }

      this.isMobile = window.innerWidth < 750;
    }

    adjustMediaToViewport(mediaElement) {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const maxHeight = viewportHeight * 0.9;
      const maxWidth = viewportWidth * 0.9;

      mediaElement.style.maxHeight = `${maxHeight}px`;
      mediaElement.style.maxWidth = `${maxWidth}px`;

      // Ensure media fits properly
      mediaElement.style.objectFit = 'contain';
    }

    disconnectedCallback() {
      // Clean up all event listeners
      document.removeEventListener('click', this.documentClickHandler);
      window.removeEventListener('resize', this.resizeHandler);
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
      // Use a lower threshold on mobile for better responsiveness
      const threshold = this.isMobile ? 30 : 50;

      this.modalContent.addEventListener(
        'touchstart',
        (event) => {
          // Store the initial touch position
          startX = event.touches[0].clientX;
          startY = event.touches[0].clientY;
        },
        { passive: true }
      );

      // Add touchmove handler to show visual feedback during swipe
      this.modalContent.addEventListener(
        'touchmove',
        (event) => {
          if (!startX || !startY) return;

          // Calculate how far we've moved
          const currentX = event.touches[0].clientX;
          const diffX = currentX - startX;

          // If it looks like a horizontal swipe, add visual feedback
          if (Math.abs(diffX) > 20) {
            // Prevent default only for horizontal swipes to allow vertical scrolling
            if (Math.abs(diffX) > Math.abs(event.touches[0].clientY - startY)) {
              event.preventDefault();
            }
          }
        },
        { passive: false }
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
      // Refresh thumbnails to ensure we're working with current DOM elements
      this.refreshThumbnails();
      
      console.log('showPreviousMedia: thumbnails count:', this.thumbnails.length);
      
      const activeThumb = this.querySelector('.product-modal-thumbnail.active');
      console.log('showPreviousMedia: activeThumb:', activeThumb);
      if (!activeThumb) return;

      // Find the index of the current active thumbnail
      const activeIndex = Array.from(this.thumbnails).findIndex(thumb => thumb === activeThumb);
      console.log('showPreviousMedia: activeIndex:', activeIndex);
      
      if (activeIndex > 0) {
        // Move to the previous thumbnail
        const prevThumb = this.thumbnails[activeIndex - 1];
        console.log('showPreviousMedia: prevThumb:', prevThumb);
        this.handleThumbnailClick({
          currentTarget: prevThumb, stopPropagation: () => {
          }
        });
      } else {
        // Loop to the last thumbnail if at the beginning
        const lastThumb = this.thumbnails[this.thumbnails.length - 1];
        console.log('showPreviousMedia: looping to lastThumb:', lastThumb);
        if (lastThumb) {
          this.handleThumbnailClick({
            currentTarget: lastThumb, stopPropagation: () => {
            }
          });
        }
      }
    }

    showNextMedia() {
      // Refresh thumbnails to ensure we're working with current DOM elements
      this.refreshThumbnails();
      
      console.log('showNextMedia: thumbnails count:', this.thumbnails.length);
      
      const activeThumb = this.querySelector('.product-modal-thumbnail.active');
      console.log('showNextMedia: activeThumb:', activeThumb);
      
      if (!activeThumb) {
        // Fallback: if no active thumbnail, let's manually set the first one as active
        console.log('showNextMedia: No active thumbnail found, setting first as active');
        if (this.thumbnails.length > 0) {
          this.thumbnails[0].classList.add('active');
          return this.showNextMedia(); // Retry
        }
        return;
      }

      // Find the index of the current active thumbnail
      const activeIndex = Array.from(this.thumbnails).findIndex(thumb => thumb === activeThumb);
      console.log('showNextMedia: activeIndex:', activeIndex);
      
      if (activeIndex < this.thumbnails.length - 1) {
        // Move to the next thumbnail
        const nextThumb = this.thumbnails[activeIndex + 1];
        console.log('showNextMedia: nextThumb:', nextThumb);
        this.handleThumbnailClick({
          currentTarget: nextThumb, stopPropagation: () => {
          }
        });
      } else {
        // Loop to the first thumbnail if at the end
        const firstThumb = this.thumbnails[0];
        console.log('showNextMedia: looping to firstThumb:', firstThumb);
        if (firstThumb) {
          this.handleThumbnailClick({
            currentTarget: firstThumb, stopPropagation: () => {
            }
          });
        }
      }
    }

    scrollThumbnailIntoView(thumbnail) {
      if (!this.thumbnailContainer || !thumbnail) return;

      // Get the index of the current thumbnail
      const activeIndex = Array.from(this.thumbnails).findIndex((thumb) => thumb === thumbnail);

      // ALWAYS scroll to the beginning when we're in the first 6 thumbnails
      if (activeIndex < 6) {
        this.thumbnailContainer.scrollLeft = 0;
        return;
      }

      // Special handling for last thumbnails
      if (activeIndex >= this.thumbnails.length - 3) {
        this.thumbnailContainer.scrollLeft = this.thumbnailContainer.scrollWidth - this.thumbnailContainer.clientWidth;
        return;
      }

      // For middle thumbnails
      const containerWidth = this.thumbnailContainer.offsetWidth;
      const thumbnailWidth = thumbnail.offsetWidth;

      // Center the active thumbnail in the container
      const scrollPosition = thumbnail.offsetLeft - (containerWidth / 2) + (thumbnailWidth / 2);
      this.thumbnailContainer.scrollLeft = Math.max(0, scrollPosition);
    }

    handleThumbnailClick(event) {

      if (this.isDragging) {
        return;
      }

      // Stop propagation to prevent the modal from closing
      if (event.stopPropagation) {
        event.stopPropagation();
      }

      const mediaId = event.currentTarget.dataset.mediaId;
      this.showMedia(mediaId);

      // Update active state on thumbnails
      this.thumbnails.forEach((thumb) => {
        thumb.classList.toggle('active', thumb.dataset.mediaId === mediaId);
      });

      // Scroll the thumbnail into view
      this.scrollThumbnailIntoView(event.currentTarget);
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

      // Call resize handler to adjust the image to viewport
      this.handleResize();
    }

    show(opener) {
      super.show(opener);

      // Force scroll to beginning when modal opens
      if (this.thumbnailContainer) {
        this.thumbnailContainer.scrollLeft = 0;
      }

      this.showActiveMedia();

      // Update mobile status when modal is opened
      this.handleResize();

      // Add mobile class if on mobile
      if (this.isMobile) {
        this.classList.add('product-media-modal--mobile');
      } else {
        this.classList.remove('product-media-modal--mobile');
      }
    }

    refreshThumbnails() {
      // Refresh thumbnail references to current DOM elements
      this.thumbnails = this.querySelectorAll('.product-modal-thumbnail');
      
      // Re-bind event listeners to new thumbnail elements
      this.setupThumbnailEventListeners();
      
      // Re-initialize arrow button event listeners
      this.setupArrowEventListeners();
      
      // Re-establish active thumbnail based on currently visible media
      this.reestablishActiveState();
    }

    setupArrowEventListeners() {
      // Re-find arrow buttons in case they were replaced
      const prevButton = this.querySelector('.product-modal-prev');
      const nextButton = this.querySelector('.product-modal-next');

      if (prevButton) {
        // Remove existing listener to avoid duplicates
        prevButton.removeEventListener('click', this.prevButtonHandler);
        // Store bound handler for removal later
        this.prevButtonHandler = (event) => {
          event.stopPropagation();
          console.log('Arrow PREV clicked');
          this.showPreviousMedia();
        };
        prevButton.addEventListener('click', this.prevButtonHandler);
      }

      if (nextButton) {
        // Remove existing listener to avoid duplicates  
        nextButton.removeEventListener('click', this.nextButtonHandler);
        // Store bound handler for removal later
        this.nextButtonHandler = (event) => {
          event.stopPropagation();
          console.log('Arrow NEXT clicked');
          this.showNextMedia();
        };
        nextButton.addEventListener('click', this.nextButtonHandler);
      }
      
      console.log('setupArrowEventListeners: prevButton:', prevButton, 'nextButton:', nextButton);
    }

    reestablishActiveState() {
      // Find the currently visible media container
      const visibleMedia = this.querySelector('.product-modal-media-container:not(.hidden)');
      if (visibleMedia) {
        const visibleMediaId = visibleMedia.dataset.mediaId;
        console.log('reestablishActiveState: visible media ID:', visibleMediaId);
        
        // Set the corresponding thumbnail as active
        this.thumbnails.forEach((thumb) => {
          const isActive = thumb.dataset.mediaId === visibleMediaId;
          thumb.classList.toggle('active', isActive);
          if (isActive) {
            console.log('reestablishActiveState: set active thumbnail:', thumb);
          }
        });
      } else {
        // Fallback: if no visible media found, activate the first thumbnail
        console.log('reestablishActiveState: no visible media, activating first thumbnail');
        if (this.thumbnails.length > 0) {
          this.thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === 0);
          });
        }
      }
    }

    setupThumbnailEventListeners() {
      this.thumbnails.forEach((thumbnail) => {
        // Remove existing listeners to avoid duplicates
        thumbnail.removeEventListener('click', this.handleThumbnailClick);
        
        // Handle both click and touch events
        thumbnail.addEventListener('click', this.handleThumbnailClick.bind(this));
        thumbnail.addEventListener('touchend', (event) => {
          // Prevent default touch behavior only on mobile
          if (this.isMobile) {
            event.preventDefault();
          }
          this.handleThumbnailClick(event);
        });
      });
    }

    showActiveMedia() {
      if (!this.openedBy) return;

      // Refresh thumbnails to ensure we're working with current DOM elements
      this.refreshThumbnails();

      const mediaId = this.openedBy.getAttribute('data-media-id');
      console.log('showActiveMedia: openedBy:', this.openedBy);
      console.log('showActiveMedia: mediaId from openedBy:', mediaId);

      // Set initial active thumbnail
      this.thumbnails.forEach((thumb, index) => {
        console.log(`showActiveMedia: thumbnail ${index} mediaId:`, thumb.dataset.mediaId);
        const isActive = thumb.dataset.mediaId === mediaId;
        thumb.classList.toggle('active', isActive);

        // Scroll the initial active thumbnail into view
        if (isActive) {
          console.log('showActiveMedia: setting active thumbnail:', thumb);
          this.scrollThumbnailIntoView(thumb);
        }
      });

      this.showMedia(mediaId);
    }

    disconnectedCallbacks() {
      // Clean up all event listeners when element is removed
      document.removeEventListener('click', this.documentClickHandler);
      window.removeEventListener('resize', this.resizeHandler);

      if (this.thumbnailContainer) {
        this.thumbnailContainer.removeEventListener('mouseup', this.boundEndDrag);
        this.thumbnailContainer.removeEventListener('mousedown', this.boundStartDrag);
        this.thumbnailContainer.removeEventListener('mousemove', this.boundMovePointer);
        this.thumbnailContainer.removeEventListener('mouseleave', this.cancelDrag.bind(this));
      }
    }

  }

  customElements.define('product-modal-single', ProductModalSingle);
}