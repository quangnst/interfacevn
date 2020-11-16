import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class ProductsService {
  getProducts() {
    return axios.get(API_URL + 'products');
  }
  getProductsByUrl(url) {
    return axios.get(url);
  }
  getProductsById(id) {
    return axios.get(API_URL + `products/${id}`);
  }
}

export default new ProductsService();
