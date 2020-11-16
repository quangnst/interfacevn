const mongoose = require('mongoose');

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    description: String
  })
);

module.exports = Product;
