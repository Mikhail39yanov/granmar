const fixBlocks = document.querySelectorAll('.fix-block')
const body = document.body

export function enableScroll() {
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
