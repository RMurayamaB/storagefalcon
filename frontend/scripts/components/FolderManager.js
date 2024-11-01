class FolderManager {
  constructor(tableSelector, deleteModal, editModal) {
    this.folders = JSON.parse(localStorage.getItem('folders')) || [];
    this.tableFolders = document.querySelector(tableSelector);
    this.deleteModal = deleteModal;
    this.editModal = editModal;
    this.editIndex = null;
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
    this.folders[index].updateDate = new Date().toLocaleDateString();
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
        this.deleteModal.open(() => this.deleteFolder(index));
      });
    });

    document.querySelectorAll('.btn-edit').forEach((button) => {
      button.addEventListener('click', (e) => {
        const index = e.target.closest('.btn-edit').getAttribute('data-index');
        this.editIndex = index;
    
        const folder = this.folders[index];
        const input = document.getElementById('folder-name-edit');

        input.value = folder.name;
    
        this.editModal.open(() => {
          const newName = input.value;
          if (newName) {
            this.editFolderName(index, newName);
          } else {
            alert('Digite um nome para a pasta');
          }
        }, true);
    
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
    
            const newName = input.value.trim();
            if (newName) {
              this.editFolderName(index, newName);
              this.editModal.close();
            } 
            else {
              alert('Digite um nome para a pasta');
            }
            /*AJEITAR NOME DOS ALERTS E USAR ERROR */
          }
        });
      });
    });
  }
}

export default FolderManager;


// function renomearPasta(caminhoAtual, novoNome) {
//   fetch('/renomear-pasta', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ caminhoAtual, novoNome })
//   })
//   .then(response => response.text())
//   .then(data => alert(data))
//   .catch(error => console.error('Erro:', error));
// }




//backend



// const express = require('express');
// const fs = require('fs');
// const app = express();
// app.use(express.json());

// app.post('/renomear-pasta', (req, res) => {
//   const { caminhoAtual, novoNome } = req.body;
//   const novoCaminho = caminhoAtual.replace(/[^/]+$/, novoNome);

//   fs.rename(caminhoAtual, novoCaminho, (err) => {
//     if (err) return res.status(500).send('Erro ao renomear a pasta');
//     res.send('Pasta renomeada com sucesso');
//   });
// });

// app.listen(3000, () => console.log('Servidor rodando na porta 3000'));


