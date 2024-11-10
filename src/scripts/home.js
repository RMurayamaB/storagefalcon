import Modal from '../scripts/components/Modal.js';
import FolderManager from '../scripts/components/FolderManager.js';
import CreateFolder from '../scripts/components/CreateFolder.js';


document.addEventListener('DOMContentLoaded', () => {
  const modalElement = document.querySelector('.modal');
  const deleteModalElement = document.querySelector('#delete-folder');
  const editModalElement = document.querySelector('#edit-folder');
  const deleteCloseButton = deleteModalElement.querySelector('.close-modal');
  const editCloseButton = editModalElement.querySelector('.close-modal');

  const closeButton = document.querySelector('.close-modal');
  const createFolderButton = document.querySelector('.btn-create');

  const modalComponent = new Modal(modalElement, closeButton);
  const deleteModal = new Modal(deleteModalElement, deleteCloseButton);
  const editModal = new Modal(editModalElement, editCloseButton);

  const folderManager = new FolderManager(
    '.table-body',
    deleteModal,
    editModal,
  );

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
