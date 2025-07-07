// Subtle GSAP Banner Animations
// Enhances existing design without changing it

class BannerAnimations {
  constructor() {
    this.isInitialized = false;
    this.init();
  }

  init() {
    // Wait for GSAP to be ready
    if (typeof gsap === 'undefined') {
      setTimeout(() => this.init(), 100);
      return;
    }

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initAnimations());
    } else {
      this.initAnimations();
    }
  }

  initAnimations() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Run homepage animations
    if (this.isHomepage()) {
      this.setupSubtleAnimations();
    }

    // Run colorful-kick animations on any page that has the section
    this.animateColorfulKickSection();
  }

  isHomepage() {
    return document.body.classList.contains('index') || 
           window.location.pathname === '/' || 
           document.querySelector('[class*="home-page-banner"], [id*="home_page_banner"]');
  }

  setupSubtleAnimations() {
    // 1. Gentle text entrance (preserves all existing styles)
    this.animateTextEntrance();
    
    // 2. Subtle button hover enhancements
    this.enhanceButtonHovers();
    
    // 3. Gentle product bar reveal
    this.animateProductBar();
    
    // 4. Subtle image entrance
    this.animateImages();
    
    // 5. Featured collection grid animations (scroll-triggered)
    this.animateFeaturedGrid();
    
    // 6. Colorful kick section animations (scroll-triggered)
    this.animateColorfulKickSection();
  }

  animateTextEntrance() {
    const headings = document.querySelectorAll('.banner-heading');
    const subheadings = document.querySelectorAll('.banner-subheading');

    headings.forEach((heading, index) => {
      // Set initial invisible state (keeps all existing CSS)
      gsap.set(heading, {
        opacity: 0,
        y: 30
      });

      // Gentle fade-in animation
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3 + (index * 0.2),
        ease: "power2.out"
      });
    });

    subheadings.forEach((subheading, index) => {
      gsap.set(subheading, {
        opacity: 0,
        y: 20
      });

      gsap.to(subheading, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8 + (index * 0.2),
        ease: "power2.out"
      });
    });
  }

  enhanceButtonHovers() {
    const buttons = document.querySelectorAll('.banner-content .button');
    
    buttons.forEach(button => {
      // Set initial state for entrance
      gsap.set(button, {
        opacity: 0,
        scale: 0.95
      });

      // Entrance animation
      gsap.to(button, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 1.2,
        ease: "back.out(1.7)"
      });

      // Enhanced hover effects (keeps existing CSS hover)
      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl.to(button, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out"
      });

      button.addEventListener('mouseenter', () => {
        hoverTl.play();
      });

      button.addEventListener('mouseleave', () => {
        hoverTl.reverse();
      });
    });
  }

  animateProductBar() {
    const productBars = document.querySelectorAll('.homepage-bar-wrapper');
    
    productBars.forEach((bar, index) => {
      const label = bar.querySelector('.label');
      const productItems = bar.querySelectorAll('.product-item');

      // Set initial states
      if (label) {
        gsap.set(label, {
          opacity: 0,
          x: -30
        });

        gsap.to(label, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 1.5 + (index * 0.1),
          ease: "power2.out"
        });
      }

      // Animate product items
      if (productItems.length > 0) {
        gsap.set(productItems, {
          opacity: 0,
          y: 20
        });

        gsap.to(productItems, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 1.8,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
    });
  }

  animateImages() {
    const centerImages = document.querySelectorAll('.banner-center-image img');
    const bannerBgs = document.querySelectorAll('.homepage-banner-bg');

    // Center product images
    centerImages.forEach((img, index) => {
      gsap.set(img, {
        opacity: 0,
        scale: 0.9
      });

      gsap.to(img, {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.5 + (index * 0.2),
        ease: "power2.out"
      });
    });

    // Background images - very subtle entrance
    bannerBgs.forEach((bg, index) => {
      gsap.set(bg, {
        opacity: 0
      });

      gsap.to(bg, {
        opacity: 1,
        duration: 1.5,
        delay: index * 0.3,
        ease: "power2.out"
      });
    });
  }

  animateFeaturedGrid() {
    // Only proceed if ScrollTrigger is available
    if (typeof ScrollTrigger === 'undefined') return;

    // Animate featured collection cards on scroll
    const featuredCards = document.querySelectorAll('.featured-card');
    
    featuredCards.forEach((card, index) => {
      const image = card.querySelector('img');
      const overlay = card.querySelector('.featured-overlay');
      const brand = overlay?.querySelector('.brand');
      const title = overlay?.querySelector('.title');
      const price = overlay?.querySelector('.price');

      // Set initial states
      gsap.set(card, {
        opacity: 0,
        y: 50
      });

      // Card entrance animation
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Overlay content animation (slight delay)
      if (brand || title || price) {
        const overlayElements = [brand, title, price].filter(Boolean);
        
        gsap.set(overlayElements, {
          opacity: 0,
          y: 20
        });

        gsap.to(overlayElements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Enhanced hover effects for cards
      if (image && overlay) {
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl
          .to(image, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
          })
          .to(overlay, {
            background: "linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)",
            duration: 0.3,
            ease: "power2.out"
          }, 0);

        card.addEventListener('mouseenter', () => {
          hoverTl.play();
        });

        card.addEventListener('mouseleave', () => {
          hoverTl.reverse();
        });
      }

      // Price highlight animation
      const priceValue = price?.querySelector('.price-value');
      if (priceValue) {
        gsap.set(priceValue, {
          scale: 1
        });

        // Subtle pulse effect on scroll reveal
        gsap.to(priceValue, {
          scale: 1.05,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: priceValue,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        });
      }
    });

    // Animate the grid container
    const featuredGrid = document.querySelector('.featured-grid');
    if (featuredGrid) {
      gsap.set(featuredGrid, {
        opacity: 0
      });

      gsap.to(featuredGrid, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuredGrid,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }

  animateColorfulKickSection() {
    // Only proceed if ScrollTrigger is available
    if (typeof ScrollTrigger === 'undefined') return;

    const colorfulSection = document.querySelector('.colorful-kicks-section');
    if (!colorfulSection) return;

    // Animate section heading elements
    const subheading = colorfulSection.querySelector('.section-subheading');
    const headingSpans = colorfulSection.querySelectorAll('.section-heading');
    const description = colorfulSection.querySelector('.text-container p');
    const button = colorfulSection.querySelector('.browse-collection-button');

    // Set initial states
    const allTextElements = [subheading, ...headingSpans, description, button].filter(Boolean);
    
    gsap.set(allTextElements, {
      opacity: 0,
      y: 30
    });

    // Animate subheading
    if (subheading) {
      gsap.to(subheading, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subheading,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Animate main heading spans with stagger
    if (headingSpans.length > 0) {
      gsap.to(headingSpans, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingSpans[0],
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Animate description
    if (description) {
      gsap.to(description, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: description,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Animate button
    if (button) {
      gsap.to(button, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: button,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Animate product images and background text
    const productImageWrapper = colorfulSection.querySelector('.product-image-wrapper');
    const bgText = colorfulSection.querySelector('.bg-text');
    const productImages = colorfulSection.querySelectorAll('.product-image-wrapper-sec');

    if (productImageWrapper) {
      // Background text animation
      if (bgText) {
        gsap.set(bgText, {
          opacity: 0,
          scale: 0.8
        });

        gsap.to(bgText, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bgText,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Product images animation
      if (productImages.length > 0) {
        gsap.set(productImages, {
          opacity: 0,
          scale: 0.9
        });

        gsap.to(productImages, {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: productImageWrapper,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }

    // Animate right side lifestyle image
    const rightImage = colorfulSection.querySelector('.right img');
    if (rightImage) {
      gsap.set(rightImage, {
        opacity: 0,
        scale: 0.95
      });

      gsap.to(rightImage, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rightImage,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }

  // Clean up method
  destroy() {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach(st => st.kill());
    }
    this.isInitialized = false;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BannerAnimations();
});

// Export for global access
window.BannerAnimations = BannerAnimations;
