import { getRandomOffers } from './random-offers.js';
import { generateCard } from './offer-card.js';
import { renderMap } from './map.js';
import { getData } from './api.js';
import { togglePage } from './page.js';

const OFFERS_COUNT = 10;

togglePage();

getData(() => {
  renderMap(getRandomOffers(OFFERS_COUNT), generateCard, () => {
    togglePage(true);
  });
});
