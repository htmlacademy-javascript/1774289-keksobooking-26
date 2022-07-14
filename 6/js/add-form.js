import { toggleForm } from './utils.js';

const PARAMS_DISABLED = 'ad-form--disabled';
const paramsElement =  document.querySelector('.add-form');

export const toggleFormParams = (isActive) => {
  toggleForm(isActive, paramsElement, PARAMS_DISABLED);
};
