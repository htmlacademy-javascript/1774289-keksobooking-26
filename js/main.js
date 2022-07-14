import { getRandomOffers } from './random-offers.js';
import { generateCard } from './offer-card.js';
import { toggleFormParams } from './add-form';
import { toggleMapParams } from './map-params';

const WAIT_TIME = 2000;
const OFFERS_COUNT = 1;

toggleFormParams();
toggleMapParams();

setTimeout(() => {
  getRandomOffers(OFFERS_COUNT).forEach((offer) => {
    document.querySelector('#map-canvas').append(generateCard(offer));
  });

  toggleFormParams(true);
  toggleMapParams(true);
}, WAIT_TIME);
