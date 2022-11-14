import './css/styles.css';
import Request from './js/request';
import Render from './js/render';
import SmoothScrolling from './js/smooth-scrolling'
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import InfiniteScroll from 'infinite-scroll';

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
  scrollZoom: false,
});
// __________________________________________

// let infScroll = new InfiniteScroll(render.tag, {
//    responseType: 'text',
//   history: false,
//   path() {
//     return `https://pixabay.com/api/?key=31271755-a238d7bfd5266bfb37ac3595c&q=${request.name}&image_type=photo&orientation=horizontal&safesearch=true&page=2&per_page=40`;
//   },
// });

// infScroll.loadNextPage();

// infScroll.on('load', (response, path) => {
//   console.log(JSON.parse(response));
// });