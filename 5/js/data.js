const LatRange = {
  MIN: 35.65,
  MAX: 35.7
};

const LngRange = {
  MIN: 139.7,
  MAX: 139.8
};

const PriceRange = {
  MIN: 0,
  MAX: 1000
};

const RoomsRange = {
  MIN: 1,
  MAX: 5
};

const GuestsRange = {
  MIN: 1000,
  MAX: 9000
};

const CHECKIN = ['12:00', '13:00', '14:00'];

const CHECKOUT = ['12:00', '13:00', '14:00'];

const offerType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const COORD_AMOUNT = 5;

const OFFERS_COUNT = 10;

export {
  LatRange,
  LngRange,
  PriceRange,
  RoomsRange,
  GuestsRange,
  offerType,
  CHECKIN,
  CHECKOUT,
  FEATURES,
  PHOTOS,
  COORD_AMOUNT,
  OFFERS_COUNT
};
