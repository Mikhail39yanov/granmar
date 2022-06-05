import Swiper, { FreeMode, Keyboard } from 'swiper'

const heroSwiper = new Swiper('.hero', {
  modules: [FreeMode, Keyboard],
  // Свои классы
  wrapperClass: 'hero__wrapper',
  slideClass: 'hero__slide',
  slidesPerView: 'auto',
  spaceBetween: -20,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  nested: true,
  freeMode: true,
  grabCursor: true,
  watchOverflow: true,
});
