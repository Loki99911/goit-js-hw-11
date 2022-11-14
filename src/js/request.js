import axios from 'axios';

export default class Request {
  constructor() {
    this.name = '';
    this.page = 1;
  }

  async getPhoto() {
    const response = await axios.get(
      `https://pixabay.com/api/?key=31271755-a238d7bfd5266bfb37ac3595c&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    this.page += 1;
    return response;
  }
 
  async resetPage() {
    this.page = 1;
  }

  get input() {
    return this.name;
  }

  set input(newName) {
    this.name = newName;
  }
}
