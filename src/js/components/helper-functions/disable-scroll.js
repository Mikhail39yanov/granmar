const fixBlocks = document.querySelectorAll('.fix-block')
const body = document.body

export function disableScroll() {
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
