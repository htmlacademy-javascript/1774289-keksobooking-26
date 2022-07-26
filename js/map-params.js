import { toggleForm, debounce } from './utils.js';
import { renderOffers } from './page.js';

const DEFAULT_VALUE = 'any';
const RERENDER_DELAY = 500;
const PARAMS_DISABLED_CLASSNAME = 'map__filters--disabled';

const housingPrice = {
  low: {
    from: 0,
    to: 10000
  },
  middle: {
    from: 10000,
    to: 50000
  },
  high: {
    from: 50000,
    to: Infinity
  }
};

const adFormElement = document.querySelector('.map__filters');
const filterControlGroups = Array.from(adFormElement.children);

const filterRules = {
  'housing-type': ({ type }, value) => value === type,
  'housing-price': ({ price }, value) => price >= housingPrice[value].from && price < housingPrice[value].to,
  'housing-rooms': ({ rooms }, value) => value === rooms.toString(),
  'housing-guests': ({ guests }, value) => value === guests.toString(),
  'housing-features': ({ features }) => {
    if (!features) {
      return false;
    }
    const checkedCheckboxes = Array.from(adFormElement.querySelectorAll('[type="checkbox"]:checked'));
    return checkedCheckboxes.every(({ value }) => features.some((feature) => feature === value));
  }
};

export const filterOffers = ({ offer }) =>
  filterControlGroups.every(({ value, id }) => value === DEFAULT_VALUE || filterRules[id](offer, value));

export const toggleMapParams = (isActive) => {
  toggleForm(isActive, adFormElement, PARAMS_DISABLED_CLASSNAME);
};

const rerender = () => renderOffers(filterOffers);

export const clearFilters = () => {
  filterControlGroups.forEach((group) => {
    if (group.name) {
      group.value = DEFAULT_VALUE;
    } else {
      group.querySelectorAll('input').forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  });
  rerender();
};

adFormElement.addEventListener('change', debounce(rerender, RERENDER_DELAY));
