const button = document.querySelector('.colobarate__btn') as HTMLElement | null
const cards = document.querySelectorAll('.colobarate__card')

if (button != null) {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    cards.forEach(card => card.classList.remove('_hidden'))
    button.style.display = 'none'
  })
}

