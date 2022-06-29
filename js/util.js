//Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
//Источник: https://qna.habr.com/q/999157
export function getRandomArbitrary(min, max, maxCommas = 0) {
  if (min > max || min < 0 || max <= 0) {
    throw new RangeError('Задан неверный диапазон! Укажите другие числа.');
  }

  const digitsDegree = 10 ** maxCommas;
  return ~~((Math.random() * (max - min) + min) * digitsDegree);
}

export const formatNumberWithLeadZero = (num) => `${num < 10 ? '0' : ''}${num}`;

export const getRandomArrayElement = (arr) => arr[getRandomIntInclusive(0, arr.length - 1)];

export const getRandomArrayPart = (arr) => {
  const firstIndex = getRandomIntInclusive(0, arr.length);
  const secondIndex = getRandomIntInclusive(0, arr.length);
  return arr.slice(Math.min(firstIndex, secondIndex), Math.max(firstIndex, secondIndex));
};
