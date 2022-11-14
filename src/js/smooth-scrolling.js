export default function smoothScrolling() {const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2.75,
  behavior: 'smooth',
}); };