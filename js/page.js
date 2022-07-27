import { OFFERS_COUNT } from './data.js';
import { generateCard } from './offer-card.js';
import { renderMap } from './map.js';
import { getData } from './api.js';
import { createMocks } from './random-offers.js';
import { toggleMapParams } from './map-params.js';
import { toggleParamsForm } from './ad-form.js';

export let hasOffers = false;

const getOffers = window.location.search.includes('test') ? createMocks : getData;

export const togglePage = (status) => {
  toggleParamsForm(status);
  toggleMapParams(!status ? false : hasOffers);
};

export const renderOffers = (filterOffers = Boolean) => {
  togglePage(false);

  getOffers().then((data) => {
    hasOffers = data.length > 0;
    const offers = hasOffers ? data.filter(filterOffers).slice(0, OFFERS_COUNT) : data;

    renderMap(offers, generateCard, () => {
      togglePage(true);
    });
  });
};
