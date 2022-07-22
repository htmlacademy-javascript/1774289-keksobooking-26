import { toggleForm } from './utils.js';

const PARAMS_DISABLED_CLASSNAME = 'map__filters--disabled';
const adFormElement = document.querySelector('.map__filters');

export const toggleMapParams = (isActive) => {
  toggleForm(isActive, adFormElement, PARAMS_DISABLED_CLASSNAME);
};
