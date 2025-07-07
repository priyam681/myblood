/**
 * GSAP Performance Banner Animations
 * Split content reveals, text sequences, parallax, and CTA interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - performance banner animations disabled');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  console.log('GSAP Performance Banner animations initializing...');

  // Wait for DOM to be fully ready
  setTimeout(() => {
    // Find main elements
    const performanceBanner = document.querySelector('.performance-banner');
    const textContent = document.querySelector('.performance-banner .text-content');
    const imageContent = document.querySelector('.performance-banner .image-content');
    const textContainer = document.querySelector('.performance-banner .text-container');
    const subheading = textContainer?.querySelector('p:first-child');
    const heading = textContainer?.querySelector('h2');
    const description = textContainer?.querySelector('p:last-of-type');
    const ctaButton = textContainer?.querySelector('.button');
    const performanceImage = imageContent?.querySelector('img');

    console.log('Performance banner elements found:', {
      performanceBanner: !!performanceBanner,
      textContent: !!textContent,
      imageContent: !!imageContent,
      textContainer: !!textContainer,
      subheading: !!subheading,
      heading: !!heading,
      description: !!description,
      ctaButton: !!ctaButton,
      performanceImage: !!performanceImage
    });

    if (!performanceBanner) {
      console.log('No performance banner section found');
      return;
    }

    // 1. Split Content Reveals - Left and Right Split Animation
    if (textContent && imageContent) {
      // Initial state - hide both sides
      gsap.set([textContent, imageContent], {
        opacity: 0,
        x: (index) => index === 0 ? -100 : 100
      });

      // Split reveal animation
      gsap.to([textContent, imageContent], {
        opacity: 1,
        x: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: performanceBanner,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // 2. Text Sequence Animations - Staggered text reveals
    if (textContainer) {
      const textElements = [subheading, heading, description, ctaButton].filter(Boolean);
      
      // Set initial states
      gsap.set(textElements, {
        opacity: 0,
        y: 40,
        rotationX: 45
      });

      // Create text sequence timeline
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainer,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      });

      // Subheading animation
      if (subheading) {
        textTl.to(subheading, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }

      // Heading animation with word-by-word reveal
      if (heading) {
        // Split heading into words for individual animation
        const headingWords = heading.innerHTML.split(' ');
        heading.innerHTML = headingWords.map(word => `<span class="word-reveal">${word}</span>`).join(' ');
        
        const wordSpans = heading.querySelectorAll('.word-reveal');
        gsap.set(wordSpans, {
          opacity: 0,
          y: 30,
          rotationX: 45
        });

        textTl.to(heading, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          ease: "power2.out"
        }, 0.3)
        .to(wordSpans, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, 0.5);
      }

      // Description animation
      if (description) {
        textTl.to(description, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "power2.out"
        }, 1.2);
      }

      // CTA Button animation
      if (ctaButton) {
        textTl.to(ctaButton, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, 1.8);
      }
    }

    // 3. Image Parallax Effects
    if (performanceImage && imageContent) {
      // Parallax scrolling effect
      gsap.to(performanceImage, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: imageContent,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Image scale and entrance effect
      gsap.fromTo(performanceImage,
        {
          scale: 1.2,
          opacity: 0.8
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageContent,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image hover effects - subtle scale and brightness
      if (window.innerWidth > 768) {
        const imageHoverTl = gsap.timeline({ paused: true });
        
        imageHoverTl.to(performanceImage, {
          scale: 1.05,
          filter: "brightness(1.1)",
          duration: 0.4,
          ease: "power2.out"
        });

        imageContent.addEventListener('mouseenter', () => {
          imageHoverTl.play();
        });

        imageContent.addEventListener('mouseleave', () => {
          imageHoverTl.reverse();
        });
      }
    }

    // 4. CTA Button Interactions
    if (ctaButton) {
      // Enhanced button hover effects
      const buttonTl = gsap.timeline({ paused: true });
      
      buttonTl
        .to(ctaButton, {
          scale: 1.05,
          backgroundColor: "#ff6633",
          boxShadow: "0 8px 25px rgba(255, 69, 0, 0.4)",
          duration: 0.3,
          ease: "power2.out"
        })
        .to(ctaButton, {
          y: -3,
          duration: 0.2,
          ease: "power2.out"
        }, 0);

      ctaButton.addEventListener('mouseenter', () => {
        buttonTl.play();
      });

      ctaButton.addEventListener('mouseleave', () => {
        buttonTl.reverse();
      });

      // Button click animation
      ctaButton.addEventListener('mousedown', () => {
        gsap.to(ctaButton, {
          scale: 0.98,
          duration: 0.1,
          ease: "power2.out"
        });
      });

      ctaButton.addEventListener('mouseup', () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          duration: 0.1,
          ease: "power2.out"
        });
      });

      // Magnetic button effect
      if (window.innerWidth > 768) {
        ctaButton.addEventListener('mousemove', (e) => {
          const rect = ctaButton.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
          
          gsap.to(ctaButton, {
            x: x,
            y: y - 3,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      }
    }

    // 5. Section Container Animations
    if (performanceBanner) {
      // Section entrance animation
      gsap.fromTo(performanceBanner,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: performanceBanner,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 6. Enhanced Text Effects
    if (heading) {
      // Highlight span animation
      const highlightSpan = heading.querySelector('.highlight');
      if (highlightSpan) {
        gsap.fromTo(highlightSpan,
          {
            backgroundSize: "0% 100%",
            backgroundImage: "linear-gradient(90deg, #FF4500, #ff6633)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0% 100%",
            color: "#fff"
          },
          {
            backgroundSize: "100% 100%",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }

    // 7. Responsive Adjustments
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMediaQuery(e) {
      if (e.matches) {
        // Mobile adjustments
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === performanceBanner) {
            trigger.vars.start = "top 95%";
          }
        });
      }
    }

    mediaQuery.addListener(handleMediaQuery);
    handleMediaQuery(mediaQuery);

    console.log('Performance banner animations setup complete');
  }, 300);
});
