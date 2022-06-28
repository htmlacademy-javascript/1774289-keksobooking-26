
import { LatRang, LngRang, Price, Rooms, Guests, CHECKIN, CHECKOUT, TYPES, FEATURES, PHOTOS } from './data.js';
import { getRandomIntInclusive, getRandomArbitrary, formatNumberWithLeadZero, getRandomArrayElement, getRandomArrayPart, OFFERS_COUNT, COORD_AMOUNT } from './util.js';

export const getRandomOffer = (_item, i) => {
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

export const getRandomOffers = (length) => Array.from({ length }, getRandomOffer);

export const offers = getRandomOffers(OFFERS_COUNT);
//console.log(offers);
