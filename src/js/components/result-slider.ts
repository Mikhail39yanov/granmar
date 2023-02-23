import Swiper, { Navigation, Keyboard, Scrollbar, FreeMode } from 'swiper'

const resultSlider = new Swiper('.slider-result', {
  modules: [Navigation, Keyboard, Scrollbar, FreeMode],
  // Свои классы
  wrapperClass: 'slider-result__wrapper',
  slideClass: 'slider-result__slide',
  spaceBetween: 25,
  slidesPerView: 1.2,
  grabCursor: true,
  nested: true,
  speed: 800,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  navigation: {
    nextEl: '.slider-result__button-next',
    prevEl: '.slider-result__button-prev',
  },
  // Скролл
  scrollbar: {
    el: '.slider-result__scrollbar',
    dragClass: 'slider-result__drag-scroll',
    // Возможность перетаскивать скролл
    draggable: true,
  },
})
