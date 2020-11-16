import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class CategoriesService {
  getCategories() {
    return axios.get(API_URL + 'categories');
  }
  getCategoriesDetails(category) {
    return axios.get(API_URL + `categories/${category}`);
  }
}

export default new CategoriesService();
