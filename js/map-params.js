import { toggleForm } from './utils.js';

const PARAMS_DISABLED = 'map__filters--disabled';
const paramsElement = document.querySelector('.map__filters');

export const toggleMapParams = (isActive) => {
  toggleForm(isActive, paramsElement, PARAMS_DISABLED);
};
