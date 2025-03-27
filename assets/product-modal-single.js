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
      this.thumbnailContainer = this.querySelector('.product-modal-thumbnails');
      this.productMainImage = this.querySelector('.product-modal-media-container');

      this.isMobile = window.innerWidth < 750;
      this.visibleThumbnails = new Set();

      // Set up observers
      this.setupIntersectionObserver();

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

      this.thumbnails.forEach((thumbnail) => {
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

      // Also observe scroll events on the thumbnail container
      if (this.thumbnailContainer) {
        this.thumbnailContainer.addEventListener('scroll', this.handleThumbnailScroll.bind(this));
      }

      // Handle swipe gestures for mobile
      this.setupSwipeHandling();
    }

    setupIntersectionObserver() {
      if (!this.thumbnailContainer || !this.thumbnails.length) return;

      // Options for the observer
      const options = {
        root: this.thumbnailContainer,
        rootMargin: '0px',
        threshold: 0.6, // Consider visible when 60% of thumbnail is visible
      };

      // Create the observer
      this.thumbnailObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const thumbnail = entry.target;

          if (entry.isIntersecting) {
            this.visibleThumbnails.add(thumbnail.dataset.mediaId);
            thumbnail.setAttribute('data-visible', 'true');
          } else {
            this.visibleThumbnails.delete(thumbnail.dataset.mediaId);
            thumbnail.setAttribute('data-visible', 'false');
          }
        });
      }, options);

      // Observe all thumbnails
      this.thumbnails.forEach((thumbnail) => {
        this.thumbnailObserver.observe(thumbnail);
      });
    }

    debounceResize(func, wait) {
      let timeout;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    }

    handleThumbnailScroll() {
      // Update visibility when scrolling
      // This provides a backup for the IntersectionObserver
      requestAnimationFrame(() => {
        if (!this.thumbnailContainer) return;

        const containerRect = this.thumbnailContainer.getBoundingClientRect();

        this.thumbnails.forEach((thumbnail) => {
          const thumbRect = thumbnail.getBoundingClientRect();
          const isVisible = !(thumbRect.right < containerRect.left || thumbRect.left > containerRect.right);

          if (isVisible) {
            this.visibleThumbnails.add(thumbnail.dataset.mediaId);
            thumbnail.setAttribute('data-visible', 'true');
          } else {
            this.visibleThumbnails.delete(thumbnail.dataset.mediaId);
            thumbnail.setAttribute('data-visible', 'false');
          }
        });
      });
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

      // Re-evaluate thumbnail visibility after resize
      this.handleThumbnailScroll();
    }

    adjustMediaToViewport(mediaElement) {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // set maxium dimensions based on viewport.

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

      // Disconnect intersection observer
      if (this.thumbnailObserver) {
        this.thumbnailObserver.disconnect();
      }

      if (this.thumbnailContainer) {
        this.thumbnailContainer.removeEventListener('scroll', this.handleThumbnailScroll);
      }
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
      const activeThumb = this.querySelector('.product-modal-thumbnail.active');
      if (!activeThumb) return;

      const prevThumb = activeThumb.previousElementSibling;
      if (prevThumb && prevThumb.classList.contains('product-modal-thumbnail')) {
        this.handleThumbnailClick({ currentTarget: prevThumb, stopPropagation: () => {} });

        // Ensure we show up to 3 thumbnails on the left side
        const activeIndex = Array.from(this.thumbnails).findIndex((thumb) => thumb === prevThumb);

        // Calculate which thumbnail should be at the left edge of the visible area
        let targetIndex = Math.max(0, activeIndex - 3);
        if (targetIndex > 0) {
          // Scroll to position the target thumbnail at the left edge
          this.thumbnailContainer.scrollLeft = this.thumbnails[targetIndex].offsetLeft;
        } else {
          // If we're near the beginning, scroll to the start
          this.thumbnailContainer.scrollLeft = 0;
        }
      } else {
        // Loop to the last thumbnail if at the beginning
        const lastThumb = this.thumbnails[this.thumbnails.length - 1];
        if (lastThumb) {
          this.handleThumbnailClick({ currentTarget: lastThumb, stopPropagation: () => {} });

          // When looping to the end, show the last set of thumbnails
          this.thumbnailContainer.scrollLeft =
            this.thumbnailContainer.scrollWidth - this.thumbnailContainer.clientWidth;
        }
      }
    }

    showNextMedia() {
      const activeThumb = this.querySelector('.product-modal-thumbnail.active');
      if (!activeThumb) return;

      const nextThumb = activeThumb.nextElementSibling;
      if (nextThumb && nextThumb.classList.contains('product-modal-thumbnail')) {
        this.handleThumbnailClick({ currentTarget: nextThumb, stopPropagation: () => {} });

        // Ensure we show up to 3 thumbnails on the right side
        const activeIndex = Array.from(this.thumbnails).findIndex((thumb) => thumb === nextThumb);

        // If we're near the end, ensure we can see 3 thumbnails to the right
        if (activeIndex >= this.thumbnails.length - 3) {
          // Scroll to show the end of the thumbnails
          this.thumbnailContainer.scrollLeft =
            this.thumbnailContainer.scrollWidth - this.thumbnailContainer.clientWidth;
        } else {
          // Otherwise, position the active thumbnail with space for 3 more
          const containerWidth = this.thumbnailContainer.offsetWidth;
          const thumbnailWidth = nextThumb.offsetWidth;

          // Calculate the target scroll position to show the active thumbnail
          // plus 3 more to the right
          const targetPosition = nextThumb.offsetLeft - containerWidth / 2 + thumbnailWidth * 2;
          this.thumbnailContainer.scrollLeft = Math.max(0, targetPosition);
        }
      } else {
        // Loop to the first thumbnail if at the end
        const firstThumb = this.thumbnails[0];
        if (firstThumb) {
          this.handleThumbnailClick({ currentTarget: firstThumb, stopPropagation: () => {} });

          // When looping to the beginning, scroll to the start
          this.thumbnailContainer.scrollLeft = 0;
        }
      }
    }

    handleThumbnailClick(event) {
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

    scrollThumbnailIntoView(thumbnail) {
      if (!this.thumbnailContainer || !thumbnail) return;

      // Get the index of the current thumbnail
      const activeIndex = Array.from(this.thumbnails).findIndex((thumb) => thumb === thumbnail);

      // Get the current active thumbnail (for detecting direction)
      const currentActive = this.querySelector('.product-modal-thumbnail.active');
      const currentActiveIndex = currentActive
        ? Array.from(this.thumbnails).findIndex((thumb) => thumb === currentActive)
        : -1;

      // Check if we're scrolling left
      const isScrollingLeft = currentActiveIndex > activeIndex;

      // Special handling for first thumbnails
      if (activeIndex <= 2) {
        this.thumbnailContainer.scrollLeft = 0;
        return;
      }

      // Special handling for last thumbnails
      if (activeIndex >= this.thumbnails.length - 3) {
        this.thumbnailContainer.scrollLeft = this.thumbnailContainer.scrollWidth - this.thumbnailContainer.clientWidth;
        return;
      }

      // For middle thumbnails
      if (isScrollingLeft) {
        // When scrolling left, ensure we can see 3 thumbnails before the active one
        let leftmostIndex = Math.max(0, activeIndex - 3);
        const leftmostThumb = this.thumbnails[leftmostIndex];

        if (leftmostThumb) {
          this.thumbnailContainer.scrollLeft = leftmostThumb.offsetLeft;

          console.log()
        }
      } else {
        // When scrolling right, ensure we can see 3 thumbnails after the active one
        const containerWidth = this.thumbnailContainer.offsetWidth;
        const thumbnailWidth = thumbnail.offsetWidth;

        // Position the thumbnail with room for 3 more on the right
        const scrollPosition = thumbnail.offsetLeft - containerWidth / 2 + thumbnailWidth * 2;
        this.thumbnailContainer.scrollLeft = Math.max(0, scrollPosition);
      }
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
      this.showActiveMedia();

      // Update mobile status when modal is opened
      this.handleResize();

      // Add mobile class if on mobile
      if (this.isMobile) {
        this.classList.add('product-media-modal--mobile');
      } else {
        this.classList.remove('product-media-modal--mobile');
      }

      // Re-evaluate thumbnail visibility
      setTimeout(() => {
        this.handleThumbnailScroll();
      }, 100);
    }

    showActiveMedia() {
      if (!this.openedBy) return;

      const mediaId = this.openedBy.getAttribute('data-media-id');

      // Set initial active thumbnail
      this.thumbnails.forEach((thumb) => {
        thumb.classList.toggle('active', thumb.dataset.mediaId === mediaId);

        // Scroll the initial active thumbnail into view
        if (thumb.dataset.mediaId === mediaId) {
          this.scrollThumbnailIntoView(thumb);
        }
      });

      this.showMedia(mediaId);
    }
  }

  customElements.define('product-modal-single', ProductModalSingle);
}
