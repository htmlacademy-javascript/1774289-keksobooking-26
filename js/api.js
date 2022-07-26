import { createPopup } from './popup.js';

const SERVER = 'https://26.javascript.pages.academy/keksobooking';

const handleFetchError = () => {
  createPopup('ERROR_FETCH');
  return [];
};

const onFail = () => {
  createPopup('ERROR_POST');
};

export const getData = () => {
  fetch(`${SERVER}/data`, {
    method: 'GET',
    credentials: 'same-origin'
  })
    .then((res) => {
      const { ok = false } = res;

      if (ok) {
        return res.json();
      }

      return handleFetchError();
    })
    .catch(handleFetchError);
};

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
        onFail();
      }
    })
    .catch(onFail);
// 'Не удалось отправить форму. Попробуйте ещё раз'
