const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = mongoose.model(
  'Product',
  new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    description: String,
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  })
);

module.exports = Product;
