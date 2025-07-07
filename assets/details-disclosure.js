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

  onMouseEnter(e) {
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
  static isClickListenerActive = false;
  
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
    this.stickyHeader = document.querySelector('sticky-header');
    this.closeTimeout = null;
    this.openTimeout = null;
    this.clickOutsideHandler = this.onClickOutside.bind(this);
    
    // Move events to li element for better hover behavior
    this.menuItem = this.closest('li');
    if (this.menuItem) {
      this.menuItem.addEventListener('mouseenter', this.onMouseEnter.bind(this));
      this.menuItem.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      
      // Remove default events from details
      this.mainDetailsToggle.removeEventListener('mouseenter', this.mouseEnter);
      this.mainDetailsToggle.removeEventListener('mouseleave', this.mouseLeave);
    }
  }

  onClickOutside(event) {
    // Get the actual clicked coordinates
    const clickX = event.clientX;
    const clickY = event.clientY;
    
    // Get all menu content elements
    const allMenuContents = document.querySelectorAll('.mega-menu__content');
    let isClickInsideAnyMenu = false;
    
    // Check if click coordinates are within any menu bounds
    allMenuContents.forEach(menuContent => {
      if (menuContent.offsetParent) { // Only check visible menus
        const rect = menuContent.getBoundingClientRect();
        if (clickX >= rect.left && clickX <= rect.right && 
            clickY >= rect.top && clickY <= rect.bottom) {
          isClickInsideAnyMenu = true;
        }
      }
    });
    
    // Also check if clicking on menu triggers (summaries)
    const isClickOnMenuTrigger = event.target.closest('.header__menu-item, summary');
    
    console.log('Click outside check:', {
      clickX, clickY,
      isClickInsideAnyMenu,
      isClickOnMenuTrigger: !!isClickOnMenuTrigger,
      target: event.target
    });
    
    if (!isClickInsideAnyMenu && !isClickOnMenuTrigger) {
      console.log('Closing menus - click outside detected');
      
      // Close all open menus
      const allOpenMenus = document.querySelectorAll('header-menu details[open]');
      allOpenMenus.forEach(menu => {
        const content = menu.querySelector('.mega-menu__content');
        if (content) {
          content.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          content.style.opacity = '0';
          content.style.transform = 'translateY(-10px)';
        }
        
        const icon = menu.querySelector('.icon-caret');
        if (icon) {
          icon.style.transition = 'transform 0.3s ease';
          icon.style.transform = 'rotate(0deg)';
        }
        
        setTimeout(() => {
          menu.removeAttribute('open');
          menu.querySelector('summary').setAttribute('aria-expanded', false);
        }, 150);
      });
      
      // Clean up body classes and header states
      document.body.classList.remove('overflow-menu');
      if (this.header) {
        this.header.preventHide = false;
        this.header.style.setProperty('--header-bottom-position-desktop', '');
      }
      
      if (this.stickyHeader) {
        this.stickyHeader.preventMenuClose = false;
      }
      
      // Remove click listener and reset flag
      document.removeEventListener('click', this.clickOutsideHandler);
      HeaderMenu.isClickListenerActive = false;
    }
  }

  onMouseLeave(event) {
    this.isMouseInMenu = false;
    
    // Clear any pending open timeout
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = null;
    }

    const details = this.mainDetailsToggle;
    
    // Add delay before closing to prevent flicker when moving between menu items
    this.closeTimeout = setTimeout(() => {
      // Only remove overflow-menu if no other menus are being hovered
      const allMenus = document.querySelectorAll('header-menu');
      const anyMenuHovered = Array.from(allMenus).some(menu => menu.isMouseInMenu);
      
      if (!anyMenuHovered) {
        this.header.preventHide = false;
        this.header.style.setProperty('--header-bottom-position-desktop', '');
        document.body.classList.remove('overflow-menu');

        // Reset sticky header menu close prevention
        if (this.stickyHeader) {
          this.stickyHeader.preventMenuClose = false;
        }
      }

      if (details?.hasAttribute('open')) {
        const icon = details.querySelector('.icon-caret');
        if (icon) {
          icon.style.transition = 'transform 0.3s ease';
          icon.style.transform = 'rotate(0deg)';
        }

        // Add closing animation
        const content = details.querySelector('.mega-menu__content');
        if (content) {
          content.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          content.style.opacity = '0';
          content.style.transform = 'translateY(-10px)';
        }

        setTimeout(() => {
          this.close();
        }, 150);
      }
    }, 100); // 100ms delay
  }

  onMouseEnter(event) {
    if (!this.header) return;

    // Clear any pending close timeout
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }

    this.isMouseInMenu = true;
    this.header.preventHide = true;
    
    // Always ensure overflow-menu is applied when hovering any menu
    document.body.classList.add('overflow-menu');
    
    // Prevent sticky header from closing menus while hovering
    if (this.stickyHeader) {
      this.stickyHeader.preventMenuClose = true;
    }

    const details = this.mainDetailsToggle;
    if (!details) return;

    // Close other open menus first
    const allMenus = document.querySelectorAll('header-menu details[open]');
    allMenus.forEach(menu => {
      if (menu !== details) {
        const content = menu.querySelector('.mega-menu__content');
        if (content) {
          content.style.transition = 'opacity 0.15s ease';
          content.style.opacity = '0';
        }
        setTimeout(() => {
          menu.removeAttribute('open');
          menu.querySelector('summary').setAttribute('aria-expanded', false);
        }, 100);
      }
    });

    // Only open if this menu has a details element (submenu)
    if (!details.hasAttribute('open') && details.querySelector('.mega-menu__content')) {
      // Small delay for smooth opening
      this.openTimeout = setTimeout(() => {
        details.setAttribute('open', '');
        details.querySelector('summary').setAttribute('aria-expanded', true);

        const icon = details.querySelector('.icon-caret');
        if (icon) {
          icon.style.transition = 'transform 0.4s ease';
          icon.style.transform = 'rotate(180deg)';
        }

        // Add opening animation
        const content = details.querySelector('.mega-menu__content');
        if (content) {
          content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          content.style.opacity = '0';
          content.style.transform = 'translateY(-10px)';
          
          // Trigger animation
          requestAnimationFrame(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
          });
        }

        if (
          document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') === ''
        ) {
          document.documentElement.style.setProperty(
            '--header-bottom-position-desktop',
            `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
          );
        }
        
        // Add click outside listener when menu opens (only once)
        if (!HeaderMenu.isClickListenerActive) {
          HeaderMenu.isClickListenerActive = true;
          setTimeout(() => {
            document.addEventListener('click', this.clickOutsideHandler);
          }, 100); // Small delay to prevent immediate closing
        }
        
      }, 50); // 50ms delay for opening
    }
  }
}


customElements.define('header-menu', HeaderMenu);
