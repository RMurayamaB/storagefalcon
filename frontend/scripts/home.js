document.addEventListener('DOMContentLoaded', () => {
  const createFolderButton = document.querySelector('.btn-create');
  const modal = document.querySelector('.modal');
  const modalCloseButton = document.querySelector('.close-modal');
  const tableFolders = document.querySelector('.table-body');
  const folderName = document.querySelector('#folder-name');
  const btnCreateModal = document.querySelector('.btn-create-folder');
  let folders = JSON.parse(localStorage.getItem('folders')) || [];

  createFolderButton.addEventListener('click', () => {
    modal.classList.remove('close');
    modal.classList.add('active');
  });

  function closeModal() {
    folderName.value = '';
    modal.classList.add('close');
    modal.addEventListener(
      'animationend',
      () => {
        modal.classList.remove('active');
      },
      { once: true },
    );
  }

  modalCloseButton.addEventListener('click', closeModal);
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  function renderFolders() {
    tableFolders.innerHTML = '';

    folders.forEach((folder, index) => {
      const newRow = document.createElement('tr');
      newRow.classList.add('table-row');
      newRow.innerHTML = `
        <td> <i class="fa-solid fa-folder"></i> ${folder.name}</td>
        <td>${folder.createDate}</td>
        <td>${folder.updateDate}</td>
        <td class="actions">
        <button class="btn-edit" data-index="${index}">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn-delete" data-index="${index}"
        >
        <i class="fa-solid fa-trash" ></i>
        </button>

        `;
      tableFolders.appendChild(newRow);
    });
    actionsEvent();
  }

  btnCreateModal.addEventListener('click', () => {
    const folderNameValue = folderName.value;

    folderName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        btnCreateModal.click();
      }
    });
    if (folderNameValue !== '') {
      const newFolder = {
        name: folderNameValue,
        createDate: new Date().toLocaleDateString(),
        updateDate: new Date().toLocaleDateString(),
      };

      folders.push(newFolder);
      localStorage.setItem('folders', JSON.stringify(folders));
      renderFolders();
      closeModal();
    }
  });

  function actionsEvent() {
    document.querySelectorAll('.btn-delete').forEach((button) => {
      button.addEventListener('click', (e) => {
        const index = e.target
          .closest('.btn-delete')
          .getAttribute('data-index');
        deleteFolder(index);
      });
    });
  }

  function deleteFolder(index) {
    /* implementar lógica de modal para confirmar o delete*/
    folders.splice(index, 1);
    localStorage.setItem('folders', JSON.stringify(folders));
    renderFolders();
  }
  renderFolders();
});
