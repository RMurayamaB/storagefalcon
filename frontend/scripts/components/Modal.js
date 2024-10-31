// Modal.js
class Modal {
  constructor(modalElement, closeButton) {
    this.modalElement = modalElement;
    this.closeButton = closeButton;

    this.confirmButton = this.modalElement.querySelector('.confirm-button');
    this.cancelButton = this.modalElement.querySelector('.cancel-button');

    this.closeButton.addEventListener('click', () => this.close());
    this.cancelButton.addEventListener('click', () => this.close());
    window.addEventListener('click', (event) => {
      if (event.target === this.modalElement) {
        this.close();
      }
    });
  }

  open(onConfirm = null) {
    this.modalElement.classList.remove('close');
    this.modalElement.classList.add('active');
    this.confirmButton.onclick = () => {
      if (onConfirm) onConfirm();
      this.close();
    };
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
