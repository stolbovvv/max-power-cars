/* global tns */
window.addEventListener('DOMContentLoaded', () => {
  // Sliders
  const sliderCelectedCar = document.querySelector('.slider-selected-car');

  function creatSliderDots(count, container) {
    for (let i = 0; i < count; i++) {
      container.insertAdjacentHTML('beforeEnd', '<span class="slider-selected-car__dots-item"></span>');
    }
  }

  if (sliderCelectedCar) {
    const slideCount = sliderCelectedCar.querySelectorAll('[data-slider="slide"]').length;
    const slideContainer = sliderCelectedCar.querySelector('[data-slider="slide-container"]');
    const dotsContainer = sliderCelectedCar.querySelector('[data-slider="dot-container"]');
    const butttonPrev = sliderCelectedCar.querySelector('[data-slider="button-prev"]');
    const butttonNext = sliderCelectedCar.querySelector('[data-slider="button-next"]');

    if (slideCount) creatSliderDots(slideCount, dotsContainer);

    tns({
      container: slideContainer,
      navContainer: dotsContainer,
      prevButton: butttonPrev,
      nextButton: butttonNext,
      items: 1,
      mode: 'gallery',
    });
  } else {
    console.warn('Warning: No slider with class "slider-selected-car" found on page');
  }
});
