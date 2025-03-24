if (!customElements.get('product-swatch')) {
    class ProductSwatchComponent extends HTMLElement {
      constructor() {
        super();
        this.swatchInupt = null;
        this.cardContainer = null;
        this.defaultImage = null;
        this.sliderItems = null;
      }
  
      connectedCallback() {
        this.swatchInupt = this.querySelector('input[type="radio"]');
        this.cardContainer = this.closest('.card');
        this.sliderItems = this.cardContainer.querySelectorAll('.product__slider-item');
        console.log('Slider: ', this.sliderItems);
        this.addEventListener('input', this.handleSwatchChange.bind(this));
      }
  
      getSelectedInputValues() {
        let str = '';
        const selectedInputs = this.querySelectorAll('input[type="radio"]:checked');
        selectedInputs.forEach((input, index) => {
          if ((selectedInputs.length - 1) !== index) {
            str += input.value.concat('/');
          } else {
            str += input.value;
          }
        });
        return str;
      }
  
      handleSwatchChange(e) {
        const product = JSON.parse(this.querySelector('script[ data-variants]').textContent);
  
        this.defaultImage = product.media[0];
        const selectedInputsString = this.getSelectedInputValues();
        const variant = product.variants.find(variant => {
          const cleanTitle = variant.title.replace(/\s*\/\s*/g, '/');
          return cleanTitle === selectedInputsString;
        });
  
        this.updateProduct(variant);
      }
  
  
      updateProduct(variant) {
        const priceRegular = this.cardContainer.querySelector('.price-item--regular');
        const priceSale = this.cardContainer.querySelector('.price-item--sale');
        const productUrl = this.cardContainer.querySelectorAll('a');
        const productSlider = this.cardContainer.querySelector('product-slider');
  
        // Update the variant ID in the add to cart form
        const variantIdInput = this.cardContainer.querySelector('.product-variant-id');
  
        // Get all badges elements
        const badges = this.cardContainer.querySelectorAll('.card__badge');
  
        if (variantIdInput && variant) {
          variantIdInput.value = variant.id;
        }
  
        // Update the add to cart button
        const addToCartButton = this.cardContainer.querySelector('.quick-add__submit');
  
        if (addToCartButton) {
          if (!variant.available) {
  
  
            addToCartButton.querySelector('.add-to-cart').style.display = 'none';
            addToCartButton.disabled = true;
            const soldOutMessage = this.cardContainer.querySelector('.sold-out-message');
            if (soldOutMessage) {
              soldOutMessage.classList.remove('hidden');
            }
          } else {
  
            addToCartButton.querySelector('.add-to-cart').style.display = 'block';
            addToCartButton.removeAttribute('disabled');
            const soldOutMessage = this.cardContainer.querySelector('.sold-out-message');
            if (soldOutMessage) {
              soldOutMessage.classList.add('hidden');
            }
          }
        }
  
  
        if (variant && variant.featured_image) {
          this.updateProductImage(variant.featured_image);
          this.sliderItems.forEach((sliderItem, index) => {
            if (parseInt(sliderItem.dataset.sliderItemId) === variant?.featured_media?.id) {
              sliderItem.classList.add('active');
              productSlider.dataset.autoPlay = false;
            } else {
              sliderItem.classList.remove('active');
            }
  
          });
  
        } else {
          this.updateProductImage(this.defaultImage);
        }
  
        if (variant?.compare_at_price && (variant?.compare_at_price > variant.priceRegular)) {
          priceSale.textContent = `Rs ${this.formatPrice(variant?.price)}`;
          priceRegular.textContent = `Rs ${this.formatPrice(variant?.compare_at_price)}`;
        } else {
          priceSale.textContent = `Rs ${this.formatPrice(variant?.price)}`;
          priceRegular.textContent = `Rs ${this.formatPrice(variant?.price)}`;
        }
  
        productUrl.forEach(anchor => {
          const url = new URL(anchor.href, window.location.origin);
  
          url.searchParams.set('variant', variant.id);
  
          anchor.href = url.toString();
        });
  
      }
  
  
      updateProductImage(image) {
        const productImage = this.cardContainer.querySelector('.card__media img');
  
        if (!productImage || !image) return;
  
        const baseUrl = image.src.split('?')[0];
        const widths = [165, 360, 533, 720, 940, 1066];
        const srcset = widths.map(width => `${baseUrl}?w=${width} ${width}w`).join(', ');
  
  
        // Add the original image size
  
        const fullSrcset = `${srcset}, ${baseUrl}?v=${image.id} ${image.width}w`;
  
        // Update the image
  
        productImage.srcset = fullSrcset;
        productImage.src = `${baseUrl}?v=${image.id}&width=533`;
  
        // update width, height and alt if available
  
        if (image.width) image.width = image.width;
        if (image.height) image.height = image.height;
        if (image.alt) image.alt = image.alt;
      }
  
      formatPrice(price) {
        return (price / 100).toFixed(2);
      }
  
    }
  
    customElements.define('product-swatch', ProductSwatchComponent);
  }