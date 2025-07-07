/**
 * GSAP Choose Your Action Animations
 * Enhanced interactions with parallax, crossfade, and hover effects
 */

document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - choose action animations disabled');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  console.log('GSAP Choose Action animations initializing...');

  // Wait for DOM to be fully ready
  setTimeout(() => {
    // Find main elements
    const chooseActionSection = document.querySelector('.choose-action-section');
    const chooseActionTitle = document.querySelector('.choose-action-title');
    const actionLabels = document.querySelectorAll('.action-label');
    const imageSets = document.querySelectorAll('.action-image-set');
    const actionImages = document.querySelectorAll('.action-image');
    const backgroundElement = document.querySelector('.choose-action-left:before');

    console.log('Choose action elements found:', {
      chooseActionSection: !!chooseActionSection,
      chooseActionTitle: !!chooseActionTitle,
      actionLabels: actionLabels.length,
      imageSets: imageSets.length,
      actionImages: actionImages.length
    });

    if (!chooseActionSection) {
      console.log('No choose action section found');
      return;
    }

    // 1. Section Title Animation - Fade in from bottom
    if (chooseActionTitle) {
      gsap.fromTo(chooseActionTitle,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chooseActionTitle,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 2. Action Labels - Staggered animation from left
    if (actionLabels.length > 0) {
      gsap.fromTo(actionLabels,
        {
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: actionLabels[0],
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Set initial active state styling (minimal background interference)
      const initialActiveLabel = document.querySelector('.action-label.active');
      if (initialActiveLabel) {
        const activeLink = initialActiveLabel.querySelector('.action-label-link');
        gsap.set(initialActiveLabel, {
          borderLeft: "3px solid #FF3200",
          paddingLeft: "12px"
        });
        if (activeLink) {
          gsap.set(activeLink, {
            color: "#FF3200",
            fontWeight: "900",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)"
          });
        }
      }

      // Enhanced Label Hover States
      actionLabels.forEach((label, index) => {
        const link = label.querySelector('.action-label-link');
        
        if (link) {
          // Create hover timeline
          const hoverTl = gsap.timeline({ paused: true });
          
          hoverTl
            .to(link, {
              x: 8,
              color: "#FF3200",
              scale: 1.05,
              fontWeight: "900",
              textShadow: "0 2px 4px rgba(255, 50, 0, 0.3)",
              duration: 0.3,
              ease: "power2.out"
            });

          label.addEventListener('mouseenter', () => {
            hoverTl.play();
          });

          label.addEventListener('mouseleave', () => {
            hoverTl.reverse();
          });
        }
      });
    }

    // 3. Image Grid Crossfade Enhancement
    if (imageSets.length > 0) {
      // Initial setup - hide all except first
      imageSets.forEach((set, index) => {
        if (index === 0) {
          gsap.set(set, { opacity: 1, display: 'flex' });
        } else {
          gsap.set(set, { opacity: 0, display: 'none' });
        }
      });

      // Enhanced label switching with crossfade
      actionLabels.forEach((label, index) => {
        label.addEventListener('mouseenter', () => {
          const targetId = label.getAttribute('data-id');
          const targetSet = document.getElementById(targetId);
          const currentActive = document.querySelector('.action-image-set.active');

          if (targetSet && targetSet !== currentActive) {
            // Crossfade animation
            if (currentActive) {
              gsap.to(currentActive, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => {
                  currentActive.classList.remove('active');
                  currentActive.style.display = 'none';
                }
              });
            }

            // Fade in new set
            targetSet.style.display = 'flex';
            targetSet.classList.add('active');
            gsap.fromTo(targetSet,
              {
                opacity: 0,
                y: 20
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
              }
            );
          }
        });
      });

      // Initial image animations
      gsap.fromTo(imageSets,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageSets[0],
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 4. Individual Image Hover Effects
    if (actionImages.length > 0) {
      actionImages.forEach(image => {
        // Create hover timeline for each image
        const imageHoverTl = gsap.timeline({ paused: true });
        
        imageHoverTl
          .to(image, {
            scale: 1.05,
            rotation: 1,
            duration: 0.4,
            ease: "power2.out"
          })
          .to(image, {
            brightness: 110,
            duration: 0.4,
            ease: "power2.out"
          }, 0);

        image.addEventListener('mouseenter', () => {
          imageHoverTl.play();
        });

        image.addEventListener('mouseleave', () => {
          imageHoverTl.reverse();
        });

        // Individual image scroll animations
        gsap.fromTo(image,
          {
            opacity: 0,
            scale: 0.9
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: image,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }

    // 5. Background Parallax Effect
    if (chooseActionSection) {
      const leftSide = chooseActionSection.querySelector('.choose-action-left');
      
      if (leftSide) {
        // Create parallax effect for the background
        gsap.to(leftSide, {
          backgroundPosition: "center 20%",
          ease: "none",
          scrollTrigger: {
            trigger: chooseActionSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        // Add subtle movement to the left side content
        gsap.to(leftSide, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: chooseActionSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        });
      }
    }

    // 6. Section Container Animation
    const chooseActionContainer = document.querySelector('.choose-action-container');
    if (chooseActionContainer) {
      gsap.fromTo(chooseActionContainer,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chooseActionContainer,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 7. Image Grid Layout Animations
    const imageLeftColumns = document.querySelectorAll('.action-image-left');
    const imageRightColumns = document.querySelectorAll('.action-image-right');

    if (imageLeftColumns.length > 0) {
      gsap.fromTo(imageLeftColumns,
        {
          opacity: 0,
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageLeftColumns[0],
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (imageRightColumns.length > 0) {
      gsap.fromTo(imageRightColumns,
        {
          opacity: 0,
          x: 30
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRightColumns[0],
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 8. Enhanced Active State Animations
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          const link = target.querySelector('.action-label-link');
          
          if (target.classList.contains('action-label') && target.classList.contains('active')) {
            // Active state styling (minimal background interference)
            gsap.to(target, {
              borderLeft: "3px solid #FF3200",
              paddingLeft: "12px",
              duration: 0.4,
              ease: "power2.out"
            });
            
            if (link) {
              gsap.to(link, {
                color: "#FF3200",
                fontWeight: "900",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                duration: 0.4,
                ease: "power2.out"
              });
            }
            
          } else if (target.classList.contains('action-label')) {
            // Reset non-active state
            gsap.to(target, {
              borderLeft: "none",
              paddingLeft: "0",
              duration: 0.4,
              ease: "power2.out"
            });
            
            if (link) {
              gsap.to(link, {
                color: "#212121",
                fontWeight: "bold",
                textShadow: "none",
                duration: 0.4,
                ease: "power2.out"
              });
            }
          }
        }
      });
    });

    // Observe label class changes
    actionLabels.forEach(label => {
      observer.observe(label, { attributes: true, attributeFilter: ['class'] });
    });

    console.log('Choose action animations setup complete');
  }, 300);
});
