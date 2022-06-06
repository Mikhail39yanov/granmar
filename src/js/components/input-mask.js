import Inputmask from 'inputmask'
const selector = document.querySelector('#tel')
const im = new Inputmask('+7 (999) 999-99-99')
im.mask(selector)
