class FacetFiltersForm extends HTMLElement {
  constructor() {
    super();
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 800);

    const facetForm = this.querySelector('form');
    facetForm?.addEventListener('input', this.debouncedOnSubmit.bind(this));

    const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
    if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
  }

  static setListeners() {
    const onHistoryChange = (event) => {
      const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev) return;
      FacetFiltersForm.renderPage(searchParams, null, false);
    };
    window.addEventListener('popstate', onHistoryChange);
  }

  static toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }

  static renderPage(searchParams, event, updateURLHash = true) {
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections = FacetFiltersForm.getSections();
    const countContainer = document.getElementById('ProductCount');
    const countContainerDesktop = document.getElementById('ProductCountDesktop');
    const loadingSpinners = document.querySelectorAll(
      '.facets-container .loading__spinner, facet-filters-form .loading__spinner'
    );
    loadingSpinners.forEach((spinner) => spinner.classList.remove('hidden'));
    document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
    if (countContainer) {
      countContainer.classList.add('loading');
    }
    if (countContainerDesktop) {
      countContainerDesktop.classList.add('loading');
    }

    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = (element) => element.url === url;

      FacetFiltersForm.filterData.some(filterDataUrl)
        ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event)
        : FacetFiltersForm.renderSectionFromFetch(url, event);
    });

    if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
  }

  static renderSectionFromFetch(url, event) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = responseText;
        FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, { html, url }];
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
        if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);
      });
  }

  static renderSectionFromCache(filterDataUrl, event) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);
    FacetFiltersForm.renderProductGridContainer(html);
    FacetFiltersForm.renderProductCount(html);
    if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);
  }

  static renderProductGridContainer(html) {
    document.getElementById('ProductGridContainer').innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('ProductGridContainer').innerHTML;

    document
      .getElementById('ProductGridContainer')
      .querySelectorAll('.scroll-trigger')
      .forEach((element) => {
        element.classList.add('scroll-trigger--cancel');
      });
  }

  static renderProductCount(html) {
    const count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML;
    const container = document.getElementById('ProductCount');
    const containerDesktop = document.getElementById('ProductCountDesktop');
    container.innerHTML = count;
    container.classList.remove('loading');
    if (containerDesktop) {
      containerDesktop.innerHTML = count;
      containerDesktop.classList.remove('loading');
    }
    const loadingSpinners = document.querySelectorAll(
      '.facets-container .loading__spinner, facet-filters-form .loading__spinner'
    );
    loadingSpinners.forEach((spinner) => spinner.classList.add('hidden'));
  }

  static renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');
    const facetDetailsElementsFromFetch = parsedHTML.querySelectorAll(
      '#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter'
    );
    const facetDetailsElementsFromDom = document.querySelectorAll(
      '#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter'
    );

    // Remove facets that are no longer returned from the server
    Array.from(facetDetailsElementsFromDom).forEach((currentElement) => {
      if (!Array.from(facetDetailsElementsFromFetch).some(({ id }) => currentElement.id === id)) {
        currentElement.remove();
      }
    });

    const matchesId = (element) => {
      const jsFilter = event ? event.target.closest('.js-filter') : undefined;
      return jsFilter ? element.id === jsFilter.id : false;
    };

    const facetsToRender = Array.from(facetDetailsElementsFromFetch).filter((element) => !matchesId(element));
    const countsToRender = Array.from(facetDetailsElementsFromFetch).find(matchesId);

    facetsToRender.forEach((elementToRender, index) => {
      const currentElement = document.getElementById(elementToRender.id);
      // Element already rendered in the DOM so just update the innerHTML
      if (currentElement) {
        document.getElementById(elementToRender.id).innerHTML = elementToRender.innerHTML;
      } else {
        if (index > 0) {
          const { className: previousElementClassName, id: previousElementId } = facetsToRender[index - 1];
          // Same facet type (eg horizontal/vertical or drawer/mobile)
          if (elementToRender.className === previousElementClassName) {
            document.getElementById(previousElementId).after(elementToRender);
            return;
          }
        }

        if (elementToRender.parentElement) {
          document.querySelector(`#${elementToRender.parentElement.id} .js-filter`).before(elementToRender);
        }
      }
    });

    FacetFiltersForm.renderActiveFacets(parsedHTML);
    FacetFiltersForm.renderAdditionalElements(parsedHTML);

    if (countsToRender) {
      const closestJSFilterID = event.target.closest('.js-filter').id;

      if (closestJSFilterID) {
        FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
        FacetFiltersForm.renderMobileCounts(countsToRender, document.getElementById(closestJSFilterID));

        const newFacetDetailsElement = document.getElementById(closestJSFilterID);
        const newElementSelector = newFacetDetailsElement.classList.contains('mobile-facets__details')
          ? `.mobile-facets__close-button`
          : `.facets__summary`;
        const newElementToActivate = newFacetDetailsElement.querySelector(newElementSelector);

        const isTextInput = event.target.getAttribute('type') === 'text';

        if (newElementToActivate && !isTextInput) newElementToActivate.focus();
      }
    }
  }

  static renderActiveFacets(html) {
    const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

    activeFacetElementSelectors.forEach((selector) => {
      const activeFacetsElement = html.querySelector(selector);
      if (!activeFacetsElement) return;
      document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
    });

    FacetFiltersForm.toggleActiveFacets(false);
  }

  static renderAdditionalElements(html) {
    const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

    mobileElementSelectors.forEach((selector) => {
      if (!html.querySelector(selector)) return;
      document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
    });

    document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
  }

  static renderCounts(source, target) {
    const targetSummary = target.querySelector('.facets__summary');
    const sourceSummary = source.querySelector('.facets__summary');

    if (sourceSummary && targetSummary) {
      targetSummary.outerHTML = sourceSummary.outerHTML;
    }

    const targetHeaderElement = target.querySelector('.facets__header');
    const sourceHeaderElement = source.querySelector('.facets__header');

    if (sourceHeaderElement && targetHeaderElement) {
      targetHeaderElement.outerHTML = sourceHeaderElement.outerHTML;
    }

    const targetWrapElement = target.querySelector('.facets-wrap');
    const sourceWrapElement = source.querySelector('.facets-wrap');

    if (sourceWrapElement && targetWrapElement) {
      const isShowingMore = Boolean(target.querySelector('show-more-button .label-show-more.hidden'));
      if (isShowingMore) {
        sourceWrapElement
          .querySelectorAll('.facets__item.hidden')
          .forEach((hiddenItem) => hiddenItem.classList.replace('hidden', 'show-more-item'));
      }

      targetWrapElement.outerHTML = sourceWrapElement.outerHTML;
    }
  }

  static renderMobileCounts(source, target) {
    const targetFacetsList = target.querySelector('.mobile-facets__list');
    const sourceFacetsList = source.querySelector('.mobile-facets__list');

    if (sourceFacetsList && targetFacetsList) {
      targetFacetsList.outerHTML = sourceFacetsList.outerHTML;
    }
  }

  static updateURLHash(searchParams) {
    history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
  }

  static getSections() {
    return [
      {
        section: document.getElementById('product-grid').dataset.id,
      },
    ];
  }

  createSearchParams(form) {
    const formData = new FormData(form);
    return new URLSearchParams(formData).toString();
  }

  onSubmitForm(searchParams, event) {
    FacetFiltersForm.renderPage(searchParams, event);
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const sortFilterForms = document.querySelectorAll('facet-filters-form form');
    if (event.srcElement.className == 'mobile-facets__checkbox') {
      const searchParams = this.createSearchParams(event.target.closest('form'));
      this.onSubmitForm(searchParams, event);
    } else {
      const forms = [];
      const isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';

      sortFilterForms.forEach((form) => {
        if (!isMobile) {
          if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
            forms.push(this.createSearchParams(form));
          }
        } else if (form.id === 'FacetFiltersFormMobile') {
          forms.push(this.createSearchParams(form));
        }
      });
      this.onSubmitForm(forms.join('&'), event);
    }
  }

  onActiveFilterClick(event) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    const url =
      event.currentTarget.href.indexOf('?') == -1
        ? ''
        : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
    FacetFiltersForm.renderPage(url);
  }
}

FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();

// class SelectComponent extends FacetFiltersForm {
//   constructor() {
//     super();
//     this.dropdownBtn = this.querySelector('.dropdown-btn');
//     this.dropdownMenu = this.querySelector('.dropdown-menu');
//     this.hiddenInput = this.querySelector('#dropdownValue');
//     this.dropdownItems = this.querySelectorAll('.dropdown-item');
//     console.log(this.dropdownItems)

//     if (this.dropdownBtn) {
//       this.initialDropDown();
//       this.initializeSelectedOption();
//     }
//   }

//   initializeSelectedOption() {
//     const searchParams = new URLSearchParams(window.location.search);
//     const currentSortedValue = searchParams.get('sort_by');

//     if (currentSortedValue) {
//       const matchingItem = Array.from(this.dropdownItems).find((item) => item.dataset.value === currentSortedValue);

//       if (matchingItem) {
//         // update dropdown text to show current selection.
//         this.dropdownBtn.children[0].textContent = matchingItem.textContent;
//         if (this.hiddenInput) {
//           this.hiddenInput.value = currentSortedValue;
//         }
//       }
//     }
//   }

//   initialDropDown() {
//     this.dropdownBtn.addEventListener('click', this.toggleDropdown.bind(this));
//     this.dropdownMenu.addEventListener('click', this.handleMenuClick.bind(this));
//     document.addEventListener('click', this.closeDropdown.bind(this));
//   }

//   closeDropdown(e) {
//     if (!this.contains(e.target)) {
//       this.dropdownMenu.classList.remove('dropdown_active');
//     }
//   }

//   handleMenuClick(e) {
//     if (e.target.classList.contains('dropdown-item')) {
//       console.log(this.dropdownBtn.children[0])
//       this.dropdownBtn.children[0].textContent = e.target.textContent;
//       const sortValue = e.target.dataset.value;
//       if (this.hiddenInput) {
//         this.hiddenInput.value = sortValue;
//         this.debouncedOnSubmit(e);
//       }
//     }
//   }

//   toggleDropdown(e) {
//     e.preventDefault();
//     this.dropdownMenu.classList.toggle('dropdown_active');
//   }
// }

// customElements.define('select-component', SelectComponent);
class SelectComponent extends FacetFiltersForm {
  constructor() {
    super();
    this.dropdownBtn = this.querySelector('.dropdown-btn');
    this.dropdownMenu = this.querySelector('.dropdown-menu');
    this.hiddenInput = this.querySelector('#dropdownValue');

    this.dropdownItems = this.querySelectorAll('.dropdown-item');

    if (this.dropdownBtn) {
      this.initializeSelectedOption();
      this.initialDropdown();
    }
  }

  initializeSelectedOption() {
    const searchParams = new URLSearchParams(window.location.search);

    const currentSortedValue = searchParams.get('sort_by');

    if (currentSortedValue) {
      const matchingItem = Array.from(this.dropdownItems).find((item) => item.dataset.value === currentSortedValue);

      if (matchingItem) {
        // updating  dropdown text to show current selection.
        this.dropdownBtn.innerHTML = matchingItem.textContent;

        // Update hidden input
        if (this.hiddenInput) {
          this.hiddenInput.value = currentSortedValue;
        }
      }
    }
  }

  initialDropdown() {
    this.dropdownBtn.addEventListener('click', this.toggleDropdown.bind(this));

    this.dropdownMenu.addEventListener('click', this.handleMenuClick.bind(this));

    document.addEventListener('click', this.closeDropdown.bind(this));
  }

  closeDropdown(e) {
    if (!this.contains(e.target)) {
      this.dropdownMenu.classList.remove('dropdown_active');
    }
  }

  handleMenuClick(e) {
    e.preventDefault();

    if (e.target.classList.contains('dropdown-item')) {
      this.dropdownBtn.innerHTML = e.target.textContent;

      if (document.querySelector('.sp-quantity-click')) {
        console.log('true');
        this.dropdownItems.forEach((item) => item.classList.remove('selected'));

        e.target.classList.add('selected');
      }

      const sortValue = e.target.dataset.value;

      // updating the hidden input with selected value
      if (this.hiddenInput) {
        this.hiddenInput.value = sortValue;
        this.debouncedOnSubmit(e);
      }
    }
  }

  toggleDropdown(e) {
    e.preventDefault();

    this.dropdownMenu.classList.toggle('dropdown_active');
  }
}

customElements.define('select-component', SelectComponent);
class PriceRange extends HTMLElement {
  constructor() {
    super();

    // Get all the required elements
    this.fromSlider = this.querySelector('#fromSlider');
    this.toSlider = this.querySelector('#toSlider');
    this.fromInput = this.querySelector('[id$="-GTE"]');
    this.toInput = this.querySelector('[id$="-LTE"]');
    this.form = this.closest('form');

    // Track active slider and prevent unnecessary updates
    this.activeSlider = null;
    this.isUpdating = false;

    // Get the min and max values with better parsing
    this.minValue = Math.max(0, parseFloat(this.fromInput.getAttribute('data-min')) || 0);
    this.maxValue = parseFloat(this.toInput.getAttribute('data-max')) || 100;

    // Ensure min and max are rounded to 2 decimal places to avoid floating point issues
    this.minValue = Math.round(this.minValue * 100) / 100;
    this.maxValue = Math.round(this.maxValue * 100) / 100;

    // Calculate precision error margin based on the range size
    this.precision = Math.max(0.01, (this.maxValue - this.minValue) * 0.005);

    // Create a debounced version of the form update function
    this.debouncedFormUpdate = debounce(() => {
      if (this.form) {
        this.updateInputForSubmission();
        this.form.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 300);

    // Set default values if inputs are empty
    this.setDefaultValues();

    if (this.fromSlider && this.toSlider) {
      // Set initial values for sliders
      this.initializeSliders();

      // Add event listeners for range sliders
      this.fromSlider.addEventListener('input', this.controlFromSlider.bind(this));
      this.toSlider.addEventListener('input', this.controlToSlider.bind(this));

      // Add mousedown/touchstart events to track which slider is active
      this.fromSlider.addEventListener('mousedown', this.handleSliderMouseDown.bind(this, 'from'));
      this.toSlider.addEventListener('mousedown', this.handleSliderMouseDown.bind(this, 'to'));
      this.fromSlider.addEventListener('touchstart', this.handleSliderMouseDown.bind(this, 'from'));
      this.toSlider.addEventListener('touchstart', this.handleSliderMouseDown.bind(this, 'to'));

      // Add global mouseup/touchend to remove active state
      document.addEventListener('mouseup', this.handleMouseUp.bind(this));
      document.addEventListener('touchend', this.handleMouseUp.bind(this));
    }

    // Add event listeners for input fields
    this.querySelectorAll('input[type="text"]').forEach((element) => {
      element.addEventListener('change', this.onRangeChange.bind(this));
      element.addEventListener('keydown', this.onKeyDown.bind(this));
    });

    this.setMinAndMaxValues();
    this.updateActiveClass();
  }

  // Format price value for display, considering precision
  formatPriceForDisplay(value) {
    // First, round to 2 decimal places to avoid floating point issues
    const roundedValue = Math.round(value * 100) / 100;

    // Format with 2 decimal places and remove .00 if no cents
    return roundedValue.toFixed(2).replace(/\.00$/, '');
  }

  // Handle mousedown on slider
  handleSliderMouseDown(sliderType, event) {
    this.activeSlider = sliderType;

    // Add active class to appropriate slider
    if (sliderType === 'from') {
      this.fromSlider.classList.add('active');
    } else {
      this.toSlider.classList.add('active');
    }
  }

  // Handle mouseup - remove active state
  handleMouseUp() {
    if (this.activeSlider) {
      if (this.activeSlider === 'from') {
        this.fromSlider.classList.remove('active');
      } else {
        this.toSlider.classList.remove('active');
      }

      // When slider is released, ensure we snap to exact min/max values if close
      this.snapToExactValues();
      this.activeSlider = null;
    }
  }

  // Snap sliders to exact min/max values if they're close
  snapToExactValues() {
    // Prevent recursive updates
    if (this.isUpdating) return;
    this.isUpdating = true;

    const fromValue = parseFloat(this.fromSlider.value);
    const toValue = parseFloat(this.toSlider.value);

    let shouldUpdate = false;

    // Check minimum
    if (Math.abs(fromValue - this.minValue) < this.precision) {
      this.fromSlider.value = this.minValue;
      this.fromInput.value = this.formatPriceForDisplay(this.minValue);
      this.fromInput.removeAttribute('data-filter-value');
      shouldUpdate = true;
    }

    // Check maximum
    if (Math.abs(toValue - this.maxValue) < this.precision) {
      this.toSlider.value = this.maxValue;
      this.toInput.value = this.formatPriceForDisplay(this.maxValue);
      this.toInput.setAttribute('data-filter-value', '');
      shouldUpdate = true;
    }

    // Batch update everything at once
    if (shouldUpdate) {
      this.setMinAndMaxValues();
      this.updateActiveClass();
      this.debouncedFormUpdate();
    }

    this.isUpdating = false;
  }

  // Set default values for empty inputs
  setDefaultValues() {
    // If "from" input is empty, show the minimum value
    if (!this.fromInput.value) {
      this.fromInput.value = this.formatPriceForDisplay(this.minValue);
      this.fromInput.setAttribute('data-filter-value', '');
    }

    // If "to" input is empty, show the maximum value
    if (!this.toInput.value) {
      this.toInput.value = this.formatPriceForDisplay(this.maxValue);
      this.toInput.setAttribute('data-filter-value', '');
    }
  }

  // Update active class based on current filter values
  updateActiveClass() {
    // Check if filters are in default state or actively set
    const isFromDefault = this.fromInput.hasAttribute('data-filter-value');
    const isToDefault = this.toInput.hasAttribute('data-filter-value');

    // If both inputs are at default values, remove active class
    if (isFromDefault && isToDefault) {
      this.classList.remove('active');
    } else {
      // Otherwise, at least one filter is active, add active class
      this.classList.add('active');
    }
  }

  // Update input values for form submission
  updateInputForSubmission() {
    // For min input, ensure we're using the actual value when at minimum
    if (this.fromInput.hasAttribute('data-filter-value')) {
      this.fromInput.value = this.fromInput.getAttribute('data-filter-value');
    }

    // For max input
    if (this.toInput.hasAttribute('data-filter-value')) {
      this.toInput.value = this.toInput.getAttribute('data-filter-value');
    }
  }

  initializeSliders() {
    // Update slider attributes - use exact min and max values
    this.fromSlider.setAttribute('min', this.minValue);
    this.fromSlider.setAttribute('max', this.maxValue);
    this.toSlider.setAttribute('min', this.minValue);
    this.toSlider.setAttribute('max', this.maxValue);

    // Set step to a smaller value to handle decimal values and improve precision
    const step = Math.max(0.01, (this.maxValue - this.minValue) / 1000);
    this.fromSlider.setAttribute('step', step.toString());
    this.toSlider.setAttribute('step', step.toString());

    // Set initial values for sliders
    let fromValue;
    if (this.fromInput.hasAttribute('data-filter-value')) {
      fromValue = this.minValue;
    } else {
      fromValue = Math.max(this.minValue, parseFloat(this.fromInput.value) || this.minValue);
    }

    let toValue;
    if (this.toInput.hasAttribute('data-filter-value')) {
      toValue = this.maxValue;
    } else {
      toValue = Math.min(this.maxValue, parseFloat(this.toInput.value) || this.maxValue);
    }

    this.fromSlider.value = fromValue;
    this.toSlider.value = toValue;
  }

  // Check if a value is approximately equal to another within our precision margin
  isApproximatelyEqual(value1, value2) {
    return Math.abs(value1 - value2) < this.precision;
  }

  controlFromSlider() {
    // Prevent recursive updates
    if (this.isUpdating) return;
    this.isUpdating = true;

    const fromValue = parseFloat(this.fromSlider.value);
    const toValue = parseFloat(this.toSlider.value);

    // Prevent sliders from crossing
    if (fromValue > toValue) {
      this.fromSlider.value = toValue;
      this.isUpdating = false;
      return;
    }

    // Handle the "from" value changes
    if (fromValue === this.minValue || this.isApproximatelyEqual(fromValue, this.minValue)) {
      this.fromSlider.value = this.minValue;
      this.fromInput.value = this.formatPriceForDisplay(this.minValue);
      this.fromInput.removeAttribute('data-filter-value');
    } else {
      // For other values, handle normally
      const roundedValue = Math.round(fromValue * 100) / 100;
      this.fromInput.value = this.formatPriceForDisplay(roundedValue);
      this.fromInput.removeAttribute('data-filter-value');
    }

    // Batch updates
    this.setMinAndMaxValues();
    this.updateActiveClass();
    this.debouncedFormUpdate();

    this.isUpdating = false;
  }

  controlToSlider() {
    // Prevent recursive updates
    if (this.isUpdating) return;
    this.isUpdating = true;

    const fromValue = parseFloat(this.fromSlider.value);
    const toValue = parseFloat(this.toSlider.value);

    // Prevent sliders from crossing
    if (toValue < fromValue) {
      this.toSlider.value = fromValue;
      this.isUpdating = false;
      return;
    }

    // Handle the "to" value changes
    if (toValue === this.maxValue || this.isApproximatelyEqual(toValue, this.maxValue)) {
      this.toSlider.value = this.maxValue;
      this.toInput.value = this.formatPriceForDisplay(this.maxValue);
      this.toInput.setAttribute('data-filter-value', '');
    } else {
      // For intermediate values
      const roundedValue = Math.round(toValue * 100) / 100;
      this.toInput.value = this.formatPriceForDisplay(roundedValue);
      this.toInput.removeAttribute('data-filter-value');
    }

    // Batch updates
    this.setMinAndMaxValues();
    this.updateActiveClass();
    this.debouncedFormUpdate();

    this.isUpdating = false;
  }

  onRangeChange(event) {
    // Prevent recursive updates
    if (this.isUpdating) return;
    this.isUpdating = true;

    const input = event.currentTarget;
    this.adjustToValidValues(input);

    // Handle the min input
    if (input === this.fromInput) {
      const inputValue = parseFloat(input.value);

      if (input.value === '' || inputValue === this.minValue || this.isApproximatelyEqual(inputValue, this.minValue)) {
        input.value = this.formatPriceForDisplay(this.minValue);
        input.removeAttribute('data-filter-value');

        if (this.fromSlider) {
          this.fromSlider.value = this.minValue;
        }
      } else {
        input.removeAttribute('data-filter-value');

        if (this.fromSlider) {
          this.fromSlider.value = inputValue;
        }
      }
    }
    // Handle the max input
    else if (input === this.toInput) {
      const inputValue = parseFloat(input.value);

      if (input.value === '' || inputValue === this.maxValue || this.isApproximatelyEqual(inputValue, this.maxValue)) {
        input.value = this.formatPriceForDisplay(this.maxValue);
        input.setAttribute('data-filter-value', '');

        if (this.toSlider) {
          this.toSlider.value = this.maxValue;
        }
      } else {
        input.removeAttribute('data-filter-value');

        if (this.toSlider) {
          this.toSlider.value = inputValue;
        }
      }
    }

    // Batch updates
    this.setMinAndMaxValues();
    this.updateActiveClass();
    this.debouncedFormUpdate();

    this.isUpdating = false;
  }

  onKeyDown(event) {
    if (event.metaKey) return;

    const pattern = /[0-9]|\.|,|'| |Tab|Backspace|Enter|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Delete|Escape/;
    if (!event.key.match(pattern)) event.preventDefault();
  }

  setMinAndMaxValues() {
    const inputs = this.querySelectorAll('input[type="text"]');
    if (inputs.length < 2) return;

    const minInput = inputs[0];
    const maxInput = inputs[1];

    // Update data-min and data-max for validation
    if (maxInput.hasAttribute('data-filter-value')) {
      minInput.setAttribute('data-max', this.maxValue);
    } else if (maxInput.value) {
      minInput.setAttribute('data-max', maxInput.value);
    }

    if (minInput.hasAttribute('data-filter-value')) {
      maxInput.setAttribute('data-min', this.minValue);
    } else if (minInput.value) {
      maxInput.setAttribute('data-min', minInput.value);
    }
  }

  adjustToValidValues(input) {
    // Skip validation for inputs with data-filter-value
    if (input.hasAttribute('data-filter-value')) return;

    // Parse as float to handle decimal values properly
    const value = parseFloat(input.value);
    const min = parseFloat(input.getAttribute('data-min') || this.minValue);
    const max = parseFloat(input.getAttribute('data-max') || this.maxValue);

    if (isNaN(value)) {
      input.value = this.formatPriceForDisplay(min);
    } else if (value < min) {
      input.value = this.formatPriceForDisplay(min);
    } else if (value > max) {
      input.value = this.formatPriceForDisplay(max);
    } else {
      // Ensure consistent formatting for valid values
      input.value = this.formatPriceForDisplay(value);
    }
  }
}

// Helper function to debounce frequent events
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

customElements.define('price-range', PriceRange);

class FacetRemove extends HTMLElement {
  constructor() {
    super();
    const facetLink = this.querySelector('a');
    facetLink.setAttribute('role', 'button');
    facetLink.addEventListener('click', this.closeFilter.bind(this));
    facetLink.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') this.closeFilter(event);
    });
  }

  closeFilter(event) {
    event.preventDefault();
    const form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
    form.onActiveFilterClick(event);
  }
}

customElements.define('facet-remove', FacetRemove);
