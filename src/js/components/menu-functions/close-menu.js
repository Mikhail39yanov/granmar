import { enableScroll } from '../helper-functions/index.js'

const buttonMenu = document.querySelector('[data-open-menu')
const menu = document.querySelector('[data-menu]')
const phone = document.querySelector('[data-menu-phone]')

export function closeMenu() {
  enableScroll()
  buttonMenu.classList.remove('_active')
  menu.classList.remove('_active')
  phone.classList.remove('_active')
}
