class FolderManager {
  constructor(tableSelector, deleteModal, editModal) {
    this.folders = JSON.parse(localStorage.getItem('folders')) || [];
    this.tableFolders = document.querySelector(tableSelector);
    this.deleteModal = deleteModal;
    this.editModal = editModal;
    this.renderFolders();
  }

  addFolder(folder) {
    this.folders.push(folder);
    localStorage.setItem('folders', JSON.stringify(this.folders));
    this.renderFolders();
  }

  deleteFolder(index) {
    this.folders.splice(index, 1);
    localStorage.setItem('folders', JSON.stringify(this.folders));
    this.renderFolders();
  }

  editFolderName(index, newName) {
    this.folders[index].name = newName;
    localStorage.setItem('folders', JSON.stringify(this.folders));
    this.renderFolders();
  }

  renderFolders() {
    this.tableFolders.innerHTML = '';

    this.folders.forEach((folder, index) => {
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
          <button class="btn-delete" data-index="${index}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      this.tableFolders.appendChild(newRow);
    });

    this.initActionEvents();
  }

  initActionEvents() {
    document.querySelectorAll('.btn-delete').forEach((button) => {
      button.addEventListener('click', (e) => {
        const index = e.target
          .closest('.btn-delete')
          .getAttribute('data-index');
        this.deleteFolder.open(() => this.deleteFolder(index));
      });
    });

    
  }
}

export default FolderManager;
