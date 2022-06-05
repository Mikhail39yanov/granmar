import { disableScroll } from '../helper-functions/index.js'

const buttonMenu = document.querySelector('[data-open-menu')
const menu = document.querySelector('[data-menu]')
const phone = document.querySelector('[data-menu-phone]')

export function openMenu() {
  disableScroll()
  buttonMenu.classList.add('_active')
  menu.classList.add('_active')
  phone.classList.add('_active')
}
