/**
 * GSAP Recommended Products Animations
 * Scroll-triggered animations with forward/backward behavior
 */

document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - recommended products animations disabled');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  console.log('GSAP Recommended Products animations initializing...');

  // Wait for DOM to be fully ready
  setTimeout(() => {
    // Find main elements
    const recommendedSection = document.querySelector('.recommended-section');
    const recommendedHeading = document.querySelector('.recommended-heading');
    const recommendedContainer = document.querySelector('.recommended-container, .swiper-wrapper');
    const productCards = document.querySelectorAll('.product-card');
    const navigationButtons = document.querySelectorAll('.item-prev, .item-next');

    console.log('Recommended products elements found:', {
      recommendedSection: !!recommendedSection,
      recommendedHeading: !!recommendedHeading,
      recommendedContainer: !!recommendedContainer,
      productCards: productCards.length,
      navigationButtons: navigationButtons.length
    });

    if (!recommendedSection) {
      console.log('No recommended products section found');
      return;
    }

    // 1. Section Heading Animation - Fade in from bottom
    if (recommendedHeading) {
      gsap.fromTo(recommendedHeading,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: recommendedHeading,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 2. Container Animation - Slide up from bottom
    if (recommendedContainer) {
      gsap.fromTo(recommendedContainer,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: recommendedContainer,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 3. Product Cards - Staggered animation from bottom
    if (productCards.length > 0) {
      gsap.fromTo(productCards,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: recommendedContainer || recommendedSection,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 4. Product Card Hover Effects
      productCards.forEach(card => {
        const mainImage = card.querySelector('.main-image');
        const productName = card.querySelector('.product-name');
        const productPrice = card.querySelector('.product-price');
        const thumbnailWrapper = card.querySelector('.thumbnail-wrapper');

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            duration: 0.3,
            ease: "power2.out"
          });

          // Apply subtle zoom to image container
          if (mainImage) {
            gsap.to(mainImage.parentElement, {
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            });
          }

          if (productName) {
            gsap.to(productName, {
              y: -2,
              color: "#000",
              duration: 0.3,
              ease: "power2.out"
            });
          }

          if (productPrice) {
            gsap.to(productPrice, {
              y: -1,
              duration: 0.3,
              ease: "power2.out"
            });
          }

          // Animate thumbnail wrapper
          if (thumbnailWrapper) {
            gsap.to(thumbnailWrapper, {
              y: -3,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });

          // Reset image container
          if (mainImage) {
            gsap.to(mainImage.parentElement, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }

          if (productName) {
            gsap.to(productName, {
              y: 0,
              color: "",
              duration: 0.3,
              ease: "power2.out"
            });
          }

          if (productPrice) {
            gsap.to(productPrice, {
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }

          if (thumbnailWrapper) {
            gsap.to(thumbnailWrapper, {
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      });
    }

    // 5. Navigation Buttons Animation (for swiper)
    if (navigationButtons.length > 0) {
      gsap.fromTo(navigationButtons,
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: recommendedSection,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Button hover effects
      navigationButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out"
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      });
    }

    // 6. Thumbnail Images Animation
    const thumbnailImages = document.querySelectorAll('.thumbnail-image-wrapper');
    if (thumbnailImages.length > 0) {
      thumbnailImages.forEach((thumb, index) => {
        gsap.fromTo(thumb,
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: 0.8 + (index * 0.05),
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: thumb.closest('.product-card'),
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Thumbnail hover effects
        thumb.addEventListener('mouseenter', () => {
          gsap.to(thumb, {
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out"
          });
        });

        thumb.addEventListener('mouseleave', () => {
          gsap.to(thumb, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      });
    }

    console.log('Recommended products animations setup complete');
  }, 300);
});
