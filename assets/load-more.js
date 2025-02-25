if (!customElements.get('load-more-button')) {
    class LoadMoreButton extends HTMLElement {
      constructor() {
        super();
        this.button = this.querySelector('button');
        this.container = document.getElementById('product-grid');
        this.loadMoreContainer = document.querySelector('.load-more-container');
        this.spinner = this.querySelector('.loading-overlay__spinner');
  
        if (this.button) {
          this.button.addEventListener('click', this.loadMore.bind(this));
        }
      }
  
      loadMore() {
        this.button.disabled = true;
        this.spinner.classList.remove('hidden');
  
        const currentPage = parseInt(this.loadMoreContainer.dataset.currentPage, 10);
        const nextPage = currentPage + 1;
        const totalPages = parseInt(this.loadMoreContainer.dataset.totalPages, 10);
  
        const url = new URL(window.location.href);
        url.searchParams.set('page', nextPage);
        url.searchParams.set('section_id', `${this.loadMoreContainer.dataset.sectionId}`);
  
        fetch(url.toString())
          .then((response) => response.text())
          .then((responseText) => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(responseText, 'text/html');
            const productItems = htmlDocument.querySelectorAll('#product-grid .grid__item');
  
            productItems.forEach((item) => {
              this.container.appendChild(item);
            });
  
            // Update current page
            this.loadMoreContainer.dataset.currentPage = nextPage;
  
            // Hide button if we've reached the last page
            if (nextPage >= totalPages) {
              this.button.classList.add('hidden');
            }
  
            this.button.disabled = false;
            this.spinner.classList.add('hidden');
          })
          .catch((error) => {
            console.error('Error loading more products:', error);
            this.button.disabled = false;
            this.spinner.classList.add('hidden');
          });
      }
    }
  
    customElements.define('load-more-button', LoadMoreButton);
  }