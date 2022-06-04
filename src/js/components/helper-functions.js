const fixBlocks = document.querySelectorAll('.fix-block')
const buttonMenu = document.querySelector('[data-open-menu')
const menu = document.querySelector('[data-menu]')
const phone = document.querySelector('[data-menu-phone]')
const headerMenu = document.querySelector('.header__menu')
const body = document.body

function disableScroll() {
  const paddingOffset = window.innerWidth - body.offsetWidth + 'px'
  const pagePosition = window.scrollY
  body.classList.add('disable-scroll')
  body.dataset.position = pagePosition
  body.style.top = -pagePosition + 'px'
  fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset
  })
  body.style.paddingRight = paddingOffset
}

function enableScroll() {
  const pagePosition = parseInt(body.dataset.position, 10)
  body.style.top = 'auto'
  body.classList.remove('disable-scroll')
  window.scroll({ top: pagePosition, left: 0 })
  body.removeAttribute('data-position')
  fixBlocks.forEach((el) => {
    el.style.paddingRight = '0px'
  })
  body.style.paddingRight = '0px'
}

// function closeMenu() {
//   enableScroll()
//   menu.classList.remove('active')
//   headerMenu.classList.remove('active')
//   menuOpen.classList.remove('hidden')
//   menuClose.classList.remove('visible')
// }

// function openMenu() {
//   disableScroll()
//   menu.classList.add('active')
//   headerMenu.classList.add('active')
//   menuOpen.classList.add('hidden')
//   menuClose.classList.add('visible')
// }

export { disableScroll, enableScroll }
