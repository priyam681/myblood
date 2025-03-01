if (!customElements.get('custom-modal')) {
    customElements.define('custom-modal', class CustomModal extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
   
      @keyframes open-animation {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }

  @keyframes close-animation {
    from {
      transform: translateX();
    }

    to {
      transform: translateX(100%);
    }
  }
:host {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 550px; /* Fixed width */
  height: 100vh; /* Full height */
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow-y: auto; /* Enables scrolling for content */
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
}

:host([open]) {
  display: block;
  animation: open-animation 2s forwards;
}


.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
}

 
  
      <div class="modal-content">
        <button class="close-button">&times;</button>
          <slot name="header"></slot>
            <slot name="body"></slot>
            <slot name="footer"></slot>
      </div>
    `;
        }

        connectedCallback() {
            this.shadowRoot.querySelector('.close-button').addEventListener('click', () => {
                this.close();
            });
        }

        open() {
            this.setAttribute('open', '');
        }

        close() {
            this.removeAttribute('open');
        }
    })

}

document.getElementById('open-modal').addEventListener('click', () => {
    document.getElementById('modal-1').open();
});
document.getElementById('open-modal-2').addEventListener('click', () => {
    document.getElementById('modal-2').open();
});
