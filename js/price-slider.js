/* global noUiSlider:readonly */
const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('[name="price"]');

valueElement.value = 1000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  step: 100,
  connect: 'lower',
  start: 0,
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});


const resetSlider = () => {
  sliderElement.noUiSlider.set(0);
  valueElement.value = 0;
}

export { resetSlider }