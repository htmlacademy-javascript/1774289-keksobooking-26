//Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

getRandomIntInclusive(2, 14);

//Источник: https://qna.habr.com/q/999157

function getRandomArbitrary(min, max, maxCommas = 0) {
  if (min > max || min < 0 || max <= 0) {
    throw new RangeError('Задан неверный диапазон! Укажите другие числа.');
  }

  const digitsDegree = 10 ** maxCommas;
  return ~~((Math.random() * (max - min) + min) * digitsDegree);
}

getRandomArbitrary(1, 2, 6);

export const formatNumberWithLeadZero = (num) => `${num < 10 ? '0' : ''}${num}`;

export const getRandomArrayElement = (arr) => arr[getRandomIntInclusive(0, arr.length - 1)];

export const getRandomArrayPart = (arr) => {
  const firstIndex = getRandomIntInclusive(0, arr.length);
  const secondIndex = getRandomIntInclusive(0, arr.length);
  return arr.slice(Math.min(firstIndex, secondIndex), Math.max(firstIndex, secondIndex));
};

const COORD_AMOUNT = 5;
const LatRang = {
  MIN: 35.65,
  MAX: 35.7
};
const LngRang = {
  MIN: 139.7,
  MAX: 139.8
};

const Price = {
  MIN: 0,
  MAX: 1000
};

const Rooms = {
  MIN: 1,
  MAX: 5
};

const Guests = {
  MIN: 1000,
  MAX: 9000
};

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = [ 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner' ];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.'
];

const getRandomOffer = (_item, i) => {
  const index = i + 1;
  const location = {
    lat: getRandomArbitrary(LatRang.MIN, LatRang.MAX, COORD_AMOUNT),
    lng: getRandomArbitrary(LngRang.MIN, LngRang.MAX, COORD_AMOUNT)
  };

  return {
    address: `${location.lat}, ${location.lng}`,
    author: {
      avatar: `img/avatars/user${formatNumberWithLeadZero(index)}.png`
    },
    description: 'This room has one sofa and a round coffee table',
    price: getRandomIntInclusive(Price.MIN, Price.MAX),
    location,
    photos: getRandomArrayPart(PHOTOS),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomIntInclusive(Rooms.MIN, Rooms.MAX),
    guests: getRandomIntInclusive(Guests.MIN, Guests.MAX),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: getRandomArrayPart(FEATURES),
    title: 'Hello world!'
  };
};

const getRandomOffers = (length) => Array.from({ length }, getRandomOffer);

const OFFERS_COUNT = 10;
export const offers = getRandomOffers(OFFERS_COUNT);
//console.log(offers);
