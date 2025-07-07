/**
 * GSAP Homepage Banner Animations
 * Subtle entrance animations for banner elements
 */

document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - banner animations disabled');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Banner container
  const bannerContainer = document.querySelector('.homepage-banner');
  if (!bannerContainer) {
    console.warn('Homepage banner container not found');
    return;
  }

  console.log('GSAP banner animations initializing...');

  // Check if our target elements exist
  const heading = document.querySelector('.banner__heading');
  const text = document.querySelector('.banner__text');
  const buttonsContainer = document.querySelector('.banner__buttons');
  const media = document.querySelector('.banner__media');

  console.log('Elements found:', { heading, text, buttonsContainer, media });

  // Set initial states - elements invisible and slightly moved
  if (heading) {
    gsap.set('.banner__heading', { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    });
  }
  
  if (text) {
    gsap.set('.banner__text', { 
      opacity: 0, 
      y: 20 
    });
  }
  
  if (buttonsContainer) {
    gsap.set('.banner__buttons', { 
      opacity: 0, 
      y: 25 
    });
  }
  
  if (media) {
    gsap.set('.banner__media img, .banner__media video', { 
      opacity: 0, 
      scale: 1.05 
    });
  }

  // Create timeline for sequential animations
  const bannerTimeline = gsap.timeline({ 
    delay: 0.2,
    defaults: { 
      ease: "power2.out",
      duration: 0.8
    }
  });

  // Animate elements in sequence - only if they exist
  if (heading) {
    bannerTimeline.to('.banner__heading', { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      duration: 1
    });
  }

  if (text) {
    bannerTimeline.to('.banner__text', { 
      opacity: 1, 
      y: 0,
      duration: 0.6 
    }, heading ? "-=0.4" : 0);
  }

  if (buttonsContainer) {
    bannerTimeline.to('.banner__buttons', { 
      opacity: 1, 
      y: 0,
      duration: 0.6 
    }, (heading || text) ? "-=0.3" : 0);
  }

  if (media) {
    bannerTimeline.to('.banner__media img, .banner__media video', { 
      opacity: 1, 
      scale: 1,
      duration: 0.8 
    }, (heading || text || buttonsContainer) ? "-=0.6" : 0);
  }

  // Add hover effects for interactive elements
  const buttons = document.querySelectorAll('.homepage-banner .button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { 
        scale: 1.05, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { 
        scale: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    });
  });

  // Subtle parallax effect for banner media on scroll (optional)
  if (window.innerWidth > 768) {
    gsap.to('.banner__media', {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: '.homepage-banner',
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  }
});
