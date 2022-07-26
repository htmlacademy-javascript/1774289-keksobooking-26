import { isEscapeKeyPressed } from './utils.js';
import { togglePage } from './page.js';

const Template = {
  SUCCESS: document.querySelector('#success').content.querySelector('.success'),
  ERROR: document.querySelector('#error').content.querySelector('.error')
};
Template.ERROR_FETCH = Template.ERROR.cloneNode(true);
Template.ERROR_FETCH.querySelector('.error__message').textContent = 'Ошибка получения объявлений';
Template.ERROR_FETCH.querySelector('.error__button').textContent = 'Добавить объявление';

export const createPopup = (mode) => {
  const popupElement = Template[mode].cloneNode(true);

  togglePage(false);
  document.body.append(popupElement);

  const closePopup = () => {
    popupElement.remove();
    document.removeEventListener('keydown', keyCloseHandler);

    togglePage(true);
  };

  function keyCloseHandler(evt) {
    if (isEscapeKeyPressed(evt)) {
      evt.preventDefault();
      closePopup();
    }
  }

  popupElement.addEventListener('click', () => closePopup());
  document.addEventListener('keydown', keyCloseHandler);
};
