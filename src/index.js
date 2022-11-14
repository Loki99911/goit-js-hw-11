import './css/styles.css';
import Request from './js/request';
import Render from './js/render';
import SmoothScrolling from './js/smooth-scrolling'
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
form.addEventListener('submit', processing);
const request = new Request();

const render = new Render();
render.tag = document.querySelector('.gallery');
const buttonMore = document.querySelector('.load-more');
buttonMore.addEventListener('click', getMorePhoto);

async function processing(event) {
  event.preventDefault();

  render.deleteCards();
  request.resetPage();
  buttonMore.classList.add('is-hidden');
  // для запроса
  request.input = event.target.elements.searchQuery.value;
  // обработка полученного ответа
  const { data } = await request.getPhoto();
  const { hits, totalHits } = data;
  // передача в отрисовку
  render.arrCards = hits;

  if (hits.length === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  if (hits.length !== 0) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  if (totalHits <= 40) {
    Notify.info('We`re sorry, but you`ve reached the end of search results.');
      }

  // ФОРМУЛА НЕВЕРНАЯ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (totalHits > 40) {
    buttonMore.classList.remove('is-hidden');
  }
  render.renderCards();
  lightbox.refresh();
}

async function getMorePhoto(event) {
  // обработка полученного ответа
  const { data } = await request.getPhoto();
  const { hits, totalHits } = data;
  // передача в отрисовку
  render.arrCards = hits;
  render.renderCards();
  lightbox.refresh();
  SmoothScrolling();
  
  
  if (Math.ceil(totalHits / 40) <= request.page-1) {
    Notify.info('We`re sorry, but you`ve reached the end of search results.');
    buttonMore.classList.add('is-hidden');
  }
  
}

// simplelightbox____________________________
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
// __________________________________________

