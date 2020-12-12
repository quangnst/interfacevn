const mongoose = require("mongoose");

const Rating = mongoose.model(
  'Rating',
  new mongoose.Schema({
    product_id: String,
    user_id: String,
    rate: Number
  })
);

module.exports = Rating;
