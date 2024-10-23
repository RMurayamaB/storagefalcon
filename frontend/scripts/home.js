import Modal from './components/Modal.js';
import FolderManager from './components/FolderManager.js';
import CreateFolder from './components/CreateFolder.js';


document.addEventListener('DOMContentLoaded', () => {
  const modalElement = document.querySelector('.modal');
  const closeButton = document.querySelector('.close-modal');
  const createFolderButton = document.querySelector('.btn-create');
  const folderNameInput = document.querySelector('#folder-name');
  const errorMessage = document.querySelector('.error-message');
  const tableFolders = document.querySelector('.table-body');

  const modalComponent = new Modal(modalElement, closeButton);

  const folderManager = new FolderManager('.table-body');

  const createFolder = new CreateFolder(
    '.btn-create-folder',
    '#folder-name',
    '.error-message',
    folderManager,
    modalComponent,
  );
  createFolderButton.addEventListener('click', () => {
    modalComponent.open();
  });
});
