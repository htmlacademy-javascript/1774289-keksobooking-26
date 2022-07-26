import { getRandomOffers } from './random-offers.js';
import { generateCard } from './offer-card.js';
import { toggleParamsForm } from './ad-form.js';
import { toggleMapParams } from './map-params.js';
import { renderMap, addMapHandlers } from './map.js';
import { setUserFormSubmit } from './ad-form.js';
import { getData } from './api.js';
import './image.js';

const WAIT_TIME = 2000;
const OFFERS_COUNT = 10;

toggleParamsForm();
toggleMapParams();

getData(
  setTimeout(() => {
    renderMap(getRandomOffers(OFFERS_COUNT), generateCard, () => {
      toggleParamsForm(true);
      toggleMapParams(true);
      addMapHandlers(true);
    });
  }, WAIT_TIME)
);

setUserFormSubmit();
