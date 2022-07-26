import { toggleForm, getWordAfterNum } from './utils.js';
import { offerType, RoomToGuests, MAX_PRICE } from './data.js';
import { createUISlider } from './slider.js';
import { resetMap, addMapHandlers } from './map.js';
import { clearFilters } from './map-params.js';
import { sendData } from './api.js';
import { togglePage } from './page.js';
import { initImageControl } from './image.js';

const PRICE_PRIORITY = 1000;
const PARAMS_DISABLED_CLASSNAME = 'ad-form--disabled';

const adFormElement =  document.querySelector('.ad-form');
const addressElement = adFormElement.querySelector('#address');
const submitElement = adFormElement.querySelector('.ad-form__submit');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const roomsFieldElement = adFormElement.querySelector('[name="rooms"]');
const capacityFieldElement = adFormElement.querySelector('[name="capacity"]');
const timeinFieldElement = adFormElement.querySelector('[name="timein"]');
const timeoutFieldElement = adFormElement.querySelector('[name="timeout"]');
const typeFieldElement = adFormElement.querySelector('[name="type"]');
const priceFieldElement = adFormElement.querySelector('[name="price"]');
const priceUISlider = createUISlider(sliderElement, priceFieldElement);

const avatarInputElement = adFormElement.querySelector('#avatar');
const avatarPreviewElement = adFormElement.querySelector('.ad-form-header__preview');
const offerImageInputElement = adFormElement.querySelector('#images');
const offerImagePreviewElement = adFormElement.querySelector('.ad-form__photo');
const clearAvatar = initImageControl(avatarInputElement, avatarPreviewElement);
const clearOfferImage = initImageControl(offerImageInputElement, offerImagePreviewElement);

const initialType = typeFieldElement.value;

export const resetMapHandler = addMapHandlers(addressElement);

const validatePrice = (value) => {
  const price = parseInt(value, 10) || 0;
  const inRange = price >= parseInt(priceFieldElement.min, 10) && price <= MAX_PRICE;
  return /^\d+$/.test(value) && inRange;
};

const validateCapacity = () => RoomToGuests[roomsFieldElement.value].includes(capacityFieldElement.value);

// Валидация кол-во комнат и кол-во гостей
const getCapacityErrorMessage = () => {
  const { value } = roomsFieldElement;
  const rooms = `${value} ${getWordAfterNum['комнаты', 'комнат']}`;
  const validGuests = RoomToGuests[value];
  return `Для ${rooms} допустимо гостей: ${validGuests.join(', ')}`;
};

const getPriceErrorMessage = () => `Выберите число между ${priceFieldElement.min} и ${MAX_PRICE}`;

export const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

// Валидация тип жилья и цена за ночь
const setAttribute = (type) => {
  const minPrice = offerType[type].min;
  priceFieldElement.min = minPrice;
  priceFieldElement.placeholder = minPrice;
};
setAttribute(initialType);

const changeType = (type = typeFieldElement.value) => {
  setAttribute(type);

  const min = parseInt(priceFieldElement.min, 10);

  priceUISlider.updateOptions({
    range: {
      min,
      max: MAX_PRICE,
    },
  });

  if (!priceFieldElement.value) {
    priceUISlider.set(min);
  }
};

export const toggleParamsForm = (isActive) => {
  toggleForm(isActive, adFormElement, PARAMS_DISABLED_CLASSNAME);
};

priceUISlider.on('slide', () => {
  priceFieldElement.value = priceUISlider.get();
});

typeFieldElement.addEventListener('change', () => {
  changeType();

  // Чтобы при смене типа сразу подсветило, если значение стало невалидным
  pristine.validate(priceFieldElement);
});

priceFieldElement.addEventListener('input', () => {
  if (pristine.validate(priceFieldElement)) {
    priceUISlider.set(parseInt(priceFieldElement.value, 10));
  }
});

roomsFieldElement.addEventListener('change', () => pristine.validate(capacityFieldElement));

// Валидация время заезда и время выезда
timeinFieldElement.addEventListener('change', () => {
  timeoutFieldElement.value = timeinFieldElement.value;
});
timeoutFieldElement.addEventListener('change', () => {
  timeinFieldElement.value = timeoutFieldElement.value;
});

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  const offerData = new FormData(adFormElement);
  togglePage(false);
  sendData(offerData, () => {
    adFormElement.reset();
  });
});

export const setUserFormSubmit = (onSuccess) => {
  submitElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => onSuccess(),
        new FormData(evt.target),
      );
    }
    submitElement.disabled = true;
    adFormElement.submit();
  });
};

adFormElement.addEventListener('reset', () => {
  clearAvatar();
  clearOfferImage();
  clearFilters();
  resetMap();
  changeType(initialType);
  priceUISlider.set(parseInt(priceFieldElement.min, 10));
  pristine.reset();
});

pristine.addValidator(priceFieldElement, validatePrice, getPriceErrorMessage, PRICE_PRIORITY, true);
pristine.addValidator(capacityFieldElement, validateCapacity, getCapacityErrorMessage);
