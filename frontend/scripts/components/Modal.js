class Modal {
  constructor(modalElement, closeButton) {
    this.modalElement = modalElement;
    this.closeButton = closeButton;

    this.confirmButton = this.modalElement.querySelector('.confirm-button');
    this.confirmEdit = this.modalElement.querySelector('.btn-save-folder');
    this.cancelButton = this.modalElement.querySelector('.cancel-button');

    this.closeButton.addEventListener('click', () => this.close());

    if (this.cancelButton) {
      this.cancelButton.addEventListener('click', () => this.close());
    }

    window.addEventListener('click', (event) => {
      if (event.target === this.modalElement) {
        this.close();
      }
    });
  }

  open(onConfirm = null, isEdit = false) {
    this.modalElement.classList.remove('close');
    this.modalElement.classList.add('active');

    const buttonToUse = isEdit ? this.confirmEdit : this.confirmButton;

    if (buttonToUse) {
      buttonToUse.onclick = () => {
        if (onConfirm) onConfirm();
        this.close();
      };
    }
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
