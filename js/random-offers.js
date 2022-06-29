import { COORD_AMOUNT, OFFERS_COUNT } from './data.js';
import {
  LatRange,
  LngRange,
  PriceRange,
  RoomsRange,
  GuestsRange,
  CHECKIN,
  CHECKOUT,
  TYPES,
  FEATURES,
  PHOTOS
} from './data.js';

import {
  getRandomIntInclusive,
  getRandomArbitrary,
  formatNumberWithLeadZero,
  getRandomArrayElement,
  getRandomArrayPart
} from './util.js';

export const getRandomOffer = (_item, i) => {
  const index = i + 1;
  const location = {
    lat: getRandomArbitrary(LatRange.MIN, LatRange.MAX, COORD_AMOUNT),
    lng: getRandomArbitrary(LngRange.MIN, LngRange.MAX, COORD_AMOUNT)
  };

  return {
    address: `${location.lat}, ${location.lng}`,
    author: {
      avatar: `img/avatars/user${formatNumberWithLeadZero(index)}.png`
    },
    description: 'This room has one sofa and a round coffee table',
    price: getRandomIntInclusive(PriceRange.MIN, PriceRange.MAX),
    location,
    photos: getRandomArrayPart(PHOTOS),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomIntInclusive(RoomsRange.MIN, RoomsRange.MAX),
    guests: getRandomIntInclusive(GuestsRange.MIN, GuestsRange.MAX),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: getRandomArrayPart(FEATURES),
    title: 'Hello world!'
  };
};

export const getRandomOffers = (length) => Array.from({ length }, getRandomOffer);

export const offers = getRandomOffers(OFFERS_COUNT);
//console.log(offers);
