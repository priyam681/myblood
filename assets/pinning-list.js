if (!customElements.get('pinning-list')) {
  class PinningList extends HTMLElement {
    constructor() {
      super();
      if (typeof gsap !== 'undefined' && gsap.ScrollTrigger) {
        this.tl = gsap.timeline();
        this.initPinning();
      } else {
        console.warn('GSAP or ScrollTrigger not loaded. Pinning list animations disabled.');
      }
      this.tl = gsap.timeline();
      this.initPinning();
    }

    initPinning() {
      const cards = document.querySelectorAll('.pinning-card-item');
      const pinningSection = document.querySelector('.pinning-section');

      const firstCardColor = cards[0].getAttribute('data-bg-color') ||
        window.getComputedStyle(cards[0]).backgroundColor;
      pinningSection.style.backgroundColor = firstCardColor;

      this.tl.to('.pinning-card-list', {
        x: () => -(document.querySelector('.pinning-card-list').scrollWidth - window.innerWidth),
        opacity: 1,
        ease: 'easeOut',
        scrollTrigger: {
          trigger: '.pinning-section',
          start: 'top top',
          end: () => `+=${document.querySelector('.pinning-card-list').scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          markers: true, // Remove in production
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const cardCount = cards.length;
            const cardIndex = Math.min(Math.floor(progress * cardCount), cardCount - 1);

            const currentCard = cards[cardIndex];
            const cardColor = currentCard.getAttribute('data-bg-color') ||
              window.getComputedStyle(currentCard).backgroundColor;

            pinningSection.style.backgroundColor = cardColor;
            console.log('card: ', cardColor);
          }
        }
      });

      /*      this.tl.to('.pinning-card-list .pinning-card-item', {
              x: () => -(document.querySelector('.pinning-card-list').scrollWidth - window.innerWidth),

              scrollTrigger: {
                trigger: '.pinning-section',
                scroller: 'body',
                start: 'top top',
                end: '+=100%',
                scrub: 1,
                pin: true,
                markers: true, // Changed from true to false for production
                anticipatePin: 1
              }
            });*/

      this.tl.from('.pinning-header span', {
        y: -50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.pinning-section',
          scroller: 'body',
          start: 'top 0%',
          scrub: 2,
          markers: true // Changed from true to false for production
        }
      });
    }
  }

  customElements.define('pinning-list', PinningList);
}
