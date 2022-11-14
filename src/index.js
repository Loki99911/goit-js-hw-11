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

async function processing(event) {
  event.preventDefault();

  render.deleteCards();
  request.resetPage();
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

  render.renderCards();
  lightbox.refresh();
  
  const observer = new IntersectionObserver(onEntry, {
    rootMargin: '150px',
  });
  
observer.observe(document.querySelector('.sentinel'));
}

async function getMorePhoto() {
  const { data } = await request.getPhoto();
  const { hits, totalHits } = data;
  render.arrCards = hits;
  render.renderCards();
  lightbox.refresh();
  SmoothScrolling();
  
  
  if (Math.ceil(totalHits / 40) <= request.page-1) {
    Notify.info('We`re sorry, but you`ve reached the end of search results.');
  }
  
}

// simplelightbox____________________________
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  scrollZoom: false,
});
// __________________________________________

const onEntry = entries => {
  entries.forEach(async entry => {
    if (entry.isIntersecting && request.input !== '') {
      getMorePhoto();
    }
  });
};
