function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

getRandomIntInclusive(2, 14);

//Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random


function getRandomArbitrary(min, max, maxCommas = 0) {
  if (min > max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }

  const digitsDegree = 10 ** maxCommas;
  return ~~((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}

getRandomArbitrary(1, 2, 6);

//Источник: https://qna.habr.com/q/999157
