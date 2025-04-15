if (!customElements.get('pinning-list')) {
  class PinningList extends HTMLElement {
    constructor() {
      super();
      this.initPinning();
    }

    initPinning() {
      if (typeof gsap === 'undefined' || ScrollTrigger === 'undefined') {
        console.log('GSAP or ScrollTrigger not loaded.Pinning will not work.');
        return;
      }

      const container = document.getElementById('pinning-list-container');
      const cards = document.querySelectorAll('.pinning-list-card');
      cards.forEach((card, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
            pinSpacing: false,
            markers: false,
            id: `card-pin-${index + 1}`
          }
        });
      });
    }


  }

  customElements.define('pinning-list', PinningList);
}