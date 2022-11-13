export default class Render {
  constructor() {
    this.place = '';
    this.cards = [];
  }

  renderCards() {
    const string = this.cards
      .map(
        card =>
          `<a href="${card.largeImageURL} ">
            <div class="photo-card">
              <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                  ${card.likes}
                </p>
                <p class="info-item">
                  <b>Views</b>
                  ${card.views}
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  ${card.comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  ${card.downloads}
                </p>
              </div>
            </div>
          </a>`
      )
      .join('');
    this.place.insertAdjacentHTML('beforeend', string);
    return;
  }

  deleteCards() {
    this.place.innerHTML = '';
  }

  get tag() {
    return this.place;
  }

  set tag(newPlace) {
    this.place = newPlace;
  }
  get arrCards() {
    return this.cards;
  }

  set arrCards(newCards) {
    this.cards = newCards;
  }
}
