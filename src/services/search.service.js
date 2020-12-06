import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class SearchService {
  searchProducts(name) {
    return axios.get(API_URL + `products?name=${name}`);
  }
}

export default new SearchService();
