export const createUISlider = (sliderElement) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  return sliderElement.noUiSlider;
};
