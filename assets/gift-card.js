/**
 * Gift card functionality
 */
document.addEventListener('DOMContentLoaded', function() {
  // QR Code generation
  const qrContainer = document.querySelector('.gift-card__qr-code');
  if (qrContainer && typeof QRCode !== 'undefined') {
    const qrImageAlt = qrContainer.dataset.qrImageAlt || 'QR code — scan to redeem gift card';
    
    new QRCode(qrContainer, {
      text: qrContainer.dataset.identifier,
      width: 72,
      height: 72,
      imageAltText: qrImageAlt
    });
  }

  // Copy to clipboard functionality
  const copyButton = document.querySelector('.gift-card__copy-button');
  const successMessage = document.querySelector('.gift-card__copy-success');
  const template = document.querySelector('template');
  let isMessageDisplayed = false;

  if (copyButton && successMessage && template) {
    const clonedTemplate = template.content.cloneNode(true);
    
    copyButton.addEventListener('click', function() {
      const giftCardCode = document.getElementById('gift-card-code');
      
      if (giftCardCode && navigator.clipboard) {
        navigator.clipboard.writeText(giftCardCode.innerText)
          .then(function() {
            if (!isMessageDisplayed) {
              successMessage.appendChild(clonedTemplate);
              isMessageDisplayed = true;
              
              // Hide success message after 3 seconds
              setTimeout(function() {
                successMessage.innerHTML = '';
                isMessageDisplayed = false;
              }, 3000);
            }
          })
          .catch(function(err) {
            console.error('Failed to copy gift card code: ', err);
          });
      } else {
        // Fallback for browsers without clipboard API
        giftCardCode.select();
        document.execCommand('copy');
        
        if (!isMessageDisplayed) {
          successMessage.appendChild(clonedTemplate);
          isMessageDisplayed = true;
          
          setTimeout(function() {
            successMessage.innerHTML = '';
            isMessageDisplayed = false;
          }, 3000);
        }
      }
    });
  }
});
