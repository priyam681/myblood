/**
 * GSAP Product Tabs Animations
 * Scroll-triggered animations with forward/backward behavior
 */

document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - product tabs animations disabled');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  console.log('GSAP Product Tabs animations initializing...');

  // Wait for DOM to be fully ready
  setTimeout(() => {
    // Find main elements
    const tabsWrapper = document.querySelector('.pua-tabs-wrapper');
    const tabHeading = document.querySelector('.tab_heading');
    const tabsNav = document.querySelector('.pua-tabs');
    const tabContents = document.querySelectorAll('.pua-tab-content');
    const productSliders = document.querySelectorAll('.pua-product-slider');

    console.log('Product tabs elements found:', {
      tabsWrapper: !!tabsWrapper,
      tabHeading: !!tabHeading,
      tabsNav: !!tabsNav,
      tabContents: tabContents.length,
      productSliders: productSliders.length
    });

    // 1. Tab Heading Animation - Fade in from bottom
    if (tabHeading) {
      gsap.fromTo(tabHeading,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tabHeading,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // 2. Tab Navigation - Slide in from bottom with stagger
    if (tabsNav) {
      const tabItems = tabsNav.querySelectorAll('li');
      if (tabItems.length > 0) {
        gsap.fromTo(tabItems,
          {
            opacity: 0,
            y: 25
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tabsNav,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }

    // 3. Product Sliders - Slide up from bottom (no scale to preserve Swiper layout)
    productSliders.forEach((slider, index) => {
      gsap.fromTo(slider,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slider,
            start: 'top 85%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 4. Product Cards - Staggered animation for cards in each slider (no scale to avoid image stretching)
      const productCards = slider.querySelectorAll('.product-card');
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
            ease: 'power2.out',
            scrollTrigger: {
              trigger: slider,
              start: 'top 75%',
              end: 'bottom 25%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // 5. Product Card Hover Effects
        productCards.forEach(card => {
          const mainImage = card.querySelector('.main-image');
          const productName = card.querySelector('.product-name');
          const productPrice = card.querySelector('.product-price');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              duration: 0.3,
              ease: 'power2.out'
            });

            // Apply subtle zoom only to image container, not the image itself
            if (mainImage) {
              gsap.to(mainImage.parentElement, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
              });
            }

            if (productName) {
              gsap.to(productName, {
                y: -2,
                color: '#000',
                duration: 0.3,
                ease: 'power2.out'
              });
            }

            if (productPrice) {
              gsap.to(productPrice, {
                y: -1,
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });

            // Reset image container
            if (mainImage) {
              gsap.to(mainImage.parentElement, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
              });
            }

            if (productName) {
              gsap.to(productName, {
                y: 0,
                color: '',
                duration: 0.3,
                ease: 'power2.out'
              });
            }

            if (productPrice) {
              gsap.to(productPrice, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          });
        });
      }

      // 6. Navigation Buttons Animation
      const prevButton = slider.querySelector('.item-prev');
      const nextButton = slider.querySelector('.item-next');

      if (prevButton && nextButton) {
        gsap.fromTo([prevButton, nextButton],
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: slider,
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Button hover effects
        [prevButton, nextButton].forEach(button => {
          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              scale: 1.1,
              duration: 0.2,
              ease: 'power2.out'
            });
          });

          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out'
            });
          });
        });
      }
    });

    // 7. Tab Content Switching Animation (enhance existing functionality)
    const tabButtons = document.querySelectorAll('.pua-tabs li');
    tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const activeContent = document.querySelector('.pua-tab-content.active');
        const targetContent = document.getElementById(`tab-tab-${index + 1}`);

        if (activeContent && targetContent && activeContent !== targetContent) {
          // Animate out current content
          gsap.to(activeContent, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              activeContent.classList.remove('active');

              // Animate in new content
              targetContent.classList.add('active');
              gsap.fromTo(targetContent,
                {
                  opacity: 0,
                  y: 20
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease: 'power2.out'
                }
              );
            }
          });
        }
      });
    });

    console.log('Product tabs animations setup complete');
  }, 300);
});
