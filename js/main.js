import { getRandomOffers } from './random-offers.js';
import { generateCard } from './offer-card.js';
import { toggleParamsForm } from './ad-form.js';
import { toggleMapParams } from './map-params.js';
import { renderMap } from './map.js';

const WAIT_TIME = 2000;
const OFFERS_COUNT = 10;

toggleParamsForm();
toggleMapParams();

setTimeout(() => {
  renderMap(getRandomOffers(OFFERS_COUNT), generateCard, () => {
    toggleParamsForm(true);
    toggleMapParams(true);
  });
}, WAIT_TIME);
