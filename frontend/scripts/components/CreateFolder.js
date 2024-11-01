class CreateFolder {
  constructor(
    createButtonSelector,
    inputSelector,
    errorMessageSelector,
    folderManager,
    modalComponent,
  ) {
    this.createButton = document.querySelector(createButtonSelector);
    this.folderNameInput = document.querySelector(inputSelector);
    this.errorMessageElement = document.querySelector(errorMessageSelector);
    this.folderManager = folderManager;
    this.modalComponent = modalComponent;
    this.initEvents();
  }

  createFolder() {
    const folderNameValue = this.folderNameInput.value.trim();
    this.clearErrorMessage();

    const validationError = this.validateFolderName(folderNameValue);
    if (validationError) {
      this.displayErrorMessage(validationError);
      return;
    }

    const newFolder = {
      name: folderNameValue,
      createDate: new Date().toLocaleDateString(),
      updateDate: new Date().toLocaleDateString(),
    };

    this.folderManager.addFolder(newFolder);
    this.modalComponent.close();
  }

  validateFolderName(folderName) {
    if (folderName === '') {
      return 'Folder name cannot be empty';
    }

    if (folderName.startsWith(' ')) {
      return 'Folder name cannot start with a space';
    }

    return null;
  }

  displayErrorMessage(message) {
    this.errorMessageElement.textContent = message;
    this.errorMessageElement.style.display = 'block';
  }

  clearErrorMessage() {
    this.errorMessageElement.textContent = '';
    this.errorMessageElement.style.display = 'none';
    this.folderNameInput.classList.remove('error');
  }

  initEvents() {
    this.createButton.addEventListener('click', () => this.createFolder());
    this.folderNameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.createButton.click();
      }

    
    });
  }
}

export default CreateFolder;
