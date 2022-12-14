"use strict";

/* global tns */
window.addEventListener('DOMContentLoaded', function () {
  // Sliders
  var sliderCelectedCar = document.querySelector('.slider-selected-car');
  function creatSliderDots(count, container) {
    for (var i = 0; i < count; i++) {
      container.insertAdjacentHTML('beforeEnd', '<span class="slider-selected-car__dots-item"></span>');
    }
  }
  if (sliderCelectedCar) {
    var slideCount = sliderCelectedCar.querySelectorAll('[data-slider="slide"]').length;
    var slideContainer = sliderCelectedCar.querySelector('[data-slider="slide-container"]');
    var dotsContainer = sliderCelectedCar.querySelector('[data-slider="dot-container"]');
    var butttonPrev = sliderCelectedCar.querySelector('[data-slider="button-prev"]');
    var butttonNext = sliderCelectedCar.querySelector('[data-slider="button-next"]');
    if (slideCount) creatSliderDots(slideCount, dotsContainer);
    tns({
      container: slideContainer,
      navContainer: dotsContainer,
      prevButton: butttonPrev,
      nextButton: butttonNext,
      items: 1,
      mode: 'gallery'
    });
  } else {
    console.warn('Warning: No slider with class "slider-selected-car" found on page');
  }
});