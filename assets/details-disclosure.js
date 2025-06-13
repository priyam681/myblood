class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');

    // Early return if required elements don't exist
    if (!this.mainDetailsToggle) {
      console.warn('Required details element not found');
      return;
    }

    const summary = this.mainDetailsToggle.querySelector('summary');
    if (!summary) {
      console.warn('Required summary element not found');
      return;
    }

    this.content = summary.nextElementSibling;
    if (!this.content) {
      console.warn('No content element found after summary');
      return;
    }

    // Bind event handlers once
    this.boundOnFocusOut = this.onFocusOut.bind(this);
    this.boundOnToggle = this.onToggle.bind(this);
    this.boundOnHover = this.onHover.bind(this);


    this.addEventListeners();
  }

  addEventListeners(){
    this.mainDetailsToggle.addEventListener('focusout', this.boundOnFocusOut);

    // Add click prevention for desktop
    // this.mainDetailsToggle.addEventListener('click', this.boundOnToggle);

    // only add hover listeners if the window width is above 991 px
    if (window.innerWidth > 991){
      this.mainDetailsToggle.addEventListener('mouseenter', this.boundOnHover);
      this.mainDetailsToggle.addEventListener('mouseleave', this.boundOnFocusOut);
    }

    // Add resize listener to handle hover functionality

    window.addEventListener('resize', ()=>{
      if (window.innerWidth > 991){
        this.mainDetailsToggle.addEventListener('mouseenter', this.boundOnHover);
        this.mainDetailsToggle.addEventListener('mouseleave', this.boundOnToggle);
      }else{
        this.mainDetailsToggle.removeEventListener('mouseenter', this.boundOnHover);
        this.mainDetailsToggle.removeEventListener('mouseleave', this.boundOnToggle);
      }
    })
  }


  onHover(event) {
    try {

      // Return early if the window width is 991px or less

      if (window.innerWidth <= 991) return;

      if (!this.animations) {
        this.animations = this.content?.getAnimations() || [];
      }

      this.handleAnimations(this.mainDetailsToggle.hasAttribute('open'));
    } catch (error) {
      console.error('Error in onHover:', error);
    }
  }

  onFocusOut() {
    setTimeout(() => {
      try {
        if (!this.contains(document.activeElement)) {
          this.close();
        }
      } catch (error) {
        console.error('Error in onFocusOut:', error);
      }
    }, 100); // Added specific timeout
  }

  onToggle() {
    try {
      if (!this.animations) {
        this.animations = this.content?.getAnimations() || [];
      }

      this.handleAnimations(this.mainDetailsToggle.hasAttribute('open'));
    } catch (error) {
      console.error('Error in onToggle:', error);
    }
  }

  handleAnimations(isOpen) {
    if (!this.animations?.length) return;

    this.animations.forEach(animation => {
      try {
        if (isOpen) {
          animation?.play();
        } else {
          animation?.cancel();
        }
      } catch (error) {
        console.error('Animation error:', error);
      }
    });
  }

  close() {
    try {
      const summary = this.mainDetailsToggle?.querySelector('summary');
      if (this.mainDetailsToggle && summary) {
        this.mainDetailsToggle.removeAttribute('open');
        summary.setAttribute('aria-expanded', 'false');
      }
    } catch (error) {
      console.error('Error in close:', error);
    }
  }

  disconnectedCallback() {
    try {
      this.mainDetailsToggle?.removeEventListener('focusout', this.boundOnFocusOut);
      this.mainDetailsToggle?.removeEventListener('click', this.boundOnToggle);
      this.mainDetailsToggle?.removeEventListener('mouseenter', this.boundOnHover);
      this.mainDetailsToggle?.removeEventListener('mouseleave', this.boundOnFocusOut);
    } catch (error) {
      console.error('Error in disconnectedCallback:', error);
    }
  }
}

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
    this.isSettingPosition = false;
  }

  onHover(event) {
    try {
      if (!this.header) return;

      this.header.preventHide = this.mainDetailsToggle?.open;
      this.toggleMenu(event);
      this.updateHeaderPosition();
    } catch (error) {
      console.error('Error in HeaderMenu onHover:', error);
    }
  }

  onToggle(event) {
    try {
      if (!this.header) return;

      this.header.preventHide = this.mainDetailsToggle?.open;
      this.toggleMenu(event);
      this.updateHeaderPosition();
    } catch (error) {
      console.error('Error in HeaderMenu onToggle:', error);
    }
  }

  toggleMenu(event) {
    try {
      if (!this.mainDetailsToggle) return;

      if (!this.animations) {
        this.animations = this.content?.getAnimations() || [];
      }

      event.preventDefault();

      const isOpen = this.mainDetailsToggle.hasAttribute('open');
      if (isOpen) {
        this.mainDetailsToggle.removeAttribute('open');
        this.animations.forEach(animation => animation?.cancel());
      } else {
        this.mainDetailsToggle.setAttribute('open', '');
        this.animations.forEach(animation => animation?.play());
      }
    } catch (error) {
      console.error('Error in toggleMenu:', error);
    }
  }

  updateHeaderPosition() {
    try {
      if (this.isSettingPosition ||
        !this.header ||
        document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') {
        return;
      }

      this.isSettingPosition = true;
      requestAnimationFrame(() => {
        try {
          const bottom = Math.floor(this.header.getBoundingClientRect().bottom);
          document.documentElement.style.setProperty(
            '--header-bottom-position-desktop',
            `${bottom}px`
          );
        } finally {
          this.isSettingPosition = false;
        }
      });
    } catch (error) {
      console.error('Error in updateHeaderPosition:', error);
      this.isSettingPosition = false;
    }
  }
}

// Register custom elements
customElements.define('details-disclosure', DetailsDisclosure);
customElements.define('header-menu', HeaderMenu);

