import { getRandomOffers } from './random-offers.js';
import { generateCard } from './offer-card.js';
import { toggleParamsForm } from './ad-form.js';
import { toggleMapParams } from './map-params.js';

const WAIT_TIME = 2000;
const OFFERS_COUNT = 1;

toggleParamsForm();
toggleMapParams();

setTimeout(() => {
  getRandomOffers(OFFERS_COUNT).forEach((offer) => {
    document.querySelector('#map-canvas').append(generateCard(offer));
  });

  toggleParamsForm(true);
  toggleMapParams(true);
}, WAIT_TIME);
