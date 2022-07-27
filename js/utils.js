const PLURAL_THRESHOLD = 5;
const COORD_DECIMALS = 5;

//Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

// Получение случайного числа с заданной точностью из диапапзона
export const getRandomArbitrary = (min, max, digits = 1) => {
  if (min < 0 || max < 0) {
    return getRandomArbitrary(Math.abs(min), Math.abs(max), digits);
  }

  if (max < min) {
    return getRandomArbitrary(max, min, digits);
  }

  if (max === min) {
    return parseFloat(min.toFixed(digits));
  }

  const result = Math.random() * (max - min) + min;
  return parseFloat(result.toFixed(digits));
};

export const formatNumberWithLeadZero = (num) => `${num < 10 ? '0' : ''}${num}`;

export const getRandomArrayElement = (arr) => arr[getRandomIntInclusive(0, arr.length - 1)];

export const getRandomArrayPart = (arr) => {
  const firstIndex = getRandomIntInclusive(0, arr.length);
  const secondIndex = getRandomIntInclusive(0, arr.length);
  return arr.slice(Math.min(firstIndex, secondIndex), Math.max(firstIndex, secondIndex));
};

// Создаёт функцию, генерирующую DOM-узел, заполненный контентом
export const getElementFiller = (template) => (selector, data = '', createChildElement) => {
  const element = template.querySelector(selector);
  const content = data.toString();

  if (Array.isArray(data) && data.length) {
    if (typeof createChildElement === 'function') {
      element.innerHTML = '';
      data.forEach((item) => {
        element.append(createChildElement(item));
      });
    } else {
      element.textContent = data.join(', ');
    }
  } else if (content) {
    element.textContent = content;
  } else {
    element.remove();
  }
};

// Выбор словоформы по значению числа
export const getWordAfterNum = (num, [form1, form2 = form1, form3 = form2]) => {
  const lastDigit = num % 10;

  if (num % 100 - lastDigit === 10 || lastDigit >= PLURAL_THRESHOLD) {
    return form3;
  }

  if (lastDigit === 1) {
    return form1;
  }

  return form2;
};

export const getLocationString = ({ lat, lng }) => `${lat.toFixed(COORD_DECIMALS)}, ${lng.toFixed(COORD_DECIMALS)}`;

export const isEscapeKeyPressed = (evt) => evt.key === 'Escape';

// Функция активации и деактивации
export const toggleForm = (active, formElement, disabledClassName) => {
  const classMethod = active ? 'remove' : 'add';
  formElement.classList[classMethod](disabledClassName);

  formElement.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = !active;
  });
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
