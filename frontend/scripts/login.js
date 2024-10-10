document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const messageError = document.querySelector('.error-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;
    messageError.innerText = '';

    const emailTest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailTest.test(emailInput.value)) {
      messageError.innerText = 'Invalid email';
      messageError.style.display = 'block';
      isValid = false;
    }

    if (passwordInput.value.length < 5) {
      messageError.innerText = 'Password must be at least 5 characters long';
      messageError.style.display = 'block';
      isValid = false;
    }

    if (isValid) {
      alert('Login bem-sucedido!');
    }
  });
});
