import Swiper, { Navigation, Pagination, Keyboard, Mousewheel, Scrollbar, FreeMode, EffectFade } from 'swiper'
import { gsap } from "gsap"

const wrapper = document.querySelector('.wrapper')
const slider = document.querySelector('.page')
const headerLinks = document.querySelectorAll('[data-header-link]')
const headerLinksSlide = document.querySelectorAll('.menu__link')
const footer = document.querySelector('.footer')
const loader = document.querySelector('.page-loader')

// ,On
let pageSlider = undefined

function mobileSlider() {
  // console.log(pageSlider)

  if (window.innerWidth > 768) {
    slider.dataset.mobile = 'false'

    pageSlider = new Swiper(slider, {
      modules: [Navigation, Pagination, Keyboard, Mousewheel, Scrollbar, FreeMode, EffectFade],
      // Свои классы
      wrapperClass: 'page__wrapper',
      slideClass: 'page__screen',

      // Вертикальный слайдер
      direction: 'vertical',

      // Кол-во слайдов для показа
      slidesPerView: 'auto',

      // Нужно при detroy, чтобы работал скрол на мыше на маленьких экранах
      // cssMode: true,

      freeMode: false,
      // a11y: true,
      // Управление клавиатурой
      keyboard: {
        // вкл/выкл
        enabled: true,
        // вкл/выкл когда слайдер в пределах вьюпорта
        onlyInViewport: true,
        // вкл/выкл управление pageUp, pageDown
        pageUpDown: true,
      },

      // Управление колесом мыши
      mousewheel: {
        // чувствительность колеса
        sensitivity: 1,
        //класс обьекта на котором будет срабатывать прокрутка мыши
        // eventsTarget: '.page'
      },

      // Отключение функционала если слайдов меньше чем нужно
      watchOverflow: true,
      // Скорость
      // speed: 3000,
      speed: 0,
      // Обновить свайпер при изменении элементов слайдера
      observer: true,
      // Обновить свайпер при изменении родительских элементов слайдера
      observeParents: true,
      // Обновить свайпер при изменении дочерних элементов слайдера
      observeSlideChildren: true,

      // Навигация
      // Булеты, текущее положение, прогрессбар
      pagination: {
        el: '.page__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'page__bullet',
        bulletActiveClass: 'page__bullet--active',
      },
      // Скролл
      scrollbar: {
        el: '.page__scroll',
        dragClass: 'page__drag-scroll',
        // Возможность перетаскивать скролл
        draggable: true,
      },

      // отключаем инициализацию
      init: false,

      // События
      on: {
        // События инициализации
        init() {
          menuSlider()
          setHeaderTheme()
          // setFooterTheme()
          if (slider.dataset.mobile == 'false') {
            setScrollType()
          }
          wrapper.classList.add('_loaded')
        },

        // Событие смены слайда
        slideChange() {
          // showLoader()
          setHeaderTheme()
          setFooterTheme()
        },

        // Событие смены
        resize() {
          if (slider.dataset.mobile == 'false') {
            setScrollType()
          }
        },
      }
    })
    pageSlider.init()
  }

  if (window.innerWidth <= 768 && slider.dataset.mobile == 'false') {

    if (slider.classList.contains('swiper-initialized')) {
      // pageSlider.cssMode = true
      pageSlider.destroy()
      // window.location.reload()
    }

    slider.dataset.mobile = 'true'
  }
}

// Перейти к нужному слайду
function menuSlider() {
  if (headerLinksSlide.length > 0) {
    headerLinksSlide.forEach(headerLink => {
      headerLink.addEventListener('click', (event) => {
        event.preventDefault()
        const dataLink = headerLink.getAttribute('data-link')

        pageSlider.slides.forEach((slide, index) => {
          if (slide.id === dataLink) {
            pageSlider.slideTo(index)
          }
          return
        })
      })
    })
  }
}

// Устанавливает тему для хедера
function setHeaderTheme() {
  if (headerLinks.length > 0) {
    // Получаем активный слайдер по индексу
    const activeSlider = pageSlider.realIndex

    if (pageSlider.slides[activeSlider].classList.contains('page__screen--black')) {
      headerLinks.forEach(headerLink => {
        headerLink.classList.remove('_light')
        headerLink.classList.add('_black')
      })
    } else {
      headerLinks.forEach(headerLink => {
        headerLink.classList.remove('_black')
        headerLink.classList.add('_light')
      })
    }
  }
}

// Устанавливает тему для футера
function setFooterTheme() {
  const activeSlider = pageSlider.realIndex
  if (pageSlider.slides[activeSlider].classList.contains('_footer')) {
    footer.classList.add('_active')
  } else {
    footer.classList.remove('_active')
  }
}

function setScrollType() {
  if (wrapper.classList.contains('_free')) {
    wrapper.classList.remove('_free')
    pageSlider.params.freeMode = false
  }

  for (let index = 0; index < pageSlider.slides.length; index++) {
    const pageSlide = pageSlider.slides[index]
    const pageSlideContent = pageSlide.querySelector('._content')

    if (pageSlideContent) {
      const pageSlideContentHeight = pageSlideContent.offsetHeight
      if (pageSlideContentHeight > window.innerHeight) {
        wrapper.classList.add('_free')
        pageSlider.params.freeMode = true
        break
      }
    }
  }
}

const tl = gsap.timeline()

function showLoader() {
  loader.classList.remove('_top')
  loader.classList.add('_bot')
  tl.fromTo('.page-loader',
    { width: '100vw', height: '0vh', ease: 'none' },
    { duration: 0.75, width: '100vw', height: '100vh', ease: 'none' })
    .then(() => {
      loader.classList.remove('_bot')
      loader.classList.add('_top')
    })

  tl.fromTo('.page-loader',
    { y: '0%', ease: 'none' },
    { delay: 1, duration: 0.75, y: '-120%', ease: 'none' })
}

mobileSlider()
window.addEventListener('resize', mobileSlider)

export { pageSlider }
