/**
 * GSAP Performance Banner Animations
 * Shoe-themed animations for footwear brand
 */

function initPerformanceBannerAnimations() {
  console.log('Initializing performance banner animations...');
  
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - performance banner animations disabled');
    return;
  }

  if (typeof ScrollTrigger === 'undefined') {
    console.warn('ScrollTrigger not loaded - trying to register...');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  console.log('GSAP and ScrollTrigger loaded successfully');

  const performanceBanner = document.querySelector('.performance-banner');
  const textContent = document.querySelector('.performance-banner .text-content');
  const imageContent = document.querySelector('.performance-banner .image-content');
  const textContainer = document.querySelector('.performance-banner .text-container');
  const textElements = textContainer?.querySelectorAll('p, h2, .button');
  const performanceImage = imageContent?.querySelector('img');

  console.log('Elements found:', {
    performanceBanner: !!performanceBanner,
    textContent: !!textContent,
    imageContent: !!imageContent,
    textContainer: !!textContainer,
    textElements: textElements?.length || 0,
    performanceImage: !!performanceImage
  });

  if (!performanceBanner) {
    console.warn('Performance banner not found');
    return;
  }

    // Create footstep sound effect (visual)
    function createFootstepEffect() {
      if (textContent) {
        const footstep = document.createElement('div');
        footstep.style.cssText = `
          position: absolute;
          width: 40px;
          height: 20px;
          background: rgba(255, 69, 0, 0.3);
          border-radius: 50%;
          bottom: 20px;
          left: 20px;
          pointer-events: none;
          z-index: 1;
        `;
        textContent.appendChild(footstep);
        
        gsap.fromTo(footstep,
          { opacity: 0, scale: 0.5 },
          { 
            opacity: 1, 
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(footstep, {
                opacity: 0,
                scale: 0.5,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => footstep.remove()
              });
            }
          }
        );
      }
    }

    // Shoe stepping animation for text content
    if (textContent) {
      gsap.fromTo(textContent,
        {
          opacity: 0,
          x: -100,
          rotationZ: -2
        },
        {
          opacity: 1,
          x: 0,
          rotationZ: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: performanceBanner,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          onComplete: createFootstepEffect
        }
      );
    }

    // Shoe bounce animation for image
    if (performanceImage) {
      gsap.fromTo(performanceImage,
        {
          opacity: 0,
          y: -50,
          rotationZ: 5,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotationZ: 0,
          scale: 1,
          duration: 1.5,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: imageContent,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Removed continuous bounce to prevent positioning issues
    }

    // Walking text animation - text elements step in one by one
    if (textElements) {
      textElements.forEach((element, index) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            x: -30,
            rotationZ: -1
          },
          {
            opacity: 1,
            x: 0,
            rotationZ: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3 + (index * 0.15),
            scrollTrigger: {
              trigger: textContainer,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }

    // Enhanced button with shoe tap effect
    const ctaButton = textContainer?.querySelector('.button');
    if (ctaButton) {
      // Initial button setup
      gsap.set(ctaButton, {
        transformOrigin: "bottom center"
      });

      // Shoe tap hover effect
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          y: -3,
          rotationZ: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
          scale: 1,
          y: 0,
          rotationZ: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      // Shoe stomp click effect
      ctaButton.addEventListener('mousedown', () => {
        gsap.to(ctaButton, {
          scale: 0.98,
          y: 2,
          duration: 0.1,
          ease: "power2.out"
        });
        createFootstepEffect();
      });

      ctaButton.addEventListener('mouseup', () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          y: -3,
          duration: 0.1,
          ease: "power2.out"
        });
      });
    }

    // Shoe sole grip effect - subtle slide animation
    if (performanceBanner) {
      gsap.fromTo(performanceBanner,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: performanceBanner,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Shoe lace tying effect for highlight text
    const highlightSpan = textContainer?.querySelector('.highlight');
    if (highlightSpan) {
      gsap.fromTo(highlightSpan,
        {
          backgroundSize: "0% 100%",
          backgroundImage: "linear-gradient(90deg, #FF4500, #ff6633)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          color: "#fff"
        },
        {
          backgroundSize: "100% 100%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: highlightSpan,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Shoe walking trail effect
    function createWalkingTrail() {
      if (window.innerWidth > 768) {
        const trail = document.createElement('div');
        trail.style.cssText = `
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 69, 0, 0.3), transparent);
          bottom: 0;
          left: 0;
          pointer-events: none;
        `;
        performanceBanner.appendChild(trail);
        
        gsap.fromTo(trail,
          { scaleX: 0 },
          { 
            scaleX: 1,
            duration: 2,
            ease: "power2.out",
            delay: 1,
            onComplete: () => {
              gsap.to(trail, {
                opacity: 0,
                duration: 1,
                delay: 2,
                onComplete: () => trail.remove()
              });
            }
          }
        );
      }
    }

    // Trigger walking trail after initial animations
    setTimeout(createWalkingTrail, 2000);

  console.log('Performance banner animations initialized successfully');
}

// Multiple initialization attempts to ensure it works
document.addEventListener('DOMContentLoaded', initPerformanceBannerAnimations);
window.addEventListener('load', initPerformanceBannerAnimations);

// Fallback timeout initialization
setTimeout(() => {
  if (document.querySelector('.performance-banner')) {
    initPerformanceBannerAnimations();
  }
}, 1000);
