import { getRandomOffers } from './random-offers.js';
import { generateCard } from './offer-card.js';

const OFFERS_COUNT = 1;
getRandomOffers(OFFERS_COUNT).forEach((offer) => {
  document.querySelector('#map-canvas').append(generateCard(offer));
});

