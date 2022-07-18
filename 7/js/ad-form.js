import { toggleForm, getWordAfterNum } from './utils.js';
import { offerType, RoomToGuests, MAX_PRICE } from './data.js';

const PRICE_PRIORITY = 1000;
const PARAMS_DISABLED_CLASSNAME = 'ad-form--disabled';
const paramsElement =  document.querySelector('.ad-form');
const submitElement = paramsElement.querySelector('.ad-form__submit');
// const resetElement = formElement.querySelector('.ad-form__reset');
const roomsFieldElement = paramsElement.querySelector('[name="rooms"]');
const capacityFieldElement = paramsElement.querySelector('[name="capacity"]');
const timeinFieldElement = paramsElement.querySelector('[name="timein"]');
const timeoutFieldElement = paramsElement.querySelector('[name="timeout"]');
const typeFieldElement = paramsElement.querySelector('[name="type"]');
const priceFieldElement = paramsElement.querySelector('[name="price"]');

const initialType = typeFieldElement.value;

export const toggleParamsForm = (isActive) => {
  toggleForm(isActive, paramsElement, PARAMS_DISABLED_CLASSNAME);
};

export const pristine = new Pristine(paramsElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});
// }, false);

// Валидация кол-во комнат и кол-во гостей
const validateCapacity = () => RoomToGuests[roomsFieldElement.value].includes(capacityFieldElement.value);
const getCapacityErrorMessage = () => {
  const { value } = roomsFieldElement;
  const rooms = `${value} ${getWordAfterNum(['комнаты', 'комнат'])}`;
  const validGuests = RoomToGuests[value];
  return `Для ${rooms} допустимо гостей: ${validGuests.join(', ')}`;
};

pristine.addValidator(capacityFieldElement, validateCapacity, getCapacityErrorMessage);
roomsFieldElement.addEventListener('change', () => pristine.validate(capacityFieldElement));

// Валидация тип жилья и цена за ночь
const setAttribute = (type) => {
  const minPrice = offerType[type].min;
  priceFieldElement.min = minPrice;
  priceFieldElement.placeholder = minPrice;
};
setAttribute(initialType);

const changeType = (type = typeFieldElement.value) => {
  setAttribute(type);

  // priceUISlider.updateOptions({
  //   range: {
  //     min: parseInt(priceFieldElement.min, 10),
  //     max: MAX_PRICE,
  //   },
  // });

  // if (!priceFieldElement.value) {
  //   priceUISlider.set(0);
  // }
};

const validatePrice = (value) => {
  const price = parseInt(value || 0, 10);
  const inRange = price >= parseInt(priceFieldElement.min, 10) && price <= MAX_PRICE;
  return /^\d+$/.test(value) && inRange;
};

const getPriceErrorMessage = () => `Выберите число между ${priceFieldElement.min} и ${MAX_PRICE}`;

pristine.addValidator(priceFieldElement, validatePrice, getPriceErrorMessage, PRICE_PRIORITY, true);

typeFieldElement.addEventListener('change', () => {
  changeType();

  // Чтобы при смене типа сразу подсветило, если значение стало невалидным
  pristine.validate(priceFieldElement);
});

// Валидация время заезда и время выезда
timeinFieldElement.addEventListener('change', () => {
  timeoutFieldElement.value = timeinFieldElement.value;
});
timeoutFieldElement.addEventListener('change', () => {
  timeinFieldElement.value = timeoutFieldElement.value;
});

submitElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  submitElement.disabled = true;
  paramsElement.submit();
});

paramsElement.addEventListener('reset', () => {
  changeType(initialType);
  pristine.reset();
});
