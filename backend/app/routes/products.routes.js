const controller = require('../controllers/products.controller');
module.exports = function(app) {
  app.get('/api/products/', controller.getAllProduct);
  app.get('/api/products/:id', controller.getProductById);
  app.post('/api/products/rating/:id', controller.ratingProduct);
};
