// Modal.js
class Modal {
  constructor(modalElement, closeButton) {
    this.modalElement = modalElement;
    this.closeButton = closeButton;

    this.closeButton.addEventListener('click', () => this.close());
    window.addEventListener('click', (event) => {
      if (event.target === this.modalElement) {
        this.close();
      }
    });
  }

  open() {
    this.modalElement.classList.remove('close');
    this.modalElement.classList.add('active');
  }

  close() {
    this.modalElement.classList.add('close');
    this.modalElement.addEventListener(
      'animationend',
      () => {
        this.modalElement.classList.remove('active');
      },
      { once: true },
    );
  }
}

export default Modal;
