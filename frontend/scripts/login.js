// login.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const messageError = document.querySelector('.error-message');

  function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
    console.log(data);
    alert(`Login bem-sucedido! Bem-vindo, ${data.name}`);
    // Aqui você pode redirecionar o usuário ou armazenar o token
  }

  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "124754418002-h7otk5o0l1gda62ihfe1p3499a3kg2nc.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // personalização
    );
    google.accounts.id.prompt(); // Exibe o diálogo One Tap
  };

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
