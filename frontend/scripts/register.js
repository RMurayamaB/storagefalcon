document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confirm-password');
  const messageError = document.querySelector('.error-message');
  const strongPasswordTest =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
  const emailTest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;
    messageError.innerText = '';
    messageError.style.display = 'none'; // Esconde a mensagem de erro inicialmente

    // Primeiro, verificar se o email é válido
    if (!emailTest.test(email.value)) {
      messageError.innerText = 'Invalid email';
      messageError.style.display = 'block';
      messageError.style.color = 'red';
      isValid = false;
      email.value = '';
    }
    // Depois, verificar se as senhas coincidem
    else if (password.value !== confirmPassword.value) {
      messageError.innerText = 'Passwords do not match';
      messageError.style.display = 'block';
      messageError.style.color = 'red';
      isValid = false;
    }
    // Finalmente, verificar a força da senha
    else if (!strongPasswordTest.test(password.value)) {
      messageError.innerText =
        'Password must be at least 8 characters long, include upper and lower case letters, numbers, and special characters.';
      messageError.style.display = 'block';
      messageError.style.color = 'red';
      isValid = false;
    }

    // Mensagem de sucesso
    if (isValid) {
      messageError.innerText = 'Registration successful!';
      messageError.style.backgroundColor = 'rgba(0, 128, 0, 0.5)';
      messageError.style.color = 'white';
      messageError.style.display = 'block';
    }
  });
});
