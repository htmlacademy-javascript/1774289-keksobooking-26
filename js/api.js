import { createPopup } from './popup.js';

const SERVER = 'https://26.javascript.pages.academy/keksobooking';

const handleFetchError = () => {
  createPopup('ERROR_FETCH');
  return [];
};

const handlePostError = () => {
  createPopup('ERROR_POST');
};

export const getData = () =>
  fetch(`${SERVER}/data`, {
    method: 'GET',
    credentials: 'same-origin'
  })
    .then((response) => {
      const { ok = false } = response;

      if (ok) {
        return response.json();
      }

      return handleFetchError();
    })
    .catch(handleFetchError);


export const sendData = (body, onSuccess ) =>
  fetch(SERVER, {
    method: 'POST',
    body
  })
    .then(({ ok }) => {
      if (ok) {
        onSuccess();
        createPopup('SUCCESS');
      } else {
        handlePostError();
      }
    })
    .catch(handlePostError);
