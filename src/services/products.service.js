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
  ratingProduct(sendRating) {
    return axios.post(API_URL + `products/rating/${sendRating.productId}`, {
      user_id: sendRating.user_id,
      rate: sendRating.rate
    });
  }
}

export default new ProductsService();
