/**
 * GSAP Homepage Banner Animations - Simple Test Version
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Simple GSAP test loading...');
  
  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded - banner animations disabled');
    return;
  }

  console.log('GSAP is available:', gsap);
  gsap.registerPlugin(ScrollTrigger);

  // Wait a bit to ensure DOM is fully ready
  setTimeout(() => {
    // Find banner elements
    const banner = document.querySelector('.homepage-banner');
    const bannerContent = document.querySelector('.banner-content');
    const centerImage = document.querySelector('.banner-center-image');
    const homepageBarWrapper = document.querySelector('.homepage-bar-wrapper');
    const heading = document.querySelector('.banner-heading');
    const subheading = document.querySelector('.banner-subheading');
    const buttons = document.querySelector('.banner-buttons');

    console.log('Found elements:', {
      banner: !!banner,
      bannerContent: !!bannerContent,
      centerImage: !!centerImage,
      homepageBarWrapper: !!homepageBarWrapper,
      heading: !!heading, 
      subheading: !!subheading,
      buttons: !!buttons
    });

    // Banner content slides in from left - ScrollTrigger
    if (bannerContent) {
      gsap.fromTo(bannerContent, 
        { 
          opacity: 0, 
          x: -100 
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bannerContent,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
      console.log('Banner content scroll animation setup');
    }

    // Center image slides in from right - ScrollTrigger  
    if (centerImage) {
      gsap.fromTo(centerImage,
        {
          opacity: 0, 
          x: 100
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: centerImage,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
      console.log('Center image scroll animation setup');
    }

    // Homepage bar wrapper - slide up from bottom with ScrollTrigger
    if (homepageBarWrapper) {
      gsap.fromTo(homepageBarWrapper,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: homepageBarWrapper,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate individual product items with stagger - ScrollTrigger
      const productItems = document.querySelectorAll('.product-item');
      const productLabel = document.querySelector('.homepage-bar .label');
      
      if (productItems.length > 0) {
        gsap.fromTo(productItems,
          { 
            opacity: 0, 
            x: 20 
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: homepageBarWrapper,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (productLabel) {
        gsap.fromTo(productLabel,
          { 
            opacity: 0, 
            x: -20 
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: productLabel,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      console.log('Animating homepage bar wrapper from bottom');

      // Add hover effects for product items
      productItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }

    // Individual content elements fade in with stagger (fallback with ScrollTrigger)
    if (heading && !bannerContent) {
      gsap.fromTo(heading,
        {
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (subheading && !bannerContent) {
      gsap.fromTo(subheading,
        {
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subheading,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (buttons && !bannerContent) {
      gsap.fromTo(buttons,
        {
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttons,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, 500);
});
