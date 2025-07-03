/**
 * Social sharing functionality
 */
function openShareWindow(url) {
  const width = 500;
  const height = 400;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;

  window.open(
    url, 
    "shareWindow", 
    `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
  );
}

// Initialize share buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const shareButtons = document.querySelectorAll('[data-share-url]');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const shareUrl = this.getAttribute('data-share-url');
      if (shareUrl) {
        openShareWindow(shareUrl);
      }
    });
  });
});
