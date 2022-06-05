import { closeMenu, openMenu } from './menu-functions/index.js'
const buttonMenu = document.querySelector('[data-open-menu]')
// const menu = document.querySelector('[data-menu]')
// const phone = document.querySelector('[data-menu-phone]')

buttonMenu.addEventListener('click', () => {
  buttonMenu.classList.contains('_active') ? closeMenu() : openMenu()
})
