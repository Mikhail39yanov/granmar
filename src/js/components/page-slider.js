import Swiper, {
  Navigation,
  Pagination,
  Keyboard,
  Mousewheel,
  Scrollbar,
  FreeMode,
  Manipulation,
  Autoplay,
} from 'swiper'
import { gsap } from 'gsap'
import { closeMenu } from './menu-functions/index.js'
import { smoothScroll } from './helper-functions/index.js'

const wrapper = document.querySelector('.wrapper')
const slider = document.querySelector('.page')
const headerLinks = document.querySelectorAll('[data-header-link]')
const headerLinksSlide = document.querySelectorAll('.menu__link')
const footer = document.querySelector('.footer')
const loader = document.querySelector('.page-loader')
const menu = document.querySelector('[data-menu]')

// ,On
const pageSlider = new Swiper(slider, {
  modules: [Navigation, Pagination, Keyboard, Mousewheel, Scrollbar, FreeMode, Manipulation, Autoplay],
  // Свои классы
  wrapperClass: 'page__wrapper',
  slideClass: 'page__screen',
  // Вертикальный слайдер
  direction: 'vertical',
  // Кол-во слайдов для показа
  slidesPerView: 'auto',
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
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },

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
  // speed: 800,
  speed: 1000,
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
    snapOnRelease: true,
    hide: false,
  },

  iOSEdgeSwipeDetection: true,
  touchReleaseOnEdges: true,

  // отключаем инициализацию
  init: false,
  // События
  on: {
    // События инициализации
    init() {
      menuSlider()
      setHeaderTheme()
      setFooterTheme()
      setScrollType()
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
      setScrollType()
    },
  },
})

// Перейти к нужному слайду
function menuSlider() {
  if (headerLinksSlide.length > 0) {
    headerLinksSlide.forEach((headerLink) => {
      headerLink.addEventListener('click', (event) => {
        event.preventDefault()
        const dataLink = headerLink.getAttribute('data-link')

        if (menu.classList.contains('_active')) {
          closeMenu()
          const path = headerLink.dataset.link
          smoothScroll(path)
        } else {
          pageSlider.slides.forEach((slide, index) => {
            if (slide.id === dataLink) pageSlider.slideTo(index)
            return
          })
        }
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
      headerLinks.forEach((headerLink) => {
        headerLink.classList.remove('_light')
        headerLink.classList.add('_black')
      })
    } else {
      headerLinks.forEach((headerLink) => {
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

// Тип скролла
function setScrollType() {
  if (wrapper.classList.contains('_free')) {
    wrapper.classList.remove('_free')
    pageSlider.params.freeMode.enabled = false
  }

  pageSlider.slides.forEach((slider) => {
    const pageSlideContent = slider.querySelector('._content')

    if (pageSlideContent) {
      const pageSlideContentHeight = pageSlideContent.offsetHeight
      if (pageSlideContentHeight > window.innerHeight) {
        wrapper.classList.add('_free')
        pageSlider.params.freeMode.enabled = true
        return
      }
    }
  })
}

// Анимация
const tl = gsap.timeline()

function showLoader() {
  loader.classList.remove('_top')
  loader.classList.add('_bot')
  tl.fromTo(
    '.page-loader',
    { width: '100vw', height: '0vh', ease: 'none' },
    { duration: 0.75, width: '100vw', height: '100vh', ease: 'none' },
  ).then(() => {
    loader.classList.remove('_bot')
    loader.classList.add('_top')
  })

  tl.fromTo('.page-loader', { y: '0%', ease: 'none' }, { delay: 1, duration: 0.75, y: '-120%', ease: 'none' })
}

pageSlider.init()

// setTimeout(() => {
//   pageSlider.slideNext(1000)
// }, 2000)
// slidePrev
export { pageSlider }
