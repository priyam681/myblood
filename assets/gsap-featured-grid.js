/**
 * GSAP Featured Collection Grid Animations
 * Scroll-triggered animations for grid cards
 */

document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - featured grid animations disabled');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Find all featured cards
  const featuredCards = document.querySelectorAll('.featured-card');
  
  if (featuredCards.length === 0) return;

  // Set initial states for cards
  gsap.set('.featured-card', {
    opacity: 0,
    y: 40,
    scale: 0.95
  });

  gsap.set('.featured-overlay .brand', {
    opacity: 0,
    y: 20
  });

  gsap.set('.featured-overlay .title', {
    opacity: 0,
    y: 25
  });

  gsap.set('.featured-overlay .price', {
    opacity: 0,
    y: 15
  });

  // Animate each card as it comes into view
  featuredCards.forEach((card, index) => {
    const overlay = card.querySelector('.featured-overlay');
    const brand = overlay?.querySelector('.brand');
    const title = overlay?.querySelector('.title');
    const price = overlay?.querySelector('.price');

    // Card entrance animation
    gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse"
      }
    });

    // Staggered content animations
    if (overlay) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      if (brand) {
        tl.to(brand, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      }

      if (title) {
        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");
      }

      if (price) {
        tl.to(price, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");
      }
    }

    // Add hover effects
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(card.querySelector('img'), {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(card.querySelector('img'), {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });

  // Optional: Animate the entire grid container
  gsap.to('.featured-grid', {
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.featured-grid',
      start: "top 90%",
      end: "bottom 10%",
      toggleActions: "play none none reverse"
    }
  });
});
