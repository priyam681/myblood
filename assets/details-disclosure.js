class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;
    this.summary = this.mainDetailsToggle.querySelector('summary');

    this.isMouseInMenu = false;


    this.mouseEnter = this.onMouseEnter.bind(this);
    this.mouseLeave = this.onMouseLeave.bind(this);

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
    this.mainDetailsToggle.addEventListener('mouseenter', this.mouseEnter);
    this.mainDetailsToggle.addEventListener('mouseleave', this.mouseLeave);
  }

  onMouseLeave() {
    this.isMouseInMenu = false;
    return null;
  }

  onMouseEnter() {
    this.isMouseInMenu = true;

    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }

  }

  disconnectedCallback() {
    this.summary.removeEventListener('mouseenter', this.mouseEnter);
    this.summary.removeEventListener('mouseleave', this.mouseLeave);
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
  }

  onMouseLeave(event) {

    this.header.preventHide = false;
    this.header.style.setProperty('--header-bottom-position-desktop', '');
    document.body.classList.remove('overflow-menu');

    const details = event.target.closest('details');

    if (details.hasAttribute('open')) {

      // Add transition for arrow
      const icon = details.querySelector('.icon-caret');
      if (icon) {
        icon.style.transition = 'transform 0.3s ease';
      }

      // Delay closing slightly to allow for transition
      setTimeout(() => {
        this.close();
      }, 50);

    }
  }

  onMouseEnter(event) {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    const details = event.target.closest('details');
    if (!details) return;

    if (details.hasAttribute('open')) return;

    document.body.classList.add('overflow-menu');

    details.setAttribute('open', '');
    details.querySelector('summary').setAttribute('aria-expanded', true);

    // Add transition for arrow
    const icon = details.querySelector('.icon-caret');
    if (icon) {
      icon.style.transition = 'transform 0.3s ease';
    }

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );


  }

  onToggle(event) {
    event.preventDefault();
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );
  }
}

customElements.define('header-menu', HeaderMenu);
