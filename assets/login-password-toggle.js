document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('CustomerPassword');
  const togglePassword = document.getElementById('togglePassword');
  const eyeIcon = document.getElementById('eyeIcon');

  if (passwordInput && togglePassword && eyeIcon) {
    togglePassword.addEventListener('click', function() {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
        togglePassword.classList.add('eye-cross');
      } else {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
        togglePassword.classList.remove('eye-cross');
      }
    });
  }
});
