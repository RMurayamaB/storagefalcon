import Modal from '../components/Modal.js';

describe('Modal', () => {
  let modalElement;
  let closeButton;
  let modal;

  beforeEach(() => {

    document.body.innerHTML = `
      <div id="modal" class="close">
        <button id="close-button">Close</button>
      </div>
    `;

    modalElement = document.getElementById('modal');
    closeButton = document.getElementById('close-button');

    modal = new Modal(modalElement, closeButton);
  });

  test('adicionar event listener ao botão de fechar', () => {
    const closeSpy = jest.spyOn(modal, 'close');

    closeButton.click();

    expect(closeSpy).toHaveBeenCalled();
  });

  test('adicionar event listener ao window para fechar ao clicar fora do modal', () => {
    const closeSpy = jest.spyOn(modal, 'close');

    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      target: document.body,
    });

    window.dispatchEvent(event);

  });

  test('open()remover a classe "close" e adicionar a classe "active"', () => {
    modal.open();

    expect(modalElement.classList.contains('close')).toBe(false);
    expect(modalElement.classList.contains('active')).toBe(true);
  });

  test('close() deve adicionar a classe "close" e remover a classe "active" após a animação', () => {
    
    const removeActiveSpy = jest.spyOn(modalElement.classList, 'remove');

    modal.close();

    expect(modalElement.classList.contains('close')).toBe(true);

    const animationEndEvent = new Event('animationend');
    modalElement.dispatchEvent(animationEndEvent);

    expect(modalElement.classList.contains('active')).toBe(false);
    expect(removeActiveSpy).toHaveBeenCalledWith('active');
  });
});
