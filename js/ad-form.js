import { toggleForm } from './utils.js';

const PARAMS_DISABLED_CLASSNAME = 'ad-form--disabled';
const paramsElement =  document.querySelector('.ad-form');

export const toggleParamsForm = (isActive) => {
  toggleForm(isActive, paramsElement, PARAMS_DISABLED_CLASSNAME);
};
