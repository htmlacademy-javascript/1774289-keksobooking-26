import {
  LatRange,
  LngRange,
  PriceRange,
  RoomsRange,
  GuestsRange,
  offerType,
  COORD_AMOUNT,
  CHECKIN,
  CHECKOUT,
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
    author: {
      avatar: `img/avatars/user${formatNumberWithLeadZero(index)}.png`
    },
    offer: {
      address: `${location.lat}, ${location.lng}`,
      description: 'This room has one sofa and a round coffee table',
      price: getRandomIntInclusive(PriceRange.MIN, PriceRange.MAX),
      location,
      photos: getRandomArrayPart(PHOTOS),
      type: getRandomArrayElement(Object.keys(offerType)),
      rooms: getRandomIntInclusive(RoomsRange.MIN, RoomsRange.MAX),
      guests: getRandomIntInclusive(GuestsRange.MIN, GuestsRange.MAX),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArrayPart(FEATURES),
      title: 'Hello world!'
    },
    location
  };
};

export const getRandomOffers = (length) => Array.from({ length }, getRandomOffer);
