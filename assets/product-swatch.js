if (!customElements.get('product-swatch')) {
  class ProductSwatchComponent extends HTMLElement {
    constructor() {
      super();
      this.swatchInput = null;
      this.cardContainer = null;
      this.defaultImage = null;
      this.sliderItems = null;
      this.productId = null;
      this.pageCurrency = null;
      this.symbol = null;
    }

    disconnectedCallback() {
      this.removeEventListener('input', this.handleSwatchChange.bind(this), true);
    }

    connectedCallback() {
      this.cardContainer = this.closest('.card');

      if (!this.cardContainer) return;

      this.sliderItems = this.cardContainer.querySelectorAll('.product__slider-item');
      this.addEventListener('input', this.handleSwatchChange.bind(this), true);
    }

    getSelectedInputValues(productId) {
      let str = '';
      // Only get checked inputs within THIS component that match the current product ID
      const selectedInputs = this.cardContainer.querySelectorAll(
        `input[type="radio"][data-product-id="${productId}"]:checked`
      );

      selectedInputs.forEach((input, index) => {
        if (selectedInputs.length - 1 !== index) {
          str += input.value.concat('/');
        } else {
          str += input.value;
        }
      });
      return str;
    }

    async handleSwatchChange(e) {
      e.preventDefault();
      e.stopPropagation();



      const parent = e.target.parentNode;

      const productId = e.target.getAttribute('data-product-id');
      const dataProductId = e.target.getAttribute('data-option-value-id');

      parent.querySelectorAll('input[type="radio"]').forEach((element) => {

        if (element.getAttribute('data-option-value-id') === dataProductId) {
          element.setAttribute('checked', '');
        } else {
          element.removeAttribute('checked');
        }

      });


      // Get product data from this specific component
      const productScript = this.cardContainer.querySelector('script[data-variants]');

      if (!productScript) return;

      const product = JSON.parse(productScript.textContent);
      this.defaultImage = product.media?.[0];

      const selectedInputsString = this.getSelectedInputValues(productId);
      const variant = product.variants.find((variant) => {
        const cleanTitle = variant.title.replace(/\s*\/\s*/g, '/');
        return cleanTitle === selectedInputsString;
      });

      this.updateProduct(variant);
    }

    async fetchPrices(url) {
      try {
        const response = await fetch(url.href);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseText = await response.text();
        const dom = new DOMParser().parseFromString(responseText, 'text/html');
        return dom;
      } catch (error) {
        console.error('Error fetching prices:', error);
        return null;
      }
    }


    async updateProduct(variant) {
      if (!this.cardContainer || !variant) return;

      const priceRegular = this.cardContainer.querySelector('.price-item--regular');
      const priceSale = this.cardContainer.querySelector('.price-item--sale');
      const productUrl = this.cardContainer.querySelectorAll('a');
      const productSlider = this.cardContainer.querySelector('product-slider');

      // Update the variant ID in the added to cart form
      const variantIdInput = this.cardContainer.querySelector('.product-variant-id');
      let label = this.cardContainer.querySelector('product-swatch .form__label > span');
      label.textContent = variant.title;


      if (variantIdInput) {
        variantIdInput.value = variant.id;
      }

      // Update the add to cart button
      const addToCartButton = this.cardContainer.querySelector('.quick-add__submit');

      if (addToCartButton) {
        if (!variant.available) {
          const addToCartText = addToCartButton.querySelector('.add-to-cart');
          if (addToCartText) {
            addToCartText.style.display = 'none';
          }
          addToCartButton.disabled = true;
          const soldOutMessage = this.cardContainer.querySelector('.sold-out-message');
          if (soldOutMessage) {
            soldOutMessage.classList.remove('hidden');
          }
        } else {
          const addToCartText = addToCartButton.querySelector('.add-to-cart');
          if (addToCartText) {
            addToCartText.style.display = 'block';
          }
          addToCartButton.removeAttribute('disabled');
          const soldOutMessage = this.cardContainer.querySelector('.sold-out-message');
          if (soldOutMessage) {
            soldOutMessage.classList.add('hidden');
          }
        }
      }

      if (variant.featured_image) {
        this.updateProductImage(variant.featured_image);
        if (this.sliderItems && this.sliderItems.length > 0) {
          this.sliderItems.forEach((sliderItem) => {
            if (parseInt(sliderItem.dataset.sliderItemId) === variant?.featured_media?.id) {
              sliderItem.classList.add('active');
              if (productSlider) {
                productSlider.dataset.autoPlay = false;
              }
            } else {
              sliderItem.classList.remove('active');
            }
          });
        }
      } else if (this.defaultImage) {
        this.updateProductImage(this.defaultImage);
      }


      if (productUrl && productUrl.length > 0) {
        productUrl.forEach((anchor) => {
          if (!anchor.href) return;
          const url = new URL(anchor.href, window.location.origin);
          url.searchParams.set('variant', variant.id);
          anchor.href = url.toString();
        });
      }


      // Get the first anchor to use for fetching prices
      const anchor = this.cardContainer.querySelector('a[href*="/products/"]');

      if (anchor) {
        const url = new URL(anchor.href, window.location.origin);
        url.searchParams.set('variant', variant.id);

        try {
          const updatedPriceDOM = await this.fetchPrices(url);

          if (updatedPriceDOM) {
            // Extract price elements from the fetched DOM
            const fetchedPriceRegular = updatedPriceDOM.querySelector('.price__regular .price-item');
            const fetchedPriceSale = updatedPriceDOM.querySelector('.price__sale .price-item--sale');
            const fetchedPriceCompare = updatedPriceDOM.querySelector('.price__sale .price-item--regular');

            // Update prices in the current DOM
            const priceRegular = this.cardContainer.querySelector('.price-item--regular');
            const priceSale = this.cardContainer.querySelector('.price-item--sale');

            if (priceRegular && fetchedPriceRegular) {
              priceRegular.textContent = fetchedPriceRegular.textContent;
            }

            if (priceSale && fetchedPriceSale) {
              priceSale.textContent = fetchedPriceSale.textContent;
            } else if (priceSale && fetchedPriceCompare) {
              // If there's no sale price but there is a compare price, use the regular price
              priceSale.textContent = fetchedPriceRegular.textContent;
            }
          }
        } catch (error) {
          console.error('Error updating prices:', error);
        }
      }
    }

    updateProductImage(image) {
      if (!this.cardContainer || !image) return;

      const productImage = this.cardContainer.querySelector('.card__media img');

      if (!productImage || !image.src) return;

      const baseUrl = image.src.split('?')[0];
      const widths = [165, 360, 533, 720, 940, 1066];
      const srcset = widths.map((width) => `${baseUrl}?w=${width} ${width}w`).join(', ');

      // Add the original image size
      const fullSrcset = `${srcset}, ${baseUrl}?v=${image.id} ${image.width}w`;

      // Update the image
      productImage.srcset = fullSrcset;
      productImage.src = `${baseUrl}?v=${image.id}&width=533`;

      // update width, height and alt if available
      if (image.width) productImage.width = image.width;
      if (image.height) productImage.height = image.height;
      if (image.alt) productImage.alt = image.alt;
    }


  }

  customElements.define('product-swatch', ProductSwatchComponent);

  document.addEventListener('DOMContentLoaded', function() {
    // Add this to your product-swatch.js file
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        // Page is coming from back-forward cache
        document.querySelectorAll('product-swatch').forEach((swatch) => {
          if (swatch.cardContainer) {
            // Get default variant data
            const variantDataElement = swatch.cardContainer.querySelector('script[data-selected-variant]');
            if (variantDataElement) {
              try {
                const defaultVariant = JSON.parse(variantDataElement.textContent);

                // Reset all radio inputs first
                swatch.cardContainer.querySelectorAll('input[type="radio"]').forEach((input) => {
                  input.checked = false;
                });

                // Select the default options
                if (defaultVariant && defaultVariant.options) {
                  defaultVariant.options.forEach((optionValue) => {
                    const matchingInput = swatch.cardContainer.querySelector(
                      `input[type="radio"][value="${optionValue}"]`
                    );
                    if (matchingInput) {
                      matchingInput.checked = true;
                    }
                  });
                }

                // Update the product display
                swatch.updateProduct(defaultVariant);
              } catch (error) {
                console.error('Error resetting to default variant:', error);
              }
            }
          }
        });
      }
    });
  });
}