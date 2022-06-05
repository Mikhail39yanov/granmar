export function smoothScroll(path) {
  const targetSection = document.getElementById(path)

  targetSection.scrollIntoView({
    behavior: 'smooth'
  })
}
