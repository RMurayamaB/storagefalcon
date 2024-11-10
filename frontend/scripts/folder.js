document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const folderName = params.get('name');
    document.getElementById('folder-name').textContent = folderName;
    loadFolderFiles(folderName);
  });
  
  function loadFolderFiles(folderName) {
    const folders = JSON.parse(localStorage.getItem('folders')) || [];
    const folder = folders.find(f => f.name === folderName);
    if (!folder || !folder.videos) return;
    const fileGallery = document.getElementById('file-gallery');
    fileGallery.innerHTML = '';
    folder.videos.forEach((videoURL, index) => {
      const fileCard = document.createElement('div');
      fileCard.classList.add('file-card');
      fileCard.innerHTML = `
        <video src="${videoURL}" controls width="100%"></video>
        <p>Upload em: ${new Date(folder.uploadDates[index]).toLocaleDateString()}</p>
      `;
      fileGallery.appendChild(fileCard);
    });
  }

  function handleFiles(files) {
    const params = new URLSearchParams(window.location.search);
    const folderName = params.get('name');
    const folders = JSON.parse(localStorage.getItem('folders')) || [];
    let folder = folders.find(f => f.name === folderName);
    if (!folder) {
      folder = { name: folderName, videos: [], uploadDates: [] };
      folders.push(folder);
    }
    for (let file of files) {
      const videoURL = URL.createObjectURL(file);
      folder.videos.push(videoURL);
      folder.uploadDates.push(new Date());
      const fileCard = document.createElement('div');
      fileCard.classList.add('file-card');
      fileCard.innerHTML = `
        <video src="${videoURL}" controls width="100%"></video>
        <p>Upload em: ${new Date().toLocaleDateString()}</p>
      `;
      document.getElementById('file-gallery').appendChild(fileCard);
    }

    localStorage.setItem('folders', JSON.stringify(folders));
  }
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  }
  
  document.querySelector(".upload-area input[type='file']").addEventListener("change", function(event) {
    handleFiles(event.target.files);
  });